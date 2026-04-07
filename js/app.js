const { createApp, nextTick, onMounted, onBeforeUnmount, ref, computed, watch } = Vue;

/* TODO / Roadmap
 - Winkel fixen
 - neue cases einbauen und validieren
 - Druck-Modus
 - Brüche ordnen
 - Zahl zwischen Brüchen
 - Gewichtung bei den Aufgaben angeben (gewicht bedeutet, dass die Aufgabe so behandelt wird, als wäre sie mehrfach angeklickt worden)
 - Bruch zwischen zwei Brüchen
 - Zeichnungen von Körpern
 - Kongruenzsätze
 - Grafik-Modus
 - Bild für Geradenkreuzung oder IWS einbinden
 - Nutzereingabe mit Kontrolle ermöglichen
 - Nutzereingaben an Nutzer-Code binden
 - Berechnungen an Körpern etc. auf einer Website (excel sheet ersetzen)
 - Aufgaben mit Hilfsmitteln einbauen (z. B. Berechnungen an Flächen und Körpern, Funktionen)
 - Funktionen (Fktswert, Arguemnt, Punktprobe, fehlende Koordninaten berechnen, Wertetaeblle, Graoh zeichnen, Nullstellen usw.)
 - Kombinatorik
 - Rechenaufgaben mit verschiedenen Einheiten
 - Formel umstellen
 - Punkte pro Aufgabe (auch in der Lösung oder beim interaktiven Modus)
*/

const typesetMathJax = async () => {
    if (window.MathJax?.typesetPromise) {
        try {
            await window.MathJax.typesetPromise();
        } catch (error) {
            console.warn('MathJax rendering failed:', error);
        }
    }
};

createApp({
    setup() {
        const state = window.MTGStateModule.createState(Vue, typeLabels);
        const allTypes = Object.keys(typeLabels);
        const selectedGrade = ref(10);
        const gradeOptions = [5, 6, 7, 8, 9, 10];

        const classConfig = (typeof taskTypesByGrade === 'object' && taskTypesByGrade)
            ? taskTypesByGrade
            : {};

        const visibleTypeKeys = computed(() => {
            const configured = classConfig[`klasse${selectedGrade.value}`];

            if (!Array.isArray(configured)) {
                return allTypes;
            }

            const validKeys = configured.filter(type => Object.prototype.hasOwnProperty.call(typeLabels, type));
            return validKeys.length > 0 ? validKeys : allTypes;
        });

        const visibleTypeEntries = computed(() => visibleTypeKeys.value.map(key => [key, typeLabels[key]]));

        watch(visibleTypeKeys, (keys) => {
            const allowed = new Set(keys);
            state.selectedTypes.value = state.selectedTypes.value.filter(type => allowed.has(type));
        }, { immediate: true });

        const taskGeneration = window.MTGTaskGenerationModule.createTaskGenerationModule({
            state,
            createTask,
            selectedGrade
        });

        const trainingMode = window.MTGTrainingModeModule.createTrainingMode({
            state,
            taskGeneration,
            nextTick,
            typesetMathJax,
            onMounted,
            onBeforeUnmount
        });

        const presentationMode = window.MTGPresentationModeModule.createPresentationMode({
            state,
            taskGeneration,
            nextTick,
            typesetMathJax
        });

        const worksheetMode = window.MTGWorksheetModeModule.createWorksheetMode({
            state,
            taskGeneration,
            nextTick,
            typesetMathJax
        });

        const navigation = window.MTGNavigationModule.createNavigationModule({
            state,
            nextTick,
            typesetMathJax,
            startTraining: trainingMode.startTraining
        });

        const selectAllTypes = () => {
            const allSelected = visibleTypeKeys.value.length === state.selectedTypes.value.length &&
                               visibleTypeKeys.value.every(type => state.selectedTypes.value.includes(type));
            
            if (allSelected) {
                state.selectedTypes.value = [];
            } else {
                state.selectedTypes.value = [...visibleTypeKeys.value];
            }
        };

        const randomizeTypeSelection = () => {
            const classTypes = visibleTypeKeys.value;
            const randomized = classTypes.filter(() => Math.random() > 0.5);

            state.selectedTypes.value = randomized.length > 0
                ? randomized
                : [classTypes[Math.floor(Math.random() * classTypes.length)]];

            allTypes.forEach(type => {
                state.taskWeights.value[type] = 1;
            });
        };

        const generateRandomWorksheet = async () => {
            randomizeTypeSelection();
            await worksheetMode.generateWorksheet();
        };

        const refreshCurrentView = async () => {
            if (state.currentView.value === 'worksheet') {
                await worksheetMode.generateWorksheet();
                return;
            }

            if (state.currentView.value === 'presentation') {
                await presentationMode.generateAll();
                return;
            }

            if (state.currentView.value === 'training') {
                await trainingMode.startTraining();
            }
        };

        const allowedViews = new Set(state.viewTabs.map(tab => tab.key));

        const getViewFromUrl = () => {
            const url = new URL(window.location.href);
            const queryView = url.searchParams.get('view');
            const hashView = url.hash.replace(/^#/, '');
            const candidate = queryView || hashView;

            if (!candidate || !allowedViews.has(candidate)) {
                return 'home';
            }

            return candidate;
        };

        const syncUrlWithView = view => {
            if (suppressHistorySync) {
                return;
            }

            const url = new URL(window.location.href);

            if (view === 'home') {
                url.searchParams.delete('view');
                url.hash = '';
            } else {
                url.searchParams.set('view', view);
                url.hash = view;
            }

            const nextUrl = `${url.pathname}${url.search}${url.hash}`;
            const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

            if (nextUrl === currentUrl) {
                return;
            }

            window.history.pushState({}, '', url);
        };

        let suppressHistorySync = false;

        watch(() => state.currentView.value, view => {
            syncUrlWithView(view);
        }, { immediate: true });

        const applyViewFromUrl = async () => {
            const urlView = getViewFromUrl();

            if (urlView === state.currentView.value) {
                return;
            }

            suppressHistorySync = true;
            try {
                await navigation.switchView(urlView);
            } finally {
                suppressHistorySync = false;
            }
        };

        onMounted(async () => {
            await applyViewFromUrl();
            window.addEventListener('popstate', applyViewFromUrl);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('popstate', applyViewFromUrl);
        });

        return {
            ...state,
            selectedGrade,
            gradeOptions,
            visibleTypeEntries,
            selectAllTypes,
            randomizeTypeSelection,
            generateRandomWorksheet,
            refreshCurrentView,
            openSettingsSidebar: navigation.openSettingsSidebar,
            closeSettingsSidebar: navigation.closeSettingsSidebar,
            toggleSettingsSidebar: navigation.toggleSettingsSidebar,
            goHome: navigation.goHome,
            switchView: navigation.switchView,
            startTraining: trainingMode.startTraining,
            toggleTrainingSolution: trainingMode.toggleTrainingSolution,
            goToPreviousTrainingTask: trainingMode.goToPreviousTrainingTask,
            goToNextTrainingTask: trainingMode.goToNextTrainingTask,
            generateAll: presentationMode.generateAll,
            toggleSolutions: presentationMode.toggleSolutions,
            toggleDarkMode: presentationMode.toggleDarkMode,
            exportJSON: presentationMode.exportJSON,
            exportHTML: presentationMode.exportHTML,
            generateWorksheet: worksheetMode.generateWorksheet,
            toggleWorksheetSolutions: worksheetMode.toggleWorksheetSolutions,
            printWorksheet: worksheetMode.printWorksheet,
            exportWorksheetJSON: worksheetMode.exportWorksheetJSON,
            downloadWorksheetHTML: worksheetMode.downloadWorksheetHTML,
            typeLabels,
            typeDescriptions
        };
    }
}).mount('#app');
