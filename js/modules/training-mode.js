window.MTGTrainingModeModule = {
    createTrainingMode({ state, taskGeneration, nextTick, typesetMathJax, onMounted, onBeforeUnmount }) {
        const startTraining = async () => {
            if (state.selectedTypes.value.length === 0) return;

            state.trainingHistory.value = [];
            state.currentTrainingIndex.value = 0;

            const firstTask = taskGeneration.generateSingleTrainingTask();
            if (!firstTask) return;

            state.trainingHistory.value.push(firstTask);
            state.currentView.value = 'training';
            state.showTrainingSolution.value = false;
            state.isSettingsSidebarOpen.value = false;

            await nextTick();
            await typesetMathJax();
        };

        const toggleTrainingSolution = async () => {
            state.showTrainingSolution.value = !state.showTrainingSolution.value;
            await nextTick();
            await typesetMathJax();
        };

        const goToPreviousTrainingTask = async () => {
            if (state.currentTrainingIndex.value <= 0) return;
            state.currentTrainingIndex.value -= 1;
            state.showTrainingSolution.value = false;
            await nextTick();
            await typesetMathJax();
        };

        const goToNextTrainingTask = async () => {
            if (state.trainingHistory.value.length === 0) return;

            if (state.currentTrainingIndex.value >= state.trainingHistory.value.length - 1) {
                const newTask = taskGeneration.generateSingleTrainingTask();
                if (newTask) {
                    state.trainingHistory.value.push(newTask);
                    state.currentTrainingIndex.value = state.trainingHistory.value.length - 1;
                }
            } else {
                state.currentTrainingIndex.value += 1;
            }

            state.showTrainingSolution.value = false;
            await nextTick();
            await typesetMathJax();
        };

        const resetTraining = () => {
            state.showTrainingSolution.value = false;
            state.currentTrainingIndex.value = 0;
            state.trainingHistory.value = [];
        };

        const handleTrainingKeydown = event => {
            if (state.currentView.value !== 'training') return;

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPreviousTrainingTask();
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToNextTrainingTask();
                return;
            }

            if (event.key === ' ' || event.code === 'Space') {
                event.preventDefault();
                toggleTrainingSolution();
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                state.currentView.value = 'home';
                state.isSettingsSidebarOpen.value = false;
                resetTraining();
            }
        };

        onMounted(() => {
            window.addEventListener('keydown', handleTrainingKeydown);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('keydown', handleTrainingKeydown);
        });

        return {
            startTraining,
            toggleTrainingSolution,
            goToPreviousTrainingTask,
            goToNextTrainingTask,
            resetTraining
        };
    }
};
