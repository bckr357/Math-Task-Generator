window.MTGWorksheetModeModule = {
    createWorksheetMode({ state, taskGeneration, nextTick, typesetMathJax }) {
        const toggleWorksheetSolutions = async () => {
            state.showWorksheetSolutions.value = !state.showWorksheetSolutions.value;
            await nextTick();
            await typesetMathJax();
        };

        const printWorksheet = () => {
            window.print();
        };

        const buildWorksheetRowsHTML = () => {
            const taskDisplay = state.showWorksheetSolutions.value ? 'none' : 'block';
            const solutionDisplay = state.showWorksheetSolutions.value ? 'block' : 'none';

            return state.tasks.value.map((task, index) => {
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
            } catch (error) {
                console.warn('Worksheet export CSS fallback used:', error);
            }

            return getWorksheetExportFallbackStyles();
        };

        const buildWorksheetHTMLDocument = async () => {
            const inlineStyles = await getWorksheetExportStyles();
            const worksheetData = JSON.stringify(taskGeneration.getTaskExportData());
            const toggleLabel = state.showWorksheetSolutions.value ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';

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
								<span class="worksheet-header-gt">GT ${state.gtNumber.value}</span>
							</div>
							<div class="worksheet-header-copy">
								<span>Name:</span>
								<span class="worksheet-header-gt">GT ${state.gtNumber.value}</span>
							</div>
						</div>
						<div class="worksheet-list">${buildWorksheetRowsHTML()}</div>
					</div>
				</div>

				<script>
					const worksheetData = ${worksheetData};
					let showSolutions = ${state.showWorksheetSolutions.value};

					function toggleWorksheetSolutions() {
						showSolutions = !showSolutions;
						document.querySelectorAll('.task-text').forEach(element => element.style.display = showSolutions ? 'none' : 'block');
						document.querySelectorAll('.sol-text').forEach(element => element.style.display = showSolutions ? 'block' : 'none');
						document.getElementById('toggleBtn').innerText = showSolutions ? 'Aufgaben anzeigen' : 'Lösungen anzeigen';
						if (window.MathJax?.typesetPromise) {
							window.MathJax.typesetPromise();
						}
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
            printWorksheet,
            downloadWorksheetHTML,
            generateWorksheet,
            exportWorksheetJSON
        };
    }
};
