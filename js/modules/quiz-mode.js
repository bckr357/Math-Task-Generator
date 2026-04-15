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

        return {
            showQuizSolutions,
            quizColumns,
            generateQuiz,
            toggleQuizSolutions
        };
    }
};
