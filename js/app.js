const { createApp, nextTick, onMounted, onBeforeUnmount } = Vue;

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

let mathJaxReady = false;
const typesetMathJax = async () => {
    if (window.MathJax?.typesetPromise) {
        try {
            await window.MathJax.typesetPromise();
            mathJaxReady = true;
        } catch (error) {
            console.warn('MathJax rendering failed:', error);
        }
    }
};

createApp({
    setup() {
        const state = window.MTGStateModule.createState(Vue, typeLabels);

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
            const allTypes = Object.keys(typeLabels);
            const newSelection = allTypes.filter(type => !state.selectedTypes.value.includes(type));
            state.selectedTypes.value = newSelection;
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
            invertSelection,
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
            taskCategories,
            typeLabels
        };
    }
}).mount('#app');
