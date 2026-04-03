const { createApp, ref, computed, nextTick } = Vue;

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
        const showSolutions = ref(false);
        const viewMode = ref(false);
		const isDarkMode = ref(false);
        const selectedTypes = ref([]);
        
        // NEUE STATE VARIABLEN
        const taskCount = ref(10);
        const mentalMathMode = ref(false);

        // NEU: Berechnet dynamisch die Mitte für die zwei Spalten
        const halfCount = computed(() => Math.ceil(tasks.value.length / 2));
        
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
		

        const generateAll = async () => {
           if (selectedTypes.value.length === 0) return;
			
			const types = [...selectedTypes.value]; // Kopie der Auswahl
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
					text: generated.text,
					solution: generated.solution
				};
			});
            
            showSolutions.value = false;
            viewMode.value = true;

            await nextTick();
            await typesetMathJax();
        };

        // --- NEU: JSON Export ---
        const exportJSON = () => {
            const dataToExport = tasks.value.map(t => ({
                aufgabentyp: t.type,
                aufgabe: t.text,
                loesung: t.solution
            }));
            
            const dataStr = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `mathe_aufgaben_${taskCount.value}.json`;
            a.click();
            URL.revokeObjectURL(url);
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
								<div class="math task-text">${t.text}</div>
								<div class="math sol-text" style="display:none; color: #16a34a; font-weight: 500;">${t.solution}</div>
							</div>`).join('')}
					</div>
					
					<div class="column">
						${col2.map((t, i) => `
							<div class="task-row">
								<div class="num">${i + half + 1}</div>
								<div class="math task-text">${t.text}</div>
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

        return { 
            tasks, 
            showSolutions, 
            viewMode, 
			isDarkMode,
			invertSelection,
            selectedTypes, 
            typeLabels, 
            taskCount,
            mentalMathMode,
            halfCount,
            generateAll,
            toggleSolutions,
			toggleDarkMode,
            exportJSON,
            exportHTML,
            taskCategories
        };
    }
}).mount('#app');
