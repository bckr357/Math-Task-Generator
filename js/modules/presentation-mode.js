window.MTGPresentationModeModule = {
    createPresentationMode({ state, taskGeneration, nextTick, typesetMathJax, createJsonImportHandler }) {
        const toggleSolutions = async () => {
            state.showSolutions.value = !state.showSolutions.value;
            await nextTick();
            await typesetMathJax();
        };

        const toggleDarkMode = () => {
            state.isDarkMode.value = !state.isDarkMode.value;
        };

        const generateAll = async () => {
            if (!taskGeneration.buildTasks()) return;

            state.currentView.value = 'presentation';
            state.isSettingsSidebarOpen.value = false;

            await nextTick();
            await typesetMathJax();
        };

        const exportJSON = () => {
            taskGeneration.downloadJSONFile(`mathe_aufgaben_${state.taskCount.value}.json`, taskGeneration.getTaskExportData());
        };

        const presentationImportInput = Vue.ref(null);

        const openPresentationImportDialog = () => {
            presentationImportInput.value?.click();
        };

        const importPresentationJSON = createJsonImportHandler({
            loadTasks: taskGeneration.loadTasksFromJSON,
            onAfterLoad: async () => {
                state.currentView.value = 'presentation';
                state.isSettingsSidebarOpen.value = false;
                state.showSolutions.value = false;
            }
        });

        const exportHTML = () => {
            const oddTasks = state.rowWiseFirstColumnTasks.value;
            const evenTasks = state.rowWiseSecondColumnTasks.value;

            const htmlContent = `
			<!DOCTYPE html>
			<html lang="de">
			<head>
				<meta charset="UTF-8">
				<title>Mathe_Starter_Export</title>
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,300..900;1,300..900&display=swap">
				<script>
					window.MathJax = {
						tex: {
							inlineMath: [['\\\\(', '\\\\)']],
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
				<\/script>
				<script src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js" defer><\/script>
				<style>
					body {
						font-family: 'Reddit Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
						padding: 30px;
						margin: 0;
						color: #1e293b;
						line-height: 1.3;
					}

					.header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 2px solid #cbd5e1;
						margin-bottom: 20px;
						padding-bottom: 8px;
					}

					.grid {
						display: grid;
						grid-template-columns: 1fr 1fr;
						gap: 40px;
					}

					.task-row {
						display: flex;
						align-items: center;
						border-bottom: 1px solid #f1f5f9;
						padding: 4px 0;
						min-height: 32px;
					}

					.num {
						font-weight: 500;
						color: #aaaaaa;
						font-size: 0.8rem;
						width: 30px;
						flex-shrink: 0;
					}

					.math {
						font-size: 1.05rem;
						word-wrap: break-word;
					}

					.math p, .math ul, .math ol {
						margin: 0 !important;
						padding: 0 !important;
					}

						.op-table-wrap {
							width: 100%;
							max-width: 900px;
							margin: 0 auto;
						}

						.op-table {
							width: 100%;
							border-collapse: collapse;
							table-layout: fixed;
							background: rgba(255, 255, 255, 0.9);
							border: none;
							overflow: hidden;
						}

						.op-table th,
						.op-table td {
							border: 1px solid rgba(148, 163, 184, 0.35);
							padding: 10px 8px;
							text-align: center;
							vertical-align: middle;
							font-size: 1rem;
							line-height: 1.25;
						}

						.op-table tr:first-child th,
						.op-table tr:first-child td {
							border-top: none;
						}

						.op-table th:first-child,
						.op-table td:first-child {
							border-left: none;
							width: 50px;
							min-width: 50px;
							max-width: 50px;
						}

						.op-table th:last-child,
						.op-table td:last-child {
							border-right: none;
						}

						.op-table tr:last-child th,
						.op-table tr:last-child td {
							border-bottom: none;
						}

						.op-table th {
							background: rgba(241, 245, 249, 0.95);
							font-weight: 400;
						}

						.op-table .op-corner {
							background: rgba(226, 232, 240, 0.9);
						}

						.op-table--solution td {
							text-align: center;
						}

						.op-table--terms td,
						.op-table--terms th {
							padding: 12px 10px;
						}
					.btn:hover { opacity: 0.8; }

					.mjx-display {
						margin: 2px 0 !important;
						display: inline-block !important;
						width: auto !important;
					}

					mjx-container[display="true"] {
						margin: 2px 0 !important;
					}

					@media print {
						.no-print { display: none !important; }
						body { padding: 0; margin: 0; font-family: 'Reddit Sans', sans-serif; font-weight: 350; }
						mjx-container, mjx-mtext { font-weight: 350; }
						.grid { gap: 30px; }
						@page { margin: 1.5cm 1cm; }
					}
				</style>
			</head>
			<body>
				<div class="header no-print">
					<h1 id="title" style="margin:0; font-size: 1.3rem;">Aufgaben</h1>
					<div style="display: flex; gap: 8px;">
						<button class="btn btn-blue" onclick="toggleView()" id="toggleBtn">Lösungen anzeigen</button>
						<button class="btn btn-slate" onclick="downloadFile()">Datei speichern 💾</button>
					</div>
				</div>

				<div class="grid">
					<div class="column">
						${oddTasks.map((task, index) => `
							<div class="task-row">
								<div class="num">${(index * 2) + 1}</div>
								<div class="math task-text">${task.textDisplay ?? ''}</div>
								<div class="math sol-text" style="display:none; color: #16a34a; font-weight: 500;">${task.solution}</div>
							</div>`).join('')}
					</div>

					<div class="column">
						${evenTasks.map((task, index) => `
							<div class="task-row">
								<div class="num">${(index * 2) + 2}</div>
								<div class="math task-text">${task.textDisplay ?? ''}</div>
								<div class="math sol-text" style="display:none; color: #16a34a; font-weight: 500;">${task.solution}</div>
							</div>`).join('')}
					</div>
				</div>

				<script>
					let showSols = false;

					function toggleView() {
						showSols = !showSols;
						document.querySelectorAll('.task-text').forEach(element => element.style.display = showSols ? 'none' : 'block');
						document.querySelectorAll('.sol-text').forEach(element => element.style.display = showSols ? 'block' : 'none');
						document.getElementById('title').innerText = showSols ? 'Lösungen' : 'Aufgaben';
						document.getElementById('toggleBtn').innerText = showSols ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';

						if (window.MathJax && window.MathJax.typeset) {
							window.MathJax.typeset();
						}
					}

					function downloadFile() {
						const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
						const anchor = document.createElement('a');
						anchor.href = URL.createObjectURL(blob);
						anchor.download = 'Mathe_Starter_Export.html';
						anchor.click();
					}
				<\/script>
			</body>
			</html>`;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        };

        return {
            toggleSolutions,
            toggleDarkMode,
            generateAll,
            exportJSON,
            openPresentationImportDialog,
            importPresentationJSON,
            presentationImportInput,
            exportHTML
        };
    }
};
