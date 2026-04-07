window.MTGStateModule = {
    createState(Vue, typeLabels) {
        const { ref, computed } = Vue;

        const tasks = ref([]);
        const trainingHistory = ref([]);
        const showSolutions = ref(false);
        const currentView = ref('home');
        const isSettingsSidebarOpen = ref(false);
        const showWorksheetSolutions = ref(false);
        const showTrainingSolution = ref(false);
        const currentTrainingIndex = ref(0);
        const isDarkMode = ref(false);
        const selectedTypes = ref([]);
        const taskWeights = ref(
            Object.fromEntries(Object.keys(typeLabels).map(type => [type, 1]))
        );
        const taskCount = ref(10);
        const taskArrangementMode = ref('random');
        const gtNumber = ref(1);
        const mentalMathMode = ref(false);

        const rowWiseFirstColumnTasks = computed(() => tasks.value.filter((_, index) => index % 2 === 0));
        const rowWiseSecondColumnTasks = computed(() => tasks.value.filter((_, index) => index % 2 === 1));
        const currentTrainingTask = computed(() => trainingHistory.value[currentTrainingIndex.value] ?? null);
        const hasGeneratedTasks = computed(() => tasks.value.length > 0);
        const hasSelectedTypes = computed(() => selectedTypes.value.length > 0);
        const viewTabs = [
            { key: 'home', label: 'Start' },
            { key: 'worksheet', label: 'Arbeitsblatt' },
            { key: 'presentation', label: 'Presentation' },
            { key: 'training', label: 'Training' }
        ];

        return {
            tasks,
            trainingHistory,
            showSolutions,
            currentView,
            isSettingsSidebarOpen,
            showWorksheetSolutions,
            showTrainingSolution,
            currentTrainingIndex,
            isDarkMode,
            selectedTypes,
            taskWeights,
            taskCount,
            taskArrangementMode,
            gtNumber,
            mentalMathMode,
            rowWiseFirstColumnTasks,
            rowWiseSecondColumnTasks,
            currentTrainingTask,
            hasGeneratedTasks,
            hasSelectedTypes,
            viewTabs
        };
    }
};
