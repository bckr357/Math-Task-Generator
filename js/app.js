const { createApp, ref, computed, nextTick, onMounted, onBeforeUnmount } = Vue;

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

// ============================================================
// MATHJAX-MANAGEMENT
// ============================================================

let mathJaxReady = false;
const typesetMathJax = async () => {
    if (window.MathJax?.typesetPromise) {
        try {
            await window.MathJax.typesetPromise();
            mathJaxReady = true;
        } catch (e) {
            console.warn('MathJax rendering failed:', e);
        }
    }
};

createApp({
    setup() {
        const tasks = ref([]);
        const trainingHistory = ref([]);
        const showSolutions = ref(false);
        const viewMode = ref(false);
		const worksheetMode = ref(false);
		const trainingMode = ref(false);
		const showWorksheetSolutions = ref(false);
		const showTrainingSolution = ref(false);
		const currentTrainingIndex = ref(0);
		const isDarkMode = ref(false);
        const selectedTypes = ref([]);
        const taskWeights = ref(
			Object.fromEntries(Object.keys(typeLabels).map(type => [type, 1]))
		);
        
        // NEUE STATE VARIABLEN
        const taskCount = ref(10);
		const gtNumber = ref(1);
        const mentalMathMode = ref(false);

        // NEU: Berechnet dynamisch die Mitte für die zwei Spalten
        const halfCount = computed(() => Math.ceil(tasks.value.length / 2));
		const currentTrainingTask = computed(() => trainingHistory.value[currentTrainingIndex.value] ?? null);
        
        const toggleSolutions = async () => {
            showSolutions.value = !showSolutions.value;
            await nextTick();
            await typesetMathJax();
        };        

		const toggleDarkMode = () => {
			isDarkMode.value = !isDarkMode.value;
		};
        
		const invertSelection = () => {
			const allTypes = Object.keys(typeLabels);
			const newSelection = allTypes.filter(type => !selectedTypes.value.includes(type));
			selectedTypes.value = newSelection;
		};

		const getTaskExportData = () => tasks.value.map(t => ({
			aufgabentyp: t.type,
			aufgabe: t.textDisplay ?? '',
			textDisplay: t.textDisplay ?? '',
			textPrint: t.textPrint ?? '',
			loesung: t.solution
		}));

		const downloadJSONFile = (filename, data) => {
			const dataStr = JSON.stringify(data, null, 2);
			const blob = new Blob([dataStr], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			a.click();
			URL.revokeObjectURL(url);
		};

		const buildTasks = () => {
			if (selectedTypes.value.length === 0) return false;
			
			const weightedTypes = selectedTypes.value.flatMap(type => {
				const rawWeight = Number(taskWeights.value[type]);
				const weight = Number.isFinite(rawWeight)
					? Math.max(1, Math.floor(rawWeight))
					: 1;

				taskWeights.value[type] = weight;
				return Array(weight).fill(type);
			});

			if (weightedTypes.length === 0) return false;

			const types = [...weightedTypes];
			const targetTotal = taskCount.value;
			let typePool = [];

			// 1. So viele vollständige "Sets" wie möglich hinzufügen
			// Beispiel: 100 Aufgaben / 20 Typen = 5 volle Sets
			while (typePool.length + types.length <= targetTotal) {
				// Wir mischen das Set jedes Mal, bevor wir es hinzufügen
				const shuffledSet = [...types].sort(() => Math.random() - 0.5);
				typePool = [...typePool, ...shuffledSet];
			}

			// 2. Den verbleibenden Rest auffüllen (falls targetTotal kein Vielfaches von types.length ist)
			if (typePool.length < targetTotal) {
				const remainingCount = targetTotal - typePool.length;
				// Den Rest ziehen wir zufällig, aber ohne Duplikate innerhalb des Rests
				const finalShuffle = [...types].sort(() => Math.random() - 0.5);
				for (let i = 0; i < remainingCount; i++) {
					typePool.push(finalShuffle[i]);
				}
			}

			// 3. Den gesamten Pool am Ende nochmal mischen (Fisher-Yates)
			for (let i = typePool.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[typePool[i], typePool[j]] = [typePool[j], typePool[i]];
			}

			// 4. Aufgaben generieren...
			tasks.value = typePool.map(type => {
				let generated = createTask(type, mentalMathMode.value);
				return {
					type: type,
					textDisplay: generated.textDisplay ?? '',
					textPrint: generated.textPrint ?? '',
					solution: generated.solution
				};
			});

			showSolutions.value = false;
			showWorksheetSolutions.value = false;
			return true;
		};

	const generateSingleTrainingTask = () => {
		if (selectedTypes.value.length === 0) return null;

		const weightedTypes = selectedTypes.value.flatMap(type => {
			const rawWeight = Number(taskWeights.value[type]);
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

	const startTraining = async () => {
		if (selectedTypes.value.length === 0) return;

		trainingHistory.value = [];
		currentTrainingIndex.value = 0;

		const firstTask = generateSingleTrainingTask();
		if (!firstTask) return;

		trainingHistory.value.push(firstTask);

		viewMode.value = false;
		worksheetMode.value = false;
		trainingMode.value = true;
		showTrainingSolution.value = false;

		await nextTick();
		await typesetMathJax();
	};

	const generateAll = async () => {
		if (!buildTasks()) return;

		trainingMode.value = false;
		worksheetMode.value = false;
		viewMode.value = true;

		await nextTick();
		await typesetMathJax();
	};

		const toggleTrainingSolution = async () => {
			showTrainingSolution.value = !showTrainingSolution.value;
			await nextTick();
			await typesetMathJax();
		};

		const goToPreviousTrainingTask = async () => {
			if (currentTrainingIndex.value <= 0) return;
			currentTrainingIndex.value -= 1;
			showTrainingSolution.value = false;
			await nextTick();
			await typesetMathJax();
		};

		const goToNextTrainingTask = async () => {
			if (trainingHistory.value.length === 0) return;
			
			if (currentTrainingIndex.value >= trainingHistory.value.length - 1) {
				const newTask = generateSingleTrainingTask();
				if (newTask) {
					trainingHistory.value.push(newTask);
					currentTrainingIndex.value = trainingHistory.value.length - 1;
				}
			} else {
				currentTrainingIndex.value += 1;
			}
			showTrainingSolution.value = false;
			await nextTick();
			await typesetMathJax();
		};

		const leaveTraining = () => {
			trainingMode.value = false;
			showTrainingSolution.value = false;
			currentTrainingIndex.value = 0;
			trainingHistory.value = [];
		};

		const handleTrainingKeydown = (event) => {
			if (!trainingMode.value) return;

			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				goToPreviousTrainingTask();
				return;
			}

			if (event.key === 'ArrowRight') {
				event.preventDefault();
				goToNextTrainingTask();
				return;
			}

			if (event.key === ' ' || event.code === 'Space') {
				event.preventDefault();
				toggleTrainingSolution();
				return;
			}

			if (event.key === 'Escape') {
				event.preventDefault();
				leaveTraining();
			}
		};

		onMounted(() => {
			window.addEventListener('keydown', handleTrainingKeydown);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('keydown', handleTrainingKeydown);
		});

        // --- NEU: JSON Export ---
        const exportJSON = () => {
			downloadJSONFile(`mathe_aufgaben_${taskCount.value}.json`, getTaskExportData());
        };

		const exportWorksheetJSON = () => {
			downloadJSONFile(`arbeitsblatt_aufgaben_${taskCount.value}.json`, getTaskExportData());
		};

        // Die Funktion nimmt nun einen zweiten Parameter entgegen: isMentalMode
		

		const exportHTML = () => {
			// Mitte für die spaltenweise Nummerierung berechnen
			const half = Math.ceil(tasks.value.length / 2);
			const col1 = tasks.value.slice(0, half);
			const col2 = tasks.value.slice(half);

			let htmlContent = `
			<!DOCTYPE html>
			<html lang="de">
			<head>
				<meta charset="UTF-8">
				<title>Mathe_Starter_Export</title>
				<script>
					window.MathJax = { tex: { inlineMath: [['\\\\(', '\\\\)']] } };
				<\/script>
				<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async><\/script>
				<style>
					/* Grund-Layout & Platzersparnis */
					body { 
						font-family: sans-serif; 
						padding: 30px; /* Reduziertes Padding für den Bildschirm */
						margin: 0;
						color: #1e293b; 
						line-height: 1.3; /* Engerer Zeilenabstand */
					}
					
					/* UI-Header (wird nicht gedruckt) */
					.header { 
						display: flex; 
						justify-content: space-between; 
						align-items: center; 
						border-bottom: 2px solid #cbd5e1; 
						margin-bottom: 20px; /* Weniger Abstand zum Inhalt */
						padding-bottom: 8px; 
					}
					
					/* Zweispaltiges Grid */
					.grid { 
						display: grid; 
						grid-template-columns: 1fr 1fr; 
						gap: 40px; /* Weniger Abstand zwischen den Spalten */
					}
					
					/* Flexbox für vertikale Zentrierung in der Zeile */
					.task-row { 
						display: flex; 
						align-items: center; /* WICHTIG: Vertikale Zentrierung */
						border-bottom: 1px solid #f1f5f9; 
						padding: 4px 0; /* Massiv reduziertes vertikales Padding */
						min-height: 32px; /* Reduzierte Mindesthöhe */
					}
					
					/* Kompakte Nummerierung */
					.num { 
						font-weight: 500; 
						color: #aaaaaa; 
						font-size: 0.8rem; /* Leicht verkleinert */
						width: 30px; /* Schmalere Spalte für die Nummer */
						flex-shrink: 0; 
					}
					
					/* Kompakter Text & Formeln */
					.math { 
						font-size: 1.05rem; /* Leicht verkleinert für Platzersparnis */
						word-wrap: break-word; /* Verhindert Spalten-Überlauf */
					}
					
					/* WICHTIG: MathJax-Standardabstände entfernen */
					.math p, .math ul, .math ol {
						margin: 0 !important;
						padding: 0 !important;
					}

					/* UI-Button Styling */
					.btn-ui { padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: white; transition: opacity 0.2s; font-size: 0.9rem; }
					.btn-blue { background: #2563eb; }
					.btn-slate { background: #475569; }
					.btn-ui:hover { opacity: 0.8; }

					.mjx-display {
						margin: 2px 0 !important;
						display: inline-block !important; /* Verhindert, dass die Formel die ganze Breite beansprucht */
						width: auto !important;
					}

					/* Zentriert die Formel innerhalb der Flex-Box der Zeile */
					mjx-container[display="true"] {
						margin: 2px 0 !important;
					}					
					
					/* Druck-Optimierung */
					@media print {
						.no-print { display: none !important; }
						body { padding: 0; margin: 0; }
						.grid { gap: 30px; } /* Noch weniger Spalten-Abstand auf Papier */
						/* Optionale Rand-Definition für das Papier */
						@page { margin: 1.5cm 1cm; }
					}
				</style>
			</head>
			<body>
				<div class="header no-print">
					<h1 id="title" style="margin:0; font-size: 1.3rem;">Aufgaben</h1>
					<div style="display: flex; gap: 8px;">
						<button class="btn-ui btn-blue" onclick="toggleView()" id="toggleBtn">Lösungen anzeigen</button>
						<button class="btn-ui btn-slate" onclick="downloadFile()">Datei speichern 💾</button>
					</div>
				</div>

				<div class="grid">
					<div class="column">
						${col1.map((t, i) => `
							<div class="task-row">
								<div class="num">${i + 1}</div>
								<div class="math task-text">${t.textDisplay ?? ''}</div>
								<div class="math sol-text" style="display:none; color: #16a34a; font-weight: 500;">${t.solution}</div>
							</div>`).join('')}
					</div>
					
					<div class="column">
						${col2.map((t, i) => `
							<div class="task-row">
								<div class="num">${i + half + 1}</div>
								<div class="math task-text">${t.textDisplay ?? ''}</div>
								<div class="math sol-text" style="display:none; color: #16a34a; font-weight: 500;">${t.solution}</div>
							</div>`).join('')}
					</div>
				</div>

				<script>
					let showSols = false;
					
					// Umschalten zwischen Aufgaben und Lösungen
					function toggleView() {
						showSols = !showSols;
						
						// Text-Sichtbarkeit umschalten
						document.querySelectorAll('.task-text').forEach(el => el.style.display = showSols ? 'none' : 'block');
						document.querySelectorAll('.sol-text').forEach(el => el.style.display = showSols ? 'block' : 'none');
						
						// UI-Texte anpassen
						document.getElementById('title').innerText = showSols ? 'Lösungen' : 'Aufgaben';
						document.getElementById('toggleBtn').innerText = showSols ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';
						
						// MathJax-Rendering triggern (sicherheitshalber nach Umschalten)
						if (window.MathJax && window.MathJax.typeset) {
							window.MathJax.typeset();
						}
					}

					// Chrome-Garantie: Datei permanent speichern
					function downloadFile() {
						const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
						const a = document.createElement('a');
						a.href = URL.createObjectURL(blob);
						a.download = "Mathe_Starter_Export.html";
						a.click();
					}
				<\/script>
			</body>
			</html>`;

			// Das HTML-Dokument in einem Blob speichern
			const blob = new Blob([htmlContent], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			
			// Die URL in einem neuen Tab öffnen (für Drucken & Vorschau)
			window.open(url, '_blank');
		};

		// ============================================================
		// ARBEITSBLATT-GENERATOR - In-Page Druckansicht
		// ============================================================
		const toggleWorksheetSolutions = async () => {
			showWorksheetSolutions.value = !showWorksheetSolutions.value;
			await nextTick();
			await typesetMathJax();
		};

		const leaveWorksheet = () => {
			worksheetMode.value = false;
		};

		const printWorksheet = () => {
			window.print();
		};

		const buildWorksheetRowsHTML = () => {
			const taskDisplay = showWorksheetSolutions.value ? 'none' : 'block';
			const solutionDisplay = showWorksheetSolutions.value ? 'block' : 'none';

			return tasks.value.map((task, index) => {
				const copyHtml = `
					<div class="worksheet-copy">
						<div class="worksheet-num">${index + 1})</div>
						<div class="worksheet-content">
							<div class="worksheet-math task-text" style="display: ${taskDisplay};">${task.textPrint ?? ''}</div>
							<div class="worksheet-solution sol-text" style="display: ${solutionDisplay};">${task.solution}</div>
						</div>
					</div>`;

				return `<div class="worksheet-row">${copyHtml}${copyHtml}</div>`;
			}).join('');
		};

		const getWorksheetExportFallbackStyles = () => `
			:root {
				--primary: #008000;
				--slate-800: #1e293b;
				--slate-500: #64748b;
				--slate-300: #cbd5e1;
				--slate-100: #f1f5f9;
			}

			html,
			body {
				margin: 0;
				padding: 0;
				background: white;
				color: var(--slate-800);
				font-family: system-ui, -apple-system, sans-serif;
			}

			.btn-ui {
				padding: 10px 20px;
				border-radius: 15px;
				border: none;
				cursor: pointer;
				font-weight: bold;
			}

			.btn-toggle { background: var(--slate-800); color: white; min-width: 200px; }
			.btn-primary { background: var(--primary); color: white; }
			.btn-export { background: var(--slate-300); color: var(--slate-800); }

			.worksheet-view {
				min-height: 100vh;
				padding: 20px;
				background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
				color: var(--slate-800);
			}

			.worksheet-toolbar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 12px;
				margin-bottom: 18px;
				flex-wrap: wrap;
			}

			.worksheet-toolbar-actions {
				display: flex;
				gap: 10px;
				flex-wrap: wrap;
			}

			.worksheet-sheet {
				max-width: 1400px;
				margin: 0 auto;
				padding: 24px 28px;
				background: white;
				border: 1px solid rgba(203, 213, 225, 0.7);
				border-radius: 24px;
				box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
			}

			.worksheet-sheet-header {
				display: grid;
				grid-template-columns: 1fr 1fr;
				align-items: center;
				gap: 22px;
				padding-bottom: 12px;
				margin-bottom: 12px;
				border-bottom: 2px solid var(--slate-100);
				font-size: 0.95rem;
				font-weight: 400;
				color: var(--slate-500);
			}

			.worksheet-header-copy {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-weight: 400;
			}

			.worksheet-header-gt {
				margin-left: 10px;
				text-align: right;
			}

			.worksheet-header-copy + .worksheet-header-copy {
				padding-left: 22px;
			}

			.worksheet-list {
				display: flex;
				flex-direction: column;
			}

			.worksheet-row {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 22px;
				padding: 10px 0;
				page-break-inside: avoid;
			}

			.worksheet-copy {
				display: grid;
				grid-template-columns: 34px 1fr;
				gap: 12px;
				align-items: start;
			}

			.worksheet-copy + .worksheet-copy {
				padding-left: 22px;
			}

			.worksheet-num {
				font-size: 0.95rem;
				font-weight: 400;
				color: var(--slate-500);
				text-align: right;
				line-height: 1.6;
			}

			.worksheet-content {
				min-width: 0;
			}

			.worksheet-math,
			.worksheet-solution {
				font-size: 1.25rem;
				line-height: 1.35;
				word-wrap: break-word;
			}

			.worksheet-solution {
				color: var(--primary);
			}

			.worksheet-content p,
			.worksheet-content ul,
			.worksheet-content ol {
				margin: 0 !important;
				padding: 0 !important;
			}

			.worksheet-view mjx-container[jax="CHTML"][display="true"] {
				margin: 6px 0 0 0 !important;
				font-size: 100% !important;
			}

			@media (max-width: 960px) {
				.worksheet-row {
					grid-template-columns: 1fr;
					gap: 12px;
				}

				.worksheet-copy + .worksheet-copy {
					padding-left: 0;
					padding-top: 12px;
				}
			}

			@media print {
				@page {
					size: A4 landscape;
					margin: 0;
				}

				html,
				body {
					width: 297mm;
					height: 210mm;
					margin: 0;
					padding: 0;
					background: white;
					overflow: visible;
				}

				.no-print {
					display: none !important;
				}

				.worksheet-view {
					width: 297mm;
					min-height: 210mm;
					padding: 0;
					background: white;
				}

				.worksheet-sheet {
					width: 297mm;
					min-height: 210mm;
					max-width: none;
					margin: 0;
					padding: 7mm 0 8mm;
					box-sizing: border-box;
					border: none;
					border-radius: 0;
					box-shadow: none;
				}

				.worksheet-sheet-header {
					width: 297mm;
					margin: 0 0 4mm 0;
					padding: 0 8mm 4mm;
					box-sizing: border-box;
					border-bottom: 0.3mm solid var(--slate-300);
					font-size: 0.8rem;
				}

				.worksheet-row {
					width: 297mm;
					grid-template-columns: 148.5mm 148.5mm;
					gap: 0;
					padding: 2.4mm 0;
					box-sizing: border-box;
					break-inside: avoid;
					page-break-inside: avoid;
				}

				.worksheet-copy {
					width: 148.5mm;
					grid-template-columns: 8mm 1fr;
					gap: 3mm;
					padding: 0 8mm 0 5mm;
					box-sizing: border-box;
					align-items: start;
				}

				.worksheet-copy + .worksheet-copy {
					margin-left: 0;
					padding-left: 8mm;
				}

				.worksheet-num {
					font-size: 0.78rem;
					line-height: 1.45;
					color: #64748b;
				}

				.worksheet-math,
				.worksheet-solution {
					font-size: 0.92rem;
					line-height: 1.2;
				}

				.worksheet-content {
					min-width: 0;
				}

				.worksheet-content mjx-container {
					font-size: 92% !important;
				}

				.worksheet-view mjx-container[jax="CHTML"][display="true"] {
					margin-top: 1.2mm !important;
					margin-bottom: 0 !important;
				}
			}
		`;

		const getWorksheetExportStyles = async () => {
			try {
				const response = await fetch('css/tool_gt.css', { cache: 'no-cache' });
				if (response.ok) {
					const cssText = await response.text();
					if (cssText.trim().length > 0) {
						return cssText;
					}
				}
			} catch (e) {
				console.warn('Worksheet export CSS fallback used:', e);
			}

			return getWorksheetExportFallbackStyles();
		};

		const buildWorksheetHTMLDocument = async () => {
			const inlineStyles = await getWorksheetExportStyles();
			const worksheetData = JSON.stringify(getTaskExportData());
			const toggleLabel = showWorksheetSolutions.value ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';

			return `
			<!DOCTYPE html>
			<html lang="de">
			<head>
				<meta charset="UTF-8">
				<title>Arbeitsblatt</title>
				<script>
					window.MathJax = {
						tex: { inlineMath: [['\\\\(', '\\\\)']] },
						svg: { fontCache: 'global' }
					};
				<\/script>
				<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async><\/script>
				<style>${inlineStyles}</style>
			</head>
			<body>
				<div class="worksheet-view">
					<div class="worksheet-toolbar no-print">
						<div class="worksheet-toolbar-actions">
							<button class="btn-ui btn-toggle" onclick="toggleWorksheetSolutions()" id="toggleBtn">${toggleLabel}</button>
							<button class="btn-ui btn-export" onclick="exportWorksheetJSON()">JSON Export</button>
							<button class="btn-ui btn-primary" onclick="window.print()">Drucken</button>
						</div>
					</div>

					<div class="worksheet-sheet">
						<div class="worksheet-sheet-header">
							<div class="worksheet-header-copy">
								<span>Name:</span>
								<span class="worksheet-header-gt">GT ${gtNumber.value}</span>
							</div>
							<div class="worksheet-header-copy">
								<span>Name:</span>
								<span class="worksheet-header-gt">GT ${gtNumber.value}</span>
							</div>
						</div>
						<div class="worksheet-list">${buildWorksheetRowsHTML()}</div>
					</div>
				</div>

				<script>
					const worksheetData = ${worksheetData};
					let showSolutions = ${showWorksheetSolutions.value};

					function toggleWorksheetSolutions() {
						showSolutions = !showSolutions;
						document.querySelectorAll('.task-text').forEach(el => el.style.display = showSolutions ? 'none' : 'block');
						document.querySelectorAll('.sol-text').forEach(el => el.style.display = showSolutions ? 'block' : 'none');
						document.getElementById('toggleBtn').innerText = showSolutions ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';
						if (window.MathJax?.typesetPromise) {
							window.MathJax.typesetPromise();
						}
					}

					function exportWorksheetJSON() {
						const blob = new Blob([JSON.stringify(worksheetData, null, 2)], { type: 'application/json' });
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = 'arbeitsblatt_aufgaben.json';
						a.click();
						URL.revokeObjectURL(url);
					}
				<\/script>
			</body>
			</html>`;
		};

		const downloadWorksheetHTML = async () => {
			const htmlContent = await buildWorksheetHTMLDocument();
			const blob = new Blob([htmlContent], { type: 'text/html' });
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = `arbeitsblatt_aufgaben_${taskCount.value}.html`;
			a.click();
			URL.revokeObjectURL(url);
		};

		const generateWorksheet = async () => {
			if (!buildTasks()) return;

			trainingMode.value = false;
			viewMode.value = false;
			worksheetMode.value = true;

			await nextTick();
			await typesetMathJax();
		};

        return { 
            tasks, 
            trainingHistory,
            showSolutions, 
            viewMode, 
			worksheetMode,
			trainingMode,
			showWorksheetSolutions,
			showTrainingSolution,
			currentTrainingIndex,
			currentTrainingTask,
			isDarkMode,
			invertSelection,
            selectedTypes, 
			taskWeights,
            typeLabels, 
            taskCount,
			gtNumber,
            mentalMathMode,
            halfCount,
			generateAll,
			startTraining,
			toggleTrainingSolution,
			goToPreviousTrainingTask,
			goToNextTrainingTask,
			leaveTraining,
			generateWorksheet,
			toggleWorksheetSolutions,
			leaveWorksheet,
			printWorksheet,
			exportWorksheetJSON,
			downloadWorksheetHTML,
			toggleSolutions,
			toggleDarkMode,
            exportJSON,
            exportHTML,
            taskCategories
        };
    }
}).mount('#app');
