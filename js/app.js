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
        const selectedGrade = ref('klasse5');
        const gradeOptions = [
            { value: 'klasse5', label: 'Klasse 5' },
            { value: 'klasse6', label: 'Klasse 6' },
            { value: 'klasse7', label: 'Klasse 7' },
            { value: 'klasse8', label: 'Klasse 8' },
            { value: 'klasse9', label: 'Klasse 9' },
            { value: 'klasse10', label: 'Klasse 10' }
        ];

        const classConfig = (typeof taskTypesByGrade === 'object' && taskTypesByGrade)
            ? taskTypesByGrade
            : {};

        const visibleTypeKeys = computed(() => {
            const configured = classConfig[selectedGrade.value];

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
            createTask
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

        const invertSelection = () => {
            const newSelection = visibleTypeKeys.value.filter(type => !state.selectedTypes.value.includes(type));
            state.selectedTypes.value = newSelection;
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

        return {
            ...state,
            selectedGrade,
            gradeOptions,
            visibleTypeEntries,
            invertSelection,
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
