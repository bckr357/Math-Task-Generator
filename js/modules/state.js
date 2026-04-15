window.MTGStateModule = {
    createState(Vue, typeLabels) {
        const { ref, computed } = Vue;

        const tasks = ref([]);
        const trainingHistory = ref([]);
        const showSolutions = ref(false);
        const currentView = ref('home');
        const isSettingsSidebarOpen = ref(false);
        const showWorksheetSolutions = ref(false);
        const worksheetLayoutMode = ref('worksheet');
        const showTrainingSolution = ref(false);
        const currentTrainingIndex = ref(0);
        const isDarkMode = ref(false);
        const selectedTypes = ref([]);
        const taskWeights = ref(
            Object.fromEntries(Object.keys(typeLabels).map(type => [type, 2]))
        );
        const taskCount = ref(10);
        const taskArrangementMode = ref('random');
        const gtNumber = ref(1);
        const worksheetA5Pages = ref(2);
        const mentalMathMode = ref(false);
        const weights = ref(false);
        const quizSelectedTypes = ref([]);
        const quizTaskWeights = ref(
            Object.fromEntries(Object.keys(typeLabels).map(type => [type, 1]))
        );
        const quizMentalMathMode = ref(true);

        const rowWiseFirstColumnTasks = computed(() => tasks.value.filter((_, index) => index % 2 === 0));
        const rowWiseSecondColumnTasks = computed(() => tasks.value.filter((_, index) => index % 2 === 1));
        const worksheetTaskColumns = computed(() => {
            if (worksheetA5Pages.value === 2) {
                return {
                    left: tasks.value.map((task, index) => ({ task, number: index + 1, key: `left-${index}` })),
                    right: tasks.value.map((task, index) => ({ task, number: index + 1, key: `right-${index}` }))
                };
            }

            const left = [];
            const right = [];

            tasks.value.forEach((task, index) => {
                const entry = { task, number: index + 1, key: `col-${index}` };

                if (index % 2 === 0) {
                    left.push(entry);
                } else {
                    right.push(entry);
                }
            });

            return { left, right };
        });
        const currentTrainingTask = computed(() => trainingHistory.value[currentTrainingIndex.value] ?? null);
        const hasGeneratedTasks = computed(() => tasks.value.length > 0);
        const hasSelectedTypes = computed(() => {
            if (currentView.value === 'quiz') {
                return quizSelectedTypes.value.length > 0;
            }

            return selectedTypes.value.length > 0;
        });
        const isQuizMode = computed(() => currentView.value === 'quiz');
        const viewTabs = [
            { key: 'home', label: 'Start' },
            { key: 'worksheet', label: 'Arbeitsblatt' },
            { key: 'presentation', label: 'Präsentation' },
            { key: 'training', label: 'Training' },
            { key: 'quiz', label: 'Quiz generieren' }
        ];

        return {
            tasks,
            trainingHistory,
            showSolutions,
            currentView,
            isSettingsSidebarOpen,
            showWorksheetSolutions,
            worksheetLayoutMode,
            showTrainingSolution,
            currentTrainingIndex,
            isDarkMode,
            selectedTypes,
            taskWeights,
            taskCount,
            taskArrangementMode,
            gtNumber,
            worksheetA5Pages,
            mentalMathMode,
            weights,
            quizSelectedTypes,
            quizTaskWeights,
            quizMentalMathMode,
            rowWiseFirstColumnTasks,
            rowWiseSecondColumnTasks,
            worksheetTaskColumns,
            currentTrainingTask,
            hasGeneratedTasks,
            hasSelectedTypes,
            viewTabs
        };
    }
};
