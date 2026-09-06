// ============================================================
// QUIZ-AUTO-SINGLE: Vue 3 App für den Endlosmodus (Einzelfragen)
// mit Streaks, Leaderboard und Musterlösung
// ============================================================

const { createApp, ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } = Vue;

const LOCAL_STORAGE_KEY = 'quiz_auto_single_leaderboard';

const app = createApp({
	components: {
		'math-key-input': window.MathKeyInputComponent
	},
	setup() {
		const grade = ref(7);
		const selectedTypes = ref([]);
		const quizStarted = ref(false);

		// Aktuelle Einzelfrage
		const currentTask = ref(null);
		const taskCounter = ref(0);

		// Laufende Statistiken
		const stats = reactive({
			correct: 0,
			totalChecked: 0,
			streak: 0,
			bestStreak: 0
		});

		// Leaderboard
		const leaderboard = ref([]);

		// Verfügbare Typen je nach Stufe: alle für die Klasse definierten Aufgabentypen anzeigen
		const availableTypes = computed(() => {
			const configured = taskTypesByGrade[`klasse${grade.value}`] || [];
			return [...new Set(configured)].sort((a, b) => {
				const orderA = typeOrderIndex[a] ?? Number.MAX_SAFE_INTEGER;
				const orderB = typeOrderIndex[b] ?? Number.MAX_SAFE_INTEGER;
				if (orderA !== orderB) return orderA - orderB;
				return a.localeCompare(b);
			});
		});

		const loadLeaderboard = () => {
			try {
				const data = localStorage.getItem(LOCAL_STORAGE_KEY);
				if (data) {
					leaderboard.value = JSON.parse(data);
				}
			} catch (e) {
				console.warn('Leaderboard konnte nicht geladen werden:', e);
			}
		};

		const saveLeaderboard = () => {
			try {
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leaderboard.value));
			} catch (e) {
				console.warn('Leaderboard konnte nicht gespeichert werden:', e);
			}
		};

		const updateLeaderboard = (streakScore) => {
			if (streakScore <= 0) return;

			const dateStr = new Date().toLocaleDateString('de-DE', {
				day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
			});

			const entry = {
				streak: streakScore,
				grade: `Klasse ${grade.value}`,
				date: dateStr
			};

			leaderboard.value.push(entry);
			leaderboard.value.sort((a, b) => b.streak - a.streak);
			leaderboard.value = leaderboard.value.slice(0, 5); // Nur Top 5 behalten
			saveLeaderboard();
		};

		const clearLeaderboard = () => {
			leaderboard.value = [];
			try {
				localStorage.removeItem(LOCAL_STORAGE_KEY);
			} catch (e) {}
		};

		const selectDefaultTypes = () => {
			const defaults = window.QUIZ_AUTO_DEFAULT_TYPES || [];
			const allowed = new Set(availableTypes.value);
			selectedTypes.value = defaults.filter(type => allowed.has(type));
			if (selectedTypes.value.length === 0) {
				selectedTypes.value = [...availableTypes.value];
			}
		};

		const selectAllTypes = () => {
			selectedTypes.value = [...availableTypes.value];
		};

		const clearTypes = () => {
			selectedTypes.value = [];
		};

		const onGradeChange = () => {
			const allowed = new Set(availableTypes.value);
			selectedTypes.value = selectedTypes.value.filter(type => allowed.has(type));
			if (selectedTypes.value.length === 0) {
				selectDefaultTypes();
			}
		};

		const typesetMathJax = async () => {
			if (window.MathJax?.typesetPromise) {
				try {
					await window.MathJax.typesetPromise();
				} catch (error) {
					console.warn('MathJax rendering failed:', error);
				}
			}
		};

		const generateSingleTask = () => {
			if (selectedTypes.value.length === 0) return null;

			const type = selectedTypes.value[randInt(0, selectedTypes.value.length - 1)];
			const generated = createTask(type, false, grade.value, { training: true });

			return reactive({
				type,
				textDisplay: generated.textDisplay,
				solution: generated.solution,
				answer: generated.answer,
				userInput: '',
				checked: false,
				correct: false
			});
		};

		const startQuiz = async () => {
			if (selectedTypes.value.length === 0) return;

			quizStarted.value = true;
			taskCounter.value = 1;
			currentTask.value = generateSingleTask();

			await nextTick();
			await typesetMathJax();
		};

		const checkCurrentTask = async () => {
			if (!currentTask.value || currentTask.value.checked) return;

			const task = currentTask.value;
			task.checked = true;
			task.correct = quizAutoGrading.isCorrect(task.answer, task.userInput);

			stats.totalChecked++;

			if (task.correct) {
				stats.correct++;
				stats.streak++;
				if (stats.streak > stats.bestStreak) {
					stats.bestStreak = stats.streak;
					updateLeaderboard(stats.bestStreak);
				}
			} else {
				stats.streak = 0;
			}

			await nextTick();
			await typesetMathJax();
		};

		const nextTask = async () => {
			if (!currentTask.value) return;
			taskCounter.value++;
			currentTask.value = generateSingleTask();

			await nextTick();
			await typesetMathJax();
		};

		const handleGlobalKeydown = async (event) => {
			if (event.key !== 'Enter') return;
			if (!currentTask.value || !currentTask.value.checked) return;
			if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
				return;
			}
			event.preventDefault();
			await nextTask();
		};

		onMounted(() => {
			window.addEventListener('keydown', handleGlobalKeydown);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('keydown', handleGlobalKeydown);
		});

		const resetCurrentStats = () => {
			stats.correct = 0;
			stats.totalChecked = 0;
			stats.streak = 0;
		};

		const exitQuiz = () => {
			quizStarted.value = false;
			currentTask.value = null;
		};

		const successRate = computed(() => {
			if (stats.totalChecked === 0) return 0;
			return Math.round((stats.correct / stats.totalChecked) * 100);
		});

		// Initalisieren
		selectDefaultTypes();
		loadLeaderboard();

		return {
			grade,
			selectedTypes,
			quizStarted,
			currentTask,
			taskCounter,
			stats,
			leaderboard,
			availableTypes,
			typeLabels: window.typeLabels,
			successRate,
			selectDefaultTypes,
			selectAllTypes,
			clearTypes,
			onGradeChange,
			startQuiz,
			checkCurrentTask,
			nextTask,
			resetCurrentStats,
			exitQuiz,
			clearLeaderboard
		};
	}
});

app.component('math-key-input', window.MathKeyInputComponent);
app.mount('#app');
