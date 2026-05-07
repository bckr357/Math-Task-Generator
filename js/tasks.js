// ============================================================
// AUFGABEN-KATEGORIEN & TYPEN-LABELS
// ============================================================

const fmt = formatUtils.fmt;
const comma = formatUtils.comma;
const formatDecimal = formatUtils.formatDecimal;

const taskCategories = {
	arithmetic: ['z_as', 'z_md', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'db_as', 'db_md', 'pow10', 'round', 'zahlengerade', 'vorrang'],
	tables: ['table_add', 'table_mul', 'table_sub', 'table_terms'],
	fractions: ['frac_as', 'frac_md', 'frac_simplify', 'frac_convert', 'frac_order'],
	percent: ['anteile', 'prop', 'percent', 'pv', 'units'],
	algebra: ['terme', 'equations', 'equations_adv', 'formel_umstellen'],
	geometry: ['geometry', 'winkel', 'schraegbild', 'kongruenz'],
	functions: ['funktionen'],
	statistics: ['statistik', 'wkt'],
	advanced: ['teiler', 'primzahlen']
};

// Sichtbare Aufgabentypen je Klassenstufe (wird vom UI-Dropdown genutzt)
const taskTypesByGrade = {
	klasse5: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add',  'table_sub', 'table_mul','table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'geometry', 'winkel', 'schraegbild', 'statistik'
	],
	klasse6: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add',  'table_sub', 'table_mul','table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'percent', 'geometry', 'winkel', 'schraegbild', 'statistik', 'wkt'
	],
	klasse7: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order',
		'anteile', 'prop', 'percent', 'pv', 
		'terme', 'word_terms', 'equations', 'equations_lin', 'formel_umstellen',
		'round', 'zahlengerade', 'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function'
	],
	klasse8: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'prop', 'percent', 'pv', 
		'terme', 'word_terms', 'equations', 'equations_adv', 'equations_lin', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function'
	],
	klasse9: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'prop', 'percent', 'pv', 
		'terme', 'word_terms', 'equations', 'equations_adv', 'equations_lin', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function'
	],
	klasse10: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'prop', 'percent', 'pv', 
		'terme', 'word_terms', 'equations', 'equations_adv', 'equations_lin', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz',
		'statistik', 'wkt', 'linear_function', 'funktionen'
	]
};

const quizTaskTypesByGrade = {
	klasse5: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add',  'table_sub', 'table_mul','table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'geometry', 'winkel', 'schraegbild', 'statistik'
	],
	klasse6: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add',  'table_sub', 'table_mul','table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'percent', 'geometry', 'winkel', 'schraegbild', 'statistik', 'wkt'
	],
	klasse7: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order',
		'anteile', 'prop', 'percent', 'pv', 
		'equations', 'equations_lin', 'formel_umstellen',
		'round', 'zahlengerade', 'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt'
	],
	klasse8: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'prop', 'percent', 'pv', 
		'equations', 'equations_adv', 'equations_lin', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt'
	],
	klasse9: [
		'teiler', 'primzahlen', 'units', 'potenzen', 'schriftlich_as', 'schriftlich_md', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'prop', 'percent', 'pv', 
		'equations', 'equations_adv', 'equations_lin', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt'
	],
	klasse10: [
		'teiler', 'units', 'potenzen', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang', 'primzahlen',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round', 'zahlengerade',
		'anteile', 'prop', 'percent', 'pv', 'word_terms',
		'equations', 'geometry', 'winkel', 'statistik', 'wkt'
	]
};

/* TODO / Roadmap 
 - Grafik-Modus 
 - Bild für Geradenkreuzung oder IWS einbinden 
 - Funktionen einbauen  
 - Berechnungen an Körpern etc. auf einer Website (excel sheet ersetzen) 
 - Aufgaben mit Hilfsmitteln einbauen (z. B. Berechnungen an Flächen und Körpern, Funktionen)
 - Funktionen (Fktswert, Arguemnt, Punktprobe, fehlende Koordninaten berechnen, Wertetaeblle, Graoh zeichnen, Nullstellen usw.) 
 - Kombinatorik 
 - Punkte pro Aufgabe (auch in der Lösung oder beim interaktiven Modus) 
 - Verschiedenes mit Bildern zum Einbinden (z. B. Geometrie, Funktionen, Statistik)
 - Zahl zwischen Brüchen 
 - Bruch zwischen zwei Brüchen 
*/

// Dreiteilige Typ-Definition: [key, Label fuer Einstellungen, Beschreibung fuer Training]
const typeDefinitions = [
	// Zahlentheorie / fortgeschrittene Themen
	['teiler', 'Teiler', 'Teiler einer Zahl bestimmen'],
	['primzahlen', 'Primzahlen', 'Primzahlen finden'], 
	['units', 'Einheiten', 'Größen in verschiedene Einheiten umrechnen'],
	
	// Arithmetik: Ganze Zahlen, Dezimalbrüche, Stellenwerte
	['potenzen', 'Potenzen und Wurzeln', 'Potenzen und Wurzeln berechnen'],
	['schriftlich_as', 'schriftlich rechnen +/-', 'Schriftliche Addition und Subtraktion'],
	['schriftlich_md', 'schriftlich rechnen ×/÷', 'Schriftliche Multiplikation und Division'],
	['z_as', 'Ganze Zahlen +/-', 'Ganze Zahlen addieren und subtrahieren'],
	['z_md', 'Ganze Zahlen ×/÷', 'Ganze Zahlen multiplizieren und dividieren'],
	['db_as', 'Dezimalbrüche +/-', 'Dezimalbrüche addieren und subtrahieren'],
	['db_md', 'Dezimalbrüche ×/÷', 'Dezimalbrüche multiplizieren und dividieren'],
	['pow10', 'Zehnerpotenzen ×/÷', 'Multiplikation und Division mit Zehnerpotenzen'],
	['vorrang', 'Vorrangregeln', 'Terme mit Vorrangregeln berechnen'],
	
	// Tabellen / Kopfrechnen
	['table_add', 'Additionstabelle', 'Tabellenaufgaben mit Summen'],
	['table_sub', 'Subtraktionstabelle', 'Tabellenaufgaben mit Differenzen'],
	['table_mul', 'Multiplikationstabelle', 'Tabellenaufgaben mit Produkten'],
	['table_terms', 'Termtabelle', 'Terme mit Variablen'],
	
	// Brüche
	['frac_simplify', 'Brüche kürzen', 'Brüche vollständig kürzen'],
	['frac_convert', 'Brüche umwandeln', 'Brüche, Dezimalzahlen und Prozentwerte umwandeln'],
	['frac_as', 'Brüche +/-', 'Brüche addieren und subtrahieren'],
	['frac_md', 'Brüche ×/÷', 'Brüche multiplizieren und dividieren'],
	['frac_order', 'Brüche ordnen', 'Brüche der Größe nach sortieren'],
	['round', 'Dezimalbrüche runden', 'Dezimalbrüche runden'],
	['zahlengerade', 'Zahlenstrahl', 'Zahlenstrahl-Aufgaben lesen, eintragen und zeichnen'],
	
	// Prozent / Proportionalität / Maßeinheiten
	['anteile', 'Anteile berechnen', 'Anteile berechnen'],
	['prop', 'Proportionalitäten', 'Aufgaben zur direkten Proportionalität'],
	['percent', 'Prozentrechnung', 'Prozentwert, Grundwert und Prozentsatz berechnen'],
	['pv', 'Prozentuale Veränderung', 'Prozentuale Zu- und Abnahmen berechnen'],

	// Algebra / Terme / Gleichungen
	['terme', 'Terme', 'Terme zusammenfassen und Klammern auflösen'],
	['word_terms', 'Wortterme', 'Wortterme in mathematische Symbole übersetzen und berechnen'],
	['equations', 'lin. Gl. ax+b = c', 'Lineare Gleichung der Form ax + b = c lösen'],
	['equations_adv', 'lin. Gl. ax+b = cx+d', 'Lineare Gleichung der Form ax + b = cx + d lösen'],
	['equations_lin', 'lin. Gl. umstellen', 'Lineare Gleichungen nach y umstellen'],
	['formel_umstellen', 'Formeln umstellen', 'Formeln nach einer anderen Variablen umstellen'],

	// Geometrie
	['geometry', 'A und u ebener Figuren', 'Flächeninhalte und Umfänge berechnen'],
	['winkel', 'Winkel', 'Winkel zeichnen und berechnen'],
	['schraegbild', 'Schrägbilder', 'Schrägbilder von Körpern zeichnen'],
	['kongruenz', 'Kongruenzsätze', 'Dreiecke mit Kongruenzsätzen konstruieren'],

	// Funktionen, Statistik & Wahrscheinlichkeiten
	['wkt', 'Wahrscheinlichkeiten', 'Wahrscheinlichkeiten bestimmen'],
	['linear_function', 'Lineare Funktionen zeichnen', 'Lineare Funktionen grafisch darstellen'],
	['funktionen', 'Funktionen', 'Funktionswerte, Argumente und Eigenschaften von Funktionen bestimmen'],
	['statistik', 'Statistik', 'Kenngrößen der Statistik bestimmen']
];

const typeLabels = Object.fromEntries(typeDefinitions.map(([key, label]) => [key, label]));
const typeDescriptions = Object.fromEntries(typeDefinitions.map(([key, , description]) => [key, description]));

if (typeof window !== 'undefined') {
	window.typeLabels = typeLabels;
}

const typeOrderIndex = Object.fromEntries(typeDefinitions.map(([key], index) => [key, index]));
function sortByTypeDefinitions(types) {
	return [...types].sort((a, b) => {
		const indexA = typeOrderIndex[a] ?? Number.MAX_SAFE_INTEGER;
		const indexB = typeOrderIndex[b] ?? Number.MAX_SAFE_INTEGER;
		if (indexA !== indexB) {
			return indexA - indexB;
		}
		return a.localeCompare(b);
	});
}

// ============================================================
// AUFGABEN-GENERATOR
// ============================================================

function createTask(type, isMentalMode, grade = 5, options = {}) {
	if (!Number.isFinite(grade)) {
		grade = 5;
	}

	const isTraining = Boolean(options.training);
	let s = '';
	let textDisplay = '', textPrint = '';

	const blank = (cmWidth = 3) => `\\(\\underline{\\hspace{${cmWidth}cm}}\\)`;
	const space = (cmWidth = 1) => `<div style="margin-bottom: ${cmWidth}cm;"></div>`;
	const karo = (rows = 4, cols = 10, cellSizeCm = 0.5) => {
		let rowsHtml = '';
		for (let r = 0; r < rows; r++) {
			rowsHtml += '<tr>';
			for (let c = 0; c < cols; c++) {
				rowsHtml += '<td></td>';
			}
			rowsHtml += '</tr>';
		}

		return `<table class="karo-placeholder" style="--karo-rows:${rows}; --karo-cols:${cols}; --karo-size:${cellSizeCm}cm;">` +
			`<tbody>${rowsHtml}</tbody></table>`;
	};

	const pickDistinctIntegers = (min, max, count) => {
		const values = new Set();
		while (values.size < count) {
			values.add(rnd(min, max));
		}
		return [...values];
	};

	const valueOrBlank = (value, isGiven, cmWidth = 1.5) => {
		// Bei alleinstehenden Kopf- oder Zellenwerten keine Klammerung;
		// nur leere Felder als Unterstreichung darstellen.
		return isGiven ? `${value}` : '';
	};

	const buildOpTableHTML = ({
		colHeaders,
		rowHeaders,
		cellValues,
		givenColHeader,
		givenRowHeader,
		givenCells,
		opSymbol
	}) => {
		const headerCells = colHeaders.map((val, index) =>
			`<th>${valueOrBlank(val, Boolean(givenColHeader[index]))}</th>`
		).join('');

		const bodyRows = rowHeaders.map((rowVal, rowIndex) => {
			const rowHeader = `<th>${valueOrBlank(rowVal, Boolean(givenRowHeader[rowIndex]))}</th>`;
			const rowCells = colHeaders.map((_, colIndex) => {
				const key = `${rowIndex}-${colIndex}`;
				const value = cellValues[rowIndex][colIndex];
				const isGiven = Boolean(givenCells[key]);
				return `<td>${valueOrBlank(value, isGiven, 1.6)}</td>`;
			}).join('');

			return `<tr>${rowHeader}${rowCells}</tr>`;
		}).join('');

		return `
			<div class="op-table-wrap">
				<table class="op-table">
					<tr><th class="op-corner">${opSymbol}</th>${headerCells}</tr>
					${bodyRows}
				</table>
			</div>
		`;
	};

	const buildTwoColumnTaskTable = (cells) => {
		const cellHtml = cells.map(cell =>
			`<td class="two-column-task-cell">${cell}</td>`
		).join('');

		return `<table class="two-column-task"><tr>${cellHtml}</tr></table>`;
	};

	// Beispiel für die Nutzung von isMentalMode:
	// if (isMentalMode) { Z1 = rnd(2, 5); } else { Z1 = rnd(5, 20); }

	let v1, v2;
	let rd;
	switch (type) {

		case 'table_add':
		case 'table_mul': {
			const isAdd = type === 'table_add';
			const min = isAdd ? -20 : -13;
			const max = isAdd ? 20 : 13;
			const allValues = pickDistinctIntegers(min, max, 7);
			const rowHeaders = allValues.slice(0, 2);
			const colHeaders = allValues.slice(2);

			const cellValues = rowHeaders.map(r => colHeaders.map(c => isAdd ? r + c : r * c));

			const hiddenRowIndex = 1;
			const hiddenColIndex = randInt(2, 4);
			const clueColIndex = hiddenColIndex === 0 ? 1 : 0;
			const clueRowIndex = hiddenRowIndex === 0 ? 1 : 0;

			const givenRowHeader = [true, true];
			const givenColHeader = [true, true, true, true, true];
			givenRowHeader[hiddenRowIndex] = false;
			givenColHeader[hiddenColIndex] = false;

			const givenCells = {
				[`${hiddenRowIndex}-${clueColIndex}`]: true,
				[`${clueRowIndex}-${hiddenColIndex}`]: true
			};

			const opSymbol = isAdd ? '+' : '×';

			textDisplay = buildOpTableHTML({
				colHeaders,
				rowHeaders,
				cellValues,
				givenColHeader,
				givenRowHeader,
				givenCells,
				opSymbol,
			});

			const solvedTableRows = rowHeaders.map((rowVal, rowIndex) => {
				const rowCells = colHeaders.map((colVal, colIndex) => {
					const result = cellValues[rowIndex][colIndex];
					return `<td>${result}</td>`;
				}).join('');
				return `<tr><th>${rowVal}</th>${rowCells}</tr>`;
			}).join('');

			s = `
				<div class="op-table-wrap">
					<table class="op-table op-table--solution">
						<tr><th class="op-corner">${opSymbol}</th>${colHeaders.map(c => `<th>${c}</th>`).join('')}</tr>
						${solvedTableRows}
					</table>
				</div>
			`;
			break;
		}

		case 'table_sub': {
			const min = -20, max = 20;
			const allValues = pickDistinctIntegers(min, max, 7);
			const rowHeaders = allValues.slice(0, 2);
			const colHeaders = allValues.slice(2);

			const cellValues = rowHeaders.map(r => colHeaders.map(c => r - c));

			const hiddenRowIndex = 1;
			const hiddenColIndex = randInt(2, 4);
			const clueColIndex = hiddenColIndex === 0 ? 1 : 0;
			const clueRowIndex = hiddenRowIndex === 0 ? 1 : 0;

			const givenRowHeader = [true, true];
			const givenColHeader = [true, true, true, true, true];
			givenRowHeader[hiddenRowIndex] = false;
			givenColHeader[hiddenColIndex] = false;

			const givenCells = {
				[`${hiddenRowIndex}-${clueColIndex}`]: true,
				[`${clueRowIndex}-${hiddenColIndex}`]: true
			};

			const opSymbol = '&#8210';
			textDisplay = buildOpTableHTML({
				colHeaders,
				rowHeaders,
				cellValues,
				givenColHeader,
				givenRowHeader,
				givenCells,
				opSymbol,
			});

			const solvedTableRows = rowHeaders.map((rowVal, rowIndex) => {
				const rowCells = colHeaders.map((colVal, colIndex) => {
					const result = cellValues[rowIndex][colIndex];
					return `<td>${result}</td>`;
				}).join('');
				return `<tr><th>${rowVal}</th>${rowCells}</tr>`;
			}).join('');

			s = `
				<div class="op-table-wrap">
					<table class="op-table op-table--solution">
						<tr><th class="op-corner">${opSymbol}</th>${colHeaders.map(c => `<th>${c}</th>`).join('')}</tr>
						${solvedTableRows}
					</table>
				</div>
			`;
			break;
		}

		case 'table_terms': {
			const createTermDescriptor = (patternIndex = null) => {
				const patterns = [
					() => {
						const a = rnd(-4, 4);
						const b = rnd(-20, 20);
						const expr = `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`;
						return {
							expr,
							evalFn: x => a * x + b,
							substitute: x => b >= 0 ? `${a*x} + ${Math.abs(b)}` : `${a*x} - ${Math.abs(b)}`,
							// substitute: x => `${a}\\cdot${fmt(x)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`
						};
					},
					() => {
						const a = rnd(-6, 6);
						const b = rnd(-20, 20);
						const expr = `${a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`;
						return {
							expr,
							evalFn: x => a * x * x + b,
							substitute: x => b >= 0 ? `${a*x*x} + ${Math.abs(b)}` : `${a*x*x} - ${Math.abs(b)}`,
							// substitute: x => `${a}\\cdot${fmt(x)}^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`
						};
					},
					() => {
						const a = rnd(-5, 5);
						const b = rnd(-4, 4);
						const expr = `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x^2`;
						return {
							expr,
							evalFn: x => a * x + (b >= 0 ? 1 : -1) * Math.abs(b) * x * x,
							substitute: x => b >= 0 ? `${a*x} + ${Math.abs(b)*x*x}` : `${a*x} - ${Math.abs(b)*x*x}`,
							// substitute: x => `${a}\\cdot${fmt(x)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}\\cdot${fmt(x)}^2`
						};
					}
				];

				if (patternIndex === null) {
					patternIndex = randInt(0, patterns.length - 1);
				}

				return patterns[patternIndex]();
			};

			const term1 = createTermDescriptor(0);
			let term2 = createTermDescriptor(randInt(1, 2));
			while (term1.expr === term2.expr) {
				term2 = createTermDescriptor(randInt(1, 2));
			}

			const xValues = [rnd(2,5),rnd(-5,-2)];
			const rawResults = [
				[term1.evalFn(xValues[0]), term2.evalFn(xValues[0])],
				[term1.evalFn(xValues[1]), term2.evalFn(xValues[1])]
			];

			const resultTable = rawResults.map(row => row.map(val => Number.isInteger(val) ? val : Number(val.toFixed(2))));

			textDisplay = `
				<div class="op-table-wrap">
					<table class="op-table op-table--terms">
						<tr>
							<th class="op-corner">\\( x \\)</th>
							<th>\\( ${term1.expr} \\)</th>
							<th>\\( ${term2.expr} \\)</th>
						</tr>
						<tr>
							<th>${xValues[0]}</th>
							<td> </td>
							<td> </td>
						</tr>
						<tr>
							<th>${xValues[1]}</th>
							<td> </td>
							<td> </td>
						</tr>
					</table>
				</div>
			`;

			s = `
				<div class="op-table-wrap">
					<table class="op-table op-table--solution op-table--terms">
						<tr>
							<th class="op-corner">x</th>
							<th>\\( ${term1.expr} \\)</th>
							<th>\\( ${term2.expr} \\)</th>
						</tr>
						<tr>
							<th>${xValues[0]}</th>
							<td>\\( ${term1.substitute(xValues[0])} = ${resultTable[0][0]} \\)</td>
							<td>\\( ${term2.substitute(xValues[0])} = ${resultTable[0][1]} \\)</td>
						</tr>
						<tr>
							<th>${xValues[1]}</th>
							<td>\\( ${term1.substitute(xValues[1])} = ${resultTable[1][0]} \\)</td>
							<td>\\( ${term2.substitute(xValues[1])} = ${resultTable[1][1]} \\)</td>
						</tr>
					</table>
				</div>
			`;
			break;
		}

		case 'db_as': {
			const allowNegativeDecimals = grade >= 7;

			const createDbAsEntry = () => {
				let expr;
				let solution;
				let a = allowNegativeDecimals ? trueDec(-15, 15) : trueDec(14, 30);
				let b = allowNegativeDecimals ? trueDec(-15, 15) : trueDec(0, 13);

				if (Math.random() > 0.5) {
					expr = `\\[ ${comma(a)} + ${comma(fmt(b))} = \\]`;
					solution = `\\[ ${comma(a)} + ${comma(fmt(b))} = ${comma((a + b).toFixed(1))} \\]`;
				} else {
					expr = `\\[ ${comma(a)} - ${comma(fmt(b))} = \\]`;
					solution = `\\[ ${comma(a)} - ${comma(fmt(b))} = ${comma((a - b).toFixed(1))} \\]`;
				}
				return { expr, solution };
			};

			const entry = createDbAsEntry();
			textDisplay = entry.expr;
			s = entry.solution;
			break;
		}

		case 'db_md': {
			const allowNegativeDecimals = grade >= 7;

			const createDbMdEntry = () => {
				let expr;
				let solution;
				const rdLocal = Math.random();

				if (rdLocal > 0.7) {
					const a = allowNegativeDecimals ? trueDec(-9, 9) : trueDec(0, 9);
					const b = allowNegativeDecimals ? rnd(-7, 7) : rnd(2, 7);
					expr = `\\( ${comma(a)} \\cdot ${comma(fmt(b))} =\\)`;
					solution = `\\( ${comma(a)} \\cdot ${comma(fmt(b))} = ${comma((a * b).toFixed(1))} \\)`;
				} else if (rdLocal > 0.4) {
					const a = allowNegativeDecimals ? trueDec(-1.5, 1.5) : trueDec(0, 1.5);
					const b = allowNegativeDecimals ? trueDec(-1.5, 1.5) : trueDec(0, 1.5);
					expr = `\\[ ${comma(a)} \\cdot ${comma(fmt(b))} = \\]`;
					solution = `\\[ ${comma(a)} \\cdot ${comma(fmt(b))} = ${comma((a * b).toFixed(2))} \\]`;
				} else {
					const res = allowNegativeDecimals ? trueDec(-1.5, 1.5) : trueDec(0, 1.5);
					let b = allowNegativeDecimals ? rnd(-9, 9) : rnd(2, 9);
					while (b === 0) {
						b = allowNegativeDecimals ? rnd(-9, 9) : rnd(2, 9);
					}
					const a = res * b;
					expr = `\\[ ${comma(a.toFixed(1))} : ${comma(fmt(b))} = \\]`;
					solution = `\\[ ${comma(a.toFixed(1))} : ${comma(fmt(b))} = ${comma(res.toFixed(1))} \\]`;
				}
				return { expr, solution };
			};

			if (isTraining) {
				const entry = createDbMdEntry();
				textDisplay = entry.expr;
				s = entry.solution;
			} else {
				const entries = [createDbMdEntry(), createDbMdEntry()];
				textDisplay = buildTwoColumnTaskTable(entries.map(item => item.expr));
				s = buildTwoColumnTaskTable(entries.map(item => item.solution));
			}
			break;
		}

		case 'z_as': {
			const createZAsEntry = () => {
				let expr;
				let solution;
				if (Math.random() > 0.5) {
					do {
						v1 = rnd(-20, 20);
						v2 = rnd(-20, 20);
					} while (!(v1 < 0 || v2 < 0 || (v1 + v2) < 0));
					expr = `\\( ${v1} + ${fmt(v2)} =\\)`;
					const sum = v1 + v2;
					if (v2 < 0) {
						solution = `\\[ ${v1} + ${fmt(v2)} = ${v1} - ${Math.abs(v2)} = ${sum} \\]`;
					} else {
						solution = `\\[ ${v1} + ${fmt(v2)} = ${sum} \\]`;
					}
				} else {
					do {
						v1 = rnd(-20, 20);
						v2 = rnd(-20, 20);
					} while (!(v1 < 0 || v2 < 0 || (v1 - v2) < 0));
					expr = `\\[ ${v1} - ${fmt(v2)} = \\]`;
					const diff = v1 - v2;
					if (v2 < 0) {
						solution = `\\[ ${v1} - ${fmt(v2)} = ${v1} + ${Math.abs(v2)} = ${diff} \\]`;
					} else {
						solution = `\\[ ${v1} - ${fmt(v2)} = ${diff} \\]`;
					}
				}
				return { expr, solution };
			};

			if (isTraining) {
				const entry = createZAsEntry();
				textDisplay = entry.expr;
				s = entry.solution;
			} else {
				const entries = [createZAsEntry(), createZAsEntry()];
				textDisplay = buildTwoColumnTaskTable(entries.map(item => item.expr));
				s = buildTwoColumnTaskTable(entries.map(item => item.solution));
			}
			break;
		}

		case 'z_md': {
			const createZMdEntry = () => {
				let expr;
				let solution;
				if (Math.random() > 0.5) {
					do {
						v1 = rnd(-15, 15);
						v2 = rnd(-9, 9);
					} while (!(v1 < 0 || v2 < 0 || (v1 * v2) < 0));
					expr = `\\[ ${v1} \\cdot ${fmt(v2)} = \\]`;
					solution = `\\[ ${v1} \\cdot ${fmt(v2)} = ${v1 * v2} \\]`;
				} else {
					let res;
					do {
						res = rnd(-9, 9);
						v2 = rnd(-12, 12);
					} while (v2 === 0 || !(res < 0 || v2 < 0 || (res * v2) < 0));
					v1 = res * v2;
					expr = `\\[ ${v1} : ${fmt(v2)} = \\]`;
					solution = `\\[ ${v1} : ${fmt(v2)} = ${res} \\]`;
				}
				return { expr, solution };
			};

			if (isTraining) {
				const entry = createZMdEntry();
				textDisplay = entry.expr;
				s = entry.solution;
			} else {
				const entries = [createZMdEntry(), createZMdEntry()];
				textDisplay = buildTwoColumnTaskTable(entries.map(item => item.expr));
				s = buildTwoColumnTaskTable(entries.map(item => item.solution));
			}
			break;
		}

		case 'pow10': {
			const createPow10Entry = () => {
				// Zehnerpotenzen: natürliche Zahl oder Dezimalbruch mit 10, 100 oder 1000
				const powers = [0.1, 0.01, 10, 10, 100, 100, 1000];
				const power = powers[randInt(0, 6)];
				const isMult = Math.random() > 0.5;

				// Operand: entweder natürliche Zahl oder Dezimalbruch (1-2 Stellen)
				let operand;
				let isDecimal;

				if (Math.random() > 0.5) {
					// Dezimalbruch mit 1-2 Stellen nach Komma
					isDecimal = true;
					const isDec2 = Math.random() > 0.5;
					if (isDec2) {
						operand = rnd(111, 14999) / 100; // 1,11 bis 149,99
					} else {
						operand = rnd(2, 1499) / 10; // 0,2 bis 149,9
					}
				} else {
					// Natürliche Zahl
					isDecimal = false;
					operand = rnd(2, 299);
				}

				const op = isMult ? '\\cdot' : ':';
				let result;
				let resultStr;

				if (isMult) {
					result = operand * power;
					resultStr = formatDecimal(result, 2);
				} else {
					result = operand / power;
					// Bei Division: immer mit angemessener Dezimalgenauigkeit
					resultStr = formatDecimal(result, 4);
				}

				// Formatierung des Operanden
				const operandStr = isDecimal ? comma(operand) : operand.toString();

				// Aufgabe
				const expr = `\\[ ${operandStr} ${op} ${comma(power)} =\\]`;

				// Lösung mit Erklärung der Kommaverschiebung/Stellenwertverschiebung
				// const shiftCount = power === 10 ? 1 : power === 100 ? 2 : 3;
				// const shiftDirection = isMult ? '&#x2192;' : '&#x2190;';
				// const shiftDescription = `(Komma ${shiftCount} x ${shiftDirection})`;
				let solution;
				// const solution = `\\( ${operandStr} ${op} ${power} = ${comma(resultStr)} \\quad \\text{${shiftDescription}}\\)`;
				if (power < 1 && isMult) solution = `\\[ ${operandStr} ${op} ${comma(power)} = ${comma(resultStr)} \\quad ( : ${1 / power} )\\]`;
				else if (power < 1 && !isMult) solution = `\\[ ${operandStr} ${op} ${comma(power)} = ${comma(resultStr)} \\quad ( \\cdot ${1 / power} )\\]`;
				else solution = `\\[ ${operandStr} ${op} ${comma(power)} = ${comma(resultStr)} \\]`;
				return { expr, solution };
			};

			if (isTraining) {
				const entry = createPow10Entry();
				textDisplay = entry.expr;
				s = entry.solution;
			} else {
				const entries = [createPow10Entry(), createPow10Entry()];
				textDisplay = buildTwoColumnTaskTable(entries.map(item => item.expr));
				s = buildTwoColumnTaskTable(entries.map(item => item.solution));
			}
			break;
		}

		case 'frac_as': {
			const getGcd = mathUtils.getGcd;

			// Erzeugt einen vollständig gekürzten Bruch.
			// Zähler darf 1 sein, Nenner liegt bewusst bei 2..9.
			const makeCoprimeFraction = (minNum = 2, maxNum = 10, minDen = 2, maxDen = 9, forbiddenDen = null) => {
				let num, den;
				do {
					num = rnd(minNum, maxNum) - 1;   // 1 ist explizit erlaubt
					den = rnd(minDen, maxDen);
				} while (getGcd(num, den) !== 1 || den === forbiddenDen);
				return [num, den];
			};

			// Erster Bruch
			let [z1, n1] = makeCoprimeFraction();

			// Zweiter Bruch: ebenfalls teilerfremd, aber mit verschiedenem Nenner
			let [z2, n2] = makeCoprimeFraction(1, 9, 2, 9, n1);

			const isAdd = Math.random() > 0.5;

			// Bei Subtraktion sicherstellen, dass das Ergebnis positiv bleibt
			if (!isAdd && (z1 * n2 <= z2 * n1)) {
				[z1, z2] = [z2, z1];
				[n1, n2] = [n2, n1];
			}

			// Hauptnenner
			const hn = (n1 * n2) / getGcd(n1, n2);

			const f1 = hn / n1;
			const f2 = hn / n2;

			const ez1 = z1 * f1;
			const ez2 = z2 * f2;

			const op = isAdd ? '+' : '-';
			const finalZ = isAdd ? ez1 + ez2 : ez1 - ez2;

			textDisplay = `Berechne: \\( \\quad \\dfrac{${z1}}{${n1}} ${op} \\dfrac{${z2}}{${n2}} = \\)`;

			// Dynamischer Lösungsweg
			let step1 = "";
			if (f1 > 1 && f2 > 1) {
				step1 = `\\frac{${z1} \\cdot ${f1} ${op} ${z2} \\cdot ${f2}}{${n1} \\cdot ${f1}} = \\frac{${ez1} ${op} ${ez2}}{${hn}}`;
			} else if (f1 > 1) {
				step1 = `\\frac{${z1} \\cdot ${f1}}{${n1} \\cdot ${f1}} ${op} \\frac{${z2}}{${n2}} = \\frac{${ez1} ${op} ${ez2}}{${hn}}`;
			} else if (f2 > 1) {
				step1 = `\\frac{${z1}}{${n1}} ${op} \\frac{${z2} \\cdot ${f2}}{${n2} \\cdot ${f2}} = \\frac{${ez1} ${op} ${ez2}}{${hn}}`;
			} 
			s = `\\[ \\frac{${z1}}{${n1}} ${op} \\frac{${z2}}{${n2}} = ${step1} = \\frac{${finalZ}}{${hn}} \\]`;
			break;
		}

		case 'frac_md': {
			let Z1, N1, Z2, N2, z1_base, n1_base, z2_base, n2_base, isMult;

			const getGcd = mathUtils.getGcd;
			const useNaturalNumberVariant = Math.random() < 0.30;

			if (useNaturalNumberVariant) {
				let n;
				isMult = Math.random() > 0.5;
				let resultZ;
				let resultN;

				do {
					if (isMentalMode) {
						Z1 = rnd(2, 9);
						N1 = rnd(2, 9);
						n = rnd(2, 9);
					} else {
						Z1 = rnd(2, 15);
						N1 = rnd(2, 15);
						n = rnd(2, 13);
					}

					resultZ = isMult ? Z1 * n : Z1;
					resultN = isMult ? N1 : N1 * n;
				} while (
					getGcd(Z1, N1) > 1 ||
					getGcd(N1, n) > 1 ||
					getGcd(Z1, n) > 1 ||
					getGcd(resultZ, resultN) > 1
				);

				const op = isMult ? '\\cdot' : ':';
				const resZ = resultZ;
				const resN = resultN;
				const step1 = isMult
					? `\\frac{${Z1}}{${N1}} \\cdot \\frac{${n}}{1}`
					: `\\frac{${Z1}}{${N1}} \\cdot \\frac{1}{${n}}`;

				textDisplay = `Berechne: \\( \\quad \\dfrac{${Z1}}{${N1}} ${op} ${n} = \\)`;
				s = `\\[ \\frac{${Z1}}{${N1}} ${op} ${n} = ${step1} = \\frac{${resZ}}{${resN}} \\]`;
				break;
			}

			if (isMentalMode) {
				isMult = Math.random() > 0.5;
				let finalZ;
				let finalN;

				do {
					Z1 = rnd(2, 9);
					N1 = rnd(2, 9);
					Z2 = rnd(2, 9);
					N2 = rnd(2, 9);

					finalZ = isMult ? Z1 * Z2 : Z1 * N2;
					finalN = isMult ? N1 * N2 : N1 * Z2;
				} while (
					new Set([Z1, N1, Z2, N2]).size < 4 ||
					getGcd(Z1, N1) > 1 ||
					getGcd(Z2, N2) > 1 ||
					getGcd(finalZ, finalN) > 1
				);

				const op = isMult ? '\\cdot' : ':';
				const step1 = isMult ? '' : `\\frac{${Z1}}{${N1}} \\cdot \\frac{${N2}}{${Z2}} = `;

				textDisplay = `Berechne: \\( \\quad \\dfrac{${Z1}}{${N1}} ${op} \\dfrac{${Z2}}{${N2}} = \\)`;
				s = `\\[ \\frac{${Z1}}{${N1}} ${op} \\frac{${Z2}}{${N2}} = ${step1} \\frac{${finalZ}}{${finalN}} \\]`;
			} else {
				do {
					isMult = Math.random() > 0.5;

					// 1. Erzeuge zwei Brüche, die in sich NICHT kürzbar sind
					let ta1 = rnd(6, 27), tb1 = rnd(6, 27);
					while (getGcd(ta1, tb1) > 1) { ta1 = rnd(6, 27); tb1 = rnd(6, 27); }

					let ta2 = rnd(6, 27), tb2 = rnd(6, 27);
					while (getGcd(ta2, tb2) > 1 || (ta1 == ta2 && tb1 == tb2)) { ta2 = rnd(6, 27); tb2 = rnd(6, 27); }

					// Zuweisung der "großen" Zahlen
					Z1 = ta1; N1 = tb1; Z2 = ta2; N2 = tb2;

					// 2. Bestimme die Kürzungs-Partner basierend auf der Operation
					// Bei Mult: Z1 mit N2 und N1 mit Z2
					// Bei Div:  Z1 mit Z2 und N1 mit N2 (wegen Kehrwert)
					let g1 = isMult ? getGcd(Z1, N2) : getGcd(Z1, Z2);
					let g2 = isMult ? getGcd(N1, Z2) : getGcd(N1, N2);

					// BEDINGUNGEN:
					// - g1 und g2 müssen > 1 sein (es MUSS über Kreuz kürzbar sein)
					// - Alle 4 Zahlen verschieden
					if (g1 > 1 && g2 > 1 && new Set([Z1, N1, Z2, N2]).size === 4) {
						// Berechne die Werte für den "midStep" (die gekürzten Zahlen)
						z1_base = Z1 / g1;
						n2_base = isMult ? N2 / g1 : Z2 / g1;
						n1_base = N1 / g2;
						z2_base = isMult ? Z2 / g2 : N2 / g2;
						break;
					}
				} while (true);

				const op = isMult ? '\\cdot' : ':';
				const resZ = z1_base * z2_base;
				const resN = n1_base * n2_base;

				// Kehrwert-Schritt (nur bei Division)
				let stepKehrwert = "";
				if (!isMult) {
					stepKehrwert = `\\frac{${Z1}}{${N1}} \\cdot \\frac{${N2}}{${Z2}} = `;
				}

				// MidStep nutzt die gekürzten Werte
				const midStep = `\\frac{${z1_base}}{${n1_base}} \\cdot \\frac{${z2_base}}{${n2_base}}`;

				textDisplay = `Berechne: \\( \\quad \\dfrac{${Z1}}{${N1}} ${op} \\dfrac{${Z2}}{${N2}} = \\)`;
				s = `\\[ \\frac{${Z1}}{${N1}} ${op} \\frac{${Z2}}{${N2}} = ${stepKehrwert}${midStep} = \\frac{${resZ}}{${resN}} \\]`;
			}
			break;
		}

		case 'frac_simplify': {
			const factors = isMentalMode ? [3, 4, 6, 8, 9, 12, 15, 20, 25] : [3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 18, 25];

			const getGcd = mathUtils.getGcd;
			const getPrimeFactors = mathUtils.getPrimeFactors;

			const k = factors[Math.floor(Math.random() * factors.length)];
			const pFactors = getPrimeFactors(k);

			let z_base, n_base, Z, N;

			do {
				z_base = rnd(2, 12);
				n_base = rnd(2, 12);
				Z = z_base * k;
				N = n_base * k;
			} while (Z === N || getGcd(z_base, n_base) > 1 || Z % N === 0 || N % Z === 0);

			textDisplay = `kürze vollständig: \\( \\quad\\dfrac{${Z}}{${N}} = \\)`;

			// Lösungsweg mit \underset unter dem Gleichheitszeichen
			let solutionSteps = `\\frac{${Z}}{${N}}`;
			let currentZ = Z;
			let currentN = N;

			pFactors.forEach(p => {
				currentZ /= p;
				currentN /= p;
				// Hier wird die Zahl p unter das Gleichheitszeichen gesetzt
				solutionSteps += ` \\underset{${p}}{=} \\frac{${currentZ}}{${currentN}}`;
			});

			s = `\\[ ${solutionSteps} \\]`;

			break;
		}

		case 'frac_order': {
			const getGcd = mathUtils.getGcd;

			const mainDenominators = isMentalMode
				? [12, 15, 18, 20, 24, 30, 36]
				: [12, 15, 18, 20, 24, 30, 36, 40, 42, 45, 48, 54, 60];

			const hn = mainDenominators[randInt(0, mainDenominators.length - 1)];

			const buildCloseExtendedSet = () => {
				const useImproper = Math.random() < 0.35;
				const maxImproperDelta = Math.max(1, Math.floor(hn * 0.10));

				let extNums;
				if (useImproper) {
					const improper = hn + randInt(1, maxImproperDelta);
					const properHigh = hn - randInt(1, 3);
					const properLow = properHigh - randInt(1, 2);
					extNums = [properLow, properHigh, improper];
				} else {
					const high = hn - randInt(1, 3);
					const mid = high - randInt(1, 2);
					const low = mid - randInt(1, 2);
					extNums = [low, mid, high];
				}

				extNums = extNums.map(value => Math.max(1, value));
				if (new Set(extNums).size !== 3) return null;
				if (Math.max(...extNums) - Math.min(...extNums) > 4) return null;

				return extNums;
			};

			const toReducedFraction = extNum => {
				const g = getGcd(extNum, hn);
				return [extNum / g, hn / g];
			};

			let fracs = null;
			let retries = 0;
			do {
				const extNums = buildCloseExtendedSet();
				if (!extNums) {
					retries += 1;
					continue;
				}

				const candidateFracs = extNums.map(extNum => ({
					orig: toReducedFraction(extNum),
					ext: extNum
				}));

				const uniqueFracCount = new Set(candidateFracs.map(f => `${f.orig[0]}/${f.orig[1]}`)).size;
				const denominatorVariety = new Set(candidateFracs.map(f => f.orig[1])).size;
				const improperFractions = candidateFracs.filter(f => f.orig[0] > f.orig[1]);
				const improperNearOne = improperFractions.every(f => (f.orig[0] / f.orig[1]) <= 1.15);

				if (
					uniqueFracCount === 3 &&
					denominatorVariety >= 2 &&
					improperFractions.length <= 1 &&
					improperNearOne
				) {
					fracs = candidateFracs;
				}

				retries += 1;
			} while (!fracs && retries < 120);

			if (!fracs) {
				const fallbackExt = [hn - 3, hn - 2, hn - 1];
				fracs = fallbackExt.map(extNum => ({
					orig: toReducedFraction(extNum),
					ext: extNum
				}));
			}

			// Zufällig mischen für die Aufgabenstellung
			const displayOrder = fisherYatesShuffle(fracs);
			// Aufsteigend sortiert für die Lösung
			const sortedAsc = [...fracs].sort((a, b) => a.ext - b.ext);

			const fmtFrac = ([n, d]) => `\\dfrac{${n}}{${d}}`;

			// Aufgabe: Brüche in zufälliger Reihenfolge, Lücken zum Eintragen
			const displayStr = displayOrder.map(f => fmtFrac(f.orig)).join(' \\quad ');

			// Erweiterungsschritt für jeden Bruch
			const extStep = displayOrder.map(f => {
				const factor = hn / f.orig[1];
				if (factor === 1) return `\\dfrac{${f.orig[0]}}{${f.orig[1]}}`;
				return `\\dfrac{${f.orig[0]}}{${f.orig[1]}} \\overset{${factor}}{=} \\dfrac{${f.ext}}{${hn}}`;
			}).join(' \\qquad ');

			// Sortierte Lösung
			const sortedStr = sortedAsc.map(f => fmtFrac(f.orig)).join(' < ');

			textDisplay = `Ordne von klein nach groß: \\( \\quad ${displayStr} \\)`;
			s = `\\[ ${sortedStr} \\quad \\left(${extStep}\\right) \\]`;
			break;
		}

		case 'frac_convert': {
			// Hilfsfunktionen für diesen Case
			const getGcd = mathUtils.getGcd;

			// Ermittelt den passenden Zehnerpotenz-Nenner (10 oder 100)
			const getP10 = (n) => (10 % n === 0) ? 10 : 100;

			// Erlaubte Nenner (garantieren saubere Zehnerpotenzen ohne Periode)

			let allowedDenoms = [2, 4, 5, 20, 25, 50];

			// Alle 10 expliziten Umwandlungspfade
			const paths = [
				'frac_to_dec', 'dec_to_frac',
				'frac_to_perc', 'perc_to_frac',
				'frac_to_mixed', 'mixed_to_frac',
				'dec_to_perc', 'perc_to_dec'
			];

			// Zufälligen Pfad auswählen
			let path = paths[Math.floor(Math.random() * paths.length)];
			switch (path) {
				// ---------------------------------------------------------
				// 1. Bruch <> Dezimalbruch
				// ---------------------------------------------------------
				case 'frac_to_dec': {
					let n, z, maxZ;
					let isTooEasy = true;

					// Gesamte Wahl von n und z wiederholen, wenn es "zu oft" 1/2 ist
					while (isTooEasy) {
						n = allowedDenoms[Math.floor(Math.random() * allowedDenoms.length)];
						maxZ = isMentalMode ? n * 2 : n * 3;

						// Zähler teilerfremd zu n würfeln
						do {
							z = randInt(1, maxZ);
						} while (getGcd(z, n) !== 1);

						// Veto-Check: Wenn der Bruch 1/2 ist, würfle mit 75% Chance neu
						if (z === 1 && n === 2) {
							if (Math.random() > 0.25) continue; // 75% Wahrscheinlichkeit für Neustart
						}

						isTooEasy = false; // Wir haben einen akzeptablen Bruch gefunden
					}

					let p10 = getP10(n);
					let mult = p10 / n;
					let decStr = formatDecimal(z / n, 4);

					textDisplay = `als Dezimalbruch: \\( \\quad \\dfrac{${z}}{${n}} = \\)`;

					if (n === p10) {
						s = `\\[ \\frac{${z}}{${n}} = ${decStr} \\]`;
					} else {
						s = `\\[ \\frac{${z}}{${n}} \\overset{${mult}}{=} \\frac{${z * mult}}{${p10}} = ${decStr} \\]`;
					}
					break;
				}

				case 'dec_to_frac': {
					let n, z;
					let isTooEasy = true;

					// 1. Exakt gleiche Generierungs-Logik wie bei frac_to_dec
					while (isTooEasy) {
						n = allowedDenoms[Math.floor(Math.random() * allowedDenoms.length)];
						let maxZ = isMentalMode ? n * 2 : n * 3;

						let attempts = 0;
						do {
							z = randInt(1, maxZ);
							attempts++;
							if (attempts > 50) { z = 1; break; }
						} while (getGcd(z, n) !== 1);

						// Veto-Check für 1/2
						if (z === 1 && n === 2) {
							if (Math.random() > 0.25) continue;
						}

						isTooEasy = false;
					}

					// 2. Werte für den Dezimalbruch und den Zwischenschritt berechnen
					let p10 = getP10(n);
					let mult = p10 / n; // Das ist jetzt unser Kürzungsfaktor
					let decStr = formatDecimal(z / n, 4);

					// Der Zähler des ungekürzten Zehnerbruchs (z. B. 35 bei 0,35)
					let z_p10 = z * mult;

					// 3. Aufgabenstellung
					textDisplay = `als max. gekürzter gem. Bruch: \\( \\quad ${decStr} = \\)`;

					// 4. Lösungsweg (Rückwärts: Dezimal -> Zehnerbruch -> Kürzen -> Ergebnis)
					if (n === p10) {
						// Fall: Nenner ist bereits 10 oder 100, es muss nicht gekürzt werden (z. B. 0,7 = 7/10)
						s = `\\[ ${decStr} = \\frac{${z}}{${n}} \\]`;
					} else {
						// Fall: Bruch muss gekürzt werden. Wir zeigen den Kürzungsfaktor explizit (z. B. : 5)
						s = `\\[ ${decStr} = \\frac{${z_p10}}{${p10}} \\underset{${mult}}{=} \\frac{${z}}{${n}} \\]`;
					}
					break;
				}

				// ---------------------------------------------------------
				// 2. Bruch <> Prozent
				// ---------------------------------------------------------
				case 'frac_to_perc': {
					let n, z;
					let isTooEasy = true;

					while (isTooEasy) {
						n = allowedDenoms[Math.floor(Math.random() * allowedDenoms.length)];

						let maxZ = 2 * n - 1;

						let attempts = 0;
						do {
							z = randInt(1, maxZ);
							attempts++;
							// Sicherheitsnetz: Falls z.B. n=2, ist maxZ=1. Es gibt nur z=1.
							if (attempts > 50) { z = 1; break; }
						} while (getGcd(z, n) !== 1);

						// Veto-Check für 1/2 (kommt sonst bei n=2 zu 100% vor)
						if (z === 1 && n === 2) {
							if (Math.random() > 0.25) continue; // 75% Chance für Neustart
						}

						// Optionaler didaktischer Veto-Check für 1/10 (oft etwas zu leicht)
						if (z === 1 && n === 10) {
							if (Math.random() > 0.5) continue; // 50% Chance für Neustart
						}

						isTooEasy = false;
					}

					// Bei Prozent ist das Ziel für das Erweitern immer 100
					let p10 = 100;
					let mult = p10 / n; // Erweiterungsfaktor

					// Da wir auf 100 erweitern, ist der neue Zähler direkt die Prozentzahl
					let percStr = (z * mult).toString() + '\\,\\text{%}';

					textDisplay = `in Prozent: \\( \\quad \\dfrac{${z}}{${n}} = \\)`;
					s = `\\[ \\frac{${z}}{${n}} \\overset{${mult}}{=} \\frac{${z * mult}}{100} = ${percStr} \\]`;

					break;
				}
				case 'perc_to_frac': {
					// 1. Spezialfälle: 100% und 200% (Wahrscheinlichkeit hier auf 10% = 0.1 eingestellt)
					const probSpecial = 0.3; // 30% Chance, in die Spezialfall-Logik zu gehen (kann angepasst werden)

					if (Math.random() < probSpecial) {
						// Mit 50/50 Chance entweder 100% oder 200% wählen
						let is200 = Math.random() < 0.5;
						let percVal = is200 ? 200 : 100;
						let resultVal = is200 ? 2 : 1; // Das gekürzte Ergebnis als ganze Zahl

						textDisplay = `als max. gekürzter gem. Bruch: \\( \\quad ${percVal}\\,\\text{%} = \\)`;
						s = `\\[ ${percVal}\\,\\text{%} = \\frac{${percVal}}{100} = ${resultVal} \\]`;

						// Hinweis: Wenn dein System zwingend eine Bruch-Schreibweise als Lösung erwartet, 
						// müsstest du resultVal auf "2/1" bzw. "1/1" ändern.
						break;
					}

					// 2. Normale Generierung
					let n, z;
					let isTooEasy = true;

					while (isTooEasy) {
						n = allowedDenoms[Math.floor(Math.random() * allowedDenoms.length)];

						// Da bis zu 200% erlaubt sind, darf der Zähler doppelt so groß wie der Nenner werden
						let maxZ = n * 2;

						let attempts = 0;
						do {
							z = randInt(1, maxZ);
							attempts++;
							if (attempts > 50) { z = 1; break; }
						} while (getGcd(z, n) !== 1);

						// Veto-Checks für zu häufige/einfache Aufgaben
						if (z === 1 && n === 2) { // 50 %
							if (Math.random() > 0.25) continue; // 75% Chance für Neustart
						}
						if (z === 1 && n === 10) { // 10 %
							if (Math.random() > 0.5) continue; // 50% Chance für Neustart
						}
						// Verhindert, dass regulär nochmal 100% oder 200% generiert werden (sind ja schon im Spezialfall)
						if (z === n || z === n * 2) {
							continue;
						}

						isTooEasy = false;
					}

					// 3. Werte berechnen
					let p10 = 100;
					let mult = p10 / n; // Das ist der Kürzungsfaktor für den Lösungsweg

					// Die Prozentzahl berechnet sich aus Zähler mal Erweiterungsfaktor
					let percVal = z * mult;
					let percStr = percVal.toString() + '\\,\\text{%}';

					// 4. Strings für Aufgabe und Lösung bauen
					textDisplay = `als max. gekürzter gem. Bruch: \\( \\quad ${percStr} = \\)`;

					if (n === p10) {
						s = `\\[ ${percStr} = \\frac{${z}}{100} \\]`;
					} else {
						// Didaktischer Lösungsweg: Start bei /100, dann explizit durch den Kürzungsfaktor teilen
						s = `\\[ ${percStr} = \\frac{${percVal}}{100} \\underset{${mult}}{=} \\frac{${z}}{${n}} \\]`;
					}
					break;
				}

				// ---------------------------------------------------------
				// 3. Bruch <> Gemischte Schreibweise
				// ---------------------------------------------------------
				case 'frac_to_mixed': {
					let n = allowedDenoms[Math.floor(Math.random() * allowedDenoms.length)];
					let w = Math.floor(Math.random() * 3) + 2;
					let rem = Math.floor(Math.random() * (n - 1)) + 1;
					let z = w * n + rem; // Garantiert unechter Bruch (>1)
					let g = getGcd(z, n); z /= g; n /= g;

					let w_simp = Math.floor(z / n);
					let rem_simp = z % n;

					textDisplay = `in gemischter Schreibweise: \\( \\quad \\dfrac{${z}}{${n}} = \\)`;
					s = `\\[ \\frac{${z}}{${n}} = \\frac{${w_simp * n}}{${n}} + \\frac{${rem_simp}}{${n}} = ${w_simp} \\frac{${rem_simp}}{${n}} \\]`;
					break;
				}
				case 'mixed_to_frac': {
					let n = allowedDenoms[Math.floor(Math.random() * allowedDenoms.length)];
					let w = Math.floor(Math.random() * 3) + 2;
					let rem = Math.floor(Math.random() * (n - 1)) + 1;
					let z = w * n + rem;
					let g = getGcd(z, n); z /= g; n /= g;

					let w_simp = Math.floor(z / n);
					let rem_simp = z % n;

					textDisplay = `Als gemeiner Bruch: \\( ${w_simp} \\dfrac{${rem_simp}}{${n}} = \\)`;
					s = `\\[ ${w_simp} \\frac{${rem_simp}}{${n}} = \\frac{${w_simp * n}}{${n}} + \\frac{${rem_simp}}{${n}} = \\frac{${z}}{${n}} \\]`;
					break;
				}

				// ---------------------------------------------------------
				// 4. Dezimalbruch <> Prozent (Spezialfall)
				// ---------------------------------------------------------
				case 'dec_to_perc': {
					let p = (Math.floor(Math.random() * 400) + 1) / 2; // Schritte von 0,5%
					let decStr = formatDecimal(p / 100, 4);
					let percStr = p.toString().replace('.', ',') + '\\,\\text{%}';

					textDisplay = ` in Prozent: \\( \\quad ${decStr} = \\)`;
					s = `\\( ${decStr} = ${percStr} \\)`;
					break;
				}
				case 'perc_to_dec': {
					let p = (Math.floor(Math.random() * 400) + 1) / 2;
					let decStr = formatDecimal(p / 100, 4);
					let percStr = p.toString().replace('.', ',') + '\\,\\text{%}';

					textDisplay = `als Dezimalbruch: \\( \\quad ${percStr} = \\)`;
					s = `\\( ${percStr} = ${decStr} \\)`;
					break;
				}
			}
			break;
		}

		case 'percent':
			let p, pVal;
			let einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			rd = Math.random();
			if (rd > 0.5) {
				pVal = rnd(2, 11) * 100;
				p = [3, 4, 5, 6, 7, 8, 9, 11, 12, 20, 25, 30, 35, 40, 60, 70, 80, 90][randInt(0, 17)];
				textDisplay = `${p} % von ${pVal} ${einheit} sind ${blank(3)}`;
				s = `100 % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / 100} ${einheit}<br>${p} % ≙ <b>${pVal / 100 * p} ${einheit}</b>`;
			} else if (rd > 0.3) {
				p = [20, 25, 30, 40, 50, 60, 70, 80, 90][randInt(0, 8)];
				pVal = rnd(2, 9) * p;
				textDisplay = `${p} % sind ${pVal} ${einheit} von ${blank(3)}`;
				s = `${p} % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / p} ${einheit}<br>100 % ≙ <b>${pVal / p * 100} ${einheit}</b>`;
			} else {
				// 1. Wähle einen "schönen" Prozentsatz p (z.B. 5, 10, 20, 25, 50...)
				const p_list = isMentalMode ? [2, 3, 5, 10, 20, 25, 50, 75, 80, 90] : [2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 80, 90, 95];
				const p = p_list[randInt(0, p_list.length - 1)];

				// 2. Wähle einen Multiplikator für den Prozentwert W, 
				// damit die Zahlen nicht zu krumm werden
				const multiplier = isMentalMode ? rnd(2, 10) : rnd(2, 15);
				const W = p * multiplier;

				// 3. Berechne den Grundwert G
				// Formel: G = W / (p / 100)  => G = W * 100 / p
				const G = (W * 100) / p;

				// Aufgabe: W und G sind gegeben, p ist gesucht
				textDisplay = ` ${comma(W)} ${einheit} von ${comma(G)} ${einheit} sind ${blank(2)} % `;

				// Lösung: Zeigt den Rechenweg oder das Ergebnis
				s = `100 % ≙ ${comma(G)} ${einheit}<br>1 % ≙ ${comma(G / 100)} ${einheit} <br><b>${p} %</b> ≙ ${comma(W)} ${einheit}`;
			}
			break;

		case 'pv': {
			let einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			let p = [3, 4, 5, 6, 7, 10, 20, 25, 50][randInt(0, 8)];
			let pVal = rnd(2, 11) * 100;
			type = randInt(0, 5); // 0: Erhöhung um p%, 1: Reduzierung um p%, 2: Erhöhung auf 100+p%, 3: Reduzierung auf 100-p%, 4: Rabatt-Fall 1, 5: Rabatt-Fall 2
			switch (type) {
				case 0: // Erhöhung um p%
					textDisplay = `${pVal} ${einheit} um ${p} % erhöht sind ${blank(3)}`;
					s = `100 % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / 100} ${einheit}<br>${100 + p} % ≙ <b>${pVal + (pVal / 100 * p)} ${einheit}</b>`;
					break;
				case 1: // Reduzierung um p%
					textDisplay = `${pVal} ${einheit} um ${p} % reduziert sind ${blank(3)}`;
					s = `100 % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / 100} ${einheit}<br>${100 - p} % ≙ <b>${pVal - (pVal / 100 * p)} ${einheit}</b>`;
					break;
				case 2: // Erhöhung auf 100+p%
					textDisplay = `${pVal} ${einheit} auf ${100 + p} % erhöht sind ${blank(3)}`;
					s = `100 % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / 100} ${einheit}<br>${100 + p} % ≙ <b>${pVal + (pVal / 100 * p)} ${einheit}</b>`;
					break;
				case 3: // Reduzierung auf 100-p%
					textDisplay = `${pVal} ${einheit} auf ${100 - p} % reduziert sind ${blank(3)}`;
					s = `100 % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / 100} ${einheit}<br>${100 - p} % ≙ <b>${pVal - (pVal / 100 * p)} ${einheit}</b>`;
					break;
				case 4: {// Rabatt-Fall 1
					p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
					const originalPrice = pVal;
					const discountedPrice = originalPrice - (originalPrice / 100 * p);
					textDisplay = `${p} % Rabatt auf ${originalPrice} €. Neuer Preis: ${blank(3)}`;
					s = `100 % ≙ ${originalPrice} €<br>1 % ≙ ${originalPrice / 100} €<br>${100 - p} % ≙ <b>${discountedPrice} €</b>`;
					break;
				}
				case 5: {// Rabatt-Fall 2
				    p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
					const originalPrice = pVal;
					const discountedPrice = originalPrice - (originalPrice / 100 * p);
					textDisplay = `Preissenkung von ${originalPrice} € auf ${discountedPrice} €. Rabatt: ${blank(2)} %`;
					s = `100 % ≙ ${originalPrice} €<br>1 % ≙ ${originalPrice / 100} €<br><b>${p} %</b> ≙ ${(originalPrice - discountedPrice)} €`;					
					break;
				}
			}
			break;
		}

		case 'schriftlich_as': {
			const op = randInt(0, 1); // 0: +, 1: -, 2: *, 3: /
			let v1, v2, res;
			const countDigits = (value) => Math.max(1, String(value).replace(/[^0-9]/g, '').length);

			switch (op) {
				case 0: // ADDITION
					// v1: 1-2 Stellen, v2: 0-2 Stellen (verschieden)
					v1 = rnd(10000, 99999) / 1000;
					v2 = rnd(100, 9999) / 10;
					res = v1 + v2;
					textDisplay = `Berechne schriftlich: \\( \\quad ${comma(v1)} + ${comma(v2)} \\)`;
					textPrint = `Berechne schriftlich: \\( \\quad ${comma(v1)} + ${comma(v2)} \\)<br>${karo(4, 12)}`;
					s = `\\( ${comma(v1)} + ${comma(v2)} = ${formatDecimal(res, 2)} \\)`;
					break;

				case 1: // SUBTRAKTION
					v1 = trueDec(200, 500);
					v2 = rnd(5555, 14444) / 100;
					res = v1 - v2;
					textDisplay = `Berechne schriftlich: \\( \\quad ${comma(v1)} - ${comma(v2)} \\)`;
					textPrint = `Berechne schriftlich: \\( \\quad ${comma(v1)} - ${comma(v2)} \\)<br>${karo(4, 12)}`;
					s = `\\( ${comma(v1)} - ${comma(v2)} = ${formatDecimal(res, 2)} \\)`;
					break;
			}
			break;
		}

		case 'schriftlich_md': {
			const op = randInt(2, 3); // 0: +, 1: -, 2: *, 3: /
			let v1, v2, res;
			const countDigits = (value) => Math.max(1, String(value).replace(/[^0-9]/g, '').length);

			switch (op) {

				case 2: // MULTIPLIKATION
					// Faktor 1: 0-2 Stellen, Faktor 2: 0-2 Stellen
					do {
						const p1 = rnd(2, 4) - 1;
						const p2 = rnd(2, 4) - 2;
						v1 = rnd(11, 499) / Math.pow(10, p1);
						v2 = rnd(11, 299) / Math.pow(10, p2);
					} while (Number.isInteger(v1) && Number.isInteger(v2));
					res = v1 * v2;
					const factor2Digits = countDigits(comma(v2));
					const mulRows = factor2Digits + 3;
					textDisplay = `Berechne schriftlich: \\( \\quad ${comma(v1)} \\cdot ${comma(v2)} \\)`;
					textPrint = `Berechne schriftlich: \\( \\quad ${comma(v1)} \\cdot ${comma(v2)} \\)<br>${karo(mulRows, 16)}`;
					// Bei Multiplikation können bis zu 4 Stellen entstehen (2+2)
				s = `\\( ${comma(v1)} \\cdot ${comma(v2)} = ${formatDecimal(res, 4)} \\)`;
					break;

				case 3: // DIVISION (durch ganze Zahl)
					
					const divisor = rnd(3, 9);
					const p3 = rnd(2, 4) - 1;
					// Wir würfeln das Ergebnis zuerst (max 2 Stellen), damit es aufgeht
					const resultValue = rnd(111, 2999) / Math.pow(10, p3);
					const dividend = (resultValue * divisor);
					const resultDigits = countDigits(comma(resultValue));
					const divRows = Math.max(4, resultDigits * 2 + 3);

					textDisplay = `Berechne schriftlich: \\( \\quad ${formatDecimal(dividend, 2)} : ${divisor} \\)`;
					textPrint = `Berechne schriftlich: \\( \\quad ${formatDecimal(dividend, 2)} : ${divisor} \\)<br>${karo(divRows, 16)}`;
					s = `\\( ${formatDecimal(dividend, 2)} : ${divisor} = ${comma(resultValue)} \\)`;
					
					break;
			}
			break;
		}

		case 'units': {
			const toCleanString = formatUtils.toCleanString;
			const createUnitsEntry = () => {

				// 1. Definition der Einheiten-Ketten (geordnet von klein nach groß)
			const unitGroups = [
				{ units: ['mm', 'cm', 'dm', 'm', 'km'], factors: [10, 10, 10, 1000], type: 'Länge' },
				{ units: ['mm²', 'cm²', 'dm²', 'm²', 'a', 'ha', 'km²'], factors: [100, 100, 100, 100, 100, 100], type: 'Fläche' },
				{ units: ['mm³', 'cm³', 'dm³', 'm³'], factors: [1000, 1000, 1000], type: 'Volumen' },
				{ units: ['mg', 'g', 'kg', 't'], factors: [1000, 1000, 1000], type: 'Masse' },
				{ units: ['s', 'min', 'h'], factors: [60, 60], type: 'Zeit' }
			];

			// 2. Zufällige Gruppe wählen (z.B. Zeit oder Masse)
			const group = unitGroups[rnd(2, unitGroups.length + 1) - 2];
			//const group = unitGroups[4];


			// 3. Einen Index innerhalb der Gruppe wählen
			// Wir wählen so, dass wir einen Nachbarn haben (nicht den letzten Index bei 'kleiner', nicht den ersten bei 'größer')
			const unitIndex = rnd(2, group.units.length + 1) - 2;

			// 4. Richtung bestimmen: 0 = in nächstkleinere, 1 = in nächstgrößere
			let direction;
			if (unitIndex === 0) direction = 1; // Muss größer werden
			else if (unitIndex === group.units.length - 1) direction = 0; // Muss kleiner werden
			else direction = Math.random() > 0.5 ? 1 : 0;

			const fromUnit = group.units[unitIndex];
			let toUnit, startValue, result, operation;

			switch (group.type) {
				case 'Zeit':
					if (direction === 0) {
						// In nächstkleinere Einheit (Zahl wird größer)
						toUnit = group.units[unitIndex - 1];
						const f = group.factors[unitIndex - 1];
							operation = `· ${f}`;
						startValue = [0.1, 0.25, 0.5, 1.5, 2.25, 2.5, 2.75, 3.5, 4][randInt(0, 8)];
						result = (startValue * f);
					} else {
						toUnit = group.units[unitIndex + 1];
						const f = group.factors[unitIndex];
							operation = `: ${f}`;
						startValue = [0.1, 0.25, 0.5, 1.5, 2.25, 2.5, 2.75, 3.5, 4][randInt(0, 8)] * f;
						result = comma(startValue / f);
					}
					break;
				default:
					const factor = (direction === 0) ? group.factors[unitIndex - 1] : group.factors[unitIndex];
					toUnit = (direction === 0) ? group.units[unitIndex - 1] : group.units[unitIndex + 1];
						operation = (direction === 0) ? `· ${factor}` : `: ${factor}`;

					if (direction === 0) {
						// Zahl wird größer (Multiplikation)
						// Wir erzeugen einen Startwert mit 0 bis 2 Nachkommastellen
						const raw = rnd(1, 5000);
						const shift = [1, 10, 100][rnd(0, 2)]; // Teiler für 0, 1 oder 2 Stellen
						startValue = raw / shift;
						result = toCleanString(startValue * factor);
					} else {
						// Zahl wird kleiner (Division)
						// Wir bestimmen erst das Ergebnis (bis zu 3 Stellen), damit keine unendlichen Brüche entstehen
						const resRaw = rnd(1, 2000);
						const resShift = [10, 100, 1000][rnd(0, 2)];
						const resNum = resRaw / resShift;
						startValue = resNum * factor;
						result = toCleanString(resNum);
					}
					break;
				}

				return {
					expr: `${toCleanString(startValue)} ${fromUnit} = ${blank(3)} ${toUnit}`,
					solution: `${toCleanString(startValue)} ${fromUnit} = ${result} ${toUnit} &emsp; ( ${operation} )`
				};
			};

			const entry = createUnitsEntry();
			textDisplay = entry.expr;
			s = entry.solution;
			break;
		}

		case 'geometry':
			const shapeType = randInt(0, grade >= 7 ? 2 : 1);
			const goal = Math.random() > 0.5 ? 'A' : 'u';
			const lengthUnits = ['cm', 'dm', 'm'];
			const unit = lengthUnits[randInt(0, lengthUnits.length - 1)];
			let sideA, sideB;

			if (shapeType === 0) { // QUADRAT
				sideA = rnd(3, 12);
				if (goal === 'A') {
					textDisplay = `Berechne den Flächeninhalt eines Quadrats mit \\( a = ${sideA} \\) ${unit}.`;
					s = `\\( A = a \\cdot a = ${sideA} \\cdot ${sideA} = ${sideA * sideA} \\text{ ${unit}}^2 \\)`;
				} else {
					textDisplay = `Berechne den Umfang eines Quadrats mit \\( a = ${sideA} \\) ${unit}.`;
					s = `\\( u = 4 \\cdot a = 4 \\cdot ${sideA} = ${sideA * 4} \\text{ ${unit}} \\)`;
				}
			}
			else if (shapeType === 1) { // RECHTECK
				sideA = rnd(2, 12); sideB = rnd(3, 7);
				if (sideA === sideB) { sideB++ }
				if (goal === 'A') {
					textDisplay = `Berechne den Flächeninhalt eines Rechtecks mit <br>\\( a = ${sideA} \\) ${unit} und \\( b = ${sideB} \\) ${unit}.`;
					s = `\\( A = a \\cdot b = ${sideA} \\cdot ${sideB} = ${sideA * sideB} \\text{ ${unit}}^2 \\)`;
				} else {
					textDisplay = `Berechne den Umfang eines Rechtecks mit <br>\\( a = ${sideA} \\) ${unit} und \\( b = ${sideB} \\) ${unit}.`;
					s = `\\( u = 2 \\cdot (a+b) = 2 \\cdot (${sideA} + ${sideB}) = ${2 * (sideA + sideB)} \\text{ ${unit}} \\)`;
				}
			}
			else { // DREIECK
				sideA = rnd(2, 12); sideB = rnd(3, 7);
				textDisplay = `Berechne den Flächeninhalt eines Dreiecks mit <br>Grundseite \\( g = ${sideA} \\) ${unit} und Höhe \\( h = ${sideB} \\) ${unit}.`;
				s = `\\( A = \\frac{1}{2} \\cdot g \\cdot h = \\frac{1}{2} \\cdot ${sideA} \\cdot ${sideB} = ${(sideA * sideB) / 2} \\text{ ${unit}}^2 \\)`.replace('.', ',');
			}
			break;
			
		case 'potenzen': {
			const createPotenzenEntry = () => {
				let expr;
				let solution;
				const rdLocal = Math.random();

				if (rdLocal > 0.6) {
					v1 = rnd(-13, 13);
					if (v1 < 0) {
						expr = `\\( (${v1})^2 = \\)`;
						solution = `\\( (${v1})^2 = ${v1 * v1} \\)`;
					} else {
						expr = `\\( ${v1}^2 = \\)`;
						solution = `\\( ${v1}^2 = ${v1 * v1} \\)`;
					}
				} else if (rdLocal > 0.40) {
					v1 = rnd(3, 13);
					expr = `\\( \\sqrt{${v1 * v1}} = \\)`;
					solution = `\\( \\sqrt{${v1 * v1}} = \\pm ${v1} \\)`;
				} else if (rdLocal > 0.2) {
					v1 = rnd(3, 9);
					expr = `\\( 2^${v1} = \\)`;
					solution = `\\( 2^${v1} = ${Math.pow(2, v1)} \\)`;
				} else {
					const staticTasks = [
						{ t: `\\( 3^3 = \\)`, s: `\\( 3^3 = ${Math.pow(3, 3)} \\)` },
						{ t: `\\( (-3)^3 = \\)`, s: `\\( (-3)^3 = ${Math.pow(-3, 3)} \\)` },
						{ t: `\\( 3^4 = \\)`, s: `\\( 3^4 = ${Math.pow(3, 4)} \\)` },
						{ t: `\\( (-3)^4 = \\)`, s: `\\( (-3)^4 = ${Math.pow(-3, 4)} \\)` },
						{ t: `\\( 4^3 = \\)`, s: `\\( 4^3 = ${Math.pow(4, 3)} \\)` },
						{ t: `\\( (-4)^3 = \\)`, s: `\\( (-4)^3 = ${Math.pow(-4, 3)} \\)` },
						{ t: `\\( 5^3 = \\)`, s: `\\( 5^3 = ${Math.pow(5, 3)} \\)` },
						{ t: `\\( (-5)^3 = \\)`, s: `\\( (-5)^3 = ${Math.pow(-5, 3)} \\)` },
						{ t: `\\( 5^4 = \\)`, s: `\\( 5^4 = ${Math.pow(5, 4)} \\)` }
					];
					const randomIndex = Math.floor(Math.random() * staticTasks.length);
					expr = staticTasks[randomIndex].t;
					solution = staticTasks[randomIndex].s;
				}

				return { expr, solution };
			};

			if (isTraining) {
				const entry = createPotenzenEntry();
				textDisplay = entry.expr;
				s = entry.solution;
			} else {
				const firstEntry = createPotenzenEntry();
				let secondEntry;
				let attempt = 0;
				do {
					secondEntry = createPotenzenEntry();
					attempt += 1;
				} while (attempt < 10 && secondEntry.expr === firstEntry.expr);

				const entries = [firstEntry, secondEntry];
				textDisplay = buildTwoColumnTaskTable(entries.map(item => item.expr));
				s = buildTwoColumnTaskTable(entries.map(item => item.solution));
			}

			break;
		}

		case 'teiler': {
			// 1. Pool an Zahlen mit interessanten Teilermengen 
			const pool = isMentalMode ? [8, 10, 12, 13, 15, 16, 18, 19, 20, 25, 27, 28, 29, 30, 33, 35] : [12, 15, 16, 18, 20, 28, 30, 32, 33, 34, 35, 37, 40, 45, 50];
			const n = pool[randInt(0, pool.length - 1)];
			// 2. Alle Teiler berechnen
			let teilerArray = [];
			for (let i = 1; i <= n; i++) {
				if (n % i === 0) {
					teilerArray.push(i);
				}
			}
			textDisplay = `Nenne alle Teiler der Zahl ${n}.`;
			let teilerListe = teilerArray.join(', ');
			s = `\\[ T_{${n}} = \\{ ${teilerListe} \\} \\]`;
			break;
		}

		case 'round': {
			const carryBias = 0.4; // Wahrscheinlichkeit für Übertrag (9 an der Rundungsstelle)
			
			rd = Math.random();
			
			let intPart = randInt(0, 9);
			let d1, d2, d3;
			
			const useCarryCase = Math.random() < carryBias;
			
			if (rd > 0.8) {
				d1 = randInt(2, 9); // Entscheidungsziffer (keine 0)
				d2 = randInt(0, 9);
				d3 = randInt(0, 9);
				
			} else if (rd > 0.4) {
				// Rundung auf Zehntel → Rundungsstelle = d1
				useCarryCase ? d1 = 9 : d1 = randInt(0, 9);
				d2 = randInt(2, 9); // Entscheidungsziffer (keine 0)
				d3 = randInt(1, 9);
				
			} else {
				// Rundung auf Hundertstel → Rundungsstelle = d2
				d1 = randInt(0, 9);
				useCarryCase ? d2 = 9 : d2 = randInt(0, 9);
				d3 = randInt(2, 9); // Entscheidungsziffer (keine 0)
			}

			let v1 = intPart + (d1 * 100 + d2 * 10 + d3) / 1000;
			
			let target, result, digits;
			
			if (rd > 0.8) {
				target = "Ganze";
				result = Math.round(v1);
				digits = 0;
			} else if (rd > 0.4) {
				target = "Zehntel";
				result = Math.round(v1 * 10) / 10;
				digits = 1;
			} else {
				target = "Hundertstel";
				result = Math.round(v1 * 100) / 100;
				digits = 2;
			}

			textDisplay = `Runde auf ${target}: \\( \\quad ${comma(v1.toFixed(3))} \\approx \\) ${blank(2)}`;
			s = `Runde auf ${target}: \\( \\; \\; ${comma(v1.toFixed(3))} \\approx ${comma(result.toFixed(digits))} \\)`;
			break;
		}
		
		case 'equations': {
			// 1. Bestimme die Lösung x (ein Vielfaches von 0,5)
			// rnd(-20, 20) / 2 ergibt Werte wie -5, -4.5, -4, ..., 4.5, 5
			const x = rnd(-12, 12);
			
			// 2. Bestimme Koeffizienten a und b (ganze Zahlen, a != 0)
			let a = rnd(-12, 12);
			const b = rnd(-20, 20);
			
			// 3. Berechne c (ax + b = c)
			const c = a * x + b;
			
			// Formatierung für die Ausgabe (Vorzeichen von b beachten)
			const bPart = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
			
			textDisplay = `Löse die Gleichung schrittweise: <br> \\( ${a}x ${bPart} = ${c} \\)`;
			textPrint = `Löse die Gleichung schrittweise: \\(\\quad ${a}x ${bPart} = ${c} \\qquad |\\)${space(1.5)}`;
			s = `\\[ \\begin{aligned} 
			${a}x ${bPart} &= ${c} &&| \\, ${b >= 0 ? '-' : '+'} ${Math.abs(b)} \\\\ 
			${a}x &= ${c - b} &&| \\, : ${a >= 0 ? a : '(' + a + ')'} \\\\
			x &= ${comma(x)} 
			\\end{aligned} \\]`;
			break;
		}

		case 'equations_adv':
			// 1. Bestimme die Lösung x (als ganze Zahl)
			const x = rnd(-13, 13);
			
			// 2. Bestimme Koeffizient a
			let a = rnd(-10, 10);
			
			// 3. Bestimme Koeffizient c so, dass |a - c| >= 2
			let c;
			do {
				c = rnd(-10, 10);
			} while (Math.abs(a - c) < 2 || c === 0);
			// Die Schleife läuft, solange der Abstand zu klein ist oder c selbst 0 ist
			
			// 4. Bestimme Konstante b und berechne d
			// Rechnung: ax + b = cx + d  => d = (a - c) * x + b
			const b = rnd(-30, 30);
			const d = (a - c) * x + b;
			
			// 5. Formatierung für die Ausgabe
			const bPart = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
			const dPart = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
			
			// 6. Bausteine für den Rechenweg
			const op1 = c >= 0 ? `- ${c}x` : `+ ${Math.abs(c)}x`;
			const aMinusC = a - c;
			const op2 = b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`;
			const dMinusB = d - b;
			const divOp = fmt(aMinusC);
			
			textDisplay = `Löse die Gleichung schrittweise:<br>\\( ${a}x ${bPart} = ${c}x ${dPart} \\)`;
			textPrint = `Löse die Gleichung schrittweise: \\(\\quad ${a}x ${bPart} = ${c}x ${dPart} \\qquad | \\)${space(2)}`;

			s = `\\[ \\begin{aligned} 
			${a}x ${bPart} &= ${c}x ${dPart} &&| \\, ${op1} \\\\ 
			${aMinusC}x ${bPart} &= ${d} &&| \\, ${op2} \\\\ 
			${aMinusC}x &= ${dMinusB} &&| \\, : ${divOp} \\\\
			x &= ${comma(x)} 
			\\end{aligned} \\]`;
			break;
		
		case 'equations_lin': {
			const forms = ['ax+by=c', 'ax+c=by', 'ax=by+c', 'by=ax+c'];
			const form = forms[randInt(0, forms.length - 1)];

			const formatHalf = (val) => Number.isInteger(val) ? `${val}` : comma(val.toFixed(1));
			const cleanHalf = (val) => Math.round(val * 2) / 2;
			const varTerm = (coef, variable, withSign = false) => {
				const abs = Math.abs(coef);
				const base = abs === 1 ? variable : `${abs}${variable}`;
				if (withSign) return `${coef >= 0 ? '+' : '-'} ${base}`;
				return coef < 0 ? `-${base}` : base;
			};
			const invTermOp = (coef, variable) => coef >= 0 ? `- ${varTerm(coef, variable)}` : `+ ${varTerm(-coef, variable)}`;
			const formatLinearExpr = (m, n) => {
				const mm = cleanHalf(m);
				const nn = cleanHalf(n);
				const xPart = mm === 1 ? 'x' : (mm === -1 ? '-x' : `${formatHalf(mm)}x`);
				if (nn === 0) return xPart;
				return `${xPart} ${nn > 0 ? '+' : '-'} ${formatHalf(Math.abs(nn))}`;
			};

			const pickValidForB = (b) => {
				const absB = Math.abs(b);
				const vals = [];
				for (let n = -40; n <= 40; n++) {
					if (n === 0) continue;
					if ((n) % absB === 0) vals.push(n);
				}
				return vals;
			};

			let b_lin, a_lin, c_lin;
			do {
				b_lin = rnd(-12, 12);
				const valid = pickValidForB(b_lin);
				a_lin = valid[randInt(0, valid.length - 1)];
				c_lin = valid[randInt(0, valid.length - 1)];
			} while (!a_lin || !b_lin || !c_lin);

			const aTerm = varTerm(a_lin, 'x');
			const bTerm = varTerm(b_lin, 'y');
			const absATerm = varTerm(Math.abs(a_lin), 'x');
			const cSigned = c_lin >= 0 ? `+ ${Math.abs(c_lin)}` : `- ${Math.abs(c_lin)}`;
			const cOppSigned = c_lin >= 0 ? `- ${Math.abs(c_lin)}` : `+ ${Math.abs(c_lin)}`;

			let textEquation = '';
			let step1 = '';
			let step2 = '';
			let finalStep = '';

			switch (form) {
				case 'ax+by=c': {
					textEquation = `${aTerm} ${varTerm(b_lin, 'y', true)} = ${c_lin}`;
					step1 = `${aTerm} ${varTerm(b_lin, 'y', true)} &= ${c_lin} &&| \\, ${invTermOp(a_lin, 'x')}`;
					step2 = `${bTerm} &= ${c_lin} ${a_lin >= 0 ? '-' : '+'} ${absATerm} &&| \\, : ${fmt(b_lin)}`;
					finalStep = `y &= ${formatLinearExpr(-a_lin / b_lin, c_lin / b_lin)}`;
					break;
				}
				case 'ax+c=by': {
					textEquation = `${aTerm} ${cSigned} = ${bTerm}`;
					step1 = `${aTerm} ${cSigned} &= ${bTerm} &&| \\, ${invTermOp(a_lin, 'x')}`;
					step2 = `${c_lin} &= ${bTerm} ${a_lin >= 0 ? '-' : '+'} ${absATerm} &&| \\, : ${fmt(b_lin)}`;
					finalStep = `y &= ${formatLinearExpr(-a_lin / b_lin, c_lin / b_lin)}`;
					break;
				}
				case 'ax=by+c': {
					textEquation = `${aTerm} = ${bTerm} ${cSigned}`;
					step1 = `${aTerm} &= ${bTerm} ${cSigned} &&| \\, ${cOppSigned}`;
					step2 = `${aTerm} ${cOppSigned} &= ${bTerm} &&| \\, : ${fmt(b_lin)}`;
					finalStep = `y &= ${formatLinearExpr(a_lin / b_lin, -c_lin / b_lin)}`;
					break;
				}
				default: {
					textEquation = `${bTerm} = ${aTerm} ${cSigned}`;
					step1 = `${bTerm} &= ${aTerm} ${cSigned} &&| \\, : ${fmt(b_lin)}`;
					finalStep = `y &= ${formatLinearExpr(a_lin / b_lin, c_lin / b_lin)}`;
					break;
				}
			}

			textDisplay = `Stelle die Gleichung nach \\( y \\) um: <br>\\( ${textEquation} \\)`;
			textPrint = `Stelle nach \\( y \\) um: \\(\\quad ${textEquation} \\qquad |\\)${space(2)}`;
			s = `\\[ \\begin{aligned}
			${step1} \\\\
			${step2 ? `${step2} \\\\` : ''}
			${finalStep}
			\\end{aligned} \\]`;
			break;
		}
			
			case 'formel_umstellen': {
				const formeln = [
				// --- FLÄCHENINHALT DREIECK ---
				{
					textPrint: `Stelle nach \\( g \\) um: \\( \\quad A = \\frac{1}{2} \\, g \\, h \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( g \\) um: \\( \\quad A = \\frac{1}{2} \\, g \\, h \\)`,
					steps: [
						{ eq: `A &= \\tfrac{1}{2} \\, g \\, h`,   op: `\\cdot 2` },
						{ eq: `2\\,A &= g \\, h`,               op: `: h` },
						{ eq: `2\\,A : h &= g`,            op: null }
					]
				},
				{
					textPrint: `Stelle nach \\( h \\) um: \\( \\quad A = \\frac{1}{2} \\, g \\, h \\quad |\\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( h \\) um: \\( \\quad A = \\frac{1}{2} \\, g \\, h \\)`,
					steps: [
						{ eq: `A &= \\tfrac{1}{2} \\, g \\, h`,   op: `\\cdot 2` },
						{ eq: `2\\,A &= g \\, h`,               op: `: g` },
						{ eq: `2\\,A : g &= h`,            op: null }
					]
				},
				// --- KREISFLÄCHE ---
				{
					textPrint: `Stelle nach \\( r \\) um: \\( \\quad A = \\pi \\cdot r^2 \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( r \\) um: \\( \\quad A = \\pi \\cdot r^2 \\)`,
					steps: [
						{ eq: `A &= \\pi \\cdot r^2`,            op: `: \\pi` },
						{ eq: `A : \\pi &= r^2`,         op: `\\sqrt{\\phantom{0}}` },
						{ eq: `\\sqrt{A : \\pi} &= r`,   op: null }
					]
				},
				// --- KREISUMFANG ---
				{
					textPrint: `Stelle nach \\( r \\) um: \\( \\quad u = 2 \\cdot \\pi \\cdot r \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( r \\) um: \\( \\quad u = 2 \\cdot \\pi \\cdot r \\)`,
					steps: [
						{ eq: `u &= 2 \\cdot \\pi \\cdot r`,    op: `: 2` },
						{ eq: `\\dfrac{u}{2} &= \\pi \\cdot r`, op: `: \\pi` },
						{ eq: `\\dfrac{u}{2\\pi} &= r`,          op: null }
					]
				},
				// --- TRAPEZ ---
				{
					textPrint: `Stelle nach \\( a \\) um: \\( \\quad A = \\frac{1}{2} (a+c) \\cdot h \\quad | \\) ${space(2)}`,
					textDisplay: `Stelle nach \\( a \\) um: \\( \\quad A = \\frac{1}{2} (a+c) \\cdot h \\)`,
					steps: [
						{ eq: `A &= \\tfrac{1}{2} (a+c) \\cdot h`, op: `\\cdot 2` },
						{ eq: `2 \\, A &= (a + c) \\cdot h`,             op: `: h` },
						{ eq: `2 \\, A : h &= a + c`,            op: `- c` },
						{ eq: `2 \\, A : h - c &= a`,            op: null }
					]
				},
				{
					textPrint: `Stelle nach \\( h \\) um: \\( \\quad A = \\frac{1}{2} (a+c) \\cdot h \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( h \\) um: \\( \\quad A = \\frac{1}{2} (a+c) \\cdot h \\)`,
					steps: [
						{ eq: `A &= \\tfrac{1}{2} (a+c) \\cdot h`, op: `\\cdot 2` },
						{ eq: `2 \\, A &= (a + c) \\cdot h`,       op: `: (a+c)` },
						{ eq: `\\dfrac{2 \\, A}{a+c} &= h`,              op: null }
					]
				},
				// --- RECHTECKUMFANG ---
				{
					textPrint: `Stelle nach \\( a \\) um: \\( \\quad u = 2 \\, (a + b) \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( a \\) um: \\( \\quad u = 2 \\, (a + b) \\)`,
					steps: [
						{ eq: `u &= 2 \\, (a + b)`,           op: `: 2` },
						{ eq: `u : 2 &= a + b`,          op: `- b` },
						{ eq: `u : 2 - b &= a`,          op: null }
					]
				},
				// --- KUGELOBERFLÄCHE ---
				{
					textPrint: `Stelle nach \\( r \\) um: \\( \\quad A_O = 4 \\, \\pi \\, r^2 \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( r \\) um: \\( \\quad A_O = 4 \\, \\pi \\, r^2 \\)`,
					steps: [
						{ eq: `A_O &= 4 \\, \\pi \\, r^2`,       op: `: (4\\,\\pi)` },
						{ eq: `A_O : (4\\,\\pi) &= r^2`,             op: `\\sqrt{\\phantom{0}}` },
						{ eq: `\\sqrt{A_O : (4\\,\\pi)} &= r`,       op: null }
					]
				},
				// --- QUADERVOLUMEN ---
				{
					textPrint: `Stelle nach \\( a \\) um: \\( \\quad V = a \\cdot b \\cdot c \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( a \\) um: \\( \\quad V = a \\cdot b \\cdot c \\)`,
					steps: [
						{ eq: `V &= a \\cdot b \\cdot c`,            op: `: b` },
						{ eq: `V : b &= a \\cdot c`,         op: `: c` },
						{ eq: `V : b : c &= a`,         op: null }
					]
				},
				// --- ZYLINDERVOLUMEN nach h ---
				{
					textPrint: `Stelle nach \\( h \\) um: \\( \\quad V = \\pi \\cdot r^2 \\cdot h \\quad | \\) ${space(1.5)}`,
					textDisplay: `Stelle nach \\( h \\) um: \\( \\quad V = \\pi \\cdot r^2 \\cdot h \\)`,
					steps: [
						{ eq: `V &= \\pi \\cdot r^2 \\cdot h`,       op: `: r^2` },
						{ eq: `\\dfrac{V}{r^2} &= \\pi \\cdot h`,    op: `: \\pi` },
						{ eq: `\\dfrac{V}{\\pi r^2} &= h`,            op: null }
					]
				},
				// --- KEGELVOLUMEN nach r ---
				{
					textPrint: `Stelle nach \\( r \\) um: \\( \\quad V = \\tfrac{1}{3} \\, \\pi \\, r^2 \\, h \\quad | \\) ${space(2)}`,
					textDisplay: `Stelle nach \\( r \\) um: \\( \\quad V = \\tfrac{1}{3} \\, \\pi \\, r^2 \\, h \\)`,
					steps: [
						{ eq: `V &= \\tfrac{1}{3} \\, \\pi \\, r^2 \\, h`, op: `\\cdot 3` },
						{ eq: `3 \\, V &= \\pi \\, r^2 \\, h`,             op: `: (\\pi \\, h)` },
						{ eq: `3 \\, V : (\\pi \\, h) &= r^2`,                 op: `\\sqrt{\\phantom{0}}` },
						{ eq: `\\sqrt{3 \\, V : (\\pi \\, h)} &= r`,           op: null }
					]
				},
				// --- PYTHAGORAS ---
				{
					textPrint: `Stelle nach \\( a \\) um: \\( \\quad a^2 + b^2 = c^2 \\quad |\\) ${space(1.4)}`,
					textDisplay: `Stelle nach \\( a \\) um: \\( \\quad a^2 + b^2 = c^2 \\)`,
					steps: [
						{ eq: `a^2 + b^2 &= c^2`,                 op: `- b^2` },
						{ eq: `a^2 &= c^2 - b^2`,                  op: `\\sqrt{\\phantom{0}}` },
						{ eq: `a &= \\sqrt{c^2 - b^2}`,            op: null }
					]
				},
				// --- GESCHWINDIGKEIT ---
				{
					textPrint: `Stelle nach \\( t \\) um: \\( \\quad v = \\frac{s}{t} \\quad | \\) ${space(1.4)}`,
					textDisplay: `Stelle nach \\( t \\) um: \\( \\quad v = \\frac{s}{t} \\)`,
					steps: [
						{ eq: `v &= \\dfrac{s}{t}`,                op: `\\cdot t` },
						{ eq: `v \\cdot t &= s`,                    op: `: v` },
						{ eq: `\\dfrac{s}{v} &= t`,                 op: null }
					]
				},
				// --- WEG-ZEIT-BESCHLEUNIGUNG ---
				{
					textPrint: `Stelle nach \\( a \\) um: \\( \\quad s = \\frac{1}{2} \\cdot a \\cdot t^2 \\quad | \\) ${space(1.4)}`,
					textDisplay: `Stelle nach \\( a \\) um: \\( \\quad s = \\frac{1}{2} \\cdot a \\cdot t^2 \\)`,
					steps: [
						{ eq: `s &= \\tfrac{1}{2} \\cdot a \\cdot t^2`, op: `\\cdot 2` },
						{ eq: `2\\,s &= a \\cdot t^2`,                       op: `: t^2` },
						{ eq: `2\\,s : t^2 &= a`,                    op: null }
					]
				},
				// --- Sinus ---
				{
					textPrint: `Stelle nach \\( \\beta \\) um: \\( \\quad a = \\dfrac{b}{\\sin \\beta} \\quad | \\) ${space(2)}`,
					textDisplay: `Stelle nach \\( \\beta \\) um: \\( \\quad a = \\dfrac{b}{\\sin \\beta} \\)`,
					steps: [
						{ eq: `a &= \\dfrac{b}{\\sin \\beta}`,          op: `\\cdot \\sin \\beta` },
						{ eq: `a \\cdot \\sin \\beta &= b`,             op: `: a` },
						{ eq: `\\sin \\beta &= \\dfrac{b}{a}`,          op: `\\sin^{-1}` },
						{ eq: `\\sin^{-1} \\left( \\dfrac{b}{a} \\right) &= \\beta`, op: null }
					]
				}
				// --- Kosinussatz ---
				// {
				// 	textPrint: `Stelle nach \\( \\gamma \\) um: \\( \\quad c^2 = a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma \\quad | \\) ${space(2)}`,
				// 	textDisplay: `Stelle nach \\( \\gamma \\) um: \\( \\quad c^2 = a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma \\)`,
				// 	steps: [
				// 		{ eq: `c^2 &= a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma`, op: `- a^2 -b^2` },
				// 		{ eq: `c^2 -a^2 - b^2 &= - 2 \\, a \\, b \\, \\cos \\gamma`, op: `: - (2 \\, a \\, b)` },
				// 		{ eq: `\\dfrac{c^2 -a^2 - b^2}{- (2 \\, a \\, b)} &= \\cos \\gamma`, op: `\\cos^{-1}` },
				// 		{ eq: `\\cos^{-1} \\left( \\dfrac{c^2 -a^2 - b^2}{- (2 \\, a \\, b)} \\right) &= \\gamma`, op: null }
				// 	]
				// }
			];

			const f = formeln[randInt(0, formeln.length - 1)];
			const alignLines = f.steps.map(step =>
				step.op !== null
					? `${step.eq} &&| \\, ${step.op}`
					: step.eq
			).join(' \\\\\n\t\t\t\t');

			textDisplay = f.textDisplay;
			textPrint = f.textPrint;
			
			s = `\\[ \\begin{aligned}\n\t\t\t\t${alignLines}\n\t\t\t\\end{aligned} \\]`;
			break;
		}
		
		case 'terme': {
			const vars = ['x', 'y', 'z', 'a', 'b'];
			let selectedVars = fisherYatesShuffle(vars).slice(0, 2);
			if (Math.random() < 0.5) selectedVars[1] = '';
			
			let mode = grade >= 8 ? randInt(0, 2) : 0;
			let taskStr, resStr;
			
			if (mode === 0) {
				// --- TYP: ZUSAMMENFASSEN ---
				const numGlieder = randInt(4, 5); // Mind. 4 Glieder für echtes Zusammenfassen
				let glieder = [];
				let usedCombinations = new Set();
				let counts = { [selectedVars[0]]: 0, [selectedVars[1]]: 0 };

				for (let i = 0; i < numGlieder; i++) {
					let v;
					// DIDAKTISCHE GARANTIE:
					if (i === 0 || i === 1) v = selectedVars[0]; // Typ A (muss zusammengefasst werden)
					else if (i === 2) v = selectedVars[1];       // Typ B (muss vorkommen)
					else v = selectedVars[randInt(0, 1)];        // Rest zufällig
					
					let val, combo;
					do {
						let coef = randInt(1, 12);
						let sign = Math.random() < 0.5 ? 1 : -1;
						val = coef * sign;
						combo = `${val}${v}`;
					} while (usedCombinations.has(combo));

					usedCombinations.add(combo);
					counts[v] += val;
					
					// Wir speichern hier nur die Rohdaten, das Vorzeichen-Handling 
					// machen wir nach dem Mischen für das erste Glied neu.
					let absCoef = Math.abs(val);
					let coefStr = (absCoef === 1 && v !== '') ? '' : absCoef;
					glieder.push({ val: val, v: v, text: `${coefStr}${v}` });
				}

				// Glieder mischen
				for (let i = glieder.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[glieder[i], glieder[j]] = [glieder[j], glieder[i]];
				}

				// TaskString bauen mit korrektem Vorzeichen-Handling
				taskStr = glieder.map((g, idx) => {
					let sStr = g.val > 0 ? '+ ' : '- ';
					if (idx === 0) sStr = g.val > 0 ? '' : '-';
					return `${sStr}${g.text}`;
				}).join(' ').trim();

				// Ergebnis berechnen
				let resParts = [];
				[selectedVars[0], selectedVars[1]].forEach(v => {
					let total = counts[v];
					if (total !== 0) {
						let sStr = total > 0 ? (resParts.length === 0 ? '' : '+ ') : '- ';
						if (resParts.length === 0 && total < 0) sStr = '-';
						let absT = Math.abs(total);
						let cStr = (absT === 1 && v !== '') ? '' : absT;
						resParts.push(`${sStr}${cStr}${v}`);
					}
				});
				resStr = resParts.length === 0 ? '0' : resParts.join(' ').trim();
				textDisplay = `Vereinfache den Term: <br>\\( ${taskStr} \\)`;
				textPrint = `Vereinfache den Term: \\(\\quad ${taskStr} \\) ${space(0.5)}`;

			} else if (mode === 1) {
				// --- TYP: KLAMMER AUFLÖSEN ---
				let v = selectedVars[0] || 'x';
				let cVarCoef = rnd(-9, 9);
				let cNum = rnd(-12, 12);

				// Mit 50% Chance ist der Faktor selbst eine Variable (z.B. 3x), sonst eine Zahl
				const useVarFactor = v !== '' && Math.random() < 0.5;
				const fmtFactorVar = (coef, variable) => {
					if (coef === 1) return variable;
					if (coef === -1) return fmt(`-${variable}`);
					return fmt(`${coef}${variable}`);
				};
				const fmtProductFactor = (factorText, termText) => `${fmt(termText)} \\cdot ${fmt(factorText)}`;

				let factorCoef, fDisplay;
				if (useVarFactor) {
					factorCoef = rnd(-5, 5);
					while (factorCoef === 0) factorCoef = rnd(-5, 5);
					fDisplay = fmtFactorVar(factorCoef, v);
				} else {
					factorCoef = rnd(-7, 7);
					while (factorCoef === 0) factorCoef = rnd(-7, 7);
					fDisplay = fmt(factorCoef);
				}

				taskStr = `${fDisplay} (${cVarCoef}${v} ${cNum > 0 ? '+' : '-'} ${Math.abs(cNum)})`;

				if (useVarFactor) {
					// Ergebnis enthält v² und v
					const resVV = factorCoef * cVarCoef;
					const resV  = factorCoef * cNum;
					const term1 = fmtProductFactor(fDisplay, `${cVarCoef}${v}`);
					const term2 = fmtProductFactor(fDisplay, Math.abs(cNum));

					let p1 = resVV === 1  ? `${v}^2`
					       : resVV === -1 ? `-${v}^2`
					       :               `${resVV}${v}^2`;
					let p2 = resV === 0   ? ''
					       : resV > 0     ? ` + ${resV}${v}`
					       :               ` - ${Math.abs(resV)}${v}`;
					const step = cNum > 0 ? `${term1} + ${term2}` : `${term1} - ${term2}`;
					resStr = `${step} \\\\ = ${p1}${p2}`;
				} else {
					const resV = factorCoef * cVarCoef;
					const resN = factorCoef * cNum;
					const term1 = fmtProductFactor(fDisplay, `${cVarCoef}${v}`);
					const term2 = fmtProductFactor(fDisplay, Math.abs(cNum));
					let p1 = resV === 1  ? v
					       : resV === -1 ? `-${v}`
					       :              `${resV}${v}`;
					let p2 = resN > 0 ? `+ ${resN}` : `- ${Math.abs(resN)}`;
					const step = cNum > 0 ? `${term1} + ${term2}` : `${term1} - ${term2}`;
					resStr = `${step} \\\\ = ${p1} ${p2}`;
				}

				textDisplay = `Löse die Klammer auf: <br>\\( ${taskStr} \\)`;
				textPrint = `Löse die Klammer auf: \\(\\quad ${taskStr} = \\)`;
			} else {
				// --- TYP: AUSKLAMMERN ---
				let v = selectedVars[0] || 'x';
				let w = selectedVars[1] || '';
				const getGcd = mathUtils.getGcd;
				const commonCoef = rnd(2, 6);
				let a, b;
				do {
					a = rnd(2, 9);
					b = rnd(2, 9);
				} while (getGcd(a, b) !== 1);
				const sign = Math.random() < 0.5 ? 1 : -1;
				const commonFactorHasVar = w !== '' && Math.random() < 0.5;
				const extraInFirst = w !== '' && Math.random() < 0.5;

				const term1Vars = commonFactorHasVar
					? v + (extraInFirst ? w : '')
					: (w !== '' ? v + (extraInFirst ? w : '') : v);
				const term2Vars = commonFactorHasVar
					? v + (!extraInFirst ? w : '')
					: (w !== '' ? (!extraInFirst ? v + w : v) : '');
				const term1Coef = commonCoef * a;
				const term2Coef = commonCoef * b;

				const fmtInner = (coef, variable) => {
					if (variable === '') return `${coef}`;
					if (coef === 1) return variable;
					return `${coef}${variable}`;
				};

				const term1Text = `${fmt(term1Coef)}${term1Vars}`;
				const term2Text = `${fmt(term2Coef)}${term2Vars}`;
				taskStr = `${term1Text} ${sign === 1 ? '+' : '-'} ${term2Text}`;

				const commonFactorText = commonFactorHasVar ? `${fmt(commonCoef)}${v}` : fmt(commonCoef);
				const inner1 = fmtInner(a, commonFactorHasVar ? (extraInFirst ? w : '') : term1Vars);
				const inner2 = fmtInner(b, commonFactorHasVar ? (!extraInFirst ? w : '') : term2Vars);
				const innerSign = sign === 1 ? '+' : '-';
				resStr = `${commonFactorText}(${inner1} ${innerSign} ${inner2})`;

				textDisplay = `Klammere vollständig aus: <br>\\( ${taskStr} \\)`;
				textPrint = `Klammere vollständig aus: \\(\\quad ${taskStr} = \\)`;
			}

			s = `\\[ ${taskStr} = ${resStr} \\]`;
			break;
		}

		case 'word_terms': {
			const templates = [
				{ text: (a, b) => `Addiere ${a} und ${b}.`, symbol: '+' },
				{ text: (a, b) => `Subtrahiere ${b} von ${a}.`, symbol: '-' },
				{ text: (a, b) => `Multipliziere ${a} und ${b}.`, symbol: '\\cdot' },
				{ text: (a, b) => `Dividiere ${a} durch ${b}.`, symbol: ':' },
				{ text: (a, b) => `Berechne die Summe von ${a} und ${b}.`, symbol: '+' },
				{ text: (a, b) => `Berechne die Differenz von ${a} und ${b}.`, symbol: '-' },
				{ text: (a, b) => `Berechne das Produkt von ${a} und ${b}.`, symbol: '\\cdot' },
				{ text: (a, b) => `Berechne den Quotienten von ${a} und ${b}.`, symbol: ':' }
			];

			const template = templates[randInt(0, templates.length - 1)];

			let a = rnd(-15, 15);
			let b = rnd(-15, 15);
			if (template.symbol === ':') {
				b = 0;
				while (b === 0) {
					b = rnd(-12, 12);
				}
				const q = rnd(-12, 12);
				a = b * q;
			}

			const result = template.symbol === '+'
				? a + b
				: template.symbol === '-'
					? a - b
					: template.symbol === '\\cdot'
						? a * b
						: a / b;

			textDisplay = template.text(a, b);
			textPrint = template.text(a, b);
			s = `\\[ ${fmt(a)} ${template.symbol} ${fmt(b)} = ${result} \\]`;
			break;
		}

		case 'primzahlen': {
			const isPrim = mathUtils.isPrime;

			// --- TYP: BEREICH ABSUCHEN ---
			let start = randInt(0, 8) * 5; // Start bei 0, 5, 10, ..., 40
			
			let prims = [];
			for (let i = start; i <= start + 10; i++) {
				if (isPrim(i)) prims.push(i);
			}

			textDisplay = `Nenne alle Primzahlen von ${start} bis ${start + 10}.`;
			s = `Primzahlen ${start} - ${start + 10}: \\( \\quad ${prims.join(', ')}\\)`;
			
			break;
		}

		case 'linear_function': {
			// Generiere eine zufällige lineare Funktion
			let m;
			let b = randInt(-8, 8) / 2; 
			if (b >= 2) m = randInt(-6, -2) / 2;
			else if (b <= -2) m = randInt(2, 6) / 2;
			else m = randInt(-6, 6) / 2; 

			// Funktion
			const f = (x) => m * x + b;
			
			// Markante Punkte
			const yIntercept = b;
			const xIntercept = b !== 0 ? -b / m : 0; // Nullstelle
			
			// SVG-Grafik für Koordinatensystem
			const svgWidth = 345;
			const svgHeight = 285;
			const centerX = 360 / 2 - 15; 
			const centerY = 300 / 2;
			const scale = 30; // Pixel pro Einheit
			
			// Konvertiere Koordinaten von mathematisch zu SVG
			const toSVG = (x, y) => ({
				x: centerX + x * scale,
				y: centerY - y * scale  // SVG y ist invertiert
			});
			
			// Erstelle SVG
			let svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #ccc; background: white;">`;
			
			// Gitter: kariertes Papier mit 2 Kästchen pro Einheit
			for (let i = -11; i <= 12; i++) {
				const posX = toSVG(i / 2, 0);
				svgContent += `<line x1="${posX.x}" y1="${centerY - 150}" x2="${posX.x}" y2="${centerY + 150}" stroke="${i % 2 === 0 ? '#bbb' : '#bbb'}" stroke-width="0.5"/>`;
			}
			for (let i = -9; i <= 10; i++) {
				const posY = toSVG(0, i / 2);
				svgContent += `<line x1="0" y1="${posY.y}" x2="${svgWidth}" y2="${posY.y}" stroke="${i % 2 === 0 ? '#bbb' : '#bbb'}" stroke-width="0.5"/>`;
			}
			
			// Achsen
			// Zeichne die x-Achse als horizontale Linie
			svgContent += `<line x1="0" y1="${centerY}" x2="${svgWidth}" y2="${centerY}" stroke="black" stroke-width="2"/>`;
			// Zeichne die y-Achse als vertikale Linie
			svgContent += `<line x1="${centerX}" y1="0" x2="${centerX}" y2="${svgHeight}" stroke="black" stroke-width="2"/>`;
			// Pfeilspitze für die x-Achse nach rechts
			svgContent += `<polygon points="${svgWidth - 10},${centerY - 6} ${svgWidth},${centerY} ${svgWidth - 10},${centerY + 6}" fill="black"/>`;
			// Pfeilspitze für die y-Achse nach oben
			svgContent += `<polygon points="${centerX - 6},10 ${centerX},0 ${centerX + 6},10" fill="black"/>`;
			// Beschriftung für die x-Achse im Quadranten IV
			svgContent += `<text x="${svgWidth - 5}" y="${centerY + 16}" text-anchor="end" font-size="14" fill="black">x</text>`;
			// Beschriftung für die y-Achse im Quadranten II
			svgContent += `<text x="${centerX - 10}" y="10" text-anchor="end" font-size="14" fill="black">y</text>`;
			
			// Achsenticks für ganze Zahlen auf x- und y-Achse
			for (let i = -5; i <= 5; i++) {
				if (i !== 0) {
					const xPos = toSVG(i, 0);
					svgContent += `<line x1="${xPos.x}" y1="${centerY - 4}" x2="${xPos.x}" y2="${centerY + 4}" stroke="black" stroke-width="1"/>`;
				}
			}
			for (let i = -4; i <= 4; i++) {
				if (i !== 0) {
					const yPos = toSVG(0, i);
					svgContent += `<line x1="${centerX - 4}" y1="${yPos.y}" x2="${centerX + 4}" y2="${yPos.y}" stroke="black" stroke-width="1"/>`;
				}
			}
			
			// Achsen-Beschriftungen (ganze Zahlen)
			for (let i = -5; i <= 5; i++) {
				if (i !== 0) {
					const xPos = toSVG(i, 0);
					svgContent += `<text x="${xPos.x}" y="${centerY + 15}" text-anchor="middle" font-size="11" fill="black">${i}</text>`;
				}
			}
			for (let i = -4; i <= 4; i++) {
				if (i !== 0) {
					const yPos = toSVG(0, i);
					svgContent += `<text x="${centerX - 15}" y="${yPos.y + 4}" text-anchor="end" font-size="11" fill="black">${i}</text>`;
				}
			}
			
			// Gerade zeichnen
			const leftPoint = toSVG(-6, f(-6));
			const rightPoint = toSVG(6, f(6));
			svgContent += `<line x1="${leftPoint.x}" y1="${leftPoint.y}" x2="${rightPoint.x}" y2="${rightPoint.y}" stroke="#e74c3c" stroke-width="2.5"/>`;
			
			// y-Achsenabschnitt markieren
			const yIntPos = toSVG(0, yIntercept);
			svgContent += `<circle cx="${yIntPos.x}" cy="${yIntPos.y}" r="3" fill="#3498db" stroke="#2980b9" stroke-width="2"/>`;
			
			// Horizontale Strecke von (0,b) nach (1,b)
			const rightFromYAxis = toSVG(1, yIntercept);
			svgContent += `<line x1="${yIntPos.x}" y1="${yIntPos.y}" x2="${rightFromYAxis.x}" y2="${rightFromYAxis.y}" stroke="#2980b9" stroke-width="2"/>`;
			svgContent += `<polygon points="${rightFromYAxis.x - 6},${rightFromYAxis.y - 4} ${rightFromYAxis.x},${rightFromYAxis.y} ${rightFromYAxis.x - 6},${rightFromYAxis.y + 4}" fill="#2980b9"/>`;
			svgContent += `<text x="${(yIntPos.x + rightFromYAxis.x) / 2}" y="${yIntPos.y - 6}" text-anchor="middle" font-size="16" fill="#2980b9">1</text>`;
			
			// Vertikale Strecke von (1,b) nach (1,b+m)
			const upFromPoint = toSVG(1, yIntercept + m);
			svgContent += `<line x1="${rightFromYAxis.x}" y1="${rightFromYAxis.y}" x2="${upFromPoint.x}" y2="${upFromPoint.y}" stroke="#2980b9" stroke-width="2"/>`;
			if (m >= 0) {
				svgContent += `<polygon points="${upFromPoint.x - 4},${upFromPoint.y + 6} ${upFromPoint.x},${upFromPoint.y} ${upFromPoint.x + 4},${upFromPoint.y + 6}" fill="#2980b9"/>`;
				svgContent += `<text x="${upFromPoint.x + 12}" y="${(rightFromYAxis.y + upFromPoint.y) / 2 + 6}" text-anchor="start" font-size="16" fill="#2980b9">${m}</text>`;
			} else {
				svgContent += `<polygon points="${upFromPoint.x - 4},${upFromPoint.y - 6} ${upFromPoint.x},${upFromPoint.y} ${upFromPoint.x + 4},${upFromPoint.y - 6}" fill="#2980b9"/>`;
				svgContent += `<text x="${upFromPoint.x + 12}" y="${(rightFromYAxis.y + upFromPoint.y) / 2 + 6}" text-anchor="start" font-size="16" fill="#2980b9">${m}</text>`;
			}
			
			// Punkt bei x = 1 markieren (1, b + m)
			const highlightPos = toSVG(1, f(1));
			svgContent += `<circle cx="${highlightPos.x}" cy="${highlightPos.y}" r="3" fill="#27ae60" stroke="#229954" stroke-width="2"/>`;
			
			// Ursprung
			svgContent += `<circle cx="${centerX}" cy="${centerY}" r="3" fill="black"/>`;
			
			svgContent += `</svg>`;
			
			// Funktionsgleichung
			const mStr = m === 1 ? 'x' : (m === -1 ? '-x' : `${m}x`);
			const funcStr = b === 0
				? `f(x) = ${comma(mStr)}`
				: b > 0
					? `f(x) = ${comma(mStr)} + ${comma(b)}`
					: `f(x) = ${comma(mStr)} - ${comma(Math.abs(b))}`;

			textDisplay = `Zeichne den Graphen und gib die Nullstelle an: \\( ${funcStr} \\)`;
			textPrint = `Zeichne und gib die Nullstelle an: \\( \\; ${funcStr} \\) ${karo(11, 20)}` ;

			const x0 = comma(formatDecimal(xIntercept, 2));
			s = `<div style="display:flex; justify-content: center; align-items:center; gap:20px;">
				<div style="min-width:180px;">
					<span>\\( ${funcStr} \\)</span><br><br>
					<span>Nst. \\( \\; x_0 = ${x0} \\)</span>
				</div>
				<div>${svgContent}</div>
			</div>`;
			break;
		}

	case 'zahlengerade': {
		const isPositiveOnly = grade <= 6;
		const tickBases = [2, 3, 5];
		const tickFactors = [1, 5, 10, 50, 100];
		const tickDistance = tickBases[randInt(0, tickBases.length - 1)] * tickFactors[randInt(0, tickFactors.length - 1)];
		const tickCount = randInt(5, 7);
		const startValue = isPositiveOnly ? 0 : randInt(-3, 2) * tickDistance;
		const endValue = startValue + tickDistance * (tickCount - 1);
		const formatValue = (value) => Number.isInteger(value) ? `${value}` : formatDecimal(value, 1);
		const getValueAt = (position) => startValue + position * tickDistance;
		const svgWidth = 520;
		const svgHeight = 96;
		const svgRenderWidthCm = 10;
		const svgRenderHeightCm = 2;
		const margin = 10;
		const axisY = 52;
		const arrowSize = 10;
		const lineStart = margin;
		const lineEnd = svgWidth - margin - arrowSize;
		const unitPx = (lineEnd - lineStart) / tickCount;
		const tickOffset = unitPx / 2;
		const getX = (position) => lineStart + tickOffset + position * unitPx;
		const renderNumberLine = ({ labels = {}, labelColors = {}, labelWeights = {}, scale = 1, widthCm } = {}) => {
			const renderWidth = `${(widthCm ?? (svgRenderWidthCm * scale))}cm`;
			const renderHeight = `${svgRenderHeightCm * scale}cm`;
			let content = `<svg width="${renderWidth}" height="${renderHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
			content += `<line x1="${lineStart}" y1="${axisY}" x2="${lineEnd}" y2="${axisY}" stroke="black" stroke-width="2"/>`;
		content += `<polygon points="${svgWidth - margin},${axisY} ${lineEnd},${axisY - 6} ${lineEnd},${axisY + 6}" fill="black"/>`;
			for (let i = 0; i < tickCount; i++) {
				const x = getX(i);
				content += `<line x1="${x}" y1="${axisY - 8}" x2="${x}" y2="${axisY + 8}" stroke="black" stroke-width="1"/>`;
				const label = labels[i];
				if (label !== undefined) {
					const labelColor = labelColors[i] || 'black';
					const labelWeight = labelWeights[i] || '400';
					content += `<text x="${x}" y="${axisY + 27}" text-anchor="middle" font-size="17" font-weight="${labelWeight}" fill="${labelColor}">${label}</text>`;
				}
			}
			content += `</svg>`;
			return content;
		};

		const givenPosA = randInt(0, tickCount - 1);
		let givenPosB;
		do {
			givenPosB = randInt(0, tickCount - 1);
		} while (Math.abs(givenPosA - givenPosB) <= 1);

		const taskLabels = {
			[givenPosA]: formatValue(getValueAt(givenPosA)),
			[givenPosB]: formatValue(getValueAt(givenPosB))
		};
		const solutionLabels = {};
		const missingPositions = [];
		for (let i = 0; i < tickCount; i++) {
			solutionLabels[i] = formatValue(getValueAt(i));
			if (i !== givenPosA && i !== givenPosB) {
				missingPositions.push(i);
			}
		}

		const taskSvgDisplay = renderNumberLine({ labels: taskLabels, scale: 1.7 });
		const taskSvgPrint = renderNumberLine({ labels: taskLabels, scale: 1, widthCm: 11 });

		const solutionSvg = renderNumberLine({
			labels: solutionLabels,
			labelColors: missingPositions.reduce((acc, pos) => {
				acc[pos] = '#1b5e20';
				return acc;
			}, {}),
			labelWeights: missingPositions.reduce((acc, pos) => {
				acc[pos] = '700';
				return acc;
			}, {}),
			scale: 1.7
		});

		textDisplay = `Vervollständige den Zahlenstrahl anhand der zwei vorgegebenen Werte.<br>${taskSvgDisplay}`;
		textPrint = `Vervollständige den Zahlenstrahl:<br>${taskSvgPrint}`;
		s = `${solutionSvg}`;
		break;
	}

	case 'wkt': {
			let mode = randInt(0, 4); // 0: Urne (3 Farben), 1: Rel. Häufigkeit, 2: 12-seitiger Würfel, 3: Glücksrad, 4: Würfel 
			let taskStr, resStr;
			
			if (mode === 0) {
				// --- TYP: LAPLACE URNE (3 FARBEN) ---
				const farben = ['rote', 'blaue', 'grüne', 'gelbe'];
				let w = fisherYatesShuffle(farben);
				let n1 = randInt(3, 9);
				let n2 = randInt(3, 9);
				let n3 = randInt(3, 9);
				let gesamt = n1 + n2 + n3;
				
				// Grammatik-Fix: "rote" -> "Rot", "grüne" -> "Grün"
				let farbeSubst = w[0].charAt(0).toUpperCase() + w[0].slice(1, -1);
				
				taskStr = `Eine Urne enthält ${n1} ${w[0]}, ${n2} ${w[1]} und ${n3} ${w[2]} Kugeln. Nenne die Wahrscheinlichkeit, eine ${w[0]} Kugel zu ziehen?`;
				
				// In der Lösung nutzen wir jetzt die substantivierte Form
				resStr = `P(${farbeSubst}) = \\( \\dfrac{${n1}}{${gesamt}} \\)`;
			} else if (mode === 1) {
				// --- TYP: RELATIVE HÄUFIGKEIT (KONTEXT-SPEZIFISCH) ---
				const szenarien = [
					{ txt: 'Basketball: Von', einheit: 'Würfen wurden', e: 'getroffen' },
					{ txt: 'Qualitätskontrolle: Von', einheit: 'Bauteilen sind', e: 'defekt' },
					{ txt: 'Umfrage: Von', einheit: 'Personen antworten', e: 'mit "Ja"' },
					{ txt: 'Torwart: Von', einheit: 'Schüssen wurden', e: 'gehalten' }
				];
				const sz = szenarien[randInt(0, szenarien.length - 1)];
				let gesamt = [10, 20, 25, 40, 50][randInt(0, 4)];
				let treffer = Math.floor(gesamt * (randInt(2, 9) / 10));
				
				taskStr = `${sz.txt} ${gesamt} ${sz.einheit} ${treffer} ${sz.e}.<br>Nenne die relative Häufigkeit in %.`;
				let prozent = (treffer / gesamt) * 100;
				resStr = `h = \\( \\dfrac{${treffer}}{${gesamt}} \\) = ${prozent.toFixed(0).replace('.', ',')} %`;
				
			} else if (mode === 2) {
				// --- TYP: 12-SEITIGER WÜRFEL (D12) ---
				let subMode = randInt(0, 2);
				let ereignis, guenstige;
				
				if (subMode === 0) {
					ereignis = "eine Primzahl";
					taskStr = `Nenne die Wahrscheinlichkeit für ${ereignis} bei einem 12-seitigen Spielwürfel?`;
					resStr = `P(Primzahl) = \\( \\dfrac{5}{12} \\)`;
				} else if (subMode === 1) {
					let limit = randInt(7, 10);
					ereignis = `eine Zahl größer als ${limit}`;
					let count = 12 - limit;
					taskStr = `Nenne die Wahrscheinlichkeit für ${ereignis} bei einem 12-seitigen Spielwürfel?`;
					resStr = `P(x > ${limit}) = \\( \\dfrac{${count}}{12} \\)`;
				} else {
					// Würfeln: Teilbarkeit durch 3, 4 oder 5
					let auswahl = [3, 4, 5][randInt(0, 2)];
					let treffer, gekuerzt;
					
					if (auswahl === 3) {
						treffer = 4; // {3, 6, 9, 12}
						gekuerzt = "\\dfrac{1}{3}";
					} else if (auswahl === 4) {
						treffer = 3; // {4, 8, 12}
						gekuerzt = "\\dfrac{1}{4}";
					} else {
						treffer = 2; // {5, 10}
						gekuerzt = "\\dfrac{1}{6}";
					}

					let ereignis = `eine durch ${auswahl} teilbare Zahl`;
					taskStr = `Nenne die Wahrscheinlichkeit für ${ereignis} bei einem 12-seitigen Spielwürfel?`;
					resStr = `P(durch ${auswahl} teilbar) = \\( \\dfrac{${treffer}}{12} = ${gekuerzt}\\) `;
				}

			} else if (mode === 3) {
				// --- TYP: GLÜCKSRAD (2 Farben, zweimal drehen) ---
				const farben = ['rote', 'blaue', 'grüne', 'gelbe'];
				let w = fisherYatesShuffle(farben);
				let f1 = w[0]; // Die gesuchte Farbe (z.B. "rote")
				let f2 = w[1]; // Die andere Farbe
				
				let n1 = randInt(2, 5); // Felder Farbe 1
				let n2 = randInt(2, 5); // Felder Farbe 2
				let gesamt = n1 + n2;
				
				// Grammatik-Anpassung für die Farbe im Satz (Substantiviert)
				let f1Subst = f1.charAt(0).toUpperCase() + f1.slice(1, -1); // "rote" -> "Rot"
				
				taskStr = `Ein Glücksrad hat ${n1} ${f1} und ${n2} ${f2} gleich große Felder. Nenne die Wahrscheinlichkeit, dass 2-mal in Folge ${f1Subst} gedreht wird.`;
				
				// Berechnung: (n1/gesamt) * (n1/gesamt)
				let zaehler = n1 * n1;
				let nenner = gesamt * gesamt;
				
				// Lösungsweg mit Pfadregel
				resStr = `P(${f1Subst}, ${f1Subst}) = \\( \\dfrac{${n1}}{${gesamt}} \\cdot \\dfrac{${n1}}{${gesamt}} = \\dfrac{${zaehler}}{${nenner}} \\)`;
				
			} else if (mode === 4) {
				// --- TYP: 2 WÜRFEL - AUGENSUMME ---
				const target = randInt(2, 12);
				let count = 0;
				for (let a = 1; a <= 6; a++) {
					for (let b = 1; b <= 6; b++) {
						if (a + b === target) count++;
					}
				}

				const num = count;
				const den = 36;
				const frac = den === 1 ? `${num}` : `\\dfrac{${num}}{${den}}`;
				taskStr = `Zwei Würfel werden geworfen.<br>Nenne die Wahrscheinlichkeit für die Augensumme ${target}.`;
				resStr = `P(Summe = ${target}) = \\( ${frac} \\)`;
			} 
			textDisplay = taskStr;
			s = `${resStr}`;
			break;
		}

		case 'funktionen': {
			let subType = randInt(0,2);
		
			// Hilfsvariablen für die Funktionserstellung
			let isLinear = randInt(0, 1) === 0;
			let m = rnd(-8, 8) / 2;
			let b = rnd(-5, 5);
			const fmtFunctionNumber = (value) => comma(value);
			
			let funcStr = "";
			let calcF = (x) => 0;
			
			// Funktion generieren (Linear oder Quadratisch)
			if (isLinear) {
				calcF = (x) => m * x + b;
				let mStr = m === 1 ? "" : (m === -1 ? "-" : fmtFunctionNumber(m));
				let bStr = b > 0 ? ` + ${fmtFunctionNumber(b)}` : (b < 0 ? ` - ${fmtFunctionNumber(Math.abs(b))}` : "");
				funcStr = `f(x) = ${mStr}x${bStr}`;
			} else {
				let quadType = randInt(0, 1);
				if (quadType === 0) {
					// Normalparabel verschoben: x^2 + c
					calcF = (x) => x * x + b;
					let bStr = b > 0 ? ` + ${fmtFunctionNumber(b)}` : (b < 0 ? ` - ${fmtFunctionNumber(Math.abs(b))}` : "");
					funcStr = `f(x) = x^2${bStr}`;
				} else {
					// Gestreckte/Gestauchte Parabel: a*x^2
					let a = randInt(2, 4) * (randInt(0, 1) === 0 ? 1 : -1);
					calcF = (x) => a * x * x;
					funcStr = `f(x) = ${fmtFunctionNumber(a)}x^2`;
				}
			}
			
			// Verfügbare Teilaufgabentypen: 0, 3, 4, 5
			switch (subType) {
				case 0: // Funktionswert berechnen
					let xVal = randInt(-4, 4);
					const rhsCase0 = funcStr.replace('f(x) = ', '');
					textDisplay = `Berechne bei der Funktion \\( ${funcStr} \\) den Funktionswert zum Argument \\( ${fmtFunctionNumber(xVal)} \\).`;
					s = `\\( f(${fmtFunctionNumber(xVal)}) = ${rhsCase0.replace(/x/g, `(${fmtFunctionNumber(xVal)})`)} = ${fmtFunctionNumber(calcF(xVal))} \\)`;
					break;
					
				case 1: // Fehlende Koordinate
					let px = randInt(-4, 4);
					let py = calcF(px);
					const rhsCase3 = funcStr.replace('f(x) = ', '');
					textDisplay = `\\( P(${fmtFunctionNumber(px)} | y) \\) liegt auf \\( ${funcStr} \\).<br>Bestimme \\( y \\).`;
					s = `\\( y = f(${fmtFunctionNumber(px)}) = ${rhsCase3.replace(/x/g, `(${fmtFunctionNumber(px)})`)} = ${fmtFunctionNumber(py)} \\)`;
					break;

				case 2: // Wertetabelle 
					const xValues = [-2, -1, 0, 1, 2];
					const buildValueTable = (isFilled, isCentered = true) => {
							const xRow = xValues.map((x, idx) => `<td style="padding:6px 10px; text-align:center; min-width:40px; border-bottom:1px solid #333; ${idx < xValues.length - 1 ? 'border-right:1px solid #333;' : ''}">${fmtFunctionNumber(x)}</td>`).join('');
						const yRow = xValues.map(x => {
								const value = isFilled ? `${fmtFunctionNumber(calcF(x))}` : '&nbsp;';
							return `<td style="padding:6px 10px; text-align:center; min-width:34px; ${x < xValues[xValues.length - 1] ? 'border-right:1px solid #333;' : ''}">${value}</td>`;
						}).join('');

						return `<table style="border-collapse:separate; border-spacing:0; margin:${isCentered ? '8px auto 0 auto' : '8px 0 0 0'};">` +
							`<tr><th style="padding:6px 10px; min-width:30px; font-weight:400; border-right:1px solid #333; border-bottom:1px solid #333;">x</th>${xRow}</tr>` +
							`<tr><th style="padding:6px 10px; min-width:30px; font-weight:400; border-right:1px solid #333;">y</th>${yRow}</tr>` +
						`</table>`;
					};

					textDisplay = `Fülle die Wertetabelle für \\( ${funcStr} \\) aus.<br>${buildValueTable(false)}`;
					textPrint = `Fülle die Wertetabelle für \\( ${funcStr} \\) aus.<br>${buildValueTable(false, false)}`;
					s = `${buildValueTable(true)}<br>Kontrolle: Trage z. B. die Punkte \\( P(-1|${fmtFunctionNumber(calcF(-1))}) \\), \\( Q(0|${fmtFunctionNumber(calcF(0))}) \\) und \\( R(1|${fmtFunctionNumber(calcF(1))}) \\) in das Koordinatensystem ein.`;
					break;
					
					case 5: // Punktprobe
					let testX = randInt(-3, 3);
					let isTrue = randInt(0, 1) === 0;
					// Wenn isTrue false ist, addiere einen kleinen Störwert auf das echte y
					let testY = isTrue ? calcF(testX) : calcF(testX) + randInt(1, 3) * (Math.random() < 0.5 ? 1 : -1);
					
						textDisplay = `Punktprobe: Prüfe, ob der Punkt \\( P(\\,${fmtFunctionNumber(testX)} \\, | ${fmtFunctionNumber(testY)}\\,) \\) auf dem Graphen von \\( ${funcStr} \\) liegt.`;
					if (isTrue) {
								s = `\\( f(${fmtFunctionNumber(testX)}) = ${fmtFunctionNumber(calcF(testX))} \\rightarrow\\) Ja, P liegt auf dem Graphen.`;
					} else {
								s = `\\( f(${fmtFunctionNumber(testX)}) = ${fmtFunctionNumber(calcF(testX))} \\neq ${fmtFunctionNumber(testY)} \\rightarrow\\) Nein, P liegt nicht auf dem Graphen.`;
					}
					break;
			}
			break;
		}

		case 'statistik': {
			let n = randInt(5, 6); // Anzahl der Datenpunkte
			let data, sum, mean, modeVal;
			
			// Hocheffiziente Generierung ohne langes Würfeln
			do {
				data = [];
				let used = new Set();
				
				// 1. Modalwert festlegen (kommt genau 2x vor)
				modeVal = randInt(1, 9);
				data.push(modeVal, modeVal);
				used.add(modeVal);
				
				// 2. n-3 eindeutige Zufallszahlen hinzufügen
				while (data.length < n - 1) {
					let num = randInt(1, 12);
					if (!used.has(num)) {
						data.push(num);
						used.add(num);
					}
				}

				// 3. Den letzten Wert berechnen (Ziel: Rest 0 oder bei n=6 auch Rest 3)
				let currentSum = data.reduce((a, b) => a + b, 0);
				let targetRemainder = (n === 6 && Math.random() < 0.5) ? 3 : 0;
				
				// Diff berechnen, um auf den targetRemainder zu kommen
				let diff = (targetRemainder - (currentSum % n) + n) % n;
				let lastVal = diff;
				
				// lastVal erhöhen, bis er nicht mehr in 'used' ist und > 0
				while (used.has(lastVal) || lastVal === 0) {
					lastVal += n;
				}
				
				// Wichtig: Erst hier wird das Array auf die volle Länge n gebracht!
				data.push(lastVal);
				sum = currentSum + lastVal;
				mean = (sum / n).toString().replace('.', ',');
				
				if (lastVal <= 13) {
					sum = currentSum + lastVal;
					// Prüfe: Entweder glatt teilbar ODER (bei n=6) Rest ist 3
					if (sum % n === 0 || (n === 6 && sum % n === 3)) {
						mean = (sum / n).toString().replace('.', ',');
						break;
					}
				}
			} while (true);

			// 4. Liste zufällig durchmischen (Fisher-Yates Shuffle)
			for (let i = data.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[data[i], data[j]] = [data[j], data[i]];
			}

			let sortedData = [...data].sort((a, b) => a - b);
			let displayData = isMentalMode ? sortedData : data;

			// Bestimmung der einen gesuchten Kenngröße
			let taskType = randInt(0, 3);
			let taskName, loesung;
			
			switch (taskType) {
				case 0:
					taskName = "das arithmetische Mittel";
					// Nutze hier das oben formatierte mean
					loesung = `${sortedData.join(' + ')} = ${sum}<br>arithmetische Mittel = ${sum} : ${n} = ${mean}`;
					break;
					case 1:
						taskName = "den Zentralwert (Median)";
					if (n === 5) {
						// Bei 5 Daten: Genau der 3. Wert
						let median = sortedData[2];
						loesung = isMentalMode ?
						`${displayData.join(', ')}<br>Zentralwert (Median) = ${median}.` :
						`geordnete Liste: ${sortedData.join(', ')}<br>Zentralwert (Median) = ${median}`;
					} else {
						// Bei 6 Daten: Mittelwert aus dem 3. und 4. Wert
						let m1 = sortedData[2];
						let m2 = sortedData[3];
						let median = (m1 + m2) / 2;
						let medianStr = median.toString().replace('.', ',');
						
						loesung = isMentalMode ?
							`${sortedData.join(', ')}<br>Zentralwert = (${m1} + ${m2}) : 2 = ${medianStr}` :
							`geordnete Liste: ${sortedData.join(', ')}<br>Zentralwert = (${m1} + ${m2}) : 2 = ${medianStr}`;
						}
					break;
				case 2:
					taskName = "den Modalwert";
					loesung = `${displayData.join(', ')}<br>Modalwert = ${modeVal}`;
					break;
					case 3:
						taskName = "die Spannweite";
					let spannweite = sortedData[n - 1] - sortedData[0];
					loesung = `${displayData.join(', ')}<br>Spannweite = ${sortedData[n - 1]} - ${sortedData[0]} = ${spannweite}`;
					break;
			}

			textPrint = `Bestimme ${taskName}: \\( \\quad ${displayData.join(', ')} \\)`;
			textDisplay = `Bestimme ${taskName}: <br>${displayData.join(', ')}`;
			s = loesung;
			break;
		}

		case 'winkel': {
			let mode = randInt(0, 5); // 0: Uhrzeit, 1: Kreisdiagramm, 2: Winkel zeichnen (versch. Typen), 3: Winkel zeichnen (10°-350°), 4: Dreieckswinkel berechnen, 5: Dreieckstyp zeichnen
			
			if (mode === 0) {
				// --- Uhrzeit ---
				let displayHour = randInt(0, 23);
				let hourOnClock = displayHour % 12;
				let stepCount = Math.min(hourOnClock, 12 - hourOnClock);
				let smallerAngle = stepCount * 30;
				let largerAngle = 360 - smallerAngle;
				
				textDisplay = `Welche Winkel bilden die Uhr-Zeiger um ${String(displayHour)}:00 Uhr?`;
				s = `${String(displayHour)}:00 Uhr ➝ ${smallerAngle}° und ${largerAngle}°`;
				
			} else if (mode === 1) {
				// --- Kreisdiagramm ---
				const prozentListe = [5, 10, 20, 25, 30, 40, 50, 60, 75, 80];
				let p = prozentListe[randInt(0, prozentListe.length - 1)];
				let result = (p / 100) * 360;
				
				textDisplay = `Welchen Winkel haben ${p} % in einem Kreisdiagramm?`;
				s = `10 % ≙ 36° &#x2192; ${p} % ≙ ${result}°`;
				
			} else if (mode === 2) {
				// --- Winkel zeichnen ---
				// Wir wählen gezielt Werte aus verschiedenen Bereichen
				const pools = [
					{ min: 1, max: 89, name: "spitzen Winkel" },
					{ val: 90, name: "rechten Winkel" },
					{ min: 91, max: 179, name: "stumpfen Winkel" },
					{ val: 180, name: "gestreckten Winkel" },
					{ min: 181, max: 359, name: "überstumpfen Winkel" }
				];
				let pick = pools[randInt(0, pools.length - 1)];
				
				textDisplay = `Zeichne einen ${pick.name}.`;
				textPrint = `Zeichne einen ${pick.name}.${space(2.5)}`;
				s = pick.val !== undefined ? `${pick.name.replace('en', 'er')}: ${pick.val}°` : `${pick.name.replace('en', 'er')}: ${pick.min}° bis ${pick.max}°`;
				
			} else if (mode === 3) {
				let grad = Math.random() < 0.5 ? randInt(15, 50) : randInt(130, 230);
				textDisplay = `Zeichne den Winkel \\(\\alpha\\) = ${grad}°.`;
				textPrint = `Zeichne den Winkel \\(\\alpha\\) = ${grad}°.${space(2.5)}`;
				s = `Zeichne den Winkel \\(\\alpha\\) = ${grad}°.`;

			} else if (mode === 4) {
				let a = rnd(25, 45), b = rnd(61, 129);
				textPrint = `Dreieck mit Winkeln \\( \\alpha = ${a}° \\) und \\( \\beta = ${b}°. \\quad \\gamma = \\) ${blank(1.5)} `;
				textDisplay = `Dreieck mit Winkeln \\( \\alpha = ${a}° \\) und \\( \\beta = ${b}°\\). Winkel \\(\\gamma \\)?`;
				s = `\\( \\gamma \\) = 180° - ${a}° - ${b}\° = ${180 - a - b}°`;

			} else {
				const triangleTypes = ['spitzwinkliges', 'stumpfwinkliges', 'gleichschenkliges', 'gleichseitiges'];
				const type = triangleTypes[randInt(0, triangleTypes.length - 1)];
				textDisplay = `Zeichne ein ${type} Dreieck.`;
				textPrint = `Zeichne ein ${type} Dreieck.${space(2.5)}`;
				let definition;
				switch (type) {
					case 'spitzwinkliges':
						definition = 'Alle Winkel kleiner als 90°.';
						break;
					case 'stumpfwinkliges':
						definition = 'Ein Winkel größer als 90°.';
						break;
					case 'gleichschenkliges':
						definition = 'Zwei Seiten gleich lang.';
						break;
					case 'gleichseitiges':
						definition = 'Alle Seiten gleich lang.';
						break;
				}
				s = `Kontrolle: ${definition}`;
			}
			break;
		}
		
		case 'kongruenz': {
			// Permutation bleibt: Zuordnung von Seiten-/Winkelnamen wird zufaellig gemischt.
			let p = [0, 1, 2];
			for (let i = 2; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[p[i], p[j]] = [p[j], p[i]];
			}
			
			const type = randInt(0, 3); // 0: SSS, 1: SWS, 2: WSW, 3: SsW
			const kongruenzsatz = ['SSS', 'SWS', 'WSW', 'SsW'][type];
			const cm = (x) => formatDecimal(x, 1);
			const pickDecNoZeroTenth = (minTenths, maxTenths) => {
				let n;
				do {
					n = randInt(minTenths, maxTenths);
				} while (n % 10 === 0);
				return n / 10;
			};

			let givenStr = '';
			let givenSides = [false, false, false];
			let givenAngles = [false, false, false];
			let s1, s2, s3, a1, a2, a3;
			const deg = Math.PI / 180;
			const computeTriangleHeight = (sides, angles, given) => {
				const givenSideIndexes = [0, 1, 2].filter((i) => given[i]);
				if (!givenSideIndexes.length) return 0;
				const baseIndex = givenSideIndexes.reduce((maxIdx, idx) =>
					sides[idx] > sides[maxIdx] ? idx : maxIdx,
					givenSideIndexes[0]
				);
				if (baseIndex === 0) return sides[1] * Math.sin(angles[2] * deg);
				if (baseIndex === 1) return sides[0] * Math.sin(angles[2] * deg);
				if (baseIndex === 2) return sides[0] * Math.sin(angles[1] * deg);
				return 0;
			};
			const buildGivenStr = () => {
				const parts = [];
				if (givenSides[0]) parts.push(`a=${cm(resS[0])}\\,\\text{cm}`);
				if (givenSides[1]) parts.push(`b=${cm(resS[1])}\\,\\text{cm}`);
				if (givenSides[2]) parts.push(`c=${cm(resS[2])}\\,\\text{cm}`);
				if (givenAngles[0]) parts.push(`\\alpha=${resA[0]}^\\circ`);
				if (givenAngles[1]) parts.push(`\\beta=${resA[1]}^\\circ`);
				if (givenAngles[2]) parts.push(`\\gamma=${resA[2]}^\\circ`);
				return parts.length ? `\\( \\; ${parts.join('; \\; ')} \\)` : '';
			};

			if (type === 0) {
				// SSS
				do {
					s1 = pickDecNoZeroTenth(31, 69);
					s2 = pickDecNoZeroTenth(31, 69);
					const minS3 = Math.abs(s1 - s2) + 1.5;
					const maxS3 = Math.min(s1 + s2 - 1.5, 10);
					const minS3Tenths = Math.ceil(minS3 * 10);
					const maxS3Tenths = Math.floor(maxS3 * 10);
					if (minS3Tenths > maxS3Tenths) continue;
					
					s3 = pickDecNoZeroTenth(minS3Tenths, maxS3Tenths);
					
					a1 = Math.round(Math.acos((s2 * s2 + s3 * s3 - s1 * s1) / (2 * s2 * s3)) * 180 / Math.PI);
					a2 = Math.round(Math.acos((s1 * s1 + s3 * s3 - s2 * s2) / (2 * s1 * s3)) * 180 / Math.PI);
					a3 = 180 - a1 - a2;
					givenSides = [true, true, true];
					triangleHeight = computeTriangleHeight([s1, s2, s3], [a1, a2, a3], givenSides);
				} while (Math.max(s1, s2, s3) > 9 || triangleHeight > 4 || triangleHeight < 2);

			} else if (type === 1) {
				// SWS
				do {
					givenSides = [false, false, false];
					givenAngles = [false, false, false];
					s1 = pickDecNoZeroTenth(31, 69);
					s2 = pickDecNoZeroTenth(31, 69);
					a3 = randInt(25, 125);
					
					s3 = Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * Math.cos(a3 * Math.PI / 180));
					a1 = Math.round(Math.acos((s2 * s2 + s3 * s3 - s1 * s1) / (2 * s2 * s3)) * 180 / Math.PI);
					s3 = Math.round(s3 * 10) / 10;
					a2 = 180 - a3 - a1;
					givenSides[p[0]] = true;
					givenSides[p[1]] = true;
					givenAngles[p[2]] = true;
					triangleHeight = computeTriangleHeight([s1, s2, s3], [a1, a2, a3], givenSides);
				} while (Math.max(s1, s2, s3) > 9 || a2 <= 0 || triangleHeight > 4 || triangleHeight < 2);
			} else if (type === 2) {
				// WSW
				do {
					givenSides = [false, false, false];
					givenAngles = [false, false, false];
					s3 = pickDecNoZeroTenth(31, 69);
					a1 = randInt(25, 50);
					a2 = randInt(90, 120);
					a3 = 180 - a1 - a2;
					
					s1 = Math.round((s3 * Math.sin(a1 * Math.PI / 180) / Math.sin(a3 * Math.PI / 180)) * 10) / 10;
					s2 = Math.round((s3 * Math.sin(a2 * Math.PI / 180) / Math.sin(a3 * Math.PI / 180)) * 10) / 10;
					givenSides[p[2]] = true;
					givenAngles[p[0]] = true;
					givenAngles[p[1]] = true;
					triangleHeight = computeTriangleHeight([s1, s2, s3], [a1, a2, a3], givenSides);
				} while (a3 < 10 || Math.max(s1, s2, s3) > 9 || triangleHeight > 4 || triangleHeight < 2);

			} else {
				// SsW
				do {
					givenSides = [false, false, false];
					givenAngles = [false, false, false];
					s1 = pickDecNoZeroTenth(51, 69);
					s2 = pickDecNoZeroTenth(31, 49);
					a1 = randInt(25, 110);
					
					const sinA2 = (s2 * Math.sin(a1 * Math.PI / 180)) / s1;
					if (sinA2 >= 1 || sinA2 <= -1) {
						a2 = NaN;
						a3 = NaN;
						s3 = NaN;
						continue;
					}

					a2 = Math.round(Math.asin(sinA2) * 180 / Math.PI);
					a3 = 180 - a1 - a2;
					s3 = Math.round((s1 * Math.sin(a3 * Math.PI / 180) / Math.sin(a1 * Math.PI / 180)) * 10) / 10;
					givenSides[p[0]] = true;
					givenSides[p[1]] = true;
					givenAngles[p[0]] = true;
					triangleHeight = computeTriangleHeight([s1, s2, s3], [a1, a2, a3], givenSides);
				} while (!Number.isFinite(s3) || a3 < 10 || Math.max(s1, s2, s3) > 9 || triangleHeight > 4 || triangleHeight < 2);

			}

			const resS = [], resA = [];
			resS[p[0]] = s1; resS[p[1]] = s2; resS[p[2]] = s3;
			resA[p[0]] = a1; resA[p[1]] = a2; resA[p[2]] = a3;

			givenStr = buildGivenStr();

			// Höhe des zu zeichnenden Dreiecks berechnen (bei längster gegebener Seite als Grundseite).
			// Über Heron: A = sqrt(u(u-a)(u-b)(u-c)), dann h = 2A/g.
			const sideA = resS[0], sideB = resS[1], sideC = resS[2];
			const givenSideValues = [];
			if (givenSides[0]) givenSideValues.push(sideA);
			if (givenSides[1]) givenSideValues.push(sideB);
			if (givenSides[2]) givenSideValues.push(sideC);
			const base = givenSideValues.length ? Math.max(...givenSideValues) : Math.max(sideA, sideB, sideC);
			const semi = (sideA + sideB + sideC) / 2;
			const areaSq = semi * (semi - sideA) * (semi - sideB) * (semi - sideC);
			const area = Math.sqrt(Math.max(0, areaSq));
			const computedHeight = base > 0 ? (2 * area) / base : 0;
			const reservedHeight = Number(computedHeight + 0.5).toFixed(1);
			
			textDisplay = `Skizziere eine Planfigur, zeichne und beschrifte das Dreieck und miss alle Größen: <br>${givenStr}`;
			textPrint = `Skizziere eine Planfigur, zeichne und beschrifte das Dreieck und miss alle Größen: ${givenStr}${space(reservedHeight)}`;
			s = `Kongruenzsatz ${kongruenzsatz}, alle Maße:<br>\\[ \\begin{aligned}
				a &= ${cm(resS[0])}\\,\\text{cm}; &\\quad b &= ${cm(resS[1])}\\,\\text{cm}; &\\quad c &= ${cm(resS[2])}\\,\\text{cm} \\\\ \\alpha &= ${resA[0]}^\\circ; &\\quad \\beta &= ${resA[1]}^\\circ; &\\quad \\gamma &= ${resA[2]}^\\circ
			\\end{aligned} \\]`;
			break;
		}

		case 'schraegbild': {
			let type = randInt(0, 3); // 0: Quader, 1: Pyramide, 2: Zylinder, 3: Kegel 

			if (type === 0) {
				// --- QUADER ---
				let a = randInt(2, 5);
				let b = randInt(2, 4); 
				let c = randInt(2, 6);
				textDisplay = `Zeichne das Schrägbild eines Quaders mit<br> a = ${a} cm, b = ${b} cm, c = ${c} cm.`;
				textPrint = `Zeichne das Schrägbild eines Quaders mit a = ${a} cm, b = ${b} cm, c = ${c} cm. ${space(a + 1)}`;
				s = `<img src="img/schraegbild_quader.png" alt="Quader" style="max-width:40%; height:auto;">`;
				//s = `${space(5)}`;
				
			} else if (type === 1) {
				// --- PYRAMIDE ---
				let a = randInt(2, 5);
				let b = randInt(2, 6); 
				let h = randInt(3, 6);
				textDisplay = `Zeichne das Schrägbild einer Pyramide mit<br> a = ${a} cm, b = ${b} cm, h = ${h} cm.`;
				textPrint = `Zeichne das Schrägbild einer Pyramide mit a = ${a} cm, b = ${b} cm, h = ${h} cm. ${space(b / 2 + h + 1)}`;
				s = `${space(5)}`;

			} else if (type === 2) {
				// --- ZYLINDER ---
				let r = randInt(1, 2);
				let h = randInt(3, 5);
				textDisplay = `Zeichne das Schrägbild eines Zylinders mit<br> r = ${r} cm, h = ${h} cm.`;
				textPrint = `Zeichne das Schrägbild eines Zylinders mit r = ${r} cm, h = ${h} cm. ${space(r + 1)}`;
				s = `${space(5)}`;
				
			} else if (type === 3) {
				// --- KREISKEGEL ---
				let r = randInt(1, 3);
				let h = randInt(2, 4);
				textDisplay = `Zeichne das Schrägbild eines Kegels mit<br> r = ${r} cm, h = ${h} cm.`;
				textPrint = `Zeichne das Schrägbild eines Kegels mit r = ${r} cm, h = ${h} cm. ${space(r + h)}`;
				s = `${space(5)}`;
			} 
			break;
		}

		case 'anteile': {
			let einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			let rd = Math.random();

			// 1. Definition "schöner" Brüche (Zähler z, Nenner n)
			const fractions = [
				{ z: 2, n: 3 }, { z: 3, n: 4 }, { z: 2, n: 5 }, { z: 3, n: 5 }, { z: 4, n: 5 },
				{ z: 5, n: 6 }, { z: 3, n: 8 }, { z: 3, n: 10 }, { z: 7, n: 10 }, { z: 9, n: 10 }
			];
			
			// Wähle einen zufälligen Bruch aus dem Pool
			let frac = fractions[randInt(0, fractions.length - 1)];
			let z = frac.z;
			let n = frac.n;
			
			if (rd > 0.6) {
				// TYP 1: Anteil berechnen (Bruch von Ganzem)
				// Damit es glatt aufgeht, muss das Ganze ein Vielfaches des Nenners sein.
				let scale = Math.random() > 0.5 ? 10 : 1; // Sorgt manchmal für Hunderter/Zehner-Werte
				let multiplier = isMentalMode ? rnd(2, 9) : rnd(3, 13);
				let G = n * multiplier * scale; // Das Ganze (Grundwert)
				let W = (G / n) * z;            // Der Anteil (Prozentwert)

				textDisplay = `\\( \\frac{${z}}{${n}} \\) von ${comma(G)} ${einheit} sind ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) von ${comma(G)}  ${einheit} sind ${comma(W)} ${einheit}<br>
				\\((${comma(G)} : ${n} \\cdot ${z} = ${comma(W)})\\)`;

			} else if (rd > 0.3) {
				// TYP 2: Ganzes berechnen (Bruch sind Anteil von...)
				// Damit es glatt aufgeht, muss der Anteil ein Vielfaches des Zählers sein.
				let scale = Math.random() > 0.5 ? 10 : 1;
				let multiplier = isMentalMode ? rnd(2, 9) : rnd(3, 13);
				let W = z * multiplier * scale; // Der Anteil
				let G = (W / z) * n;            // Das Ganze
				
				textDisplay = `\\( \\frac{${z}}{${n}} \\)  sind ${comma(W)} ${einheit} von ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) sind ${comma(W)} ${einheit} von ${comma(G)} ${einheit}<br>
				\\((${comma(W)} : ${z} \\cdot ${n} = ${comma(G)})\\)`;

			} else {
				// TYP 3: Bruch berechnen (Anteil von Ganzem sind...)
				// Wir nehmen den generierten Bruch und erzeugen dazu passende glatte Werte.
				let multiplier = isMentalMode ? rnd(2, 9) : rnd(3, 13);
				
				let W = z * multiplier;
				let G = n * multiplier;
				
				textDisplay = `${comma(W)} ${einheit} von ${comma(G)}  ${einheit} sind ${blank(3)} (als gekürzter Bruch)`;
				s = `${comma(W)}  ${einheit} von  ${comma(G)}  ${einheit} sind  \\(\\dfrac{${comma(W)}}{${comma(G)}} \\underset{${multiplier}}{=} \\dfrac{${z}}{${n}} \\)`;
			}
			break;
		}
		
		case 'prop': {
			const szenarien = [
				{ einheit1: 'kg Äpfel', einheit2: '€', objekt: 'Äpfel', type: 'food' },
				{ einheit1: 'Brötchen', einheit2: '€', objekt: 'Brötchen', type: 'food' },
				{ einheit1: 'Liter Saft', einheit2: '€', objekt: 'Saft', type: 'food' },
				{ einheit1: 'Stunden', einheit2: '€', objekt: 'ein Azubi', type: 'job' },
				{ einheit1: 'Minuten', einheit2: 'Seiten', objekt: 'ein Drucker', type: 'print' }
			];

			const sz = szenarien[randInt(0, szenarien.length - 1)];
			
			// Hilfsfunktion für deutsches Zahlenformat
			const de = (num) => {
				if (sz.type === 'food' || sz.type === 'job') return comma(num.toFixed(2));
				return Math.round(num).toString();
			};

			let menge1 = randInt(3, 6);
			let menge2
			do {
				menge2 = menge1 + randInt(1, 6);
			} while (menge2 % menge1 === 0);
			let einzelwert;
			
			// Realistische Werte je nach Typ festlegen
			if (isMentalMode) {
				if (sz.type === 'print') {
					einzelwert = randInt(5, 15); // 5 bis 15 Seiten pro Minute
				} else if (sz.type === 'job') {
					einzelwert = randInt(5, 9); // 5 € bis 9 € Stundenlohn
				} else {
					einzelwert = randInt(1, 6) * 0.5; // 0,50€ bis 3,00€ für Lebensmittel
				}
			} else {
				if (sz.type === 'print') {
					einzelwert = randInt(5, 20); // 5 bis 20 Seiten pro Minute
				} else if (sz.type === 'job') {
					einzelwert = randInt(5, 9) + (Math.random() < 0.5 ? 0.5 : 0); // 5,00€ bis 9,50€ Stundenlohn
				} else {
					einzelwert = randInt(1, 7) * 0.2; // 0,20€ bis 1,40€ für Lebensmittel
				}
			}

			let wert1 = menge1 * einzelwert;
			let wert2 = menge2 * einzelwert;

			// 50% Chance, dass die Aufgabe umgedreht wird (Geld/Seiten -> Menge/Zeit)
			let reverseQuestion = Math.random() < 0.3;
			
			let s1, s2, sFrage, sStep, sRes;
			let einheitSingular = sz.einheit1.replace('en', 'e'); // Aus "Stunden" wird "Stunde"
			
			if (!reverseQuestion) {
				// --- STANDARD-FRAGE: Nach dem Ziel-Wert (z.B. Preis) fragen ---
				if (sz.type === 'job') {
					s1 = `${de(wert1)} ${sz.einheit2} verdient ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viel verdient er in ${menge2} ${sz.einheit1}?`;
					sStep = `${de(einzelwert)} ${sz.einheit2}  ≙ 1 ${einheitSingular}`;
					sRes = `<b>${de(wert2)} ${sz.einheit2}</b> ≙ ${menge2} ${sz.einheit1}`;
				} else if (sz.type === 'print') {
					s1 = `${de(wert1)} ${sz.einheit2} schafft ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viele ${sz.einheit2} schafft er in ${menge2} ${sz.einheit1}?`;
					sStep = `${de(einzelwert)} ${sz.einheit2} ≙ 1 ${einheitSingular}`;
					sRes = `<b>${de(wert2)} ${sz.einheit2}</b> ≙ ${menge2} ${sz.einheit1}`;
				} else {
					// Lebensmittel
					s1 = `${menge1} ${sz.einheit1} kosten ${de(wert1)} ${sz.einheit2}`;
					s2 = `${menge1} ${sz.einheit1} ≙ ${de(wert1)} ${sz.einheit2}`;
					sFrage = `Wie viel kosten ${menge2} ${sz.einheit1}?`;
					sStep = `1 ${sz.einheit1.includes('Brötchen') ? 'Brötchen' : sz.einheit1} ≙ ${de(einzelwert)} ${sz.einheit2}`;
					sRes = `${menge2} ${sz.einheit1} ≙ <b>${de(wert2)} ${sz.einheit2}</b>`;
				}
			} else {
				// --- UMGEKEHRTE FRAGE: Nach der Start-Einheit (z.B. kg oder Stunden) fragen ---
				if (sz.type === 'job') {
					s1 = `${de(wert1)} ${sz.einheit2} verdient ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viele ${sz.einheit1} muss er für ${de(wert2)} ${sz.einheit2} arbeiten?`;
					sStep = `${de(einzelwert)} ${sz.einheit2} ≙ 1 ${einheitSingular}`;
					sRes = `${de(wert2)} ${sz.einheit2} ≙ <b>${menge2} ${sz.einheit1}</b>`;
				} else if (sz.type === 'print') {
					s1 = `${de(wert1)} ${sz.einheit2} schafft ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viele ${sz.einheit1} braucht er für ${de(wert2)} ${sz.einheit2}?`;
					sStep = `${de(einzelwert)} ${sz.einheit2} ≙ 1 ${einheitSingular}`;
					sRes = `${de(wert2)} ${sz.einheit2} ≙ <b>${menge2} ${sz.einheit1}</b>`;
				} else {
					// Lebensmittel
					s1 = `${menge1} ${sz.einheit1} kosten ${de(wert1)} ${sz.einheit2}`;
					s2 = `${menge1} ${sz.einheit1} ≙ ${de(wert1)} ${sz.einheit2}`;
					sFrage = `Wie viele ${sz.einheit1} bekommt man für ${de(wert2)} ${sz.einheit2}?`;
					sStep = `1 ${sz.einheit1.includes('Brötchen') ? 'Brötchen' : sz.einheit1} ≙ ${de(einzelwert)} ${sz.einheit2} `;
					sRes = `<b>${menge2} ${sz.einheit1}</b> ≙ ${de(wert2)} ${sz.einheit2}`;
				}
			}

			textDisplay = `${s1}.<br> ${sFrage}`;
			// Einfache Zeilenumbrüche (<br>) ohne die vorherigen Worte (Gegeben, Zielwert etc.)
			s = `${s2}<br>${sStep}<br>${sRes}`;
			break;
		}

		case 'vorrang': {
			// 1. Vier eindeutige Zahlen generieren und aufsteigend sortieren
			let nums = [];
			while (nums.length < 4) {
				let r = randInt(2, 13); // Etwas größerer Bereich für schönere Differenzen
				if (!nums.includes(r)) nums.push(r);
			}
			nums.sort((x, y) => x - y);
			// Jetzt gilt: n[0] < n[1] < n[2] < n[3]
			const n = nums;
			
			const f = fmt;
			let vorrangType = randInt(0, 3);
			let taskStr, step1, res;
			
			switch (vorrangType) {
				case 0:
					// Typ: Klein - (Mittel * Groß) 
					taskStr = `${n[0]} - ${n[1]} \\cdot ${n[2]}`;
					step1 = `${n[0]} - ${n[1] * n[2]}`;
					res = n[0] - (n[1] * n[2]);
					break;
					
				case 1:
					// Typ: Mittel^2 - (Klein * Groß)
					taskStr = `${n[1]}^2 - ${n[0]} \\cdot ${n[2]}`;
					step1 = `${n[1] * n[1]} - ${n[0] * n[2]}`;
					res = (n[1] * n[1]) - (n[0] * n[2]);
					break;

				case 2:
					// Typ: Klein * (Mittel^2 - Groß)
					taskStr = `${n[0]} \\cdot (${n[1]}^2 - ${n[2]})`;
					step1 = `${n[0]} \\cdot ${f(n[1] * n[1] - n[2])}`;
					res = n[0] * (n[1] * n[1] - n[2]);
					break;

				case 3:
					// Typ: (Klein * Mittel) - (Groß * Extra)
					taskStr = `${n[0]} \\cdot ${n[1]} - ${n[2]} \\cdot ${n[3]}`;
					step1 = `${n[0] * n[1]} - ${n[2] * n[3]}`;
					res = (n[0] * n[1]) - (n[2] * n[3]);
					break;
			}

			textDisplay = `\\( ${taskStr} = \\)`;
			s = `\\[ ${taskStr} = ${step1} = ${res} \\]`;

			break;
		}
				
		case 'units_calc': {
			const groups = [
				{ units: ['mm', 'cm', 'dm', 'm', 'km'], factors: [10, 10, 10, 1000] },
				{ units: ['mm²', 'cm²', 'dm²', 'm²', 'a', 'ha', 'km²'], factors: [100, 100, 100, 100, 100, 100] },
				{ units: ['mm³', 'cm³', 'dm³', 'm³'], factors: [1000, 1000, 1000] },
				{ units: ['mg', 'g', 'kg', 't'], factors: [1000, 1000, 1000] },
				{ units: ['s', 'min', 'h'], factors: [60, 60] }
			];
		
			const g = groups[randInt(0, groups.length - 1)];
			const isTimeGroup = g.units[0] === 's';
			const is1000Group = g.units[0] === 'mm³' || g.units[0] === 'mg';
			const termCount = is1000Group ? 2 : 3; // Bei 1000er-Faktoren nur 2 Summanden
		
			let termUnitIdx;
			if (termCount === 2) {
				const start = randInt(0, g.units.length - 2);
				termUnitIdx = [start, start + 1];
			} else {
				const mid = randInt(1, g.units.length - 2);
				termUnitIdx = [mid - 1, mid, mid + 1];
			}
		
			// Ziel-Einheit vorgeben: immer die kleinste Einheit im Term-Set.
			// Ausnahme: bei Zeit mit 3 Summanden (s/min/h) ist 'min' das Ziel,
			// damit s÷60 und h×60 sinnvolle Werte ergeben.
			let targetIdx;
			if (termCount === 3) {
				const sortedIdx = [...termUnitIdx].sort((a, b) => a - b);
				targetIdx = isTimeGroup ? sortedIdx[1] : sortedIdx[0];
			} else {
				targetIdx = Math.min(...termUnitIdx);
			}
			const targetUnit = g.units[targetIdx];
		
			// Skalenfaktoren auf kleinste Einheit der Gruppe
			const scales = [1];
			for (let i = 1; i < g.units.length; i++) {
				scales[i] = scales[i - 1] * g.factors[i - 1];
			}
		
			const timeTargetLimits = { s: 300, min: 150, h: 3 };
			const timeValuePools = {
				s: Array.from({ length: 20 }, (_, i) => (i + 1) * 15),
				min: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10, 15, 20, 30, 45, 60, 90, 120, 150],
				h: [0.5, 1, 1.5, 2, 2.5, 3]
			};
		
			const fmtNum = (num) => {
				const rounded = Number((Math.round(num * 10) / 10).toFixed(1).replace(/\.0$/, ''));
				return comma(rounded);
			};
		
			const pickSimpleValue = () => {
				if (isMentalMode) {
					if (Math.random() < 0.8) {
						return randInt(1, 12); // bevorzugt ganze Zahlen
					}
					return randInt(2, 20) / 2; // sonst 0,5-Schritte
				}
				return randInt(5, 250) / 10; // max. eine Nachkommastelle
			};
		
			const pickTimeValue = (idx) => {
				const unit = g.units[idx];
				const factorToTarget = scales[idx] / scales[targetIdx];
				const maxSourceValue = timeTargetLimits[targetUnit] / factorToTarget;
				const candidates = timeValuePools[unit].filter((value) => value <= maxSourceValue);
				if (candidates.length === 0) {
					return null;
				}
				return candidates[randInt(0, candidates.length - 1)];
			};
		
			let terms;
			let ops;
			let converted;
			let resultInTarget;
			const maxTargetValue = isTimeGroup ? timeTargetLimits[targetUnit] : Infinity;
		
			for (let attempts = 0; attempts < 200; attempts++) {
				const values = termUnitIdx.map((idx) => isTimeGroup ? pickTimeValue(idx) : pickSimpleValue());
				if (values.some((value) => value === null)) {
					continue;
				}
		
				terms = termUnitIdx.map((idx, index) => ({
					idx,
					unit: g.units[idx],
					value: values[index]
				}));
		
				// Mindestens ein Summand als ganze Zahl (ohne Nachkommastelle)
				if (!isTimeGroup && !terms.some((t) => Number.isInteger(t.value))) {
					continue;
				}
		
				if (termCount === 2) {
					ops = [Math.random() < 0.5 ? '+' : '-'];
				} else {
					const patterns = [['+', '+'], ['+', '-'], ['-', '+'], ['-', '-']];
					ops = patterns[randInt(0, patterns.length - 1)];
				}
		
				converted = terms.map((t) => t.value * (scales[t.idx] / scales[targetIdx]));
				if (converted.some((value) => value > maxTargetValue)) {
					continue;
				}
				// Alle umgerechneten Summanden müssen max. 1 Nachkommastelle haben
				if (converted.some((v) => Math.abs(v * 10 - Math.round(v * 10)) > 1e-9)) {
					continue;
				}
		
				resultInTarget = converted[0];
				let hasNegativeIntermediate = resultInTarget < 0;
				for (let i = 0; i < ops.length; i++) {
					resultInTarget = ops[i] === '+' ? resultInTarget + converted[i + 1] : resultInTarget - converted[i + 1];
					if (resultInTarget < 0) {
						hasNegativeIntermediate = true;
						break;
					}
				}
		
				// Keine negativen Zwischenergebnisse und positives Endergebnis
				if (!hasNegativeIntermediate && resultInTarget > 0 && resultInTarget <= maxTargetValue) {
					break;
				}
			}
		
			const displayExprParts = [`${fmtNum(terms[0].value)} ${terms[0].unit}`];
			for (let i = 1; i < terms.length; i++) {
				displayExprParts.push(`${ops[i - 1]} ${fmtNum(terms[i].value)} ${terms[i].unit}`);
			}
		
			const targetExprParts = [`${fmtNum(converted[0])} ${targetUnit}`];
			for (let i = 1; i < converted.length; i++) {
				targetExprParts.push(`${ops[i - 1]} ${fmtNum(converted[i])} ${targetUnit}`);
			}
		
			const displayExpr = displayExprParts.join(' ');
			const targetExpr = targetExprParts.join(' ');
		
			textDisplay = `${displayExpr} = ${blank(3)} ${targetUnit}`;
			s = `${displayExpr} <br>= ${targetExpr} = ${fmtNum(resultInTarget)} ${targetUnit}`;
			break;
		}

		default:
			console.warn(`MTG: Unbekannter Aufgabentyp "${type}" – keine Aufgabe generiert.`);
	}
	
	if (!textPrint) {
		textPrint = textDisplay;
	}
	if (!textDisplay) {
		textDisplay = textPrint;
	}

	return {
		textDisplay,
		textPrint,
		solution: s
	};
};





