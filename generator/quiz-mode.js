window.MTGQuizModeModule = {
    createQuizMode({ state, taskGeneration, nextTick, typesetMathJax, createJsonImportHandler, getVisibleTypeKeys }) {
        const showQuizSolutions = Vue.computed(() => state.showWorksheetSolutions.value);

        const quizColumns = Vue.computed(() => {
            const tasks = state.tasks.value;
            const columns = [[], [], []];

            if (tasks.length === 0) {
                return columns;
            }

            const total = tasks.length;
            const firstColCount = Math.floor(total / 3);
            const remaining = total - firstColCount;
            const secondColCount = Math.ceil(remaining / 2);
            const thirdColCount = remaining - secondColCount;
            const counts = [firstColCount, secondColCount, thirdColCount];

            let offset = 0;
            for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
                const count = counts[columnIndex];
                const chunk = tasks.slice(offset, offset + count);

                columns[columnIndex] = chunk.map((task, index) => ({
                    task,
                    number: offset + index + 1,
                    key: `quiz-${columnIndex}-${index}`
                }));

                offset += count;
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

        const importQuizJSON = createJsonImportHandler({
            loadTasks: taskGeneration.loadTasksFromJSON,
            getVisibleKeys: getVisibleTypeKeys,
            setSelectedTypes: types => {
                state.quizSelectedTypes.value = types;

                const quizTypes = new Set((typeof getVisibleTypeKeys === 'function' ? getVisibleTypeKeys() : []) || []);
                const nextSelectedTypes = state.selectedTypes.value.filter(type => !quizTypes.has(type));

                for (const type of types) {
                    if (!nextSelectedTypes.includes(type)) {
                        nextSelectedTypes.push(type);
                    }
                }

                state.selectedTypes.value = nextSelectedTypes;
            },
            onAfterLoad: async data => {
                if (typeof data.quizNumber === 'string') {
                    state.quizNumber.value = data.quizNumber;
                } else if (typeof data.quizNumber === 'number' && Number.isFinite(data.quizNumber)) {
                    state.quizNumber.value = String(data.quizNumber);
                }

                state.currentView.value = 'quiz';
                state.isSettingsSidebarOpen.value = false;
                state.showWorksheetSolutions.value = false;
            }
        });

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
