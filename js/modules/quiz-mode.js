window.MTGQuizModeModule = {
    createQuizMode({ state, taskGeneration, nextTick, typesetMathJax }) {
        const showQuizSolutions = Vue.computed(() => state.showWorksheetSolutions.value);

        const quizColumns = Vue.computed(() => {
            const tasks = state.tasks.value;
            const columns = [[], [], []];

            if (tasks.length === 0) {
                return columns;
            }

            const columnSize = Math.ceil(tasks.length / 3);

            for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
                const start = columnIndex * columnSize;
                const chunk = tasks.slice(start, start + columnSize);

                columns[columnIndex] = chunk.map((task, index) => ({
                    task,
                    number: start + index + 1,
                    key: `quiz-${columnIndex}-${index}`
                }));
            }

            return columns;
        });

        const generateQuiz = async () => {
            if (!taskGeneration.buildTasks('quiz', { training: true, quiz: true })) {
                return;
            }

            state.currentView.value = 'quiz';
            state.isSettingsSidebarOpen.value = false;
            state.showWorksheetSolutions.value = false;

            await nextTick();
            await typesetMathJax();
        };

        const toggleQuizSolutions = async () => {
            state.showWorksheetSolutions.value = !state.showWorksheetSolutions.value;
            await nextTick();
            await typesetMathJax();
        };

        const quizImportInput = Vue.ref(null);

        const openQuizImportDialog = () => {
            quizImportInput.value?.click();
        };

        const importQuizJSON = async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    const loaded = taskGeneration.loadTasksFromJSON(data);
                    if (!loaded) {
                        window.alert('Die JSON-Datei enthält keine gültigen Aufgaben.');
                        return;
                    }

                    if (typeof data.quizNumber === 'string') {
                        state.quizNumber.value = data.quizNumber;
                    } else if (typeof data.quizNumber === 'number' && Number.isFinite(data.quizNumber)) {
                        state.quizNumber.value = String(data.quizNumber);
                    }

                    state.currentView.value = 'quiz';
                    state.isSettingsSidebarOpen.value = false;
                    state.showWorksheetSolutions.value = false;

                    await nextTick();
                    await typesetMathJax();
                } catch (err) {
                    window.alert('Fehler beim Laden der JSON-Datei. Bitte prüfe das Format.');
                } finally {
                    if (event.target) {
                        event.target.value = '';
                    }
                }
            };
            reader.readAsText(file);
        };

        const exportQuizJSON = () => {
            taskGeneration.downloadJSONFile(
                `quiz_${state.quizNumber.value}.json`,
                {
                    quizNumber: state.quizNumber.value,
                    tasks: taskGeneration.getTaskExportData()
                }
            );
        };

        return {
            showQuizSolutions,
            quizColumns,
            generateQuiz,
            toggleQuizSolutions,
            exportQuizJSON,
            importQuizJSON,
            openQuizImportDialog,
            quizImportInput
        };
    }
};
