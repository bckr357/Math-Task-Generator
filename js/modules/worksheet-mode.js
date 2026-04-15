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
						const sheetEl = document.querySelector('.worksheet-sheet');
						if (!sheetEl) {
								window.print();
								return;
						}

						const styles = getWorksheetExportFallbackStyles();
			const pageStyle = `@page { size: A4 landscape; size: 297mm 210mm; margin: 7mm; }`;
						const html = `
								<!doctype html>
								<html>
								<head>
									<meta charset="utf-8">
									<title>Arbeitsblatt - Druck</title>
									<style>${styles}\n@media print { ${pageStyle} }</style>
								</head>
								<body>
									<div class="worksheet-view">${sheetEl.outerHTML}</div>
									<script>
										function doPrint() {
											try {
												window.focus();
												window.print();
											} catch (e) {
												console.warn('Druck fehlgeschlagen', e);
											}
										}
										// Give browser a moment to layout fonts/images
										setTimeout(doPrint, 250);
									<\/script>
								</body>
								</html>`;

						const w = window.open('', '_blank');
						if (!w) {
								// Popup blocked — fallback to normal print
								window.print();
								return;
						}

						w.document.open();
						w.document.write(html);
						w.document.close();
				};

		const buildWorksheetColumns = () => {
			if (state.worksheetA5Pages.value === 2) {
				return {
					left: state.tasks.value.map((task, index) => ({ task, number: index + 1 })),
					right: state.tasks.value.map((task, index) => ({ task, number: index + 1 }))
				};
			}

			const left = [];
			const right = [];

			state.tasks.value.forEach((task, index) => {
				const entry = { task, number: index + 1 };

				if (index % 2 === 0) {
					left.push(entry);
				} else {
					right.push(entry);
				}
			});

			return { left, right };
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

const buildWorksheetTaskRowsHTML = () => buildWorksheetColumnMarkup(task => `<div class="worksheet-math">${task.textDisplay ?? ''}</div>`);

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
				font-size: 12pt;
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

			.two-column-task {
				width: 100%;
				border-collapse: collapse;
				border: none;
			}

			.two-column-task-cell {
				width: 50%;
				text-align: left;
				vertical-align: top;
				padding: 0;
				border: none;
			}

			#worksheetPresentationTasks .two-column-task,
			#worksheetPresentationSolutions .two-column-task {
				display: block;
				width: 100% !important;
				border: none !important;
			}

			#worksheetPresentationTasks .two-column-task tr,
			#worksheetPresentationSolutions .two-column-task tr {
				display: block;
			}

			#worksheetPresentationTasks .two-column-task td,
			#worksheetPresentationSolutions .two-column-task td {
				display: block;
				width: auto !important;
				border: none !important;
				padding: 0;
				margin-bottom: 1rem;
				text-align: left;
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
					margin: 10mm 12mm 10mm 14mm;
				}

				html,
				body {
					width: auto;
					max-width: 100%;
					margin: 0;
					padding: 0;
					background: white;
					overflow: visible;
					font-weight: 350;
				}

				mjx-container,
				mjx-mtext {
					font-weight: 350;
				}

				.no-print,
				.home-view,
				.presentation-view,
				.settings-drawer,
				.settings-drawer-overlay {
					display: none !important;
				}

				.worksheet-view {
					padding: 0;
					background: white;
				}

				.worksheet-sheet {
					width: 271mm;
					margin: 10mm 12mm 10mm 14mm;
					padding: 0;
					box-sizing: border-box;
					border: none;
					border-radius: 0;
					box-shadow: none;
				}

				.worksheet-sheet-header {
					grid-template-columns: 122mm 122mm;
					gap: 27mm;
					width: 271mm;
					border: none;
					font-size: 9pt;
				}

				.worksheet-copy {
					grid-template-columns: 5mm 1fr;
					gap: 3mm;
					box-sizing: border-box;
					align-items: start;
					padding: 2mm 0mm 2mm 0mm;
					break-inside: avoid;
					page-break-inside: avoid;
				}

				.worksheet-list--columns {
					grid-template-columns: 122mm 122mm;
					gap: 27mm;
				}

				.worksheet-num {
					display: flex;
					align-items: flex-start;
					justify-content: right;
					align-self: stretch;
					font-size: 9pt;
					padding-top: 5px;
					line-height: 1;
					text-align: center;
					color: #64748b;
				}

				.worksheet-content {
					min-width: 0;
					font-size: var(--worksheet-task-font-size-print);
					line-height: var(--worksheet-task-line-height-print);
				}

				.worksheet-content mjx-container {
					font-size: 12pt !important;
				}

				.worksheet-content mjx-container mjx-math {
					font-size: 12pt !important;
				}

				.worksheet-content mjx-mtext {
					font-size: var(--worksheet-task-font-size-print) !important;
				}

				.worksheet-view mjx-container[jax="CHTML"][display="true"] {
					margin: 0 !important;
					padding: 0 !important;
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
