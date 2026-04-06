window.MTGNavigationModule = {
    createNavigationModule({ state, nextTick, typesetMathJax, startTraining }) {
        const openSettingsSidebar = () => {
            state.isSettingsSidebarOpen.value = true;
        };

        const closeSettingsSidebar = () => {
            state.isSettingsSidebarOpen.value = false;
        };

        const toggleSettingsSidebar = () => {
            state.isSettingsSidebarOpen.value = !state.isSettingsSidebarOpen.value;
        };

        const setCurrentView = async view => {
            state.currentView.value = view;
            await nextTick();
            await typesetMathJax();
        };

        const goHome = async () => {
            closeSettingsSidebar();
            await setCurrentView('home');
        };

        const switchView = async (view, options = {}) => {
            const { autoOpenSettingsFromHome = true } = options;
            const fromHome = state.currentView.value === 'home';

            closeSettingsSidebar();

            if (view === 'home') {
                await goHome();
                return;
            }

            if (view === 'training') {
                if (state.currentTrainingTask.value) {
                    await setCurrentView('training');
                    if (fromHome && autoOpenSettingsFromHome) {
                        openSettingsSidebar();
                    }
                    return;
                }

                if (state.hasSelectedTypes.value) {
                    await startTraining();
                    if (fromHome && autoOpenSettingsFromHome) {
                        openSettingsSidebar();
                    }
                    return;
                }
            }

            await setCurrentView(view);
            if (fromHome && view !== 'home' && autoOpenSettingsFromHome) {
                openSettingsSidebar();
            }
        };

        return {
            openSettingsSidebar,
            closeSettingsSidebar,
            toggleSettingsSidebar,
            goHome,
            switchView,
            setCurrentView
        };
    }
};
