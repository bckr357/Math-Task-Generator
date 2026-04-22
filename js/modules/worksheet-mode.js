window.MTGWorksheetModeModule = {
    createWorksheetMode({ state, taskGeneration, nextTick, typesetMathJax, selectedGrade, typeLabels, taskTypesByGrade }) {
        const getVisibleTypeKeys = () => {
            const allTypes = Object.keys(typeLabels || {});
            const classConfig = (typeof taskTypesByGrade === 'object' && taskTypesByGrade)
                ? taskTypesByGrade
                : {};
            const configured = classConfig[`klasse${selectedGrade?.value}`];

            if (!Array.isArray(configured)) {
                return allTypes;
            }

            const validKeys = configured.filter(type => Object.prototype.hasOwnProperty.call(typeLabels, type));
            return validKeys.length > 0 ? validKeys : allTypes;
        };

        const toggleWorksheetSolutions = async () => {
            state.showWorksheetSolutions.value = !state.showWorksheetSolutions.value;
            await nextTick();
            await typesetMathJax();
        };

        const toggleWorksheetLayoutMode = async () => {
            state.worksheetLayoutMode.value = state.worksheetLayoutMode.value === 'presentation'
                ? 'worksheet'
                : 'presentation';
            await nextTick();
            await typesetMathJax();
        };

        const generateWorksheet = async () => {
            if (!taskGeneration.buildTasks()) {
                return;
            }

            state.currentView.value = 'worksheet';
            state.isSettingsSidebarOpen.value = false;

            await nextTick();
            await typesetMathJax();
        };

        const exportWorksheetJSON = () => {
            taskGeneration.downloadJSONFile(
                `arbeitsblatt_aufgaben_${state.taskCount.value}.json`,
                taskGeneration.getTaskExportData()
            );
        };

        const worksheetImportInput = Vue.ref(null);

        const openWorksheetImportDialog = () => {
            worksheetImportInput.value?.click();
        };

        const importWorksheetJSON = async event => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onload = async ev => {
                try {
                    const data = JSON.parse(ev.target.result);
                    const loaded = taskGeneration.loadTasksFromJSON(data);
                    if (!loaded) {
                        window.alert('Die JSON-Datei enthält keine gültigen Aufgaben.');
                        return;
                    }

                    const rawTasks = Array.isArray(data)
                        ? data
                        : Array.isArray(data.tasks)
                            ? data.tasks
                            : [];

                    const importedTypes = [...new Set(rawTasks
                        .map(item => item.aufgabentyp || item.type || '')
                        .filter(type => typeof type === 'string' && type))];

                    const visibleKeys = new Set(getVisibleTypeKeys());
                    state.selectedTypes.value = importedTypes.filter(type => visibleKeys.has(type));

                    state.currentView.value = 'worksheet';
                    state.isSettingsSidebarOpen.value = false;
                    state.showWorksheetSolutions.value = false;

                    await nextTick();
                    await typesetMathJax();
                } catch {
                    window.alert('Fehler beim Laden der JSON-Datei. Bitte prüfe das Format.');
                } finally {
                    if (event.target) {
                        event.target.value = '';
                    }
                }
            };

            reader.readAsText(file);
        };

        return {
            toggleWorksheetSolutions,
            toggleWorksheetLayoutMode,
            generateWorksheet,
            exportWorksheetJSON,
            importWorksheetJSON,
            openWorksheetImportDialog,
            worksheetImportInput
        };
    }
};