window.MTGTaskGenerationModule = {
    createTaskGenerationModule({ state, createTask, selectedGrade }) {
        const getScopeConfig = (scope = 'default') => {
            if (scope === 'quiz') {
                return {
                    selectedTypes: state.quizSelectedTypes.value,
                    taskWeights: state.quizTaskWeights.value,
                    taskCounts: null,
                    mentalMathMode: state.quizMentalMathMode.value,
                    weightsEnabled: false,
                    countsEnabled: false
                };
            }

            return {
                selectedTypes: state.selectedTypes.value,
                taskWeights: state.taskWeights.value,
                taskCounts: state.taskCounts?.value ?? null,
                mentalMathMode: state.mentalMathMode.value,
                weightsEnabled: state.weights.value,
                countsEnabled: Boolean(state.taskCounts)
            };
        };

        const getNumericGrade = () => Number.isFinite(selectedGrade?.value)
            ? selectedGrade.value
            : 5;

        const getTaskExportData = () => state.tasks.value.map(task => ({
            aufgabentyp: task.type,
            aufgabe: task.textDisplay ?? '',
            textDisplay: task.textDisplay ?? '',
            textPrint: task.textPrint ?? '',
            loesung: task.solution
        }));

        const parseTaskImportData = (data) => {
            const rawArray = Array.isArray(data)
                ? data
                : Array.isArray(data.tasks)
                    ? data.tasks
                    : [];

            const sanitize = (value) => {
                if (typeof sanitizeImportedHtml === 'function') {
                    return sanitizeImportedHtml(value ?? '');
                }
                return String(value ?? '');
            };

            const knownTypes = (typeof typeLabels === 'object' && typeLabels) ? new Set(Object.keys(typeLabels)) : null;

            return rawArray
                .filter(item => {
                    if (typeof item !== 'object' || item === null) return false;
                    const rawText = item.textDisplay ?? item.aufgabe ?? item.task ?? '';
                    if (!rawText && !(item.loesung ?? item.solution ?? '')) return false;
                    const type = item.aufgabentyp || item.type || '';
                    if (knownTypes && type && !knownTypes.has(type)) {
                        console.warn(`MTG Import: Unbekannter Aufgabentyp "${type}" – Aufgabe wird trotzdem geladen.`);
                    }
                    return true;
                })
                .map(item => ({
                    type: item.aufgabentyp || item.type || '',
                    textDisplay: sanitize(item.textDisplay ?? item.aufgabe ?? item.task ?? ''),
                    textPrint: sanitize(item.textPrint ?? item.aufgabe ?? item.task ?? ''),
                    solution: sanitize(item.loesung ?? item.solution ?? '')
                }));
        };

        const loadTasksFromJSON = (data) => {
            const tasks = parseTaskImportData(data);
            if (!Array.isArray(tasks) || tasks.length === 0) {
                return false;
            }

            state.tasks.value = tasks;
            state.showSolutions.value = false;
            state.showWorksheetSolutions.value = false;
            state.taskCount.value = tasks.length;
            return true;
        };

        const FILE_HANDLE_DB = 'mtg-file-handles';
        const FILE_HANDLE_STORE = 'handles';
        const JSON_EXPORT_HANDLE_KEY = 'json-export-handle';

        const openHandleDB = () => new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                resolve(null);
                return;
            }

            const request = indexedDB.open(FILE_HANDLE_DB, 1);
            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(FILE_HANDLE_STORE)) {
                    db.createObjectStore(FILE_HANDLE_STORE);
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        });

        const getSavedFileHandle = async () => {
            const db = await openHandleDB();
            if (!db) return null;

            return new Promise(resolve => {
                const tx = db.transaction(FILE_HANDLE_STORE, 'readonly');
                const store = tx.objectStore(FILE_HANDLE_STORE);
                const getReq = store.get(JSON_EXPORT_HANDLE_KEY);
                getReq.onsuccess = () => {
                    resolve(getReq.result ?? null);
                    db.close();
                };
                getReq.onerror = () => {
                    resolve(null);
                    db.close();
                };
            });
        };

        const saveFileHandle = async handle => {
            const db = await openHandleDB();
            if (!db) return;

            return new Promise(resolve => {
                const tx = db.transaction(FILE_HANDLE_STORE, 'readwrite');
                const store = tx.objectStore(FILE_HANDLE_STORE);
                const putReq = store.put(handle, JSON_EXPORT_HANDLE_KEY);
                putReq.onsuccess = () => {
                    resolve();
                    db.close();
                };
                putReq.onerror = () => {
                    resolve();
                    db.close();
                };
            });
        };

        const verifyPermission = async (handle, mode = 'readwrite') => {
            if (!handle || typeof handle.queryPermission !== 'function') {
                return false;
            }

            const permission = await handle.queryPermission({ mode });
            if (permission === 'granted') return true;
            const request = await handle.requestPermission({ mode });
            return request === 'granted';
        };

        const downloadJSONFile = async (filename, data) => {
            const dataStr = JSON.stringify(data, null, 2);

            if (window.showSaveFilePicker) {
                let handle = await getSavedFileHandle();
                let options = {
                    suggestedName: filename,
                    types: [{
                        description: 'JSON Datei',
                        accept: { 'application/json': ['.json'] }
                    }]
                };

                if (handle) {
                    options.startIn = handle;
                }

                try {
                    handle = await window.showSaveFilePicker(options);
                } catch (error) {
                    if (error && error.name === 'AbortError') {
                        return;
                    }

                    if (options.startIn) {
                        delete options.startIn;
                        try {
                            handle = await window.showSaveFilePicker(options);
                        } catch (retryError) {
                            if (retryError && retryError.name === 'AbortError') {
                                return;
                            }

                            if (handle && handle.name) {
                                try {
                                    if (await verifyPermission(handle)) {
                                        const writable = await handle.createWritable();
                                        await writable.write(dataStr);
                                        await writable.close();
                                        await saveFileHandle(handle);
                                        return;
                                    }
                                } catch (innerError) {
                                    // ignore and fallback
                                }
                            }

                            const blob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const anchor = document.createElement('a');
                            anchor.href = url;
                            anchor.download = filename;
                            anchor.click();
                            URL.revokeObjectURL(url);
                            return;
                        }
                    } else {
                        if (handle && handle.name) {
                            try {
                                if (await verifyPermission(handle)) {
                                    const writable = await handle.createWritable();
                                    await writable.write(dataStr);
                                    await writable.close();
                                    await saveFileHandle(handle);
                                    return;
                                }
                            } catch (innerError) {
                                // ignore and fallback
                            }
                        }

                        const blob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const anchor = document.createElement('a');
                        anchor.href = url;
                        anchor.download = filename;
                        anchor.click();
                        URL.revokeObjectURL(url);
                        return;
                    }
                }

                try {
                    const writable = await handle.createWritable();
                    await writable.write(dataStr);
                    await writable.close();
                    await saveFileHandle(handle);
                    return;
                } catch (error) {
                    const blob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.download = filename;
                    anchor.click();
                    URL.revokeObjectURL(url);
                }
                return;
            }

            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = filename;
            anchor.click();
            URL.revokeObjectURL(url);
        };

        const buildTasks = (scope = 'default', taskOptions = {}) => {
            const config = getScopeConfig(scope);

            if (config.selectedTypes.length === 0) return false;

            if (config.countsEnabled && config.taskCounts) {
                const counts = Object.fromEntries(config.selectedTypes.map(type => {
                    const rawCount = Number(config.taskCounts[type]);
                    const count = Number.isFinite(rawCount)
                        ? Math.max(0, Math.floor(rawCount))
                        : 0;
                    config.taskCounts[type] = count;
                    return [type, count];
                }));

                const targetTotal = config.selectedTypes.reduce((sum, type) => sum + (counts[type] || 0), 0);
                if (targetTotal <= 0) {
                    return false;
                }

                let typePool = config.selectedTypes.flatMap(type => Array(counts[type]).fill(type));
                const arrangementMode = state.taskArrangementMode.value;

                if (arrangementMode === 'random' || arrangementMode === 'random-ordered') {
                    for (let index = typePool.length - 1; index > 0; index--) {
                        const swapIndex = Math.floor(Math.random() * (index + 1));
                        [typePool[index], typePool[swapIndex]] = [typePool[swapIndex], typePool[index]];
                    }
                }

                state.tasks.value = typePool.map(type => {
                    const generated = createTask(type, config.mentalMathMode, getNumericGrade(), taskOptions);
                    return {
                        type,
                        textDisplay: generated.textDisplay ?? '',
                        textPrint: generated.textPrint ?? '',
                        solution: generated.solution
                    };
                });

                state.taskCount.value = state.tasks.value.length;
                state.showSolutions.value = false;
                state.showWorksheetSolutions.value = false;
                return true;
            }

            const normalizedWeights = Object.fromEntries(config.selectedTypes.map(type => {
                const rawWeight = Number(config.taskWeights[type]);
                const weight = config.weightsEnabled
                    ? (Number.isFinite(rawWeight)
                        ? Math.max(0, Math.floor(rawWeight))
                        : 1)
                    : 1;

                config.taskWeights[type] = weight;
                return [type, weight];
            }));

            const singleOccurrenceTypes = new Set(
                config.selectedTypes.filter(type => normalizedWeights[type] === 0)
            );

            const weightedTypes = config.selectedTypes.flatMap(type => Array(normalizedWeights[type]).fill(type));
            if (weightedTypes.length === 0 && singleOccurrenceTypes.size === 0) return false;

            const types = [...weightedTypes];
            const targetTotal = state.taskCount.value;
            let typePool = [];
            const arrangementMode = state.taskArrangementMode.value;

            const getTypeCounts = () => {
                const counts = Object.fromEntries(config.selectedTypes.map(type => [type, 0]));
                const singleTypes = config.selectedTypes.filter(type => singleOccurrenceTypes.has(type));
                const repeatTypes = config.selectedTypes.filter(type => !singleOccurrenceTypes.has(type));
                const repeatWeightedTypes = repeatTypes.flatMap(type => Array(normalizedWeights[type]).fill(type));

                let usedSlots = 0;
                for (const type of singleTypes) {
                    if (usedSlots < targetTotal) {
                        counts[type] = 1;
                        usedSlots += 1;
                    }
                }

                const remainingTarget = Math.max(0, targetTotal - usedSlots);
                if (repeatWeightedTypes.length > 0 && remainingTarget > 0) {
                    const fullSets = Math.floor(remainingTarget / repeatWeightedTypes.length);

                    repeatTypes.forEach(type => {
                        counts[type] += fullSets * normalizedWeights[type];
                    });

                    const remainingCount = remainingTarget - (fullSets * repeatWeightedTypes.length);
                    if (remainingCount > 0) {
                        const finalShuffle = fisherYatesShuffle(repeatWeightedTypes);
                        for (let index = 0; index < remainingCount; index++) {
                            counts[finalShuffle[index]] += 1;
                        }
                    }
                } else if (remainingTarget > 0 && singleTypes.length > 0) {
                    const repeatPool = [...singleTypes];
                    const finalShuffle = [];
                    while (finalShuffle.length < remainingTarget) {
                        finalShuffle.push(...fisherYatesShuffle(repeatPool));
                    }
                    for (let index = 0; index < remainingTarget; index++) {
                        counts[finalShuffle[index]] += 1;
                    }
                }

                return counts;
            };

            if (arrangementMode === 'ordered' || arrangementMode === 'random-ordered') {
                const typeCounts = getTypeCounts();
                const typeLabelMap = (typeof window !== 'undefined' && window.typeLabels && typeof window.typeLabels === 'object')
                    ? window.typeLabels
                    : {};
                const labelOrder = Object.keys(typeLabelMap);
                const selectedSet = new Set(config.selectedTypes);
                const orderedTypes = [
                    ...labelOrder.filter(type => selectedSet.has(type)),
                    ...config.selectedTypes.filter(type => !labelOrder.includes(type))
                ].filter(type => typeCounts[type] > 0);

                const blocks = orderedTypes.map(type => Array(typeCounts[type]).fill(type));
                if (arrangementMode === 'random-ordered') {
                    for (let index = blocks.length - 1; index > 0; index--) {
                        const swapIndex = Math.floor(Math.random() * (index + 1));
                        [blocks[index], blocks[swapIndex]] = [blocks[swapIndex], blocks[index]];
                    }
                }

                typePool = blocks.flat();
            } else {
                const singleTypes = [...new Set(config.selectedTypes.filter(type => singleOccurrenceTypes.has(type)))];
                const normalWeightedTypes = weightedTypes.filter(type => !singleOccurrenceTypes.has(type));

                const singleTypesToUse = singleTypes.slice(0, targetTotal);
                typePool = [...singleTypesToUse];

                const fillTypes = normalWeightedTypes.length > 0 ? normalWeightedTypes : singleTypesToUse;
                while (typePool.length + fillTypes.length <= targetTotal) {
                    const shuffledSet = fisherYatesShuffle(fillTypes);
                    typePool = [...typePool, ...shuffledSet];
                }

                if (typePool.length < targetTotal) {
                    const remainingCount = targetTotal - typePool.length;
                    const finalShuffle = fisherYatesShuffle(fillTypes);
                    for (let index = 0; index < remainingCount; index++) {
                        typePool.push(finalShuffle[index]);
                    }
                }

                for (let index = typePool.length - 1; index > 0; index--) {
                    const swapIndex = Math.floor(Math.random() * (index + 1));
                    [typePool[index], typePool[swapIndex]] = [typePool[swapIndex], typePool[index]];
                }
            }

            state.tasks.value = typePool.map(type => {
                const generated = createTask(type, config.mentalMathMode, getNumericGrade(), taskOptions);
                return {
                    type,
                    textDisplay: generated.textDisplay ?? '',
                    textPrint: generated.textPrint ?? '',
                    solution: generated.solution
                };
            });

            state.showSolutions.value = false;
            state.showWorksheetSolutions.value = false;
            return true;
        };

        const generateSingleTask = (scope = 'default', options = {}) => {
            const config = getScopeConfig(scope);

            if (config.selectedTypes.length === 0) return null;

            const weightedTypes = config.selectedTypes.flatMap(type => {
                const rawWeight = Number(config.taskWeights[type]);
                const weight = config.weightsEnabled
                    ? (Number.isFinite(rawWeight)
                        ? Math.max(0, Math.floor(rawWeight))
                        : 1)
                    : 1;
                // Für Training: Gewicht 0 soll den Typ nicht ausschließen.
                return Array(Math.max(1, weight)).fill(type);
            });

            if (weightedTypes.length === 0) return null;

            const randomIndex = Math.floor(Math.random() * weightedTypes.length);
            const selectedType = weightedTypes[randomIndex];
            const generated = createTask(selectedType, config.mentalMathMode, getNumericGrade(), options);

            return {
                type: selectedType,
                textDisplay: generated.textDisplay ?? '',
                textPrint: generated.textPrint ?? '',
                solution: generated.solution
            };
        };

        const generateTaskByType = (type, scope = 'default', options = {}) => {
            if (typeof type !== 'string' || type.trim() === '') {
                return null;
            }

            const normalizedType = type.trim();
            const config = getScopeConfig(scope);
            const generated = createTask(normalizedType, config.mentalMathMode, getNumericGrade(), options);

            return {
                type: normalizedType,
                textDisplay: generated.textDisplay ?? '',
                textPrint: generated.textPrint ?? '',
                solution: generated.solution
            };
        };

        const generateSingleTrainingTask = () => generateSingleTask('default', { training: true });
        const generateSingleQuizTask = () => generateSingleTask('quiz', { training: true, quiz: true });

        return {
            getTaskExportData,
            downloadJSONFile,
            loadTasksFromJSON,
            buildTasks,
            generateTaskByType,
            generateSingleTrainingTask,
            generateSingleQuizTask
        };
    }
};
