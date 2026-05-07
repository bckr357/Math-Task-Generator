window.MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)']],
        packages: {'[-]': ['textmacros']}
    },
    chtml: {
        mtextInheritFont: true,
        matchFontHeight: false,
        scale: 1
    },
    output: {
        font: 'mathjax-termes'
    }
};

const { createApp, ref, reactive, nextTick, onMounted, onUnmounted } = Vue;

const app = createApp({
    setup() {
        const quizActive = ref(false);
        const importedTasks = ref([]);
        const taskPool = ref([]);
        const history = ref([]);
        const historyPointer = ref(-1);

        const currentTitle = ref('');
        const currentTask = ref(null);
        const currentTaskIndex = ref(null);
        const nextTaskPreview = ref(null);
        const showSolution = ref(false);
        const isShuffling = ref(false);

        const sizes = reactive({ A: 7, B: 7, C: 7 });
        const scores = reactive({ A: 0, B: 0, C: 0 });
        const currentCandidates = reactive({ A: '?', B: '?', C: '?' });
        const candidatePools = reactive({ A: [], B: [], C: [] });

        const handleKeyDown = (e) => {
            if (!quizActive.value) return;
            if (e.key === ' ') { e.preventDefault(); if (!isShuffling.value) startShuffleAnimation(); }
            else if (e.key === 'ArrowRight') { nextTask(); }
            else if (e.key === 'ArrowLeft') { prevTask(); }
            else if (e.key.toLowerCase() === 'l') { toggleSolution(); }
            else if (e.key === '3') { changeScore('A', 1); }
            else if (e.key === '2') { changeScore('B', 1); }
            else if (e.key === '1') { changeScore('C', 1); }
        };

        onMounted(() => window.addEventListener('keydown', handleKeyDown));
        onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));

        const handleFileUpload = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const parseResult = safeJSONParse(ev.target.result);
                if (!parseResult.ok) {
                    window.alert('Fehler beim Laden der JSON-Datei. Bitte prüfe das Format.');
                    return;
                }

                const data = parseResult.data;
                const rawArray = data.tasks || data;
                if (!Array.isArray(rawArray) || rawArray.length === 0) {
                    window.alert('Die JSON-Datei enthält keine gültigen Aufgaben.');
                    return;
                }

                const sanitize = (value) => {
                    if (typeof sanitizeImportedHtml === 'function') {
                        return sanitizeImportedHtml(value ?? '');
                    }
                    return String(value ?? '');
                };

                // Beim Einlesen eine feste ID generieren und Properties matchen.
                importedTasks.value = rawArray.map((item, index) => ({
                    id: index + 1,
                    aufgabe: sanitize(item.textDisplay || item.aufgabe || item.task || ''),
                    textDisplay: sanitize(item.textDisplay || item.aufgabe || item.task || ''),
                    textPrint: sanitize(item.textPrint || item.aufgabe || ''),
                    loesung: sanitize(item.loesung || item.solution || '')
                }));

                currentTitle.value = data.title || 'Battle';
                resetTaskPool();
            };
            reader.readAsText(file);
        };

        const resetTaskPool = () => {
            const total = importedTasks.value.length;
            if (total === 0) {
                taskPool.value = [];
                nextTaskPreview.value = null;
                return;
            }

            const firstIdx = Math.floor(Math.random() * total);
            taskPool.value = Array.from({ length: total }, (_, i) =>
                (firstIdx + i) % total
            );
            history.value = [];
            historyPointer.value = -1;
            currentTaskIndex.value = null;
            currentTask.value = null;

            updatePreview();
        };

        const updatePreview = () => {
            nextTaskPreview.value = taskPool.value.length > 0 ? taskPool.value[0] : null;
        };

        const fillCandidatePool = (g) => {
            candidatePools[g] = Array.from({ length: sizes[g] }, (_, i) => i + 1);
        };

        const changeScore = (group, val) => {
            scores[group] += val;
            if (val > 0) createConfetti(group);
        };

        const createConfetti = (group) => {
            const card = document.getElementById('card-' + group);
            for (let i = 0; i < 70; i++) {
                const c = document.createElement('div');
                c.className = 'confetti';
                c.style.width = Math.random() * 9 + 6 + 'px';
                c.style.height = c.style.width;
                c.style.left = Math.random() * 100 + '%';
                const hue = Math.floor(Math.random() * 360);
                c.style.backgroundColor = `hsl(${hue}, 85%, 60%)`;
                c.style.animationDuration = (Math.random() * 1.2 + 0.8) + 's';
                card.appendChild(c);
                setTimeout(() => c.remove(), 2000);
            }
        };

        const startShuffleAnimation = () => {
            isShuffling.value = true;
            let iters = 0;
            const maxIters = 40;
            const timer = setInterval(() => {
                currentCandidates.A = Math.floor(Math.random() * sizes.A) + 1;
                currentCandidates.B = Math.floor(Math.random() * sizes.B) + 1;
                currentCandidates.C = Math.floor(Math.random() * sizes.C) + 1;
                iters++;
                if (iters >= maxIters) {
                    clearInterval(timer);
                    finalizeCandidates();
                }
            }, 80);
        };

        const finalizeCandidates = () => {
            ['A', 'B', 'C'].forEach(g => {
                // Wenn nur noch 1 oder 0 Zahlen uebrig sind, Pool neu fuellen.
                if (candidatePools[g].length < 2) fillCandidatePool(g);

                const idx = Math.floor(Math.random() * candidatePools[g].length);
                currentCandidates[g] = candidatePools[g].splice(idx, 1)[0];
            });
            isShuffling.value = false;
        };

        const startQuiz = async () => {
            ['A', 'B', 'C'].forEach(g => { fillCandidatePool(g); scores[g] = 0; });
            showSolution.value = false;
            currentTask.value = null;
            history.value = [];
            historyPointer.value = -1;
            resetTaskPool();
            quizActive.value = true;
            await nextTick();
            if (window.MathJax) await MathJax.typesetPromise();
        };

        const nextTask = async () => {
            showSolution.value = false;
            if (historyPointer.value < history.value.length - 1) {
                historyPointer.value++;
                currentTaskIndex.value = history.value[historyPointer.value];
            } else {
                const total = importedTasks.value.length;
                if (taskPool.value.length === 0) {
                    if (total === 0) return;

                    let nextIdx = Math.floor(Math.random() * total);
                    while (total > 1 && nextIdx === currentTaskIndex.value) {
                        nextIdx = Math.floor(Math.random() * total);
                    }

                    currentTaskIndex.value = nextIdx;
                    history.value.push(nextIdx);
                    historyPointer.value = history.value.length - 1;
                    taskPool.value = Array.from({ length: Math.max(0, total - 1) }, (_, i) =>
                        (nextIdx + 1 + i) % total
                    );
                } else {
                    const nextIdx = taskPool.value.shift();
                    history.value.push(nextIdx);
                    historyPointer.value = history.value.length - 1;
                    currentTaskIndex.value = nextIdx;
                }
            }
            currentTask.value = importedTasks.value[currentTaskIndex.value];
            updatePreview();
            await nextTick();
            if (window.MathJax) MathJax.typesetPromise();
        };

        const prevTask = async () => {
            if (historyPointer.value > 0) {
                showSolution.value = false;
                historyPointer.value--;
                currentTaskIndex.value = history.value[historyPointer.value];
                currentTask.value = importedTasks.value[currentTaskIndex.value];
                updatePreview();
                await nextTick();
                if (window.MathJax) MathJax.typesetPromise();
            }
        };

        const toggleSolution = async () => {
            if (!currentTask.value) return;
            showSolution.value = !showSolution.value;
            await nextTick();
            if (window.MathJax) MathJax.typesetPromise();
        };

        return {
            quizActive, importedTasks, currentTitle, sizes, scores, currentCandidates,
            currentTask, currentTaskIndex, showSolution, isShuffling, nextTaskPreview, history, historyPointer,
            handleFileUpload, startQuiz, nextTask, prevTask, toggleSolution, startShuffleAnimation, changeScore
        };
    }
});

window.addEventListener('DOMContentLoaded', () => {
    app.mount('#app');
});
