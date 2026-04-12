// ============================================================
// AUFGABEN-KATEGORIEN & TYPEN-LABELS
// ============================================================

const fmt = formatUtils.fmt;
const comma = formatUtils.comma;

const taskCategories = {
	arithmetic: ['z_as', 'z_md', 'potenzen', 'schriftlich', 'db_as', 'db_md', 'pow10', 'round', 'vorrang'],
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
		'teiler', 'primzahlen', 'potenzen', 'schriftlich', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add',  'table_sub', 'table_mul','table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round',
		'geometry', 'winkel', 'schraegbild', 'statistik', 'units'
	],
	klasse6: [
		'teiler', 'primzahlen', 'potenzen', 'schriftlich', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add',  'table_sub', 'table_mul','table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round',
		'anteile', 'percent', 'units', 'geometry', 'winkel', 'schraegbild', 'statistik', 'wkt'
	],
	klasse7: [
		'teiler', 'primzahlen', 'potenzen', 'schriftlich', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order',
		'anteile', 'prop', 'percent', 'pv', 'units',
		'terme', 'equations', 'formel_umstellen',
		'round', 'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt'
	],
	klasse8: [
		'teiler', 'primzahlen', 'potenzen', 'schriftlich', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round',
		'anteile', 'prop', 'percent', 'pv', 'units',
		'terme', 'equations', 'equations_adv', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz', 'funktionen', 'statistik', 'wkt'
	],
	klasse9: [
		'teiler', 'primzahlen', 'potenzen', 'schriftlich', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round',
		'anteile', 'prop', 'percent', 'pv', 'units',
		'terme', 'equations', 'equations_adv', 'formel_umstellen', 'funktionen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt'
	],
	klasse10: [
		'teiler', 'primzahlen', 'potenzen', 'schriftlich', 'z_as', 'z_md', 'db_as', 'db_md', 'pow10', 'vorrang',
		'table_add', 'table_sub', 'table_mul', 'table_terms',
		'frac_simplify', 'frac_convert', 'frac_as', 'frac_md', 'frac_order', 'round',
		'anteile', 'prop', 'percent', 'pv', 'units',
		'terme', 'equations', 'equations_adv', 'formel_umstellen',
		'geometry', 'winkel', 'schraegbild', 'kongruenz',
		'funktionen', 'statistik', 'wkt'
	]
};

/* TODO / Roadmap 
 - rechten Rand so vergrößern, dass immer eine kurze Lösung hin passt 
 - Winkel fixen 
 - neue cases einbauen und validieren 
 - Druck-Modus 
 - Brüche ordnen 
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

	// Arithmetik: Ganze Zahlen, Dezimalbrüche, Stellenwerte
	['potenzen', 'Potenzen und Wurzeln', 'Potenzen und Wurzeln berechnen'],
	['schriftlich', 'schriftlich rechnen', 'Schriftliche Rechenverfahren'],
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
	['frac_convert', 'Brüche Darstellungsformen', 'Brüche, Dezimalzahlen und Prozentwerte umwandeln'],
	['frac_as', 'Brüche +/-', 'Brüche addieren und subtrahieren'],
	['frac_md', 'Brüche ×/÷', 'Brüche multiplizieren und dividieren'],
	['frac_order', 'Brüche ordnen', 'Brüche der Größe nach sortieren'],
	['round', 'Dezimalbrüche runden', 'Dezimalbrüche runden'],
	
	// Prozent / Proportionalität / Maßeinheiten
	['anteile', 'Anteile berechnen', 'Anteile berechnen'],
	['prop', 'Proportionalitäten', 'Aufgaben zur direkten Proportionalität'],
	['percent', 'Prozentrechnung', 'Prozentwert, Grundwert und Prozentsatz berechnen'],
	['pv', 'Prozentuale Veränderung', 'Prozentuale Zu- und Abnahmen berechnen'],
	['units', 'Einheiten', 'Größen in verschiedene Einheiten umrechnen'],

	// Algebra / Terme / Gleichungen
	['terme', 'Terme', 'Terme zusammenfassen und Klammern auflösen'],
	['equations', 'Gleichungen ax+b = c', 'Lineare Gleichung der Form ax + b = c lösen'],
	['equations_adv', 'Gleichungen ax+b = cx+d', 'Lineare Gleichung der Form ax + b = cx + d lösen'],
	['formel_umstellen', 'Formel umstellen', 'Formeln nach einer anderen Variablen umstellen'],

	// Geometrie
	['geometry', 'A und u ebener Figuren', 'Flächeninhalte und Umfänge berechnen'],
	['winkel', 'Winkel', 'Winkel zeichnen und berechnen'],
	['schraegbild', 'Körperdarstellung', 'Schrägbilder von Körpern zeichnen'],
	['kongruenz', 'Kongruenzsätze', 'Dreiecke mit Kongruenzsätzen konstruieren'],

	// Funktionen, Statistik & Wahrscheinlichkeiten
	['funktionen', 'Funktionen', 'Funktionswerte, Argumente und Eigenschaften von Funktionen bestimmen'],
	['statistik', 'Statistik', 'Kenngrößen der Statistik bestimmen'],
	['wkt', 'Wahrscheinlichkeiten', 'Wahrscheinlichkeiten bestimmen']
];

const typeLabels = Object.fromEntries(typeDefinitions.map(([key, label]) => [key, label]));
const typeDescriptions = Object.fromEntries(typeDefinitions.map(([key, , description]) => [key, description]));

// ============================================================
// AUFGABEN-GENERATOR
// ============================================================

function createTask(type, isMentalMode, grade = 5) {
	if (!Number.isFinite(grade)) {
		grade = 5;
	}

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

			const operationName = isAdd ? 'Additionstabelle' : 'Multiplikationstabelle';
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

			const opSymbol = '-';
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
			const createTermDescriptor = () => {
				const patterns = [
					() => {
						const a = rnd(-6, 6);
						const b = rnd(-9, 9);
						const expr = `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`;
						return {
							expr,
							evalFn: x => a * x + b,
							substitute: x => `${a}\\cdot${fmt(x)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`
						};
					},
					() => {
						const a = rnd(-4, 4);
						const b = rnd(-6, 6);
						const expr = `${a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`;
						return {
							expr,
							evalFn: x => a * x * x + b,
							substitute: x => `${a}\\cdot${fmt(x)}^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`
						};
					},
					() => {
						const a = rnd(-5, 5);
						const b = rnd(-5, 5);
						const expr = `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x^2`;
						return {
							expr,
							evalFn: x => a * x + (b >= 0 ? 1 : -1) * Math.abs(b) * x * x,
							substitute: x => `${a}\\cdot${fmt(x)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}\\cdot${fmt(x)}^2`
						};
					}
				];

				return patterns[randInt(0, patterns.length - 1)]();
			};

			let term1 = createTermDescriptor();
			let term2 = createTermDescriptor();
			while (term1.expr === term2.expr) {
				term2 = createTermDescriptor();
			}

			const xValues = [rnd(2,7),rnd(-5,-2)];
			const rawResults = [
				[term1.evalFn(xValues[0]), term2.evalFn(xValues[0])],
				[term1.evalFn(xValues[1]), term2.evalFn(xValues[1])]
			];

			const resultTable = rawResults.map(row => row.map(val => Number.isInteger(val) ? val : Number(val.toFixed(2))));

			textDisplay = `
				<div class="op-table-wrap">
					<table class="op-table op-table--terms">
						<tr>
							<th class="op-corner">x</th>
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
			const allowNegativeDecimals = grade > 7;
			v1 = allowNegativeDecimals ? trueDec(-15, 15) : trueDec(14, 30);
			v2 = allowNegativeDecimals ? trueDec(-15, 15) : trueDec(0, 13);

			if (Math.random() > 0.5) {
				textDisplay = `\\( ${comma(v1)} + ${comma(fmt(v2))} =\\)`;
				s = `\\( ${comma(v1)} + ${comma(fmt(v2))} = ${comma((v1 + v2).toFixed(1))} \\)`;
			} else {
				textDisplay = `\\( ${comma(v1)} - ${comma(fmt(v2))} = \\)`;
				s = `\\( ${comma(v1)} - ${comma(fmt(v2))} = ${comma((v1 - v2).toFixed(1))} \\)`;
			}
			break;
		}

		case 'db_md': {
			const allowNegativeDecimals = grade > 7;
			rd = Math.random();

			if (rd > 0.7) {
				v1 = allowNegativeDecimals ? trueDec(-9, 9) : trueDec(0, 9);
				v2 = allowNegativeDecimals ? rnd(-7, 7) : rnd(2, 7);
				textDisplay = `\\( ${comma(v1)} \\cdot ${comma(fmt(v2))} =\\)`;
				s = `\\( ${comma(v1)} \\cdot ${comma(fmt(v2))} = ${comma((v1 * v2).toFixed(1))} \\)`;
			} else if (rd > 0.4) {
				v1 = allowNegativeDecimals ? trueDec(-1.5, 1.5) : trueDec(0, 1.5);
				v2 = allowNegativeDecimals ? trueDec(-1.5, 1.5) : trueDec(0, 1.5);
				textDisplay = `\\( ${comma(v1)} \\cdot ${comma(fmt(v2))} =\\)`;
				s = `\\(${comma(v1)} \\cdot ${comma(fmt(v2))} = ${comma((v1 * v2).toFixed(2))} \\)`;
			} else {
				const res = allowNegativeDecimals ? trueDec(-1.5, 1.5) : trueDec(0, 1.5);
				v2 = allowNegativeDecimals ? rnd(-9, 9) : rnd(2, 9);
				while (v2 === 0) {
					v2 = allowNegativeDecimals ? rnd(-9, 9) : rnd(2, 9);
				}
				v1 = res * v2;
				textDisplay = `\\( ${comma(v1.toFixed(1))} : ${comma(fmt(v2))} =\\)`;
				s = `\\(${comma(v1.toFixed(1))} : ${comma(fmt(v2))} = ${comma(res.toFixed(1))} \\)`;
			}
			break;
		}

		case 'z_as':
			if (Math.random() > 0.5) {
				do {
					v1 = rnd(-20, 20);
					v2 = rnd(-20, 20);
				} while (!(v1 < 0 || v2 < 0 || (v1 + v2) < 0));
				textDisplay = `\\( ${v1} + ${fmt(v2)} =\\)`;
				s = `\\( ${v1} + ${fmt(v2)} = ${v1 + v2} \\) `;
			} else {
				do {
					v1 = rnd(-20, 20);
					v2 = rnd(-20, 20);
				} while (!(v1 < 0 || v2 < 0 || (v1 - v2) < 0));
				textDisplay = `\\( ${v1} - ${fmt(v2)} =\\)`;
				s = `\\( ${v1} - ${fmt(v2)} = ${v1 - v2} \\)`;
			}
			break;
		
		case 'z_md':
			if (Math.random() > 0.5) {
				do {
					v1 = rnd(-15, 15);
					v2 = rnd(-9, 9);
				} while (!(v1 < 0 || v2 < 0 || (v1 * v2) < 0));
				textDisplay = `\\( ${v1} \\cdot ${fmt(v2)} = \\)`;
				s = `\\( ${v1} \\cdot ${fmt(v2)} = ${v1 * v2} \\)`;
			} else {
				let res;
				do {
					res = rnd(-9, 9);
					v2 = rnd(-12, 12);
				} while (v2 === 0 || !(res < 0 || v2 < 0 || (res * v2) < 0));
				v1 = res * v2;
				textDisplay = `\\( ${v1} : ${fmt(v2)} = \\)`;
				s = `\\( ${v1} : ${fmt(v2)} = ${res} \\)`;
			}
			break;

		case 'pow10': {
			// Zehnerpotenzen: natürliche Zahl oder Dezimalbruch mit 10, 100 oder 1000
			const powers = [10, 10, 100, 100, 1000];
			const power = powers[randInt(0, 4)];
			const isMult = Math.random() > 0.5;

			// Operand: entweder natürliche Zahl oder Dezimalbruch (1-2 Stellen)
			let operand;
			let isDecimal;

			if (Math.random() > 0.5) {
				// Dezimalbruch mit 1-2 Stellen nach Komma
				isDecimal = true;
				const isDec2 = Math.random() > 0.5;
				if (isDec2) {
					operand = rnd(10, 999) / 100; // 0,10 bis 9,99
				} else {
					operand = rnd(2, 99) / 10; // 0,1 bis 9,9
				}
			} else {
				// Natürliche Zahl
				isDecimal = false;
				operand = rnd(10, 999);
			}

			const op = isMult ? '\\cdot' : ':';
			let result;
			let resultStr;

			if (isMult) {
				result = operand * power;
				resultStr = isDecimal ? result.toFixed(2).replace(/\.?0+$/, '') : result.toString();
			} else {
				result = operand / power;
				// Bei Division: immer mit angemessener Dezimalgenauigkeit
				resultStr = result.toFixed(4).replace(/\.?0+$/, '');
			}

			// Formatierung des Operanden
			const operandStr = isDecimal ? comma(operand) : operand.toString();

			// Aufgabe
			textDisplay = `\\( ${operandStr} ${op} ${power} =\\)`;

			// Lösung mit Erklärung der Kommaverschiebung/Stellenwertverschiebung
			const shiftCount = power === 10 ? 1 : power === 100 ? 2 : 3;
			const shiftDirection = isMult ? '→' : '←';
			const shiftDescription = `(Komma ${shiftCount} x ${shiftDirection})`;

			s = `\\( ${operandStr} ${op} ${power} = ${comma(resultStr)} \\quad \\text{${shiftDescription}}\\)`;

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

			textDisplay = `\\[ \\frac{${z1}}{${n1}} ${op} \\frac{${z2}}{${n2}} = \\]`;

			// Dynamischer Lösungsweg
			let step1 = "";
			if (f1 > 1 && f2 > 1) {
				step1 = `\\frac{${z1} \\cdot ${f1}}{${n1} \\cdot ${f1}} ${op} \\frac{${z2} \\cdot ${f2}}{${n2} \\cdot ${f2}}`;
			} else if (f1 > 1) {
				step1 = `\\frac{${z1} \\cdot ${f1}}{${n1} \\cdot ${f1}} ${op} \\frac{${z2}}{${n2}}`;
			} else if (f2 > 1) {
				step1 = `\\frac{${z1}}{${n1}} ${op} \\frac{${z2} \\cdot ${f2}}{${n2} \\cdot ${f2}}`;
			} else {
				step1 = `\\frac{${z1}}{${n1}} ${op} \\frac{${z2}}{${n2}}`;
			}
			s = `\\[ \\frac{${z1}}{${n1}} ${op} \\frac{${z2}}{${n2}} = ${step1} = \\frac{${ez1}}{${hn}} ${op} \\frac{${ez2}}{${hn}} = \\frac{${finalZ}}{${hn}} \\]`;
			break;
		}

		case 'frac_md': {
			let Z1, N1, Z2, N2, z1_base, n1_base, z2_base, n2_base, isMult;

			const getGcd = mathUtils.getGcd;
			const useNaturalNumberVariant = Math.random() < 0.30;

			if (useNaturalNumberVariant) {
				let n;
				isMult = Math.random() > 0.5;

				do {
					if (isMentalMode) {
						Z1 = rnd(2, 9);
						N1 = rnd(2, 9);
						n = rnd(2, 9);
					} else {
						Z1 = rnd(2, 13);
						N1 = rnd(2, 13);
						n = rnd(2, 13);
					}
				} while (getGcd(Z1, N1) > 1 || Z1 === N1);

				const op = isMult ? '\\cdot' : ':';
				const resZ = isMult ? Z1 * n : Z1;
				const resN = isMult ? N1 : N1 * n;
				const step1 = isMult
					? `\\frac{${Z1}}{${N1}} \\cdot \\frac{${n}}{1}`
					: `\\frac{${Z1}}{${N1}} \\cdot \\frac{1}{${n}}`;

				textDisplay = `\\[ \\frac{${Z1}}{${N1}} ${op} ${n} \\]`;
				s = `\\[ \\frac{${Z1}}{${N1}} ${op} ${n} = ${step1} = \\frac{${resZ}}{${resN}} \\]`;
				break;
			}

			if (isMentalMode) {
				isMult = Math.random() > 0.5;

				do {
					Z1 = rnd(2, 9);
					N1 = rnd(2, 9);
					Z2 = rnd(2, 9);
					N2 = rnd(2, 9);
				} while (
					new Set([Z1, N1, Z2, N2]).size < 4 ||
					getGcd(Z1, N1) > 1 ||
					getGcd(Z2, N2) > 1
				);

				const op = isMult ? '\\cdot' : ':';
				const finalZ = isMult ? Z1 * Z2 : Z1 * N2;
				const finalN = isMult ? N1 * N2 : N1 * Z2;
				const step1 = isMult ? '' : `\\frac{${Z1}}{${N1}} \\cdot \\frac{${N2}}{${Z2}} = `;

				textDisplay = `\\[ \\frac{${Z1}}{${N1}} ${op} \\frac{${Z2}}{${N2}} \\]`;
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

				textDisplay = `\\[ \\frac{${Z1}}{${N1}} ${op} \\frac{${Z2}}{${N2}} = \\]`;
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

			textDisplay = `Kürze vollständig: \\( \\dfrac{${Z}}{${N}} = \\)`;

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

			// LCM von zwei Zahlen
			const lcm = (a, b) => (a * b) / getGcd(a, b);

			// Erzeugt einen vollständig gekürzten echten Bruch mit festem Nenner
			const makeFracWithDen = (den, forbiddenNums = []) => {
				let num;
				do {
					num = randInt(1, den - 1);
				} while (getGcd(num, den) !== 1 || forbiddenNums.includes(num));
				return [num, den];
			};

			// Erlaubte Nenner-Kombinationen (3 Nenner, LCM ≤ 60, kein Nenner doppelt)
			// Wir ziehen per Zufall eine von mehreren vordefinierten Familien
			const denominatorFamilies = isMentalMode ? [
				[2, 3, 4],
				[2, 3, 6],
				[2, 4, 8],
				[3, 4, 6],
				[3, 4, 12],
				[2, 5, 10],
				[3, 5, 15],
				[4, 5, 20],
				[4, 6, 12],
				[5, 10, 15],
				[3, 7, 21],
				[4, 8, 16],
			] : [
				[2, 3, 4],
				[2, 3, 6],
				[2, 4, 8],
				[2, 3, 8],
				[3, 4, 6],
				[3, 4, 12],
				[2, 5, 10],
				[3, 5, 15],
				[4, 5, 20],
				[2, 6, 9],
				[3, 6, 9],
				[4, 6, 12],
				[5, 10, 15],
				[2, 5, 4],
				[3, 7, 21],
				[4, 8, 16],
				[2, 3, 9],
				[5, 6, 15],
			];

			const denFamily = denominatorFamilies[randInt(0, denominatorFamilies.length - 1)];
			// Shuffle family so fractions aren't always in denominator order
			const shuffled = [...denFamily].sort(() => Math.random() - 0.5);
			const [d1, d2, d3] = shuffled;

			// 50 % Chance: alle drei Zähler sind bereits vor dem Erweitern gleich (1..9)
			const tripleNumeratorCase = Math.random() < 0.50;

			let f1, f2, f3;

			if (tripleNumeratorCase) {
				const sharedCandidates = [];
				for (let n = 1; n <= 9; n++) {
					const validDens = [];
					for (let d = 1; d <= 20; d++) {
						if (d % n !== 0) {
							validDens.push(d);
						}
					}
					if (validDens.length >= 3) {
						sharedCandidates.push({ n, validDens });
					}
				}

				if (sharedCandidates.length > 0) {
					const chosen = sharedCandidates[randInt(0, sharedCandidates.length - 1)];
					const shuffledDens = [...chosen.validDens].sort(() => Math.random() - 0.5);
					const [sd1, sd2, sd3] = shuffledDens;

					f1 = [chosen.n, sd1];
					f2 = [chosen.n, sd2];
					f3 = [chosen.n, sd3];
				} else {
					// Fallback: normale zufällige Brüche
					f1 = makeFracWithDen(d1);
					f2 = makeFracWithDen(d2);
					f3 = makeFracWithDen(d3);
				}
			} else {
				f1 = makeFracWithDen(d1);
				f2 = makeFracWithDen(d2);
				f3 = makeFracWithDen(d3);
				// Sicherstellen: alle drei Brüche sind verschieden
				let retry = 0;
				while (retry < 100 && (
					(f1[0] === f2[0] && f1[1] === f2[1]) ||
					(f1[0] === f3[0] && f1[1] === f3[1]) ||
					(f2[0] === f3[0] && f2[1] === f3[1])
				)) {
					f1 = makeFracWithDen(d1);
					f2 = makeFracWithDen(d2);
					f3 = makeFracWithDen(d3);
					retry++;
				}
			}

			// Hauptnenner berechnen
			const hn = lcm(lcm(f1[1], f2[1]), f3[1]);

			// Erweiterte Zähler (zum Vergleichen und für die Lösung)
			const e1 = f1[0] * (hn / f1[1]);
			const e2 = f2[0] * (hn / f2[1]);
			const e3 = f3[0] * (hn / f3[1]);

			// Sortierung bestimmen (aufsteigend)
			const fracs = [
				{ orig: f1, ext: e1 },
				{ orig: f2, ext: e2 },
				{ orig: f3, ext: e3 }
			];
			// Zufällig mischen für die Aufgabenstellung
			const displayOrder = [...fracs].sort(() => Math.random() - 0.5);
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
			tripleNumeratorCase ? 	s = `\\[ ${sortedStr} \\]` :
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
					let decStr = Number((z / n).toFixed(4)).toString().replace('.', ',');

					textDisplay = `Als Dezimalbruch: \\( \\dfrac{${z}}{${n}} = \\)`;

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
					let decStr = Number((z / n).toFixed(4)).toString().replace('.', ',');

					// Der Zähler des ungekürzten Zehnerbruchs (z. B. 35 bei 0,35)
					let z_p10 = z * mult;

					// 3. Aufgabenstellung
					textDisplay = ` Als max. gekürzter gem. Bruch: \\( ${decStr} = \\)`;

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

					textDisplay = `In Prozent: \\( \\dfrac{${z}}{${n}} = \\)`;
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

						textDisplay = ` Als max. gekürzter gem. Bruch: \\( ${percVal}\\,\\text{%} = \\)`;
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
					textDisplay = `Als max. gekürzter gem. Bruch: \\( ${percStr} = \\)`;

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

					textDisplay = `In gemischter Schreibweise: \\( \\dfrac{${z}}{${n}} = \\)`;
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
					let decStr = Number((p / 100).toFixed(4)).toString().replace('.', ',');
					let percStr = p.toString().replace('.', ',') + '\\,\\text{%}';

					textDisplay = ` In Prozent: \\( ${decStr} = \\)`;
					s = `\\( ${decStr} = ${percStr} \\)`;
					break;
				}
				case 'perc_to_dec': {
					let p = (Math.floor(Math.random() * 400) + 1) / 2;
					let decStr = Number((p / 100).toFixed(4)).toString().replace('.', ',');
					let percStr = p.toString().replace('.', ',') + '\\,\\text{%}';

					textDisplay = `Als Dezimalbruch: \\( ${percStr} = \\)`;
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
			if (rd > 0.67) {
				pVal = rnd(2, 11) * 100;
				p = [3, 4, 5, 6, 7, 8, 9, 11, 12, 20, 25, 30, 35, 40, 60, 70, 80, 90][randInt(0, 17)];
				textDisplay = `${p} % von ${pVal} ${einheit} sind ${blank(3)}`;
				s = `${pVal} ${einheit} ≙ 100 %<br>${pVal / 100} ${einheit} ≙ 1 %<br>${pVal / 100 * p} ${einheit} ≙ ${p} %`;
			} else if (rd > 0.33) {
				p = [20, 25, 30, 40, 50, 60, 70, 80, 90][randInt(0, 8)];
				pVal = rnd(2, 9) * p;
				textDisplay = `${p} % sind ${pVal} ${einheit} von ${blank(3)}`;
				s = `${p} % ≙ ${pVal} ${einheit}<br>1 % ≙ ${pVal / p} ${einheit}<br>100 % ≙ ${pVal / p * 100} ${einheit}`;
			} else {
				// 1. Wähle einen "schönen" Prozentsatz p (z.B. 5, 10, 20, 25, 50...)
				const p_list = isMentalMode ? [2, 3, 5, 10, 20, 25, 50, 75, 80, 90] : [2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 80, 90, 95];
				const p = p_list[rnd(2, p_list.length + 1) - 2];

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
				s = `${comma(G)} ${einheit} ≙ 100 %<br>${comma(G / 100)} ${einheit} ≙ 1 %<br>${comma(W)} ${einheit} ≙ ${p} %`;
			}
			break;

		case 'pv': {
			let einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			let p = [3, 4, 5, 6, 7, 10, 20, 25, 50][randInt(0, 8)];
			let pVal = rnd(2, 11) * 100;
			rd = Math.random();
			if (rd > 0.8) {
				textDisplay = `${pVal} ${einheit} um ${p} % erhöht sind ${blank(3)}`;
				s = `${pVal} ${einheit} ≙ 100 %<br>${pVal / 100} ${einheit} ≙ 1 %<br>${pVal + (pVal / 100 * p)} ${einheit} ≙ ${100 + p} %`;
			} else if (rd > 0.6) {
				textDisplay = `${pVal} ${einheit} um ${p} % reduziert sind ${blank(3)}`;
				s = `${pVal} ${einheit} ≙ 100 %<br>${pVal / 100} ${einheit} ≙ 1 %<br>${pVal - (pVal / 100 * p)} ${einheit} ≙ ${100 - p} %`;
			} else if (rd > 0.4) {
				textDisplay = `${pVal} ${einheit} auf ${100 + p} % erhöht sind ${blank(3)}`;
				s = `${pVal} ${einheit} ≙ 100 %<br>${pVal / 100} ${einheit} ≙ 1 %<br>${pVal + (pVal / 100 * p)} ${einheit} ≙ ${100 + p} %`;
			} else if (rd > 0.2) {
				textDisplay = `${pVal}  ${einheit} auf ${100 - p} % reduziert sind ${blank(3)}`;
				s = `${pVal} ${einheit} ≙ 100 %<br>${pVal / 100} ${einheit} ≙ 1 %<br>${pVal - (pVal / 100 * p)} ${einheit} ≙ ${100 - p} %`;
			} else {
				// Rabatt-Fall: Ein Artikel kostet normalerweise pVal, mit p% Rabatt kostet er ___
				p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
				const originalPrice = pVal;
				const discountedPrice = originalPrice - (originalPrice / 100 * p);
				textDisplay = `${p} % Rabatt auf ${originalPrice} €. Neuer Preis: ${blank(3)}`;
				s = `${originalPrice} € ≙ 100 %<br>${originalPrice / 100} € ≙ 1 %<br>${discountedPrice} € ≙ ${100 - p} %`;
			}
			break;
		}

		case 'schriftlich': {
			const op = randInt(0, 3); // 0: +, 1: -, 2: *, 3: /
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
					s = `\\( ${comma(v1)} + ${comma(v2)} = ${comma(res.toFixed(2).replace(/\.?0+$/, ""))} \\)`;
					break;

				case 1: // SUBTRAKTION
					v1 = trueDec(200, 500);
					v2 = rnd(5555, 14444) / 100;
					res = v1 - v2;
					textDisplay = `Berechne schriftlich: \\( \\quad ${comma(v1)} - ${comma(v2)} \\)`;
					textPrint = `Berechne schriftlich: \\( \\quad ${comma(v1)} - ${comma(v2)} \\)<br>${karo(4, 12)}`;
					s = `\\( ${comma(v1)} - ${comma(v2)} = ${comma(res.toFixed(2).replace(/\.?0+$/, ""))} \\)`;
					break;

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
					s = `\\( ${comma(v1)} \\cdot ${comma(v2)} = ${comma(Number(res.toFixed(4)))} \\)`;
					
					break;

				case 3: // DIVISION (durch ganze Zahl)
					
					const divisor = rnd(3, 9);
					const p3 = rnd(2, 4) - 1;
					// Wir würfeln das Ergebnis zuerst (max 2 Stellen), damit es aufgeht
					const resultValue = rnd(111, 2999) / Math.pow(10, p3);
					const dividend = (resultValue * divisor);
					const resultDigits = countDigits(comma(resultValue));
					const divRows = Math.max(4, resultDigits * 2 + 3);

					textDisplay = `Berechne schriftlich: \\( \\quad ${comma(Number(dividend.toFixed(2)))} : ${divisor} \\)`;
					textPrint = `Berechne schriftlich: \\( \\quad ${comma(Number(dividend.toFixed(2)))} : ${divisor} \\)<br>${karo(divRows, 16)}`;
					s = `\\( ${comma(Number(dividend.toFixed(2)))} : ${divisor} = ${comma(resultValue)} \\)`;
					
					break;
			}
			break;
		}

		case 'units': 
			// Hilfsfunktion für saubere Dezimal-Ausgabe
			const toCleanString = formatUtils.toCleanString;

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
			let toUnit, startValue, result;

			switch (group.type) {
				case 'Zeit':
					if (direction === 0) {
						// In nächstkleinere Einheit (Zahl wird größer)
						toUnit = group.units[unitIndex - 1];
						const f = group.factors[unitIndex - 1];
						startValue = [0.1, 0.25, 0.5, 1.5, 2.25, 2.5, 2.75, 3.5, 4][randInt(0, 8)];
						result = (startValue * f);
					} else {
						toUnit = group.units[unitIndex + 1];
						const f = group.factors[unitIndex];
						startValue = [0.1, 0.25, 0.5, 1.5, 2.25, 2.5, 2.75, 3.5, 4][randInt(0, 8)] * f;
						result = comma(startValue / f);
					}
					break;
				default:
					const factor = (direction === 0) ? group.factors[unitIndex - 1] : group.factors[unitIndex];
					toUnit = (direction === 0) ? group.units[unitIndex - 1] : group.units[unitIndex + 1];

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

				textDisplay = `${toCleanString(startValue)} ${fromUnit} = ${blank(3)} ${toUnit}`;
				s = `${toCleanString(startValue)} ${fromUnit} = ${result} ${toUnit}`;
				break;

			
			case 'geometry':
			const shapeType = randInt(0, grade > 6 ? 2 : 1);
			const goal = Math.random() > 0.5 ? 'A' : 'u';
			let sideA, sideB;

			if (shapeType === 0) { // QUADRAT
				sideA = rnd(3, 12);
				if (goal === 'A') {
					textDisplay = `Quadrat mit \\( a = ${sideA} \\text{ m} \\). Flächeninhalt?`;
					s = `\\( A = a \\cdot a = ${sideA} \\cdot ${sideA} = ${sideA * sideA} \\text{ m}^2 \\)`;
				} else {
					textDisplay = `Quadrat mit \\( a = ${sideA} \\text{ m} \\). Umfang?`;
					s = `\\( u = 4 \\cdot a = 4 \\cdot ${sideA} = ${sideA * 4} \\text{ m} \\)`;
				}
			}
			else if (shapeType === 1) { // RECHTECK
				sideA = rnd(2, 12); sideB = rnd(3, 7);
				if (sideA === sideB) { sideB++ }
				if (goal === 'A') {
					textDisplay = `Rechteck mit \\( a = ${sideA} \\text{ m} \\) und \\( b = ${sideB} \\text{ m} \\). Flächeninhalt?`;
					s = `\\( A = a \\cdot b = ${sideA} \\cdot ${sideB} = ${sideA * sideB} \\text{ m}^2 \\)`;
				} else {
					textDisplay = `Rechteck mit \\( a = ${sideA} \\text{ m} \\) und \\( b = ${sideB} \\text{ m} \\). Umfang?`;
					s = `\\( u = 2 \\cdot (a+b) = 2 \\cdot (${sideA} + ${sideB}) = ${2 * (sideA + sideB)} \\text{ m} \\)`;
				}
			}
			else { // DREIECK
				sideA = rnd(2, 12); sideB = rnd(3, 7);
				textDisplay = `Dreieck mit Grundseite \\( g = ${sideA} \\text{ m} \\) und Höhe \\( h = ${sideB} \\text{ m} \\). Flächeninhalt? <br>`;
				s = `\\( A = \\frac{1}{2} \\cdot g \\cdot h = \\frac{1}{2} \\cdot ${sideA} \\cdot ${sideB} = ${(sideA * sideB) / 2} \\text{ m}^2 \\)`.replace('.', ',');
			}
			break;
			
		case 'potenzen':
			rd = Math.random();
			if (rd > 0.6) { 
				v1 = rnd(-13, 13);
				if (v1 < 0) {
					textDisplay = `\\( (${v1})^2 = \\)`;
					s = `\\( (${v1})^2 = ${v1 * v1} \\)`;
				} else {
					textDisplay = `\\( ${v1}^2 = \\)`;
					s = `\\( ${v1}^2 = ${v1 * v1} \\)`;
				}
			} else if (rd > 0.40) {
				v1 = rnd(3, 13);
				textDisplay = `\\( \\sqrt{${v1 * v1}} = \\)`;
				s = `\\( \\sqrt{${v1 * v1}} = ${v1} \\)`;
			} else if (rd > 0.2) {
				v1 = rnd(3, 9);
				textDisplay = `\\( 2^${v1} = \\)`;
				s = `\\( 2^${v1} = ${Math.pow(2, v1)} \\)`;
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
				// Zufälligen Index bestimmen
				const randomIndex = Math.floor(Math.random() * staticTasks.length);
				textDisplay = staticTasks[randomIndex].t;
				s = staticTasks[randomIndex].s;
			}

			break;
				
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

			textDisplay = `Runde \\( ${comma(v1.toFixed(3))} \\) auf ${target}.`;
			s = `\\( ${comma(v1.toFixed(3))} \\approx ${comma(result.toFixed(digits))} \\) (${target})`;
			break;
		}
		
		case 'equations': {
			// 1. Bestimme die Lösung x (ein Vielfaches von 0,5)
			// rnd(-20, 20) / 2 ergibt Werte wie -5, -4.5, -4, ..., 4.5, 5
			const x = rnd(-13, 13);
			
			// 2. Bestimme Koeffizienten a und b (ganze Zahlen, a != 0)
			let a = rnd(-12, 12);
			const b = rnd(-30, 30);
			
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
						{ eq: `2 \\, A : (a+c) &= h`,              op: null }
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
						{ eq: `\\dfrac{2\\,s}{t^2} &= a`,                    op: null }
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
				},
				// --- Kosinussatz ---
				{
					textPrint: `Stelle nach \\( \\gamma \\) um: \\( \\quad c^2 = a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma \\quad | \\) ${space(2)}`,
					textDisplay: `Stelle nach \\( \\gamma \\) um: \\( \\quad c^2 = a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma \\)`,
					steps: [
						{ eq: `c^2 &= a^2 + b^2 - 2 \\, a \\, b \\, \\cos \\gamma`, op: `- a^2 -b^2` },
						{ eq: `c^2 -a^2 - b^2 &= - 2 \\, a \\, b \\, \\cos \\gamma`, op: `: - (2 \\, a \\, b)` },
						{ eq: `\\dfrac{c^2 -a^2 - b^2}{- (2 \\, a \\, b)} &= \\cos \\gamma`, op: `\\cos^{-1}` },
						{ eq: `\\cos^{-1} \\left( \\dfrac{c^2 -a^2 - b^2}{- (2 \\, a \\, b)} \\right) &= \\gamma`, op: null }
					]
				}
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
			let selectedVars = [...vars].sort(() => 0.5 - Math.random()).slice(0, 2);
			if (Math.random() < 0.5) selectedVars[1] = '';
			
			let mode = grade > 9 ? randInt(0, 1) : 0;
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
				textPrint = `Vereinfache den Term: \\(\\quad ${taskStr} \\) ${space(0.7)}`;

			} else {
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

				taskStr = `${fDisplay} \\cdot (${cVarCoef}${v} ${cNum > 0 ? '+' : '-'} ${Math.abs(cNum)})`;

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
				textPrint = `Löse die Klammer auf: \\(\\quad ${taskStr} \\) ${space(0.7)}`;
			}

			s = `\\( ${taskStr} = ${resStr} \\)`;
			break;
		}

		case 'primzahlen': {
			const isPrim = mathUtils.isPrime;

			// --- TYP: BEREICH ABSUCHEN ---
			let start = randInt(0, 40);
			
			let prims = [];
			for (let i = start; i <= start + 10; i++) {
				if (isPrim(i)) prims.push(i);
			}

			textDisplay = `Nenne alle Primzahlen von ${start} bis ${start + 10}.`;
			s = `Primzahlen ${start} - ${start + 10}: \\( \\quad ${prims.join(', ')}\\)`;
			
			break;
		}

		case 'wkt': {
			let mode = randInt(0, 4); // 0: Urne (3 Farben), 1: Rel. Häufigkeit, 2: 12-seitiger Würfel, 3: Glücksrad, 4: Urne rückwärts
			let taskStr, resStr;
			
			if (mode === 0) {
				// --- TYP: LAPLACE URNE (3 FARBEN) ---
				const farben = ['roten', 'blauen', 'grünen', 'gelben', 'weißen'];
				let w = [...farben].sort(() => 0.5 - Math.random());
				let n1 = randInt(3, 9);
				let n2 = randInt(3, 9);
				let n3 = randInt(3, 9);
				let gesamt = n1 + n2 + n3;
				
				// Grammatik-Fix: "rote" -> "Rot", "grüne" -> "Grün"
				let farbeSubst = w[0].charAt(0).toUpperCase() + w[0].slice(1, -1);
				
				taskStr = `Urne mit ${n1} ${w[0]}, ${n2} ${w[1]} und ${n3} ${w[2]} Kugeln. Wahrscheinlichkeit, eine ${w[0].slice(0, -1)} Kugel zu ziehen?`;
				
				// In der Lösung nutzen wir jetzt die substantivierte Form
				resStr = `P(${farbeSubst}) = \\( \\dfrac{${n1}}{${gesamt}} \\)`;
			} else if (mode === 1) {
				// --- TYP: RELATIVE HÄUFIGKEIT (KONTEXT-SPEZIFISCH) ---
				const szenarien = [
					{ txt: 'Basketball: Von', einheit: 'Würfen', e: 'getroffen' },
					{ txt: 'Qualitätskontrolle: Von', einheit: 'Bauteilen', e: 'defekt' },
					{ txt: 'Umfrage: Von', einheit: 'Personen antworten', e: 'Teilnehmer mit "Ja"' },
					{ txt: 'Torwart: Von', einheit: 'Schüssen', e: 'Bälle' }
				];
				const sz = szenarien[randInt(0, szenarien.length - 1)];
				let gesamt = [10, 20, 25, 40, 50][randInt(0, 4)];
				let treffer = Math.floor(gesamt * (randInt(2, 9) / 10));
				
				taskStr = `${sz.txt} ${gesamt} ${sz.einheit} ${treffer} ${sz.e}. Relative Häufigkeit?`;
				let prozent = (treffer / gesamt) * 100;
				resStr = `h = \\( \\dfrac{${treffer}}{${gesamt}} \\) = ${prozent.toFixed(0).replace('.', ',')} %`;
				
			} else if (mode === 2) {
				// --- TYP: 12-SEITIGER WÜRFEL (D12) ---
				let subMode = randInt(0, 2);
				let ereignis, guenstige;
				
				if (subMode === 0) {
					ereignis = "eine Primzahl";
					taskStr = `Wahrscheinlichkeit für ${ereignis} bei einem 12-seitigen Spielwürfel?`;
					resStr = `P(Primzahl) = \\( \\dfrac{5}{12} \\)`;
				} else if (subMode === 1) {
					let limit = randInt(7, 10);
					ereignis = `eine Zahl größer als ${limit}`;
					let count = 12 - limit;
					taskStr = `Wahrscheinlichkeit für ${ereignis} bei einem 12-seitigen Spielwürfel?`;
					resStr = `P( x > ${limit}) = \\( \\dfrac{${count}}{12} \\)`;
				} else {
					// Würfeln: Teilbarkeit durch 3, 4 oder 5
					let auswahl = [3, 4, 5][randInt(0, 2)];
					let treffer, gekuerzt;
					
					if (auswahl === 3) {
						treffer = 4; // {3, 6, 9, 12}
						gekuerzt = "\\frac{1}{3}";
					} else if (auswahl === 4) {
						treffer = 3; // {4, 8, 12}
						gekuerzt = "\\frac{1}{4}";
					} else {
						treffer = 2; // {5, 10}
						gekuerzt = "\\frac{1}{6}";
					}

					let ereignis = `eine durch ${auswahl} teilbare Zahl`;
					taskStr = `Wahrscheinlichkeit für ${ereignis} bei einem 12-seitigen Spielwürfel?`;
					resStr = `P(durch ${auswahl} teilbar) = \\( \\dfrac{${treffer}}{12} \\) = ${gekuerzt}`;
				}

			} else if (mode === 3) {
				// --- TYP: GLÜCKSRAD (2 Farben, zweimal drehen) ---
				const farben = ['roten', 'blauen', 'grünen', 'gelben', 'weißen'];
				let w = [...farben].sort(() => 0.5 - Math.random());
				let f1 = w[0]; // Die gesuchte Farbe (z.B. "rote")
				let f2 = w[1]; // Die andere Farbe
				
				let n1 = randInt(2, 5); // Felder Farbe 1
				let n2 = randInt(2, 5); // Felder Farbe 2
				let gesamt = n1 + n2;
				
				// Grammatik-Anpassung für die Farbe im Satz (Substantiviert)
				let f1Subst = f1.charAt(0).toUpperCase() + f1.slice(1, -2); // "rote" -> "Rot"
				
				taskStr = `Glücksrad mit ${n1} ${f1} und ${n2} ${f2} gleich großen Feldern. Wahrscheinlichkeit, dass zweimal nacheinander ${f1Subst} gedreht wird?`;
				
				// Berechnung: (n1/gesamt) * (n1/gesamt)
				let zaehler = n1 * n1;
				let nenner = gesamt * gesamt;
				
				// Lösungsweg mit Pfadregel
				resStr = `P(${f1Subst}, ${f1Subst}) = \\( \\dfrac{${n1}}{${gesamt}} \\cdot \\dfrac{${n1}}{${gesamt}} = \\dfrac{${zaehler}}{${nenner}} \\)`;
				
			} else {
				// --- TYP: URNE RÜCKWÄRTS (ANZAHL ROTER KUGELN BERECHNEN) ---
				const usePct = Math.random() < 0.5;
				let n, redCount;
				
				if (usePct) {
					const pctCandidates = [
						{ pct: 10, simpNum: 1, simpDen: 10 },
						{ pct: 20, simpNum: 1, simpDen: 5  },
						{ pct: 25, simpNum: 1, simpDen: 4  },
						{ pct: 40, simpNum: 2, simpDen: 5  },
						{ pct: 50, simpNum: 1, simpDen: 2  },
						{ pct: 75, simpNum: 3, simpDen: 4  },
						{ pct: 80, simpNum: 4, simpDen: 5  },
						{ pct: 90, simpNum: 9, simpDen: 10 }
					];
					const choice = pctCandidates[randInt(0, pctCandidates.length - 1)];
					const multMin = Math.ceil(8 / choice.simpDen);
					const multMax = Math.floor(30 / choice.simpDen);
					n = choice.simpDen * randInt(multMin, multMax);
					redCount = n * choice.simpNum / choice.simpDen;
					taskStr = `Urne mit ${n} Kugeln. Wahrscheinlichkeit, eine rote Kugel zu ziehen, beträgt ${choice.pct} %. Anzahl der roten Kugeln?`;
					resStr = `${choice.pct} % von ${n} sind ${redCount} rote Kugeln.`;
				} else {
					const fracCandidates = [
						{ num: 1, den: 2 },
						{ num: 1, den: 3 },
						{ num: 2, den: 3 },
						{ num: 1, den: 4 },
						{ num: 3, den: 4 },
						{ num: 1, den: 5 },
						{ num: 2, den: 5 },
						{ num: 3, den: 5 },
					];
					const frac = fracCandidates[randInt(0, fracCandidates.length - 1)];
					const multMin = Math.ceil(8 / frac.den);
					const multMax = Math.floor(30 / frac.den);
					n = frac.den * randInt(multMin, multMax);
					redCount = n * frac.num / frac.den;
					taskStr = `Urne mit ${n} Kugeln. Wahrscheinlichkeit, eine rote Kugel zu ziehen, beträgt \\( \\frac{${frac.num}}{${frac.den}} \\). Anzahl der roten Kugeln?`;
					resStr = `\\( \\dfrac{${frac.num}}{${frac.den}} \\) von ${n} sind ${redCount} rote Kugeln.`;
				}
			}

			textDisplay = taskStr;
			s = `${resStr}`;
			break;
		}

		case 'funktionen': {
			let subType = randInt(0, 6);
			
			// Hilfsvariablen für die Funktionserstellung
			let isLinear = randInt(0, 1) === 0;
			let m = randInt(-4, 4);
			if (m === 0) m = 2; // Steigung 0 vermeiden
			let b = randInt(-5, 5);
			
			let funcStr = "";
			let calcF = (x) => 0;
			
			// Funktion generieren (Linear oder Quadratisch)
			if (isLinear) {
				calcF = (x) => m * x + b;
				let mStr = m === 1 ? "" : (m === -1 ? "-" : fmt(m));
				let bStr = b > 0 ? ` + ${b}` : (b < 0 ? ` - ${Math.abs(b)}` : "");
				funcStr = `f(x) = ${mStr}x${bStr}`;
			} else {
				let quadType = randInt(0, 1);
				if (quadType === 0) {
					// Normalparabel verschoben: x^2 + c
					calcF = (x) => x * x + b;
					let bStr = b > 0 ? ` + ${b}` : (b < 0 ? ` - ${Math.abs(b)}` : "");
					funcStr = `f(x) = x^2${bStr}`;
				} else {
					// Gestreckte/Gestauchte Parabel: a*x^2
					let a = randInt(2, 4) * (randInt(0, 1) === 0 ? 1 : -1);
					calcF = (x) => a * x * x;
					funcStr = `f(x) = ${a}x^2`;
				}
			}
			
			// 7 Teilaufgabentypen
			switch (subType) {
				case 0: // Funktionswert berechnen
				let xVal = randInt(-4, 4);
					textDisplay = `Gegeben ist die Funktion \\( ${funcStr} \\).<br>Berechne den Funktionswert an der Stelle \\( x = ${xVal} \\).`;
					s = `\\( f(${xVal}) = ${calcF(xVal)} \\)`;
					break;
					
					case 1: // Argument berechnen
					let targetX = randInt(-3, 3);
					let targetY = calcF(targetX);
					textDisplay = `Gegeben ist die Funktion \\( ${funcStr} \\).<br>Bestimme das Argument \\( x \\), für das der Funktionswert \\( y = ${targetY} \\) ist.`;
					if (!isLinear && targetX !== 0) {
						s = `\\( x_1 = ${Math.abs(targetX)}, \\; x_2 = -${Math.abs(targetX)} \\)`;
					} else {
						s = `\\( x = ${targetX} \\)`;
					}
					break;
					
					case 2: // Nullstelle berechnen (erzwingt glatte Ergebnisse)
					if (isLinear) {
						let root = randInt(-4, 4);
						let myM = randInt(1, 3) * (randInt(0, 1) === 0 ? 1 : -1);
						let myB = -myM * root;
						let mStr = myM === 1 ? "" : (myM === -1 ? "-" : fmt(myM));
						let bStr = myB > 0 ? ` + ${myB}` : (myB < 0 ? ` - ${Math.abs(myB)}` : "");
						funcStr = `f(x) = ${mStr}x${bStr}`;
						textDisplay = `Berechne die Nullstelle der Funktion \\( ${funcStr} \\).`;
						s = `\\( x = ${root} \\)`;
					} else {
						let root = randInt(1, 4);
						let myB = -(root * root);
						funcStr = `f(x) = x^2 - ${Math.abs(myB)}`;
						textDisplay = `Berechne die Nullstellen der Funktion \\( ${funcStr} \\).`;
						s = `\\( x_1 = ${root}, \\; x_2 = -${root} \\)`;
					}
					break;

					case 3: // Fehlende Koordinate
					let px = randInt(-4, 4);
					let py = calcF(px);
					if (randInt(0, 1) === 0) {
						textDisplay = `Der Punkt \\( P(${px} | y) \\) liegt auf dem Graphen der Funktion \\( ${funcStr} \\).<br>Bestimme die fehlende y-Koordinate.`;
						s = `\\( y = ${py} \\)`;
					} else {
						textDisplay = `Der Punkt \\( P(x | ${py}) \\) liegt auf dem Graphen der Funktion \\( ${funcStr} \\).<br>Bestimme die fehlende x-Koordinate.`;
						if (!isLinear && px !== 0) {
							s = `\\( x = ${Math.abs(px)} \\) oder \\( x = -${Math.abs(px)} \\)`;
						} else {
							s = `\\( x = ${px} \\)`;
						}
					}
					break;

					case 4: // Wertetabelle erstellen
					textDisplay = `Gegeben ist \\( ${funcStr} \\).<br>Erstelle eine Wertetabelle für \\( x \\in \\{-2; -1; 0; 1; 2\\} \\).`;
					s = `\\( x = -2 \\Rightarrow y = ${calcF(-2)} \\)<br>` +
					`\\( x = -1 \\Rightarrow y = ${calcF(-1)} \\)<br>` +
					`\\( x = 0 \\Rightarrow y = ${calcF(0)} \\)<br>` +
					`\\( x = 1 \\Rightarrow y = ${calcF(1)} \\)<br>` +
					`\\( x = 2 \\Rightarrow y = ${calcF(2)} \\)`;
					break;
					
					case 5: // Graph zeichnen
					textDisplay = `Gegeben ist die Funktion \\( ${funcStr} \\).<br>Zeichne den zugehörigen Funktionsgraphen.`;
					s = `Kontrolle:<br>Der Graph verläuft u.a. durch die Punkte \\( P(0 | ${calcF(0)}) \\) und \\( Q(1 | ${calcF(1)}) \\).`;
					break;
					
					case 6: // Punktprobe
					let testX = randInt(-3, 3);
					let isTrue = randInt(0, 1) === 0;
					// Wenn isTrue false ist, addiere einen kleinen Störwert auf das echte y
					let testY = isTrue ? calcF(testX) : calcF(testX) + randInt(1, 3) * (randInt(0, 1) === 0 ? 1 : -1);
					
					textDisplay = `Führe eine Punktprobe durch:<br>Liegt der Punkt \\( P(${testX} | ${testY}) \\) auf dem Graphen von \\( ${funcStr} \\)?`;
					if (isTrue) {
						s = `Ja, denn \\( f(${testX}) = ${testY} \\) ist eine wahre Aussage.`;
					} else {
						s = `Nein, denn \\( f(${testX}) = ${calcF(testX)} \\neq ${testY} \\).`;
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
					if (n === 7) {
						// Bei 7 Daten: Genau der 4. Wert
						let median = sortedData[3];
						loesung = isMentalMode ?
						`${displayData.join(', ')}<br>Zentralwert (Median) = ${median}.` :
						`${sortedData.join(', ')}<br>Zentralwert (Median) = ${median}`;
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
				
				textDisplay = `Welchem Winkel entsprechen ${p} % in einem Kreisdiagramm?`;
				s = `10 % ≙ 36° ⭢ ${p} % ≙ ${result}°`;
				
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
				textPrint = `Zeichne einen ${pick.name}.${space(3)}`;
				s = pick.val !== undefined ? `${pick.name.replace('en', 'er')}: ${pick.val}°` : `${pick.name.replace('en', 'er')}: ${pick.min}° bis ${pick.max}°`;
				
			} else if (mode === 3) {
				let grad = randInt(15, 250);
				textDisplay = `Zeichne den Winkel \\(\\alpha\\) = ${grad}°.`;
				textPrint = `Zeichne den Winkel \\(\\alpha\\) = ${grad}°.${space(3)}`;
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
				textPrint = `Zeichne ein ${type} Dreieck.${space(3)}`;
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

			const sNames = ['a', 'b', 'c'];
			const aNames = ['\\alpha', '\\beta', '\\gamma'];
			const sn1 = sNames[p[0]], sn2 = sNames[p[1]], sn3 = sNames[p[2]];
			const an1 = aNames[p[0]], an2 = aNames[p[1]], an3 = aNames[p[2]];
			
			const type = randInt(0, 3); // 0: SSS, 1: SWS, 2: WSW, 3: SsW
			const kongruenzsatz = ['SSS', 'SWS', 'WSW', 'SsW'][type];
			const cm = (x) => x.toFixed(1).replace('.', ',');
			const pickDecNoZeroTenth = (minTenths, maxTenths) => {
				let n;
				do {
					n = randInt(minTenths, maxTenths);
				} while (n % 10 === 0);
				return n / 10;
			};

			let givenStr = '';
			let s1, s2, s3, a1, a2, a3;
			
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
				} while (Math.max(s1, s2, s3) > 10);

				givenStr = `\\( ${sn1}=${cm(s1)}\\,cm; \\; ${sn2}=${cm(s2)}\\,cm; \\; ${sn3}=${cm(s3)}\\,cm \\)`;
			} else if (type === 1) {
				// SWS
				do {
					s1 = pickDecNoZeroTenth(31, 69);
					s2 = pickDecNoZeroTenth(31, 69);
					a3 = randInt(25, 125);
					
					s3 = Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * Math.cos(a3 * Math.PI / 180));
					a1 = Math.round(Math.acos((s2 * s2 + s3 * s3 - s1 * s1) / (2 * s2 * s3)) * 180 / Math.PI);
					s3 = Math.round(s3 * 10) / 10;
					a2 = 180 - a3 - a1;
				} while (Math.max(s1, s2, s3) > 10 || a2 <= 0);

				givenStr = `\\( ${sn1}=${cm(s1)}\\,cm; \\; ${sn2}=${cm(s2)}\\,cm; \\; ${an3}=${a3}^\\circ \\)`;
			} else if (type === 2) {
				// WSW
				do {
					s3 = pickDecNoZeroTenth(31, 69);
					a1 = randInt(25, 50);
					a2 = randInt(90, 120);
					a3 = 180 - a1 - a2;
					
					s1 = Math.round((s3 * Math.sin(a1 * Math.PI / 180) / Math.sin(a3 * Math.PI / 180)) * 10) / 10;
					s2 = Math.round((s3 * Math.sin(a2 * Math.PI / 180) / Math.sin(a3 * Math.PI / 180)) * 10) / 10;
				} while (a3 <= 0 || Math.max(s1, s2, s3) > 10);

				givenStr = `\\( ${sn3}=${cm(s3)}\\,cm; \\; ${an1}=${a1}^\\circ; \\; ${an2}=${a2}^\\circ \\)`;
			} else {
				// SsW
				do {
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
				} while (!Number.isFinite(s3) || a3 <= 0 || Math.max(s1, s2, s3) > 10);

				givenStr = `\\( ${sn1}=${cm(s1)}\\,cm; \\; ${sn2}=${cm(s2)}\\,cm; \\; ${an1}=${a1}^\\circ \\)`;
			}

			const resS = [], resA = [];
			resS[p[0]] = s1; resS[p[1]] = s2; resS[p[2]] = s3;
			resA[p[0]] = a1; resA[p[1]] = a2; resA[p[2]] = a3;

			// Höhe des zu zeichnenden Dreiecks berechnen (bei größter Seite als Grundseite).
			// Über Heron: A = sqrt(u(u-a)(u-b)(u-c)), dann h = 2A/g.
			const sideA = resS[0], sideB = resS[1], sideC = resS[2];
			const base = Math.max(sideA, sideB, sideC);
			const semi = (sideA + sideB + sideC) / 2;
			const areaSq = semi * (semi - sideA) * (semi - sideB) * (semi - sideC);
			const area = Math.sqrt(Math.max(0, areaSq));
			const triangleHeight = base > 0 ? (2 * area) / base : 0;
			const reservedHeight = Number(Math.max(2, triangleHeight + 0.5).toFixed(1));
			
			textDisplay = `Fertige eine Planfigur an, zeichne das Dreieck und beschrifte es korrekt: <br>${givenStr}`;
			textPrint = `Zeichne das Dreieck (mit Planfigur und Beschriftung):<br>${givenStr}${space(reservedHeight)}`;
			s = `Kongruenzsatz ${kongruenzsatz}, alle Maße:<br>\\(a=${cm(resS[0])}\\,cm; \\quad b=${cm(resS[1])}\\,cm; \\quad c=${cm(resS[2])}\\,cm\\)<br>\\(\\alpha=${resA[0]}^\\circ; \\quad \\beta=${resA[1]}^\\circ; \\quad \\gamma=${resA[2]}^\\circ\\)`;
			break;
		}

		case 'schraegbild': {
			let type = randInt(0, 4); // 0: Quader, 1: Pyramide, 2: Prisma, 3: Zylinder, 4: Kegel

			// Hilfsfunktion für Kommas bei Dezimalzahlen (z.B. 2.5 -> 2,5)
			let fmt = (num) => num.toString().replace('.', ',');

			let pers = "";

			if (type === 0) {
				// --- QUADER ---
				let a = randInt(4, 8);
				let b = randInt(4, 8); // Tiefe
				let c = randInt(3, 8);
				textDisplay = `Zeichne das Schrägbild eines Quaders. Gegeben: a = ${a} cm, b = ${b} cm, c = ${c} cm.`;
				s = `Kontrolle: Vorderfläche = ${a}×${c} cm, Tiefe hinten = ${fmt(b / 2)} cm.`;
				
			} else if (type === 1) {
				// --- PYRAMIDE ---
				let a = randInt(4, 8);
				let h = randInt(5, 9);
				textDisplay = `Zeichne das Schrägbild einer Pyramide. Gegeben: a = ${a} cm, h = ${h} cm.`;
				s = `Kontrolle: Grundkante = ${a} cm, hintere Kante = ${fmt(a / 2)} cm.`;
				
			} else if (type === 2) {
				// --- PRISMA (DREIECKIG) ---
				let a = randInt(3, 6);
				let b = randInt(3, 7);
				let hk = randInt(4, 9);
				textDisplay = `Zeichne das Schrägbild eines Prismas. Gegeben: a = ${a} cm, b = ${b} cm, h_k = ${hk} cm.`;
				s = `Kontrolle: Dreieckseiten = ${a} cm, ${b} cm, hintere Kanten = ${fmt(hk / 2)} cm.`;
				
			} else if (type === 3) {
				// --- ZYLINDER ---
				let r = randInt(2, 4);
				let hk = randInt(4, 9);
				textDisplay = `Zeichne das Schrägbild eines Zylinders. Gegeben: r = ${r} cm, h_k = ${hk} cm.`;
				s = `Kontrolle: Vorderer Kreis radius = ${r} cm, hinterer Kreis versetzt um ${fmt(hk / 2)} cm.`;
				
			} else if (type === 4) {
				// --- KREISKEGEL ---
				let r = randInt(2, 4);
				let hk = randInt(5, 9);
				textDisplay = `Zeichne das Schrägbild eines Kegels. Gegeben: r = ${r} cm, h_k = ${hk} cm.`;
				s = `Kontrolle: Kreisradius = ${r} cm, Spitze versetzt um ${fmt(hk / 2)} cm.`;
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
			
			if (rd > 0.67) {
				// TYP 1: Anteil berechnen (Bruch von Ganzem)
				// Damit es glatt aufgeht, muss das Ganze ein Vielfaches des Nenners sein.
				let scale = Math.random() > 0.5 ? 10 : 1; // Sorgt manchmal für Hunderter/Zehner-Werte
				let multiplier = isMentalMode ? rnd(2, 9) : rnd(3, 13);
				let G = n * multiplier * scale; // Das Ganze (Grundwert)
				let W = (G / n) * z;            // Der Anteil (Prozentwert)

				textDisplay = `\\( \\frac{${z}}{${n}} \\) von ${comma(G)} ${einheit} sind ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) von ${comma(G)}  ${einheit} sind  ${comma(W)} ${einheit}<br>
				\\((${comma(G)} : ${n} \\cdot ${z} = ${comma(W)})\\)`;

			} else if (rd > 0.33) {
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
				
				textDisplay = `${comma(W)} ${einheit} von ${comma(G)}  ${einheit} sind ${blank(3)}`;
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
				if (sz.type === 'food' || sz.type === 'job') return num.toFixed(2).replace('.', ',');
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
					einzelwert = randInt(3, 1) * 0.2; // 0,50€ bis 3,00€ für Lebensmittel
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
					sRes = `${de(wert2)} ${sz.einheit2} ≙ ${menge2} ${sz.einheit1}`;
				} else if (sz.type === 'print') {
					s1 = `${de(wert1)} ${sz.einheit2} schafft ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viele ${sz.einheit2} schafft er in ${menge2} ${sz.einheit1}?`;
					sStep = `${de(einzelwert)} ${sz.einheit2} ≙ 1 ${einheitSingular}`;
					sRes = `${de(wert2)} ${sz.einheit2} ≙ ${menge2} ${sz.einheit1}`;
				} else {
					// Lebensmittel
					s1 = `${menge1} ${sz.einheit1} kosten ${de(wert1)} ${sz.einheit2}`;
					s2 = `${menge1} ${sz.einheit1} ≙ ${de(wert1)} ${sz.einheit2}`;
					sFrage = `Wie viel kosten ${menge2} ${sz.einheit1}?`;
					sStep = `1 ${sz.einheit1.includes('Brötchen') ? 'Brötchen' : sz.einheit1} ≙ ${de(einzelwert)} ${sz.einheit2}`;
					sRes = `${menge2} ${sz.einheit1} ≙ ${de(wert2)} ${sz.einheit2}`;
				}
			} else {
				// --- UMGEKEHRTE FRAGE: Nach der Start-Einheit (z.B. kg oder Stunden) fragen ---
				if (sz.type === 'job') {
					s1 = `${de(wert1)} ${sz.einheit2} verdient ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viele ${sz.einheit1} muss er für ${de(wert2)} ${sz.einheit2} arbeiten?`;
					sStep = `${de(einzelwert)} ${sz.einheit2} ≙ 1 ${einheitSingular}`;
					sRes = `${de(wert2)} ${sz.einheit2} ≙ ${menge2} ${sz.einheit1}`;
				} else if (sz.type === 'print') {
					s1 = `${de(wert1)} ${sz.einheit2} schafft ${sz.objekt} in ${menge1} ${sz.einheit1}`;
					s2 = `${de(wert1)} ${sz.einheit2} ≙ ${menge1} ${sz.einheit1}`;
					sFrage = `Wie viele ${sz.einheit1} braucht er für ${de(wert2)} ${sz.einheit2}?`;
					sStep = `${de(einzelwert)} ${sz.einheit2} ≙ 1 ${einheitSingular}`;
					sRes = `${de(wert2)} ${sz.einheit2} ≙ ${menge2} ${sz.einheit1}`;
				} else {
					// Lebensmittel
					s1 = `${menge1} ${sz.einheit1} kosten ${de(wert1)} ${sz.einheit2}`;
					s2 = `${menge1} ${sz.einheit1} ≙ ${de(wert1)} ${sz.einheit2}`;
					sFrage = `Wie viele ${sz.einheit1} bekommt man für ${de(wert2)} ${sz.einheit2}?`;
					sStep = `1 ${sz.einheit1.includes('Brötchen') ? 'Brötchen' : sz.einheit1} ≙ ${de(einzelwert)} ${sz.einheit2} `;
					sRes = `${menge2} ${sz.einheit1} ≙ ${de(wert2)} ${sz.einheit2}`;
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
				let r = randInt(2, 11); // Etwas größerer Bereich für schönere Differenzen
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

