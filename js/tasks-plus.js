// ============================================================
// AUFGABEN-KATEGORIEN & TYPEN-LABELS
// ============================================================

const fmt = formatUtils.fmt;
const comma = formatUtils.comma;
const formatDecimal = formatUtils.formatDecimal;

const taskCategories = {
	arithmetic: [],
	percent: [
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'units'
	],
	algebra: ['terme', 'equations', 'equations_adv', 'equations_system', 'formel_umstellen'],
	geometry: ['geometry', 'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring', 'winkel', 'schraegbild', 'kongruenz'],
	functions: ['linear_function'],
	statistics: ['statistik', 'wkt']
};

// Sichtbare Aufgabentypen je Klassenstufe (wird vom UI-Dropdown genutzt)
const taskTypesByGrade = {
	klasse5: [
		'units',
		'geometry', 'geometry_rechteck', 'geometry_dreieck', 'winkel', 'schraegbild', 'statistik'
	],
	klasse6: [
		'units',
		'anteile_easy', 'anteile_normal', 'percent_easy', 'percent_normal',
		'geometry', 'geometry_rechteck', 'geometry_dreieck', 'winkel', 'schraegbild', 'statistik', 'wkt'
	],
	klasse7: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'terme', 'equations', 'equations_lin', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function'
	],
	klasse8: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function'
	],
	klasse9: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function'
	],
	klasse10: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'winkel', 'schraegbild', 'kongruenz',
		'statistik', 'wkt', 'linear_function'
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
	['units', 'Einheiten', 'Größen in verschiedene Einheiten umrechnen'],
	
	// Prozent / Proportionalität / Maßeinheiten
	['anteile_easy', 'Anteile (einfach)', 'Anteile berechnen (einfach)'],
	['anteile_normal', 'Anteile (normal)', 'Anteile berechnen (normal)'],
	['prop_easy', 'Proportionalitäten (einfach)', 'Aufgaben zur direkten Proportionalität (einfach)'],
	['prop_normal', 'Proportionalitäten (normal)', 'Aufgaben zur direkten Proportionalität (normal)'],
	['percent_easy', 'Prozentrechnung (einfach)', 'Prozentwert, Grundwert und Prozentsatz berechnen (einfach)'],
	['percent_normal', 'Prozentrechnung (normal)', 'Prozentwert, Grundwert und Prozentsatz berechnen (normal)'],
	['pv_easy', 'Prozentuale Veränderung (einfach)', 'Prozentuale Zu- und Abnahmen berechnen (einfach)'],
	['pv_normal', 'Prozentuale Veränderung (normal)', 'Prozentuale Zu- und Abnahmen berechnen (normal)'],

	// Algebra / Terme / Gleichungen
	['terme', 'Terme', 'Terme zusammenfassen und Klammern auflösen'],
	['equations', 'lin. Gl. ax+b = c', 'Lineare Gleichung der Form ax + b = c lösen'],
	['equations_adv', 'lin. Gl. ax+b = cx+d', 'Lineare Gleichung der Form ax + b = cx + d lösen'],
	['equations_lin', 'lin. Gl. umstellen', 'Lineare Gleichungen nach y umstellen'],
	['equations_system', 'LGS (2x2)', 'Lineare Gleichungssysteme mit zwei Variablen lösen'],
	['formel_umstellen', 'Formeln umstellen', 'Formeln nach einer anderen Variablen umstellen'],

	// Geometrie
	['geometry', 'Geometrie (gemischt)', 'Gemischte Aufgaben zu Rechteck, Dreieck, Parallelogramm, Trapez, Kreis und Kreisring'],
	['geometry_rechteck', 'Rechteck', 'Flächeninhalt und Umfang von Rechtecken berechnen'],
	['geometry_dreieck', 'Dreieck (mit Höhe)', 'Flächeninhalt von Dreiecken mit Höhe berechnen'],
	['geometry_parallelogramm', 'Parallelogramm', 'Flächeninhalt und Umfang von Parallelogrammen berechnen'],
	['geometry_trapez', 'Trapez', 'Flächeninhalt von Trapezen berechnen'],
	['geometry_kreis', 'Kreis', 'Flächeninhalt und Umfang von Kreisen berechnen'],
	['geometry_kreisring', 'Kreisring', 'Flächeninhalt von Kreisringen berechnen'],
	['winkel', 'Winkel', 'Winkel zeichnen und berechnen'],
	['schraegbild', 'Schrägbilder', 'Schrägbilder von Körpern zeichnen'],
	['kongruenz', 'Kongruenzsätze', 'Dreiecke mit Kongruenzsätzen konstruieren'],

	// Funktionen, Statistik & Wahrscheinlichkeiten
	['wkt', 'Wahrscheinlichkeiten', 'Wahrscheinlichkeiten bestimmen'],
	['linear_function', 'Lineare Funktionen zeichnen', 'Lineare Funktionen grafisch darstellen'],
	// ['funktionen', 'Funktionen', 'Funktionswerte, Argumente und Eigenschaften von Funktionen bestimmen'],
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

function createTask(type, isEasyMode, grade = 5, options = {}) {
	if (!Number.isFinite(grade)) {
		grade = 5;
	}

	const difficultyTypeMatch = typeof type === 'string' ? type.match(/^(.*)_(easy|normal)$/) : null;
	const normalizedType = difficultyTypeMatch ? difficultyTypeMatch[1] : type;
	const forcedEasyMode = difficultyTypeMatch ? difficultyTypeMatch[2] === 'easy' : null;
	const effectiveEasyMode = forcedEasyMode === null ? isEasyMode : forcedEasyMode;

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

	// Beispiel für die Nutzung von isEasyMode:
	// if (isEasyMode) { Z1 = rnd(2, 5); } else { Z1 = rnd(5, 20); }

	let v1, v2;
	let rd;
	const dec1 = (value) => formatDecimal(value, 1);
	const dec2 = (value) => formatDecimal(value, 2);
	switch (normalizedType) {

		case 'percent':
			let p;
			let pVal;
			const einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			rd = Math.random();
			if (rd > 0.5) {
				pVal = effectiveEasyMode ? rnd(2, 11) * 100 : randInt(250, 2800) / 10;
				p = [3, 4, 5, 6, 7, 8, 9, 11, 12, 20, 25, 30, 35, 40, 60, 70, 80, 90][randInt(0, 17)];
				textDisplay = `${p} % von ${dec1(pVal)} ${einheit} sind ${blank(3)}`;
				s = `100 % ≙ ${dec1(pVal)} ${einheit}<br>1 % ≙ ${dec2(pVal / 100)} ${einheit}<br>${p} % ≙ <b>${dec2((pVal / 100) * p)} ${einheit}</b>`;
			} else if (rd > 0.3) {
				p = [20, 25, 30, 40, 50, 60, 70, 80, 90][randInt(0, 8)];
				if (effectiveEasyMode) {
					pVal = rnd(2, 9) * p;
				} else {
					const baseValue = randInt(200, 4000) / 10;
					pVal = (baseValue * p) / 100;
				}
				textDisplay = `${p} % sind ${dec2(pVal)} ${einheit} von ${blank(3)}`;
				s = `${p} % ≙ ${dec2(pVal)} ${einheit}<br>1 % ≙ ${dec2(pVal / p)} ${einheit}<br>100 % ≙ <b>${dec2((pVal / p) * 100)} ${einheit}</b>`;
			} else {
				const pList = effectiveEasyMode ? [2, 3, 5, 10, 20, 25, 50, 75, 80, 90] : [2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 80, 90, 95];
				const p = pList[randInt(0, pList.length - 1)];
				const G = effectiveEasyMode ? (rnd(2, 15) * 10) : (randInt(200, 4500) / 10);
				const W = (G * p) / 100;
				textDisplay = `${dec2(W)} ${einheit} von ${dec1(G)} ${einheit} sind ${blank(2)} %`;
				s = `100 % ≙ ${dec1(G)} ${einheit}<br>1 % ≙ ${dec2(G / 100)} ${einheit}<br><b>${p} %</b> ≙ ${dec2(W)} ${einheit}`;
			}
			break;

		case 'pv': {
			const einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			let p = [3, 4, 5, 6, 7, 10, 20, 25, 50][randInt(0, 8)];
			const pVal = effectiveEasyMode ? (rnd(2, 11) * 100) : (randInt(250, 3500) / 10);
			const pvType = randInt(0, 5); // 0: Erhöhung um p%, 1: Reduzierung um p%, 2: Erhöhung auf 100+p%, 3: Reduzierung auf 100-p%, 4: Rabatt-Fall 1, 5: Rabatt-Fall 2
			switch (pvType) {
				case 0: // Erhöhung um p%
					textDisplay = `${dec1(pVal)} ${einheit} um ${p} % erhöht sind ${blank(3)}`;
					s = `100 % ≙ ${dec1(pVal)} ${einheit}<br>1 % ≙ ${dec2(pVal / 100)} ${einheit}<br>${100 + p} % ≙ <b>${dec2(pVal + ((pVal / 100) * p))} ${einheit}</b>`;
					break;
				case 1: // Reduzierung um p%
					textDisplay = `${dec1(pVal)} ${einheit} um ${p} % reduziert sind ${blank(3)}`;
					s = `100 % ≙ ${dec1(pVal)} ${einheit}<br>1 % ≙ ${dec2(pVal / 100)} ${einheit}<br>${100 - p} % ≙ <b>${dec2(pVal - ((pVal / 100) * p))} ${einheit}</b>`;
					break;
				case 2: // Erhöhung auf 100+p%
					textDisplay = `${dec1(pVal)} ${einheit} auf ${100 + p} % erhöht sind ${blank(3)}`;
					s = `100 % ≙ ${dec1(pVal)} ${einheit}<br>1 % ≙ ${dec2(pVal / 100)} ${einheit}<br>${100 + p} % ≙ <b>${dec2(pVal + ((pVal / 100) * p))} ${einheit}</b>`;
					break;
				case 3: // Reduzierung auf 100-p%
					textDisplay = `${dec1(pVal)} ${einheit} auf ${100 - p} % reduziert sind ${blank(3)}`;
					s = `100 % ≙ ${dec1(pVal)} ${einheit}<br>1 % ≙ ${dec2(pVal / 100)} ${einheit}<br>${100 - p} % ≙ <b>${dec2(pVal - ((pVal / 100) * p))} ${einheit}</b>`;
					break;
				case 4: {// Rabatt-Fall 1
					p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
					const originalPrice = pVal;
					const discountedPrice = originalPrice - (originalPrice / 100 * p);
					textDisplay = `${p} % Rabatt auf ${dec1(originalPrice)} €. Neuer Preis: ${blank(3)}`;
					s = `100 % ≙ ${dec1(originalPrice)} €<br>1 % ≙ ${dec2(originalPrice / 100)} €<br>${100 - p} % ≙ <b>${dec2(discountedPrice)} €</b>`;
					break;
				}
				case 5: {// Rabatt-Fall 2
					p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
					const originalPrice = pVal;
					const discountedPrice = originalPrice - (originalPrice / 100 * p);
					textDisplay = `Preissenkung von ${dec1(originalPrice)} € auf ${dec2(discountedPrice)} €. Rabatt: ${blank(2)} %`;
					s = `100 % ≙ ${dec1(originalPrice)} €<br>1 % ≙ ${dec2(originalPrice / 100)} €<br><b>${p} %</b> ≙ ${dec2(originalPrice - discountedPrice)} €`;
					break;
				}
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

		case 'geometry_rechteck':
		case 'geometry_dreieck':
		case 'geometry_parallelogramm':
		case 'geometry_trapez':
		case 'geometry_kreis':
		case 'geometry_kreisring':
		case 'geometry': {
			const lengthUnits = ['mm', 'cm', 'dm', 'm'];
			const unit = lengthUnits[randInt(0, lengthUnits.length - 1)];
			const rndD1 = (min, max) => randInt(Math.round(min * 10), Math.round(max * 10)) / 10;
			const round2 = (val) => Math.round(val * 100) / 100;
			const num1 = (val) => comma(formatDecimal(val, 1));
			const num2 = (val) => comma(formatDecimal(val, 2));
			const geometryShapeByType = {
				geometry_rechteck: 'rechteck',
				geometry_dreieck: 'dreieck',
				geometry_parallelogramm: 'parallelogramm',
				geometry_trapez: 'trapez',
				geometry_kreis: 'kreis',
				geometry_kreisring: 'kreisring'
			};
			const forcedShape = geometryShapeByType[normalizedType] || null;
			const pickLen = (easyMin, easyMax, normalMin, normalMax) => {
				const min = effectiveEasyMode ? easyMin : normalMin;
				const max = effectiveEasyMode ? easyMax : normalMax;
				if (Math.random() < 0.65) {
					return rndD1(min, max);
				}
				return randInt(Math.ceil(min), Math.floor(max));
			};
			const shapePool = ['rechteck', 'dreieck'];
			if (grade >= 7) {
				shapePool.push('parallelogramm', 'trapez');
			}
			if (grade >= 8) {
				shapePool.push('kreis', 'kreisring');
			}
			const shape = forcedShape || shapePool[randInt(0, shapePool.length - 1)];
			const isInverse = !effectiveEasyMode && Math.random() < 0.5;

			switch (shape) {
				case 'rechteck': {
					if (isInverse) {
						const goal = Math.random() < 0.5 ? 'A' : 'u';
						const knownSide = pickLen(2, 9, 2, 14);
						const missingSide = pickLen(2, 8, 2, 12);

						if (goal === 'A') {
							const area = round2(knownSide * missingSide);
							textDisplay = `Bei einem Rechteck sind der Flächeninhalt \\( A = ${num2(area)} \\) ${unit}² und \\( a = ${num1(knownSide)} \\) ${unit} gegeben.<br>Bestimme die fehlende Seitenlänge \\( b \\).`;
							textPrint = `Rechteck: A = ${num2(area)} ${unit}², a = ${num1(knownSide)} ${unit}. Bestimme b.${space(1.8)}`;
							s = `\\[ \\begin{aligned}
							A &= a \\cdot b \\\\
							${num2(area)} &= ${num1(knownSide)} \\cdot b &&| : ${num1(knownSide)} \\\\
							b &= ${num2(round2(area / knownSide))} \\text{ ${unit}}
							\\end{aligned} \\]`;
						} else {
							const perimeter = round2(2 * (knownSide + missingSide));
							textDisplay = `Bei einem Rechteck sind der Umfang \\( u = ${num2(perimeter)} \\) ${unit} und \\( a = ${num1(knownSide)} \\) ${unit} gegeben.<br>Bestimme die fehlende Seitenlänge \\( b \\).`;
							textPrint = `Rechteck: u = ${num2(perimeter)} ${unit}, a = ${num1(knownSide)} ${unit}. Bestimme b.${space(1.8)}`;
							s = `\\[ \\begin{aligned}
							u &= 2 \\cdot (a+b) \\\\
							${num2(perimeter)} &= 2 \\cdot (${num1(knownSide)} + b) &&| :2 \\\\
							${num2(round2(perimeter / 2))} &= ${num1(knownSide)} + b &&| - ${num1(knownSide)} \\\\
							b &= ${num2(round2(perimeter / 2 - knownSide))} \\text{ ${unit}}
							\\end{aligned} \\]`;
						}
					} else {
						const a = pickLen(2, 9, 2, 14);
						let b = pickLen(2, 8, 2, 12);
						if (Math.abs(a - b) < 0.1) {
							b = round2(b + 0.7);
						}
						const goal = Math.random() < 0.5 ? 'A' : 'u';

						if (goal === 'A') {
							const area = round2(a * b);
							textDisplay = `Berechne den Flächeninhalt eines Rechtecks mit <br>\\( a = ${num1(a)} \\) ${unit} und \\( b = ${num1(b)} \\) ${unit}.`;
							textPrint = `Berechne den Flächeninhalt eines Rechtecks: a = ${num1(a)} ${unit}, b = ${num1(b)} ${unit}.${space(1.5)}`;
							s = `\\[ \\begin{aligned}
							A &= a \\cdot b \\\\
							A &= ${num1(a)} \\cdot ${num1(b)} = ${num2(area)} \\text{ ${unit}}^2
							\\end{aligned} \\]`;
						} else {
							const perimeter = round2(2 * (a + b));
							textDisplay = `Berechne den Umfang eines Rechtecks mit <br>\\( a = ${num1(a)} \\) ${unit} und \\( b = ${num1(b)} \\) ${unit}.`;
							textPrint = `Berechne den Umfang eines Rechtecks: a = ${num1(a)} ${unit}, b = ${num1(b)} ${unit}.${space(1.5)}`;
							s = `\\[ \\begin{aligned}
							u &= 2 \\cdot (a+b) \\\\
							u &= 2 \\cdot (${num1(a)} + ${num1(b)}) = ${num2(perimeter)} \\text{ ${unit}}
							\\end{aligned} \\]`;
						}
					}
					break;
				}

				case 'dreieck': {
					if (isInverse) {
						const g = pickLen(2, 10, 2, 14);
						const h = pickLen(2, 10, 2, 12);
						const area = round2((g * h) / 2);
						const askForG = Math.random() < 0.5;

						if (askForG) {
							textDisplay = `Bei einem Dreieck sind \\( A = ${num2(area)} \\) ${unit}² und \\( h = ${num1(h)} \\) ${unit} gegeben.<br>Bestimme die Grundseite \\( g \\).`;
							textPrint = `Dreieck: A = ${num2(area)} ${unit}², h = ${num1(h)} ${unit}. Bestimme g.${space(1.8)}`;
							s = `\\[ \\begin{aligned}
							A &= \\frac{1}{2} \\cdot g \\cdot h \\\\
							${num2(area)} &= \\frac{1}{2} \\cdot g \\cdot ${num1(h)} &&| \\cdot 2 \\\\
							${num2(round2(area * 2))} &= g \\cdot ${num1(h)} &&| : ${num1(h)} \\\\
							g &= ${num2(round2((area * 2) / h))} \\text{ ${unit}}
							\\end{aligned} \\]`;
						} else {
							textDisplay = `Bei einem Dreieck sind \\( A = ${num2(area)} \\) ${unit}² und \\( g = ${num1(g)} \\) ${unit} gegeben.<br>Bestimme die Höhe \\( h \\).`;
							textPrint = `Dreieck: A = ${num2(area)} ${unit}², g = ${num1(g)} ${unit}. Bestimme h.${space(1.8)}`;
							s = `\\[ \\begin{aligned}
							A &= \\frac{1}{2} \\cdot g \\cdot h \\\\
							${num2(area)} &= \\frac{1}{2} \\cdot ${num1(g)} \\cdot h &&| \\cdot 2 \\\\
							${num2(round2(area * 2))} &= ${num1(g)} \\cdot h &&| : ${num1(g)} \\\\
							h &= ${num2(round2((area * 2) / g))} \\text{ ${unit}}
							\\end{aligned} \\]`;
						}
					} else {
						const g = pickLen(2, 10, 2, 14);
						const h = pickLen(2, 10, 2, 12);
						const area = round2((g * h) / 2);
						textDisplay = `Berechne den Flächeninhalt eines Dreiecks mit <br>Grundseite \\( g = ${num1(g)} \\) ${unit} und Höhe \\( h = ${num1(h)} \\) ${unit}.`;
						textPrint = `Berechne den Flächeninhalt eines Dreiecks: g = ${num1(g)} ${unit}, h = ${num1(h)} ${unit}.${space(1.5)}`;
						s = `\\[ \\begin{aligned}
						A &= \\frac{1}{2} \\cdot g \\cdot h \\\\
						A &= \\frac{1}{2} \\cdot ${num1(g)} \\cdot ${num1(h)} = ${num2(area)} \\text{ ${unit}}^2
						\\end{aligned} \\]`;
					}
					break;
				}

				case 'parallelogramm': {
					if (isInverse) {
						const g = pickLen(2, 10, 2, 14);
						const h = pickLen(2, 10, 2, 12);
						const area = round2(g * h);
						textDisplay = `Bei einem Parallelogramm sind \\( A = ${num2(area)} \\) ${unit}² und \\( h = ${num1(h)} \\) ${unit} gegeben.<br>Bestimme die Grundseite \\( g \\).`;
						textPrint = `Parallelogramm: A = ${num2(area)} ${unit}², h = ${num1(h)} ${unit}. Bestimme g.${space(1.8)}`;
						s = `\\[ \\begin{aligned}
						A &= g \\cdot h \\\\
						${num2(area)} &= g \\cdot ${num1(h)} &&| : ${num1(h)} \\\\
						g &= ${num2(round2(area / h))} \\text{ ${unit}}
						\\end{aligned} \\]`;
					} else {
						const goal = Math.random() < 0.5 ? 'A' : 'u';
						if (goal === 'A') {
							const g = pickLen(2, 10, 2, 14);
							const h = pickLen(2, 10, 2, 12);
							const area = round2(g * h);
							textDisplay = `Berechne den Flächeninhalt eines Parallelogramms mit <br>Grundseite \\( g = ${num1(g)} \\) ${unit} und Höhe \\( h = ${num1(h)} \\) ${unit}.`;
							textPrint = `Berechne den Flächeninhalt eines Parallelogramms: g = ${num1(g)} ${unit}, h = ${num1(h)} ${unit}.${space(1.5)}`;
							s = `\\[ \\begin{aligned}
							A &= g \\cdot h \\\\
							A &= ${num1(g)} \\cdot ${num1(h)} = ${num2(area)} \\text{ ${unit}}^2
							\\end{aligned} \\]`;
						} else {
							const g = pickLen(2, 10, 2, 14);
							const side = pickLen(2, 10, 2, 12);
							const perimeter = round2(2 * (g + side));
							textDisplay = `Berechne den Umfang eines Parallelogramms mit <br>\\( g = ${num1(g)} \\) ${unit} und Seitenlänge \\( s = ${num1(side)} \\) ${unit}.`;
							textPrint = `Berechne den Umfang eines Parallelogramms: g = ${num1(g)} ${unit}, s = ${num1(side)} ${unit}.${space(1.5)}`;
							s = `\\[ \\begin{aligned}
							u &= 2 \\cdot (g+s) \\\\
							u &= 2 \\cdot (${num1(g)} + ${num1(side)}) = ${num2(perimeter)} \\text{ ${unit}}
							\\end{aligned} \\]`;
						}
					}
					break;
				}

				case 'trapez': {
					if (isInverse) {
						const a = pickLen(2, 9, 2, 12);
						const c = pickLen(2, 9, 2, 12);
						const h = pickLen(2, 8, 2, 10);
						const area = round2(((a + c) * h) / 2);
						textDisplay = `Bei einem Trapez sind \\( A = ${num2(area)} \\) ${unit}², \\( c = ${num1(c)} \\) ${unit} und \\( h = ${num1(h)} \\) ${unit} gegeben.<br>Bestimme die Seite \\( a \\).`;
						textPrint = `Trapez: A = ${num2(area)} ${unit}², c = ${num1(c)} ${unit}, h = ${num1(h)} ${unit}. Bestimme a.${space(2)}`;
						s = `\\[ \\begin{aligned}
						A &= \\frac{1}{2} \\cdot (a+c) \\cdot h \\\\
						${num2(area)} &= \\frac{1}{2} \\cdot (a+${num1(c)}) \\cdot ${num1(h)} &&| \\cdot 2 \\\\
						${num2(round2(area * 2))} &= (a+${num1(c)}) \\cdot ${num1(h)} &&| : ${num1(h)} \\\\
						${num2(round2((area * 2) / h))} &= a+${num1(c)} &&| - ${num1(c)} \\\\
						a &= ${num2(round2((area * 2) / h - c))} \\text{ ${unit}}
						\\end{aligned} \\]`;
					} else {
						const a = pickLen(2, 9, 2, 12);
						const c = pickLen(2, 9, 2, 12);
						const h = pickLen(2, 8, 2, 10);
						const area = round2(((a + c) * h) / 2);
						textDisplay = `Berechne den Flächeninhalt eines Trapezes mit <br>\\( a = ${num1(a)} \\) ${unit}, \\( c = ${num1(c)} \\) ${unit} und \\( h = ${num1(h)} \\) ${unit}.`;
						textPrint = `Berechne den Flächeninhalt eines Trapezes: a = ${num1(a)} ${unit}, c = ${num1(c)} ${unit}, h = ${num1(h)} ${unit}.${space(1.6)}`;
						s = `\\[ \\begin{aligned}
						A &= \\frac{1}{2} \\cdot (a+c) \\cdot h \\\\
						A &= \\frac{1}{2} \\cdot (${num1(a)}+${num1(c)}) \\cdot ${num1(h)} = ${num2(area)} \\text{ ${unit}}^2
						\\end{aligned} \\]`;
					}
					break;
				}

				case 'kreis': {
					if (isInverse) {
						const r = pickLen(1.5, 8, 1.2, 10);
						if (Math.random() < 0.5) {
							const area = round2(Math.PI * r * r);
							textDisplay = `Bei einem Kreis ist der Flächeninhalt \\( A = ${num2(area)} \\) ${unit}² gegeben.<br>Bestimme den Radius \\( r \\).`;
							textPrint = `Kreis: A = ${num2(area)} ${unit}². Bestimme r.${space(1.8)}`;
							s = `\\[ \\begin{aligned}
							A &= \\pi \\cdot r^2 \\\\
							${num2(area)} &= \\pi \\cdot r^2 &&| :\\pi \\\\
							${num2(round2(area / Math.PI))} &= r^2 &&| \\sqrt{\\phantom{0}} \\\\
							r &= ${num2(round2(Math.sqrt(area / Math.PI)))} \\text{ ${unit}}
							\\end{aligned} \\]`;
						} else {
							const perimeter = round2(2 * Math.PI * r);
							textDisplay = `Bei einem Kreis ist der Umfang \\( u = ${num2(perimeter)} \\) ${unit} gegeben.<br>Bestimme den Radius \\( r \\).`;
							textPrint = `Kreis: u = ${num2(perimeter)} ${unit}. Bestimme r.${space(1.8)}`;
							s = `\\[ \\begin{aligned}
							u &= 2 \\pi \\cdot r \\\\
							${num2(perimeter)} &= 2 \\pi \\cdot r &&| :(2\\pi) \\\\
							r &= ${num2(round2(perimeter / (2 * Math.PI)))} \\text{ ${unit}}
							\\end{aligned} \\]`;
						}
					} else {
						const r = pickLen(1.5, 8, 1.2, 10);
						const goal = Math.random() < 0.5 ? 'A' : 'u';
						if (goal === 'A') {
							const area = round2(Math.PI * r * r);
							textDisplay = `Berechne den Flächeninhalt eines Kreises mit \\( r = ${num1(r)} \\) ${unit}.`;
							textPrint = `Berechne den Flächeninhalt eines Kreises: r = ${num1(r)} ${unit}.${space(1.5)}`;
							s = `\\[ \\begin{aligned}
							A &= \\pi \\cdot r^2 \\\\
							A &= \\pi \\cdot ${num1(r)}^2 \\approx ${num2(area)} \\text{ ${unit}}^2
							\\end{aligned} \\]`;
						} else {
							const perimeter = round2(2 * Math.PI * r);
							textDisplay = `Berechne den Umfang eines Kreises mit \\( r = ${num1(r)} \\) ${unit}.`;
							textPrint = `Berechne den Umfang eines Kreises: r = ${num1(r)} ${unit}.${space(1.5)}`;
							s = `\\[ \\begin{aligned}
							u &= 2 \\pi \\cdot r \\\\
							u &= 2 \\pi \\cdot ${num1(r)} \\approx ${num2(perimeter)} \\text{ ${unit}}
							\\end{aligned} \\]`;
						}
					}
					break;
				}

				default: {
					const innerR = pickLen(1.2, 6, 1, 7);
					const outerR = round2(innerR + pickLen(0.8, 3, 0.8, 4));
					const area = round2(Math.PI * (outerR * outerR - innerR * innerR));
					textDisplay = `Berechne den Flächeninhalt eines Kreisrings mit <br>Außenradius \\( R = ${num1(outerR)} \\) ${unit} und Innenradius \\( r = ${num1(innerR)} \\) ${unit}.`;
					textPrint = `Berechne den Flächeninhalt eines Kreisrings: R = ${num1(outerR)} ${unit}, r = ${num1(innerR)} ${unit}.${space(1.7)}`;
					s = `\\[ \\begin{aligned}
					A &= \\pi \\cdot (R^2-r^2) \\\\
					A &= \\pi \\cdot (${num1(outerR)}^2-${num1(innerR)}^2) \\approx ${num2(area)} \\text{ ${unit}}^2
					\\end{aligned} \\]`;
					break;
				}
			}
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

		case 'equations_system': {
			const formatMxPlusN = (m, n) => {
				const mPart = m === 1 ? 'x' : (m === -1 ? '-x' : `${m}x`);
				if (n === 0) return mPart;
				return `${mPart} ${n > 0 ? '+' : '-'} ${Math.abs(n)}`;
			};

			const eqFromY = (m, n) => `y = ${formatMxPlusN(m, n)}`;

			const eqStd = (m, n) => {
				const a = -m;
				const aPart = a === 1 ? 'x' : (a === -1 ? '-x' : `${a}x`);
				return `${aPart} + y = ${n}`;
			};

			const eqRightY = (m, n) => {
				if (n === 0) return `${m === 1 ? 'x' : (m === -1 ? '-x' : `${m}x`)} = y`;
				return `${formatMxPlusN(m, n)} = y`;
			};

			const eqYMinus = (m, n) => {
				if (m === 1) return `y - x = ${n}`;
				if (m === -1) return `y + x = ${n}`;
				return `y ${m > 0 ? '-' : '+'} ${Math.abs(m)}x = ${n}`;
			};

			const presentationForms = [eqFromY, eqStd, eqRightY, eqYMinus];

			let xSol = rnd(-6, 6);
			let ySol = rnd(-6, 6);
			let m1 = rnd(-5, 5);
			let m2 = rnd(-5, 5);

			while (m1 === 0) m1 = rnd(-5, 5);
			while (m2 === 0 || m2 === m1) m2 = rnd(-5, 5);

			const n1 = ySol - m1 * xSol;
			const n2 = ySol - m2 * xSol;

			const yEq1 = eqFromY(m1, n1);
			const yEq2 = eqFromY(m2, n2);

			let f1 = randInt(0, presentationForms.length - 1);
			let f2 = randInt(0, presentationForms.length - 1);
			if (f1 === 0 && f2 === 0) {
				f2 = randInt(1, presentationForms.length - 1);
			}

			const displayEqA = presentationForms[f1](m1, n1);
			const displayEqB = presentationForms[f2](m2, n2);
			const displayEquations = Math.random() < 0.5
				? [displayEqA, displayEqB]
				: [displayEqB, displayEqA];

			textDisplay = `Löse das lineare Gleichungssystem. Du kannst Einsetzungs-, Gleichsetzungs- oder Additionsverfahren verwenden:<br>
			\\[ \\left| \\begin{aligned}
			${displayEquations[0]} \\\\
			${displayEquations[1]}
			\\end{aligned} \\right| \\]`;

			textPrint = `Löse das lineare Gleichungssystem (2 Gleichungen, 2 Variablen):<br>
			\\[ \\left| \\begin{aligned}
			${displayEquations[0]} \\\\
			${displayEquations[1]}
			\\end{aligned} \\right| \\]${space(2)}`;

			s = `\\[ \\begin{aligned}
			${yEq1} \\\\
			${yEq2} \\\\
			x = ${xSol}, \\quad y = ${ySol}
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

		case 'linear_function': {
			// Generiere eine zufällige lineare Funktion
			let m;
			let b = effectiveEasyMode ? randInt(-6, 6) / 2 : randInt(-8, 8) / 2;
			if (b >= 2) m = effectiveEasyMode ? randInt(-4, -2) / 2 : randInt(-6, -2) / 2;
			else if (b <= -2) m = effectiveEasyMode ? randInt(2, 4) / 2 : randInt(2, 6) / 2;
			else m = effectiveEasyMode ? randInt(-4, 4) / 2 : randInt(-6, 6) / 2;

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
			let displayData = effectiveEasyMode ? sortedData : data;

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
						loesung = effectiveEasyMode ?
						`${displayData.join(', ')}<br>Zentralwert (Median) = ${median}.` :
						`geordnete Liste: ${sortedData.join(', ')}<br>Zentralwert (Median) = ${median}`;
					} else {
						// Bei 6 Daten: Mittelwert aus dem 3. und 4. Wert
						let m1 = sortedData[2];
						let m2 = sortedData[3];
						let median = (m1 + m2) / 2;
						let medianStr = median.toString().replace('.', ',');
						
						loesung = effectiveEasyMode ?
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
			const einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			const rd = Math.random();

			// 1. Definition "schöner" Brüche (Zähler z, Nenner n)
			const fractions = [
				{ z: 2, n: 3 }, { z: 3, n: 4 }, { z: 2, n: 5 }, { z: 3, n: 5 }, { z: 4, n: 5 },
				{ z: 5, n: 6 }, { z: 3, n: 8 }, { z: 3, n: 10 }, { z: 7, n: 10 }, { z: 9, n: 10 }
			];
			
			// Wähle einen zufälligen Bruch aus dem Pool
			const frac = fractions[randInt(0, fractions.length - 1)];
			const z = frac.z;
			const n = frac.n;
			
			if (rd > 0.6) {
				// TYP 1: Anteil berechnen (Bruch von Ganzem)
				// Damit es glatt aufgeht, muss das Ganze ein Vielfaches des Nenners sein.
				const scale = Math.random() > 0.5 ? 10 : 1; // Sorgt manchmal für Hunderter/Zehner-Werte
				const multiplier = effectiveEasyMode ? rnd(2, 9) : rnd(3, 13);
				const normalFactor = effectiveEasyMode ? 1 : (randInt(10, 25) / 10);
				const G = n * multiplier * scale * normalFactor; // Das Ganze (Grundwert)
				const W = (G / n) * z;                           // Der Anteil

				textDisplay = `\\( \\frac{${z}}{${n}} \\) von ${dec1(G)} ${einheit} sind ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) von ${dec1(G)} ${einheit} sind ${dec2(W)} ${einheit}<br>
				\\((${dec1(G)} : ${n} \\cdot ${z} = ${dec2(W)})\\)`;

			} else if (rd > 0.3) {
				// TYP 2: Ganzes berechnen (Bruch sind Anteil von...)
				// Damit es glatt aufgeht, muss der Anteil ein Vielfaches des Zählers sein.
				const scale = Math.random() > 0.5 ? 10 : 1;
				const multiplier = effectiveEasyMode ? rnd(2, 9) : rnd(3, 13);
				const normalFactor = effectiveEasyMode ? 1 : (randInt(10, 25) / 10);
				const W = z * multiplier * scale * normalFactor; // Der Anteil
				const G = (W / z) * n;                            // Das Ganze
				
				textDisplay = `\\( \\frac{${z}}{${n}} \\) sind ${dec2(W)} ${einheit} von ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) sind ${dec2(W)} ${einheit} von ${dec2(G)} ${einheit}<br>
				\\((${dec2(W)} : ${z} \\cdot ${n} = ${dec2(G)})\\)`;

			} else {
				// TYP 3: Bruch berechnen (Anteil von Ganzem sind...)
				// Wir nehmen den generierten Bruch und erzeugen dazu passende glatte Werte.
				const multiplier = effectiveEasyMode ? rnd(2, 9) : rnd(3, 13);
				const normalFactor = effectiveEasyMode ? 1 : (randInt(10, 20) / 10);
				
				const W = z * multiplier * normalFactor;
				const G = n * multiplier * normalFactor;
				
				textDisplay = `${dec2(W)} ${einheit} von ${dec2(G)} ${einheit} sind ${blank(3)} (als gekürzter Bruch)`;
				s = `${dec2(W)} ${einheit} von ${dec2(G)} ${einheit} sind \\(\\dfrac{${dec2(W)}}{${dec2(G)}}\\)`;
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
			
			const de = (num) => dec2(num);

			let menge1 = randInt(3, 6);
			let menge2
			do {
				menge2 = menge1 + randInt(1, 6);
			} while (menge2 % menge1 === 0);
			let einzelwert;
			
			// Realistische Werte je nach Typ festlegen
			if (effectiveEasyMode) {
				if (sz.type === 'print') {
					einzelwert = randInt(5, 15); // 5 bis 15 Seiten pro Minute
				} else if (sz.type === 'job') {
					einzelwert = randInt(5, 9); // 5 € bis 9 € Stundenlohn
				} else {
					einzelwert = randInt(1, 6) * 0.5; // 0,50€ bis 3,00€ für Lebensmittel
				}
			} else {
				if (sz.type === 'print') {
					einzelwert = randInt(50, 200) / 10; // 5,0 bis 20,0 Seiten pro Minute
				} else if (sz.type === 'job') {
					einzelwert = randInt(50, 95) / 10; // 5,0€ bis 9,5€ Stundenlohn
				} else {
					einzelwert = randInt(2, 40) / 10; // 0,2€ bis 4,0€ für Lebensmittel
				}
			}

			const wert1 = Number((menge1 * einzelwert).toFixed(2));
			const wert2 = Number((menge2 * einzelwert).toFixed(2));

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
				if (effectiveEasyMode) {
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





