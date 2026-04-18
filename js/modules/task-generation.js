window.MTGTaskGenerationModule = {
    createTaskGenerationModule({ state, createTask, selectedGrade }) {
        const getScopeConfig = (scope = 'default') => {
            if (scope === 'quiz') {
                return {
                    selectedTypes: state.quizSelectedTypes.value,
                    taskWeights: state.quizTaskWeights.value,
                    mentalMathMode: state.quizMentalMathMode.value,
                    weightsEnabled: false
                };
            }

            return {
                selectedTypes: state.selectedTypes.value,
                taskWeights: state.taskWeights.value,
                mentalMathMode: state.mentalMathMode.value,
                weightsEnabled: state.weights.value
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

            return rawArray.map(item => ({
                type: item.aufgabentyp || item.type || '',
                textDisplay: item.textDisplay ?? item.aufgabe ?? item.task ?? '',
                textPrint: item.textPrint ?? item.aufgabe ?? item.task ?? '',
                solution: item.loesung ?? item.solution ?? ''
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

        const downloadJSONFile = (filename, data) => {
            const dataStr = JSON.stringify(data, null, 2);
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
                        const finalShuffle = [...repeatWeightedTypes].sort(() => Math.random() - 0.5);
                        for (let index = 0; index < remainingCount; index++) {
                            counts[finalShuffle[index]] += 1;
                        }
                    }
                } else if (remainingTarget > 0 && singleTypes.length > 0) {
                    const repeatPool = [...singleTypes];
                    const finalShuffle = [];
                    while (finalShuffle.length < remainingTarget) {
                        finalShuffle.push(...repeatPool.sort(() => Math.random() - 0.5));
                    }
                    for (let index = 0; index < remainingTarget; index++) {
                        counts[finalShuffle[index]] += 1;
                    }
                }

                return counts;
            };

            if (arrangementMode === 'ordered' || arrangementMode === 'random-ordered') {
                const typeCounts = getTypeCounts();
                const labelOrder = Object.keys(typeLabels);
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
                    const shuffledSet = [...fillTypes].sort(() => Math.random() - 0.5);
                    typePool = [...typePool, ...shuffledSet];
                }

                if (typePool.length < targetTotal) {
                    const remainingCount = targetTotal - typePool.length;
                    const finalShuffle = [...fillTypes].sort(() => Math.random() - 0.5);
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
