window.MTGTaskGenerationModule = {
    createTaskGenerationModule({ state, createTask, selectedGrade }) {
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

        const buildTasks = () => {
            if (state.selectedTypes.value.length === 0) return false;

            const normalizedWeights = Object.fromEntries(state.selectedTypes.value.map(type => {
                const rawWeight = Number(state.taskWeights.value[type]);
                const weight = state.weights.value
                    ? (Number.isFinite(rawWeight)
                        ? Math.max(0, Math.floor(rawWeight))
                        : 1)
                    : 1;

                state.taskWeights.value[type] = weight;
                return [type, weight];
            }));

            const singleOccurrenceTypes = new Set(
                state.selectedTypes.value.filter(type => normalizedWeights[type] === 0)
            );

            const weightedTypes = state.selectedTypes.value.flatMap(type => Array(normalizedWeights[type]).fill(type));
            if (weightedTypes.length === 0 && singleOccurrenceTypes.size === 0) return false;

            const types = [...weightedTypes];
            const targetTotal = state.taskCount.value;
            let typePool = [];
            const arrangementMode = state.taskArrangementMode.value;

            const getTypeCounts = () => {
                const counts = Object.fromEntries(state.selectedTypes.value.map(type => [type, 0]));
                const singleTypes = state.selectedTypes.value.filter(type => singleOccurrenceTypes.has(type));
                const repeatTypes = state.selectedTypes.value.filter(type => !singleOccurrenceTypes.has(type));
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
                const selectedSet = new Set(state.selectedTypes.value);
                const orderedTypes = [
                    ...labelOrder.filter(type => selectedSet.has(type)),
                    ...state.selectedTypes.value.filter(type => !labelOrder.includes(type))
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
                const singleTypes = [...new Set(state.selectedTypes.value.filter(type => singleOccurrenceTypes.has(type)))];
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
                const generated = createTask(type, state.mentalMathMode.value, getNumericGrade());
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

        const generateSingleTrainingTask = () => {
            if (state.selectedTypes.value.length === 0) return null;

            const weightedTypes = state.selectedTypes.value.flatMap(type => {
                const rawWeight = Number(state.taskWeights.value[type]);
                const weight = state.weights.value
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
            const generated = createTask(selectedType, state.mentalMathMode.value, getNumericGrade(), { training: true });

            return {
                type: selectedType,
                textDisplay: generated.textDisplay ?? '',
                textPrint: generated.textPrint ?? '',
                solution: generated.solution
            };
        };

        return {
            getTaskExportData,
            downloadJSONFile,
            buildTasks,
            generateSingleTrainingTask
        };
    }
};
