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
        const quizClassConfig = (typeof quizTaskTypesByGrade === 'object' && quizTaskTypesByGrade)
            ? quizTaskTypesByGrade
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
        const quizVisibleTypeKeys = computed(() => {
            const configured = quizClassConfig[`klasse${selectedGrade.value}`];

            if (!Array.isArray(configured)) {
                return allTypes;
            }

            const validKeys = configured.filter(type => Object.prototype.hasOwnProperty.call(typeLabels, type));
            return validKeys.length > 0 ? validKeys : allTypes;
        });

        const quizVisibleTypeEntries = computed(() => quizVisibleTypeKeys.value.map(key => [key, typeLabels[key]]));
        const activeVisibleTypeEntries = computed(() => state.currentView.value === 'quiz' ? quizVisibleTypeEntries.value : visibleTypeEntries.value);
        const activeVisibleTypeKeys = computed(() => state.currentView.value === 'quiz' ? quizVisibleTypeKeys.value : visibleTypeKeys.value);
 
         watch(visibleTypeKeys, (keys) => {
             const allowed = new Set(keys);
             state.selectedTypes.value = state.selectedTypes.value.filter(type => allowed.has(type));
             state.quizSelectedTypes.value = state.quizSelectedTypes.value.filter(type => allowed.has(type));
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

        const quizMode = window.MTGQuizModeModule.createQuizMode({
            state,
            taskGeneration,
            nextTick,
            typesetMathJax
        });

        const activeSelectedTypes = computed({
            get: () => state.currentView.value === 'quiz'
                ? state.quizSelectedTypes.value
                : state.selectedTypes.value,
            set: value => {
                if (state.currentView.value === 'quiz') {
                    state.quizSelectedTypes.value = value;
                    return;
                }

                state.selectedTypes.value = value;
            }
        });

        const activeMentalMathMode = computed({
            get: () => state.currentView.value === 'quiz'
                ? state.quizMentalMathMode.value
                : state.mentalMathMode.value,
            set: value => {
                if (state.currentView.value === 'quiz') {
                    state.quizMentalMathMode.value = value;
                    return;
                }

                state.mentalMathMode.value = value;
            }
        });

        const activeTaskWeights = computed(() => state.currentView.value === 'quiz'
            ? state.quizTaskWeights.value
            : state.taskWeights.value);

        const navigation = window.MTGNavigationModule.createNavigationModule({
            state,
            nextTick,
            typesetMathJax,
            startTraining: trainingMode.startTraining
        });

        const getActiveSelectedTypesRef = () => state.currentView.value === 'quiz'
            ? state.quizSelectedTypes
            : state.selectedTypes;

        const getActiveTaskWeightsRef = () => state.currentView.value === 'quiz'
            ? state.quizTaskWeights
            : state.taskWeights;

        const selectAllTypes = () => {
            const selectedTypesRef = getActiveSelectedTypesRef();
            const allSelected = activeVisibleTypeKeys.value.length === selectedTypesRef.value.length &&
                               activeVisibleTypeKeys.value.every(type => selectedTypesRef.value.includes(type));
            
            if (allSelected) {
                selectedTypesRef.value = [];
            } else {
                selectedTypesRef.value = [...activeVisibleTypeKeys.value];
            }
        };

        const randomizeTypeSelection = () => {
            const classTypes = activeVisibleTypeKeys.value;
            const selectedTypesRef = getActiveSelectedTypesRef();
            const taskWeightsRef = getActiveTaskWeightsRef();
            const randomized = classTypes.filter(() => Math.random() > 0.5);

            selectedTypesRef.value = randomized.length > 0
                ? randomized
                : [classTypes[Math.floor(Math.random() * classTypes.length)]];

            allTypes.forEach(type => {
                taskWeightsRef.value[type] = 1;
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
                return;
            }

            if (state.currentView.value === 'quiz') {
                await quizMode.generateQuiz();
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

        watch(() => state.worksheetA5Pages.value, async () => {
            if (state.currentView.value !== 'worksheet' || !state.hasGeneratedTasks.value) {
                return;
            }

            await nextTick();
            await typesetMathJax();
        });

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
            activeVisibleTypeEntries,
            activeSelectedTypes,
            activeMentalMathMode,
            activeTaskWeights,
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
            toggleWorksheetLayoutMode: worksheetMode.toggleWorksheetLayoutMode,
            printWorksheet: worksheetMode.printWorksheet,
            exportWorksheetJSON: worksheetMode.exportWorksheetJSON,
            downloadWorksheetHTML: worksheetMode.downloadWorksheetHTML,
            showQuizSolutions: quizMode.showQuizSolutions,
            quizColumns: quizMode.quizColumns,
            generateQuiz: quizMode.generateQuiz,
            toggleQuizSolutions: quizMode.toggleQuizSolutions,
            typeLabels,
            typeDescriptions
        };
    }
}).mount('#app');
