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

const quizEnabledByPage = window.MTG_DISABLE_QUIZ !== true;

const requiredModules = [
    'MTGStateModule',
    'MTGTaskGenerationModule',
    'MTGTrainingModeModule',
    'MTGPresentationModeModule',
    'MTGWorksheetModeModule',
    ...(quizEnabledByPage ? ['MTGQuizModeModule'] : []),
    'MTGNavigationModule',
    'MTGSiteShellModule'
];
const missingModules = requiredModules.filter(m => !window[m]);
if (missingModules.length > 0) {
    throw new Error(`MTG: Pflichtmodule fehlen – ${missingModules.join(', ')}. Prüfe die Ladereihenfolge der Skripte.`);
}

createApp({
    setup() {
        const state = window.MTGStateModule.createState(Vue, typeLabels);
        const isQuizEnabled = quizEnabledByPage && typeof window.MTGQuizModeModule?.createQuizMode === 'function';
        const viewTabs = isQuizEnabled
            ? state.viewTabs
            : state.viewTabs.filter(tab => tab.key !== 'quiz');
        const allTypes = sortByTypeDefinitions(Object.keys(typeLabels));
        const taskCounts = ref(Object.fromEntries(allTypes.map(type => [type, 0])));
        state.taskCounts = taskCounts;
        state.weights.value = false;
        state.mentalMathMode.value = false;
        const selectedGrade = ref(10);
        const gradeOptions = [5, 6, 7, 8, 9, 10];

        const classConfig = (typeof taskTypesByGrade === 'object' && taskTypesByGrade)
            ? taskTypesByGrade
            : {};
        const quizClassConfig = (isQuizEnabled && typeof quizTaskTypesByGrade === 'object' && quizTaskTypesByGrade)
            ? quizTaskTypesByGrade
            : classConfig;

        const visibleTypeKeys = computed(() => {
            const configured = classConfig[`klasse${selectedGrade.value}`];

            if (!Array.isArray(configured)) {
                return allTypes;
            }

            const validKeys = configured.filter(type => Object.prototype.hasOwnProperty.call(typeLabels, type));
            return validKeys.length > 0 ? sortByTypeDefinitions(validKeys) : allTypes;
        });

        const visibleTypeEntries = computed(() => visibleTypeKeys.value.map(key => [key, typeLabels[key]]));
        const quizVisibleTypeKeys = computed(() => {
            const configured = quizClassConfig[`klasse${selectedGrade.value}`];

            if (!Array.isArray(configured)) {
                return allTypes;
            }

            const validKeys = configured.filter(type => Object.prototype.hasOwnProperty.call(typeLabels, type));
            return validKeys.length > 0 ? sortByTypeDefinitions(validKeys) : allTypes;
        });

        const quizVisibleTypeEntries = computed(() => quizVisibleTypeKeys.value.map(key => [key, typeLabels[key]]));
        const activeVisibleTypeEntries = computed(() => state.currentView.value === 'quiz' ? quizVisibleTypeEntries.value : visibleTypeEntries.value);
        const activeVisibleTypeKeys = computed(() => state.currentView.value === 'quiz' ? quizVisibleTypeKeys.value : visibleTypeKeys.value);
 
        const parseRawTaskArray = data => Array.isArray(data)
            ? data
            : Array.isArray(data.tasks)
                ? data.tasks
                : [];

        const extractImportedTypes = rawTasks => [...new Set(rawTasks
            .map(item => item.aufgabentyp || item.type || '')
            .filter(type => typeof type === 'string' && type))];

        const createJsonImportHandler = ({ loadTasks, getVisibleKeys, setSelectedTypes, onAfterLoad }) => async event => {
            const file = event.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async ev => {
                try {
                    const parseResult = safeJSONParse(ev.target.result);
                    if (!parseResult.ok) {
                        window.alert('Fehler beim Laden der JSON-Datei. Bitte prüfe das Format.');
                        return;
                    }

                    const data = parseResult.data;
                    const loaded = loadTasks(data);
                    if (!loaded) {
                        window.alert('Die JSON-Datei enthält keine gültigen Aufgaben.');
                        return;
                    }

                    if (setSelectedTypes && getVisibleKeys) {
                        const rawTasks = parseRawTaskArray(data);
                        const importedTypes = extractImportedTypes(rawTasks);
                        const visibleKeys = new Set(getVisibleKeys());
                        setSelectedTypes(importedTypes.filter(type => visibleKeys.has(type)));
                    }

                    if (typeof onAfterLoad === 'function') {
                        await onAfterLoad(data);
                    }

                    await nextTick();
                    await typesetMathJax();
                } catch (error) {
                    window.alert('Fehler beim Laden der JSON-Datei. Bitte prüfe das Format.');
                } finally {
                    if (event.target) {
                        event.target.value = '';
                    }
                }
            };

            reader.readAsText(file);
        };

        const syncSelectedTypesFromCounts = (allowedKeys = null) => {
            const allowed = allowedKeys ? new Set(allowedKeys) : null;
            state.selectedTypes.value = Object.entries(taskCounts.value)
                .filter(([type, count]) => Number(count) > 0 && (!allowed || allowed.has(type)))
                .map(([type]) => type);
            state.taskCount.value = state.selectedTypes.value.reduce((sum, type) => {
                const count = Number(taskCounts.value[type]);
                return sum + (Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0);
            }, 0);
        };

        watch(taskCounts, () => {
            syncSelectedTypesFromCounts(visibleTypeKeys.value);
        }, { deep: true });

        watch(visibleTypeKeys, keys => {
            const allowed = new Set(keys);
            state.selectedTypes.value = state.selectedTypes.value.filter(type => allowed.has(type));
            Object.keys(taskCounts.value).forEach(type => {
                if (!allowed.has(type)) {
                    taskCounts.value[type] = 0;
                }
            });
            syncSelectedTypesFromCounts(keys);
        }, { immediate: true });

        watch(quizVisibleTypeKeys, keys => {
            const allowed = new Set(keys);
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
            typesetMathJax,
            createJsonImportHandler
        });

        const worksheetMode = window.MTGWorksheetModeModule.createWorksheetMode({
            state,
            taskGeneration,
            nextTick,
            typesetMathJax,
            selectedGrade,
            typeLabels,
            taskTypesByGrade,
            createJsonImportHandler
        });

        const quizMode = isQuizEnabled
            ? window.MTGQuizModeModule.createQuizMode({
                state,
                taskGeneration,
                nextTick,
                typesetMathJax,
                createJsonImportHandler,
                getVisibleTypeKeys: () => quizVisibleTypeKeys.value
            })
            : {
                showQuizSolutions: ref(false),
                quizColumns: ref([]),
                exportQuizJSON: () => {},
                importQuizJSON: () => {},
                openQuizImportDialog: () => {},
                quizImportInput: ref(null),
                generateQuiz: async () => {},
                toggleQuizSolutions: async () => {}
            };

        const activeSelectedTypes = computed({
            get: () => state.currentView.value === 'quiz'
                ? state.quizSelectedTypes.value
                : state.selectedTypes.value,
            set: value => {
                if (state.currentView.value === 'quiz') {
                    state.quizSelectedTypes.value = value;

                    const quizTypes = new Set(quizVisibleTypeKeys.value);
                    const updatedSelectedTypes = state.selectedTypes.value.filter(type => !quizTypes.has(type));

                    for (const type of value) {
                        if (!updatedSelectedTypes.includes(type)) {
                            updatedSelectedTypes.push(type);
                        }
                    }

                    state.selectedTypes.value = updatedSelectedTypes;
                    return;
                }

                const selectedSet = new Set(value);
                activeVisibleTypeKeys.value.forEach(type => {
                    if (selectedSet.has(type)) {
                        if (Number(taskCounts.value[type]) <= 0) {
                            taskCounts.value[type] = 1;
                        }
                    } else {
                        taskCounts.value[type] = 0;
                    }
                });
                syncSelectedTypesFromCounts(activeVisibleTypeKeys.value);
            }
        });

        const activeSelectedTypesCount = computed(() => activeSelectedTypes.value.length);

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
            : taskCounts.value);

        const totalSelectedTaskCount = computed(() => state.selectedTypes.value.reduce((sum, type) => {
            const count = Number(taskCounts.value[type]);
            return sum + (Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0);
        }, 0));

        let blockHoverOpen = false;

        const preserveBodyFocus = () => {
            if (document.activeElement && document.activeElement.tagName === 'SELECT') {
                document.activeElement.blur();
            }
            if (document.activeElement && document.activeElement.tagName === 'BODY') {
                return;
            }
            document.body.focus?.();
        };

        const closeNativeSelect = select => {
            select.blur();
            if (document.activeElement === select) {
                setTimeout(() => {
                    select.blur();
                    preserveBodyFocus();
                }, 0);
            }
        };

        const openViewDropdown = event => {
            if (blockHoverOpen) {
                return;
            }

            const select = event.target;
            if (typeof select.showPicker === 'function') {
                select.showPicker();
                return;
            }
            select.focus();
            if (typeof select.click === 'function') {
                select.click();
            }
        };

        const onModuleSelect = async event => {
            const select = event.target;
            const value = select.value;
            blockHoverOpen = true;
            closeNativeSelect(select);
            await navigation.switchView(value);
            closeNativeSelect(select);
            setTimeout(() => {
                blockHoverOpen = false;
            }, 200);
        };

        const builderDraftTask = ref(null);
        const builderDraftType = ref('');
        const builderReplaceIndex = ref(null);
        const builderImportInput = ref(null);
        const builderShowPreviewSolution = ref(false);
        const builderShowTaskSolutions = ref(false);
        const builderDisplayMode = ref('worksheet');
        const builderQuizMode = ref(false);
        const builderSidebarWidth = ref(585);
        const builderIsResizing = ref(false);
        let builderResizeStartX = 0;
        let builderResizeStartWidth = 0;
        const builderDragIndex = ref(null);
        const builderEditingIndex = ref(null);
        const builderEditTaskText = ref('');
        const builderEditSolutionText = ref('');
        const getBuilderTaskMarkup = (task, showSolution = false) => {
            if (!task) {
                return '';
            }

            if (showSolution) {
                return task.solution ?? '';
            }

            return task.textPrint || task.textDisplay || '';
        };

        const builderDraftMarkup = computed(() => getBuilderTaskMarkup(builderDraftTask.value, builderShowPreviewSolution.value));
        const builderReplaceTargetLabel = computed(() => {
            const index = builderReplaceIndex.value;
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return '';
            }

            const task = state.tasks.value[index];
            const typeKey = task?.type;
            return typeLabels[typeKey] ?? typeKey ?? '';
        });

        const builderTaskTypeStats = computed(() => {
            const counts = Object.fromEntries(Object.keys(typeLabels).map(type => [type, 0]));
            state.tasks.value.forEach(task => {
                if (task && typeof task.type === 'string') {
                    counts[task.type] = (counts[task.type] ?? 0) + 1;
                }
            });
            return Object.entries(typeLabels).map(([type, label]) => ({ type, label, count: counts[type] ?? 0 }));
        });

        const builderTaskTypeRows = computed(() => {
            const rows = [];
            const stats = builderTaskTypeStats.value;
            for (let i = 0; i < stats.length; i += 2) {
                rows.push({
                    left: stats[i],
                    right: stats[i + 1] || { type: '', label: '', count: 0 }
                });
            }
            return rows;
        });

        const syncTaskCountFromTasks = () => {
            state.taskCount.value = state.tasks.value.length;
        };

        const builderTaskOptions = () => builderQuizMode.value ? { training: true } : {};

        const builderGenerateTaskPreview = async type => {
            const task = taskGeneration.generateTaskByType(type, 'default', builderTaskOptions());
            if (!task) {
                return;
            }

            builderDraftTask.value = task;
            builderDraftType.value = type;
            builderShowPreviewSolution.value = false;

            await nextTick();
            await typesetMathJax();
        };

        const builderTogglePreviewSolution = async () => {
            builderShowPreviewSolution.value = !builderShowPreviewSolution.value;

            await nextTick();
            await typesetMathJax();
        };

        const builderToggleTaskSolutions = async () => {
            builderShowTaskSolutions.value = !builderShowTaskSolutions.value;

            await nextTick();
            await typesetMathJax();
        };

        const builderToggleDisplayMode = async () => {
            builderDisplayMode.value = builderDisplayMode.value === 'presentation'
                ? 'worksheet'
                : 'presentation';

            await nextTick();
            await typesetMathJax();
        };

        const builderAddDraftTask = async () => {
            if (!builderDraftTask.value) {
                return;
            }

            state.tasks.value.push({ ...builderDraftTask.value });
            state.showWorksheetSolutions.value = false;
            state.showSolutions.value = false;
            syncTaskCountFromTasks();

            await nextTick();
            await typesetMathJax();
        };

        const builderRemoveTask = async index => {
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            state.tasks.value.splice(index, 1);

            if (builderReplaceIndex.value === index) {
                builderReplaceIndex.value = null;
            } else if (Number.isInteger(builderReplaceIndex.value) && builderReplaceIndex.value > index) {
                builderReplaceIndex.value -= 1;
            }

            syncTaskCountFromTasks();

            await nextTick();
            await typesetMathJax();
        };

        const builderClearTasks = () => {
            state.tasks.value = [];
            builderReplaceIndex.value = null;
            builderEditingIndex.value = null;
            builderDragIndex.value = null;
            syncTaskCountFromTasks();
        };

        const builderResortTasks = async () => {
            const tasks = [...state.tasks.value];
            if (tasks.length < 2) {
                return;
            }

            const mode = state.taskArrangementMode.value;

            if (mode === 'random') {
                for (let i = tasks.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
                }
            } else if (mode === 'ordered' || mode === 'random-ordered') {
                const labelOrder = Object.keys(typeLabels);
                const groups = {};
                for (const task of tasks) {
                    const key = task.type || '__unknown';
                    if (!groups[key]) groups[key] = [];
                    groups[key].push(task);
                }
                const orderedKeys = [
                    ...labelOrder.filter(k => groups[k]),
                    ...Object.keys(groups).filter(k => !labelOrder.includes(k))
                ];
                if (mode === 'random-ordered') {
                    for (let i = orderedKeys.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [orderedKeys[i], orderedKeys[j]] = [orderedKeys[j], orderedKeys[i]];
                    }
                }
                state.tasks.value = orderedKeys.flatMap(k => groups[k]);
                builderReplaceIndex.value = null;
                builderEditingIndex.value = null;
                syncTaskCountFromTasks();
                await nextTick();
                await typesetMathJax();
                return;
            }

            state.tasks.value = tasks;
            builderReplaceIndex.value = null;
            builderEditingIndex.value = null;
            syncTaskCountFromTasks();

            await nextTick();
            await typesetMathJax();
        };

        const builderStartReplaceTask = index => {
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            builderReplaceIndex.value = index;
        };

        const builderCancelReplaceTask = () => {
            builderReplaceIndex.value = null;
        };

        const builderApplyDraftReplacement = async () => {
            const index = builderReplaceIndex.value;
            if (!builderDraftTask.value || !Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            state.tasks.value.splice(index, 1, { ...builderDraftTask.value });
            builderReplaceIndex.value = null;

            await nextTick();
            await typesetMathJax();
        };

        const builderDuplicateTask = async index => {
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            const sourceTask = state.tasks.value[index];
            const duplicate = taskGeneration.generateTaskByType(sourceTask.type, 'default', builderTaskOptions());
            if (!duplicate) {
                return;
            }

            const nextTasks = [...state.tasks.value];
            nextTasks.splice(index + 1, 0, duplicate);
            state.tasks.value = nextTasks;

            if (Number.isInteger(builderEditingIndex.value) && builderEditingIndex.value > index) {
                builderEditingIndex.value += 1;
            }
            if (Number.isInteger(builderReplaceIndex.value) && builderReplaceIndex.value > index) {
                builderReplaceIndex.value += 1;
            }

            syncTaskCountFromTasks();

            await nextTick();
            await typesetMathJax();
        };

        const builderRerollTask = async (index, forcedType = null) => {
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            const currentType = forcedType || state.tasks.value[index]?.type;
            if (!currentType) {
                return;
            }

            const replacement = taskGeneration.generateTaskByType(currentType, 'default', builderTaskOptions());
            if (!replacement) {
                return;
            }

            state.tasks.value.splice(index, 1, replacement);

            await nextTick();
            await typesetMathJax();
        };

        const trainingImportInput = Vue.ref(null);

        const openTrainingImportDialog = () => {
            trainingImportInput.value?.click();
        };

        const importTrainingJSON = createJsonImportHandler({
            loadTasks: taskGeneration.loadTasksFromJSON,
            getVisibleKeys: () => visibleTypeKeys.value,
            setSelectedTypes: types => {
                const selected = new Set(types);
                visibleTypeKeys.value.forEach(type => {
                    taskCounts.value[type] = selected.has(type) ? 1 : 0;
                });
                syncSelectedTypesFromCounts(visibleTypeKeys.value);
            },
            onAfterLoad: async () => {
                state.trainingHistory.value = [];
                state.currentTrainingIndex.value = 0;
                state.showTrainingSolution.value = false;
                state.isSettingsSidebarOpen.value = false;
            }
        });

        const openBuilderImportDialog = () => {
            builderImportInput.value?.click();
        };

        const importBuilderJSON = createJsonImportHandler({
            loadTasks: taskGeneration.loadTasksFromJSON,
            getVisibleKeys: () => visibleTypeKeys.value,
            setSelectedTypes: types => {
                const selected = new Set(types);
                visibleTypeKeys.value.forEach(type => {
                    taskCounts.value[type] = selected.has(type) ? 1 : 0;
                });
                syncSelectedTypesFromCounts(visibleTypeKeys.value);
            },
            onAfterLoad: async () => {
                state.currentView.value = 'worksheet-builder';
                state.isSettingsSidebarOpen.value = false;
                builderReplaceIndex.value = null;
            }
        });

        const exportBuilderJSON = () => {
            const taskLength = state.tasks.value.length;
            taskGeneration.downloadJSONFile(
                `arbeitsblatt_individuell_${Math.max(1, taskLength)}.json`,
                taskGeneration.getTaskExportData()
            );
        };

        const builderBeginInlineEdit = index => {
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            const task = state.tasks.value[index];
            builderEditingIndex.value = index;
            builderEditTaskText.value = task.textPrint || task.textDisplay || '';
            builderEditSolutionText.value = task.solution || '';
        };

        const builderCancelInlineEdit = () => {
            builderEditingIndex.value = null;
            builderEditTaskText.value = '';
            builderEditSolutionText.value = '';
        };

        const builderSaveInlineEdit = async () => {
            const index = builderEditingIndex.value;
            if (!Number.isInteger(index) || index < 0 || index >= state.tasks.value.length) {
                return;
            }

            const updatedTask = {
                ...state.tasks.value[index],
                textDisplay: builderEditTaskText.value,
                textPrint: builderEditTaskText.value,
                solution: builderEditSolutionText.value
            };

            state.tasks.value.splice(index, 1, updatedTask);
            builderCancelInlineEdit();

            await nextTick();
            await typesetMathJax();
        };

        const builderHandleDragStart = index => {
            builderDragIndex.value = index;
        };

        const builderHandleDragOver = event => {
            event.preventDefault();
        };

        const builderHandleSidebarResize = event => {
            if (!builderIsResizing.value) {
                return;
            }

            event.preventDefault();
            const clientX = event.type.startsWith('touch')
                ? event.touches[0].clientX
                : event.clientX;
            const delta = clientX - builderResizeStartX;
            const minWidth = 500;
            const maxWidth = Math.max(minWidth, Math.floor(window.innerWidth / 2));
            const nextWidth = Math.min(Math.max(builderResizeStartWidth + delta, minWidth), maxWidth);
            builderSidebarWidth.value = nextWidth;
        };

        const builderStopSidebarResize = () => {
            if (!builderIsResizing.value) {
                return;
            }

            builderIsResizing.value = false;
            window.removeEventListener('mousemove', builderHandleSidebarResize);
            window.removeEventListener('mouseup', builderStopSidebarResize);
            window.removeEventListener('touchmove', builderHandleSidebarResize);
            window.removeEventListener('touchend', builderStopSidebarResize);
        };

        const builderStartSidebarResize = event => {
            builderIsResizing.value = true;
            builderResizeStartX = event.clientX;
            builderResizeStartWidth = builderSidebarWidth.value;

            window.addEventListener('mousemove', builderHandleSidebarResize);
            window.addEventListener('mouseup', builderStopSidebarResize);
            window.addEventListener('touchmove', builderHandleSidebarResize, { passive: false });
            window.addEventListener('touchend', builderStopSidebarResize);
        };

        const builderStartSidebarResizeTouch = event => {
            if (!event.touches || !event.touches[0]) {
                return;
            }

            builderIsResizing.value = true;
            builderResizeStartX = event.touches[0].clientX;
            builderResizeStartWidth = builderSidebarWidth.value;

            window.addEventListener('mousemove', builderHandleSidebarResize);
            window.addEventListener('mouseup', builderStopSidebarResize);
            window.addEventListener('touchmove', builderHandleSidebarResize, { passive: false });
            window.addEventListener('touchend', builderStopSidebarResize);
        };

        const builderHandleDrop = async targetIndex => {
            const sourceIndex = builderDragIndex.value;
            if (!Number.isInteger(sourceIndex) || !Number.isInteger(targetIndex) || sourceIndex === targetIndex) {
                builderDragIndex.value = null;
                return;
            }

            const nextTasks = [...state.tasks.value];
            const [movedTask] = nextTasks.splice(sourceIndex, 1);
            nextTasks.splice(targetIndex, 0, movedTask);
            state.tasks.value = nextTasks;

            if (builderEditingIndex.value === sourceIndex) {
                builderEditingIndex.value = targetIndex;
            } else if (Number.isInteger(builderEditingIndex.value)) {
                if (sourceIndex < builderEditingIndex.value && targetIndex >= builderEditingIndex.value) {
                    builderEditingIndex.value -= 1;
                } else if (sourceIndex > builderEditingIndex.value && targetIndex <= builderEditingIndex.value) {
                    builderEditingIndex.value += 1;
                }
            }

            if (builderReplaceIndex.value === sourceIndex) {
                builderReplaceIndex.value = targetIndex;
            } else if (Number.isInteger(builderReplaceIndex.value)) {
                if (sourceIndex < builderReplaceIndex.value && targetIndex >= builderReplaceIndex.value) {
                    builderReplaceIndex.value -= 1;
                } else if (sourceIndex > builderReplaceIndex.value && targetIndex <= builderReplaceIndex.value) {
                    builderReplaceIndex.value += 1;
                }
            }

            builderDragIndex.value = null;

            await nextTick();
            await typesetMathJax();
        };

        const builderHandleDragEnd = () => {
            builderDragIndex.value = null;
        };

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
            : taskCounts;

        const selectAllTypes = () => {
            const selectedTypesRef = getActiveSelectedTypesRef();
            const allSelected = activeVisibleTypeKeys.value.length === selectedTypesRef.value.length &&
                               activeVisibleTypeKeys.value.every(type => selectedTypesRef.value.includes(type));
            
            if (allSelected) {
                activeVisibleTypeKeys.value.forEach(type => {
                    taskCounts.value[type] = 0;
                });
            } else {
                activeVisibleTypeKeys.value.forEach(type => {
                    if (Number(taskCounts.value[type]) <= 0) {
                        taskCounts.value[type] = 1;
                    }
                });
            }
            syncSelectedTypesFromCounts(activeVisibleTypeKeys.value);
        };

        const startTrainingFromTrainingView = async () => {
            if (state.currentView.value === 'training' && !state.hasSelectedTypes.value) {
                visibleTypeKeys.value.forEach(type => {
                    if (Number(taskCounts.value[type]) <= 0) {
                        taskCounts.value[type] = 1;
                    }
                });
                syncSelectedTypesFromCounts(visibleTypeKeys.value);
            }
            await trainingMode.startTraining();
        };

        const randomizeTypeSelection = () => {
            const classTypes = activeVisibleTypeKeys.value;
            const selectedTypesRef = getActiveSelectedTypesRef();
            const taskWeightsRef = getActiveTaskWeightsRef();
            classTypes.forEach(type => {
                taskWeightsRef.value[type] = 0;
            });

            const shuffled = fisherYatesShuffle([...classTypes]);
            const minPick = Math.min(2, shuffled.length);
            const maxPick = Math.max(minPick, Math.ceil(shuffled.length * 0.45));
            const pickCount = shuffled.length === 0 ? 0 : randInt(minPick, maxPick);
            const selected = shuffled.slice(0, pickCount);

            selected.forEach(type => {
                taskWeightsRef.value[type] = randInt(1, 4);
            });

            selectedTypesRef.value = selected;
            syncSelectedTypesFromCounts(activeVisibleTypeKeys.value);
        };

        const generateRandomWorksheet = async () => {
            randomizeTypeSelection();
            await worksheetMode.generateWorksheet();
        };

        const generateRandomPresentation = async () => {
            randomizeTypeSelection();
            await presentationMode.generateAll();
        };

        const selectAllQuizTypes = () => {
            if (!isQuizEnabled) {
                return;
            }
            state.quizSelectedTypes.value = [...quizVisibleTypeKeys.value];
        };

        const refreshCurrentView = async () => {
            if (state.currentView.value === 'worksheet') {
                await worksheetMode.generateWorksheet();
                return;
            }

            if (state.currentView.value === 'worksheet-builder') {
                await nextTick();
                await typesetMathJax();
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

        const allowedViews = new Set(viewTabs.map(tab => tab.key));

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

            if (isQuizEnabled && view === 'quiz') {
                if (state.quizSelectedTypes.value.length === 0 && state.selectedTypes.value.length > 0) {
                    state.quizSelectedTypes.value = state.selectedTypes.value
                        .filter(type => quizVisibleTypeKeys.value.includes(type));
                }
            }

            if (view !== 'worksheet-builder') {
                builderReplaceIndex.value = null;
                builderEditingIndex.value = null;
                builderDragIndex.value = null;
            }
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
            totalSelectedTaskCount,
            viewTabs,
            selectedGrade,
            gradeOptions,
            visibleTypeEntries,
            activeVisibleTypeKeys,
            activeVisibleTypeEntries,
            activeSelectedTypes,
            activeMentalMathMode,
            activeTaskWeights,
            activeSelectedTypesCount,
            selectAllTypes,
            startTrainingFromTrainingView,
            randomizeTypeSelection,
            selectAllQuizTypes,
            generateRandomWorksheet,
            refreshCurrentView,
            openViewDropdown,
            onModuleSelect,
            builderDraftTask,
            builderDraftType,
            builderDraftMarkup,
            builderReplaceIndex,
            builderReplaceTargetLabel,
            builderShowPreviewSolution,
            builderShowTaskSolutions,
            builderDisplayMode,
            builderQuizMode,
            builderDragIndex,
            builderEditingIndex,
            builderEditTaskText,
            builderEditSolutionText,
            getBuilderTaskMarkup,
            builderGenerateTaskPreview,
            builderTogglePreviewSolution,
            builderToggleTaskSolutions,
            builderToggleDisplayMode,
            builderAddDraftTask,
            builderRemoveTask,
            builderClearTasks,
            builderResortTasks,
            builderStartReplaceTask,
            builderCancelReplaceTask,
            builderApplyDraftReplacement,
            builderTaskTypeStats,
            builderTaskTypeRows,
            builderDuplicateTask,
            builderRerollTask,
            builderBeginInlineEdit,
            builderCancelInlineEdit,
            builderSaveInlineEdit,
            builderHandleDragStart,
            builderHandleDragOver,
            builderHandleDrop,
            builderHandleDragEnd,
            builderSidebarWidth,
            builderStartSidebarResize,
            builderStartSidebarResizeTouch,
            openBuilderImportDialog,
            importBuilderJSON,
            exportBuilderJSON,
            builderImportInput,
            openTrainingImportDialog,
            importTrainingJSON,
            trainingImportInput,
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
            generateRandomPresentation,
            toggleSolutions: presentationMode.toggleSolutions,
            toggleDarkMode: presentationMode.toggleDarkMode,
            exportJSON: presentationMode.exportJSON,
            openPresentationImportDialog: presentationMode.openPresentationImportDialog,
            importPresentationJSON: presentationMode.importPresentationJSON,
            presentationImportInput: presentationMode.presentationImportInput,
            exportHTML: presentationMode.exportHTML,
            generateWorksheet: worksheetMode.generateWorksheet,
            toggleWorksheetSolutions: worksheetMode.toggleWorksheetSolutions,
            toggleWorksheetLayoutMode: worksheetMode.toggleWorksheetLayoutMode,
            exportWorksheetJSON: worksheetMode.exportWorksheetJSON,
            importWorksheetJSON: worksheetMode.importWorksheetJSON,
            openWorksheetImportDialog: worksheetMode.openWorksheetImportDialog,
            worksheetImportInput: worksheetMode.worksheetImportInput,
            showQuizSolutions: quizMode.showQuizSolutions,
            quizColumns: quizMode.quizColumns,
            quizNumber: state.quizNumber,
            exportQuizJSON: quizMode.exportQuizJSON,
            importQuizJSON: quizMode.importQuizJSON,
            openQuizImportDialog: quizMode.openQuizImportDialog,
            quizImportInput: quizMode.quizImportInput,
            generateQuiz: quizMode.generateQuiz,
            toggleQuizSolutions: quizMode.toggleQuizSolutions,
            typeLabels,
            typeDescriptions
        };
    }
}).mount('#app');
