window.MTGWorksheetModeModule = {
    createWorksheetMode({ state, taskGeneration, nextTick, typesetMathJax, selectedGrade, typeLabels, taskTypesByGrade, createJsonImportHandler }) {
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

        const importWorksheetJSON = createJsonImportHandler({
            loadTasks: taskGeneration.loadTasksFromJSON,
            getVisibleKeys: getVisibleTypeKeys,
            setSelectedTypes: types => {
                if (state.taskCounts?.value) {
                    const allowed = new Set(getVisibleTypeKeys());
                    const selected = new Set(types.filter(type => allowed.has(type)));
                    Object.keys(state.taskCounts.value).forEach(type => {
                        if (allowed.has(type)) {
                            state.taskCounts.value[type] = selected.has(type) ? 1 : 0;
                        }
                    });
                }
                state.selectedTypes.value = types;
            },
            onAfterLoad: async () => {
                state.currentView.value = 'worksheet';
                state.isSettingsSidebarOpen.value = false;
                state.showWorksheetSolutions.value = false;
            }
        });

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