window.MTGWorksheetModeModule = {
    createWorksheetMode({ state, taskGeneration, nextTick, typesetMathJax }) {
        const toggleWorksheetSolutions = async () => {
            state.showWorksheetSolutions.value = !state.showWorksheetSolutions.value;
            await nextTick();
            await typesetMathJax();
        };

		const toggleWorksheetLayoutMode = async () => {
			state.worksheetLayoutMode.value = state.worksheetLayoutMode.value === 'presentation'
				? 'worksheet'
				: 'presentation';
			await nextTick();
			await typesetMathJax();
		};

        const printWorksheet = () => {
            window.print();
        };

		const buildWorksheetColumns = () => {
			if (state.worksheetA5Pages.value === 2) {
				return {
					left: state.tasks.value.map((task, index) => ({ task, number: index + 1 })),
					right: state.tasks.value.map((task, index) => ({ task, number: index + 1 }))
				};
			}

			const leftColumnSize = Math.ceil(state.tasks.value.length / 2);
			const leftColumnTasks = state.tasks.value.slice(0, leftColumnSize);
			const rightColumnTasks = state.tasks.value.slice(leftColumnSize);

			return {
				left: leftColumnTasks.map((task, index) => ({ task, number: index + 1 })),
				right: rightColumnTasks.map((task, index) => ({ task, number: index + 1 }))
			};
		};

		const buildWorksheetColumnMarkup = renderTask => {
			const { left, right } = buildWorksheetColumns();

			const buildColumn = entries => `
					<div class="worksheet-column">
						${entries.map(entry => `
							<div class="worksheet-copy">
								<div class="worksheet-num">${entry.number})</div>
								<div class="worksheet-content">
									${renderTask(entry.task)}
								</div>
							</div>`).join('')}
					</div>`;

			return `<div class="worksheet-list worksheet-list--columns">${buildColumn(left)}${buildColumn(right)}</div>`;
		};

		const buildWorksheetTaskRowsHTML = () => buildWorksheetColumnMarkup(task => `<div class="worksheet-math">${task.textPrint ?? ''}</div>`);

		const buildWorksheetNormalSolutionRowsHTML = () => buildWorksheetColumnMarkup(task => `<div class="worksheet-solution">${task.solution}</div>`);

		const getWorksheetPresentationColumns = () => state.tasks.value.reduce((columns, task, index) => {
			const item = { task, index };
			if (index % 2 === 0) {
				columns.odd.push(item);
			} else {
				columns.even.push(item);
			}
			return columns;
		}, { odd: [], even: [] });

		const buildWorksheetPresentationTasksHTML = () => {
			const { odd, even } = getWorksheetPresentationColumns();

			return `
					<div class="worksheet-solutions-header">
						<span>Aufgaben</span>
						<span class="worksheet-header-gt">GT ${state.gtNumber.value}</span>
					</div>

					<div class="worksheet-solution-board task-grid">
						<div class="column-wrapper">
							${odd.map(({ task, index }) => `
								<div class="task-row">
									<div class="task-num">${index + 1}</div>
									<div class="content">
										<div class="math-q">${task.textDisplay ?? ''}</div>
									</div>
								</div>`).join('')}
						</div>

						<div class="column-wrapper">
							${even.map(({ task, index }) => `
								<div class="task-row">
									<div class="task-num">${index + 1}</div>
									<div class="content">
										<div class="math-q">${task.textDisplay ?? ''}</div>
									</div>
								</div>`).join('')}
						</div>
					</div>`;
		};

        const buildWorksheetPresentationSolutionsHTML = () => {
			const { odd, even } = getWorksheetPresentationColumns();

            return `
					<div class="worksheet-solutions-header">
						<span>Lösungen</span>
						<span class="worksheet-header-gt">GT ${state.gtNumber.value}</span>
					</div>

					<div class="worksheet-solution-board task-grid">
						<div class="column-wrapper">
							${odd.map(({ task, index }) => `
								<div class="task-row">
									<div class="task-num">${index + 1}</div>
									<div class="content">
										<div class="math-a">${task.solution}</div>
									</div>
								</div>`).join('')}
						</div>

						<div class="column-wrapper">
							${even.map(({ task, index }) => `
								<div class="task-row">
									<div class="task-num">${index + 1}</div>
									<div class="content">
										<div class="math-a">${task.solution}</div>
									</div>
								</div>`).join('')}
						</div>
					</div>`;
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
				font-family: 'Reddit Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
			}

			.btn {
				padding: 10px 20px;
				border-radius: 15px;
				border: none;
				cursor: pointer;
				font-weight: bold;
			}

			.btn--toggle { background: var(--slate-800); color: white; min-width: 200px; }
			.btn--primary { background: var(--primary); color: white; }
			.btn--export { background: var(--slate-300); color: var(--slate-800); }

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

			.worksheet-sheet--solutions {
				max-width: none;
				margin: 0;
				width: 100%;
				padding: 8px 0 0;
				background: transparent;
				border: none;
				border-radius: 0;
				box-shadow: none;
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

			.worksheet-list--columns {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 22px;
			}

			.worksheet-column {
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

			.worksheet-copy--empty .worksheet-num,
			.worksheet-copy--empty .worksheet-content {
				visibility: hidden;
			}

			.worksheet-row > .worksheet-copy + .worksheet-copy {
				padding-left: 22px;
			}

			.worksheet-column .worksheet-copy {
				padding: 10px 0;
			}

			.worksheet-num {
				display: flex;
				align-items: center;
				justify-content: center;
				align-self: stretch;
				font-size: 0.95rem;
				font-weight: 400;
				color: var(--slate-500);
				text-align: center;
				line-height: 1;
			}

			.worksheet-content {
				min-width: 0;
				font-size: 12pt;
				line-height: 1.35;
			}

			.worksheet-math,
			.worksheet-solution {
				font-size: inherit;
				line-height: inherit;
				word-wrap: break-word;
			}

			.worksheet-solution {
				color: var(--primary);
			}

			.worksheet-content mjx-container {
				font-size: 13pt !important;
				line-height: inherit !important;
			}

			.worksheet-content mjx-container mjx-math {
				font-size: 13pt !important;
			}

			.worksheet-content mjx-mtext {
				font-size: 12pt !important;
			}

			.worksheet-content p,
			.worksheet-content ul,
			.worksheet-content ol {
				margin: 0 !important;
				padding: 0 !important;
			}

			.task-grid {
				display: flex;
				gap: 42px;
			}

			.column-wrapper {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			.task-row {
				display: flex;
				align-items: center;
				border-bottom: 1px solid var(--slate-100);
				min-height: 86px;
				padding: 16px 0;
			}

			.task-num {
				font-size: 2.35rem;
				font-weight: 900;
				color: var(--slate-500);
				width: 72px;
				text-align: center;
				flex-shrink: 0;
			}

			.content {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				padding-left: 16px;
			}

			.math-a {
				font-size: 2.5rem;
				font-weight: 400;
				line-height: 1.25;
				color: var(--primary);
			}

			.math-q {
				font-size: 2.5rem;
				font-weight: 400;
				line-height: 1.25;
				color: var(--slate-800);
			}

			.worksheet-solutions-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 12px;
				padding-bottom: 12px;
				margin-bottom: 10px;
				border-bottom: 2px solid var(--slate-100);
				font-size: 1.15rem;
				font-weight: 800;
				color: var(--slate-500);
			}

			.worksheet-solution-board {
				margin-top: 8px;
				border-top: 2px solid var(--slate-100);
				padding-top: 8px;
				padding-left: 6px;
				padding-right: 6px;
			}

			.worksheet-view .worksheet-solution-board mjx-container[jax="CHTML"][display="true"] {
				text-align: center !important;
			}

			.worksheet-view mjx-container[jax="CHTML"][display="true"] {
				margin: 6px 0 0 0 !important;
				text-align: left !important;
			}

			@media (max-width: 960px) {
				.worksheet-row {
					grid-template-columns: 1fr;
					gap: 12px;
				}

				.worksheet-list--columns {
					grid-template-columns: 1fr;
					gap: 12px;
				}

				.worksheet-row > .worksheet-copy + .worksheet-copy {
					padding-left: 0;
					padding-top: 12px;
				}

				.task-grid {
					flex-direction: column;
					gap: 16px;
				}

				.task-row {
					min-height: 70px;
					padding: 12px 0;
				}

				.task-num {
					font-size: 1.9rem;
					width: 62px;
				}

				.math-a {
					font-size: 2.25rem;
				}

				.math-q {
					font-size: 2.25rem;
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
					margin: 0;
					padding: 0;
					background: white;
					overflow: visible;
					font-family: 'Reddit Sans', sans-serif;
					font-weight: 350;
				}

				mjx-container,
				mjx-mtext {
					font-weight: 350;
				}

				.no-print {
					display: none !important;
				}

				.worksheet-view {
					width: 297mm;
					padding: 0;
					background: white;
				}

				.worksheet-sheet {
					width: 297mm;
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

				.worksheet-list--columns {
					width: 297mm;
					display: grid;
					grid-template-columns: 148.5mm 148.5mm;
					gap: 0;
				}

				.worksheet-column {
					width: 148.5mm;
				}

				.worksheet-column .worksheet-copy {
					width: 148.5mm;
					grid-template-columns: 8mm 1fr;
					gap: 3mm;
					padding: 2.4mm 8mm 2.4mm 5mm;
					box-sizing: border-box;
					align-items: start;
					break-inside: avoid;
					page-break-inside: avoid;
				}

				.worksheet-column + .worksheet-column .worksheet-copy {
					padding-left: 8mm;
				}

				.worksheet-row > .worksheet-copy + .worksheet-copy {
					margin-left: 0;
					padding-left: 8mm;
				}

				.worksheet-num {
					display: flex;
					align-items: center;
					justify-content: center;
					align-self: stretch;
					font-size: 0.78rem;
					line-height: 1;
					text-align: center;
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
					font-size: 13pt !important;
				}

				.worksheet-content mjx-container mjx-math {
					font-size: 13pt !important;
				}

				.worksheet-content mjx-mtext {
					font-size: 0.92rem !important;
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
			} catch {
            }

            return getWorksheetExportFallbackStyles();
        };

        const buildWorksheetHTMLDocument = async () => {
            const inlineStyles = await getWorksheetExportStyles();
            const worksheetData = JSON.stringify(taskGeneration.getTaskExportData());
            const toggleLabel = state.showWorksheetSolutions.value ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';
			const taskSectionDisplay = state.showWorksheetSolutions.value ? 'none' : 'block';
			const normalSolutionsDisplay = state.showWorksheetSolutions.value ? 'block' : 'none';
			const worksheetGtLabel = state.worksheetA5Pages.value === 1 ? '' : `Grundlagen-Training ${state.gtNumber.value}`;
			const solutionsGtLabel = state.worksheetA5Pages.value === 1 ? '' : `GT ${state.gtNumber.value}`;

            return `
			<!DOCTYPE html>
			<html lang="de">
			<head>
				<meta charset="UTF-8">
				<title>Arbeitsblatt</title>
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,300..900;1,300..900&display=swap">
				<script>
					window.MathJax = {
						tex: {
							inlineMath: [['\\\\(', '\\\\)']],
							packages: {'[-]': ['textmacros']}
						},
						startup: {
							typeset: false
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
				<style>${inlineStyles}</style>
			</head>
			<body>
				<div class="worksheet-view">
					<div class="worksheet-toolbar no-print">
						<div class="worksheet-toolbar-actions">
							<button class="btn btn--toggle" onclick="toggleWorksheetSolutions()" id="toggleBtn">${toggleLabel}</button>
							<button class="btn btn--export" onclick="toggleLayoutMode()" id="layoutBtn">Präsentation anzeigen</button>
							<button class="btn btn--export" onclick="exportWorksheetJSON()">JSON Export</button>
							<button class="btn btn--primary" onclick="window.print()">Drucken</button>
						</div>
					</div>

					<div class="worksheet-sheet" id="worksheetSheet">
						<div class="worksheet-sheet-header" id="worksheetTaskHeader" style="display: ${taskSectionDisplay};">
							<div class="worksheet-header-copy">
								<span>Name:</span>
								${worksheetGtLabel ? `<span class="worksheet-header-gt">${worksheetGtLabel}</span>` : ''}
							</div>
							<div class="worksheet-header-copy">
								<span>Name:</span>
								${worksheetGtLabel ? `<span class="worksheet-header-gt">${worksheetGtLabel}</span>` : ''}
							</div>
						</div>
						<div class="worksheet-list" id="worksheetTaskList" style="display: ${taskSectionDisplay};">${buildWorksheetTaskRowsHTML()}</div>
						<div id="worksheetPresentationTasks" style="display: none;">${buildWorksheetPresentationTasksHTML()}</div>
						<div id="worksheetNormalSolutions" style="display: ${normalSolutionsDisplay};">
							<div class="worksheet-solutions-header">
								<span>Lösungen</span>
								${solutionsGtLabel ? `<span class="worksheet-header-gt">${solutionsGtLabel}</span>` : ''}
							</div>
							<div class="worksheet-list">${buildWorksheetNormalSolutionRowsHTML()}</div>
						</div>
						<div id="worksheetPresentationSolutions" style="display: none;">${buildWorksheetPresentationSolutionsHTML()}</div>
					</div>
				</div>

				<script>
					const worksheetData = ${worksheetData};
					let showSolutions = ${state.showWorksheetSolutions.value};
					let layoutMode = 'worksheet';

					async function ensureMathJaxReady(timeoutMs = 5000) {
						const deadline = Date.now() + timeoutMs;

						while (Date.now() < deadline) {
							if (window.MathJax?.startup?.promise) {
								try {
									await window.MathJax.startup.promise;
								} catch (error) {
									console.warn('MathJax startup failed in export:', error);
								}
								return !!window.MathJax?.typesetPromise;
							}

							await new Promise(resolve => setTimeout(resolve, 50));
						}

						return !!window.MathJax?.typesetPromise;
					}

					function getVisibleTypesetTargets(taskList, presentationTasks, normalSolutions, presentationSolutions) {
						const candidates = [taskList, presentationTasks, normalSolutions, presentationSolutions];
						return candidates.filter(section => {
							if (!section) return false;
							if (section.style.display === 'none') return false;
							return true;
						});
					}

					async function typesetVisibleSections(taskList, presentationTasks, normalSolutions, presentationSolutions) {
						const mathJaxReady = await ensureMathJaxReady();
						if (!mathJaxReady) return;

						const targets = getVisibleTypesetTargets(taskList, presentationTasks, normalSolutions, presentationSolutions);
						if (!targets.length) return;

						if (window.MathJax.typesetClear) {
							window.MathJax.typesetClear(targets);
						}
						await window.MathJax.typesetPromise(targets);
					}

					async function renderWorksheetLayout() {
						const taskHeader = document.getElementById('worksheetTaskHeader');
						const taskList = document.getElementById('worksheetTaskList');
						const presentationTasks = document.getElementById('worksheetPresentationTasks');
						const normalSolutions = document.getElementById('worksheetNormalSolutions');
						const presentationSolutions = document.getElementById('worksheetPresentationSolutions');
						const worksheetSheet = document.getElementById('worksheetSheet');
						const toggleButton = document.getElementById('toggleBtn');
						const layoutButton = document.getElementById('layoutBtn');

						if (!showSolutions) {
							taskHeader.style.display = layoutMode === 'worksheet' ? 'grid' : 'none';
							taskList.style.display = layoutMode === 'worksheet' ? 'block' : 'none';
							presentationTasks.style.display = layoutMode === 'presentation' ? 'block' : 'none';
							normalSolutions.style.display = 'none';
							presentationSolutions.style.display = 'none';
							if (layoutMode === 'presentation') {
								worksheetSheet.classList.add('worksheet-sheet--solutions');
							} else {
								worksheetSheet.classList.remove('worksheet-sheet--solutions');
							}
						} else {
							taskHeader.style.display = 'none';
							taskList.style.display = 'none';
							presentationTasks.style.display = 'none';

							if (layoutMode === 'presentation') {
								normalSolutions.style.display = 'none';
								presentationSolutions.style.display = 'block';
								worksheetSheet.classList.add('worksheet-sheet--solutions');
							} else {
								normalSolutions.style.display = 'block';
								presentationSolutions.style.display = 'none';
								worksheetSheet.classList.remove('worksheet-sheet--solutions');
							}
						}

						toggleButton.innerText = showSolutions ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';
						layoutButton.innerText = layoutMode === 'presentation'
							? 'Arbeitsblatt anzeigen'
							: 'Präsentation anzeigen';

						await typesetVisibleSections(taskList, presentationTasks, normalSolutions, presentationSolutions);
					}

					async function toggleWorksheetSolutions() {
						showSolutions = !showSolutions;
						await renderWorksheetLayout();
					}

					async function toggleLayoutMode() {
						layoutMode = layoutMode === 'presentation' ? 'worksheet' : 'presentation';
						await renderWorksheetLayout();
					}

					function exportWorksheetJSON() {
						const blob = new Blob([JSON.stringify(worksheetData, null, 2)], { type: 'application/json' });
						const url = URL.createObjectURL(blob);
						const anchor = document.createElement('a');
						anchor.href = url;
						anchor.download = 'arbeitsblatt_aufgaben.json';
						anchor.click();
						URL.revokeObjectURL(url);
					}

					document.addEventListener('DOMContentLoaded', async () => {
						await renderWorksheetLayout();
					});
				<\/script>
			</body>
			</html>`;
        };

        const downloadWorksheetHTML = async () => {
            const htmlContent = await buildWorksheetHTMLDocument();
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `arbeitsblatt_aufgaben_${state.taskCount.value}.html`;
            anchor.click();
            URL.revokeObjectURL(url);
        };

        const generateWorksheet = async () => {
			if (!taskGeneration.buildTasks()) return;

            state.currentView.value = 'worksheet';
            state.isSettingsSidebarOpen.value = false;

            await nextTick();
            await typesetMathJax();
        };

        const exportWorksheetJSON = () => {
            taskGeneration.downloadJSONFile(`arbeitsblatt_aufgaben_${state.taskCount.value}.json`, taskGeneration.getTaskExportData());
        };

        return {
            toggleWorksheetSolutions,
			toggleWorksheetLayoutMode,
            printWorksheet,
            downloadWorksheetHTML,
            generateWorksheet,
            exportWorksheetJSON
        };
    }
};
