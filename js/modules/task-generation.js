window.MTGTaskGenerationModule = {
    createTaskGenerationModule({ state, createTask }) {
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
                const weight = Number.isFinite(rawWeight)
                    ? Math.max(1, Math.floor(rawWeight))
                    : 1;

                state.taskWeights.value[type] = weight;
                return [type, weight];
            }));

            const weightedTypes = state.selectedTypes.value.flatMap(type => Array(normalizedWeights[type]).fill(type));
            if (weightedTypes.length === 0) return false;

            const types = [...weightedTypes];
            const targetTotal = state.taskCount.value;
            let typePool = [];
            const arrangementMode = state.taskArrangementMode.value;

            const getTypeCounts = () => {
                const counts = Object.fromEntries(state.selectedTypes.value.map(type => [type, 0]));
                const fullSets = Math.floor(targetTotal / types.length);

                state.selectedTypes.value.forEach(type => {
                    counts[type] += fullSets * normalizedWeights[type];
                });

                const remainingCount = targetTotal - (fullSets * types.length);
                if (remainingCount > 0) {
                    const finalShuffle = [...types].sort(() => Math.random() - 0.5);
                    for (let index = 0; index < remainingCount; index++) {
                        counts[finalShuffle[index]] += 1;
                    }
                }

                return counts;
            };

            if (arrangementMode === 'block-random' || arrangementMode === 'block-ordered') {
                const typeCounts = getTypeCounts();
                const labelOrder = Object.keys(typeLabels);
                const selectedSet = new Set(state.selectedTypes.value);
                const orderedTypes = [
                    ...labelOrder.filter(type => selectedSet.has(type)),
                    ...state.selectedTypes.value.filter(type => !labelOrder.includes(type))
                ].filter(type => typeCounts[type] > 0);

                const blocks = orderedTypes.map(type => Array(typeCounts[type]).fill(type));

                if (arrangementMode === 'block-random') {
                    for (let index = blocks.length - 1; index > 0; index--) {
                        const swapIndex = Math.floor(Math.random() * (index + 1));
                        [blocks[index], blocks[swapIndex]] = [blocks[swapIndex], blocks[index]];
                    }
                }

                typePool = blocks.flat();
            } else {
                while (typePool.length + types.length <= targetTotal) {
                    const shuffledSet = [...types].sort(() => Math.random() - 0.5);
                    typePool = [...typePool, ...shuffledSet];
                }

                if (typePool.length < targetTotal) {
                    const remainingCount = targetTotal - typePool.length;
                    const finalShuffle = [...types].sort(() => Math.random() - 0.5);
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
                const generated = createTask(type, state.mentalMathMode.value);
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
                const weight = Number.isFinite(rawWeight)
                    ? Math.max(1, Math.floor(rawWeight))
                    : 1;
                return Array(weight).fill(type);
            });

            if (weightedTypes.length === 0) return null;

            const randomIndex = Math.floor(Math.random() * weightedTypes.length);
            const selectedType = weightedTypes[randomIndex];
            const generated = createTask(selectedType, true);

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
