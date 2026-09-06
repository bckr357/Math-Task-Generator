// ============================================================
// AUFGABEN-KATEGORIEN & TYPEN-LABELS
// ============================================================

const fmt = formatUtils.fmt;
const comma = formatUtils.comma;
const formatDecimal = formatUtils.formatDecimal;
const formatFixedDecimal = formatUtils.formatFixedDecimal;
const formatByUnit = formatUtils.formatByUnit;
const formatPercent = formatUtils.formatPercent;

const taskCategories = {
	arithmetic: [],
	percent: [
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'units'
	],
	algebra: ['terme', 'equations', 'equations_adv', 'equations_system', 'formel_umstellen'],
	geometry: [
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'geometry_koerper_pyramide_easy', 'geometry_koerper_pyramide_normal',
		'geometry_koerper_kegel_easy', 'geometry_koerper_kegel_normal',
		'geometry_koerper_kugel_easy', 'geometry_koerper_kugel_normal',
		'winkel', 'schraegbild', 'kongruenz', 'trigonometrie_rechtwinklig', 'sinus_kosinus_satz'
	],
	functions: ['linear_function', 'funktionen_linear', 'funktionen_quadratisch'],
	statistics: ['statistik', 'wkt']
};

// Dichtewerte aus der Formelsammlung in g/cm^3
const bodyMaterialDensities = [
	{ name: 'Aluminium', rho: 2.7 },
	{ name: 'Blei', rho: 11.34 },
	{ name: 'Gold', rho: 19.3 },
	{ name: 'Kupfer', rho: 8.96 },
	{ name: 'Beton', rho: 2.3 },
	{ name: 'Eisen', rho: 7.86 },
	{ name: 'Silber', rho: 10.50 },
	{ name: 'Stahl', rho: 7.8 }
];

// Sichtbare Aufgabentypen je Klassenstufe (wird vom UI-Dropdown genutzt)
const taskTypesByGrade = {
	klasse5: [
		'units',
		'geometry', 'geometry_rechteck', 'geometry_dreieck', 'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal', 'winkel', 'schraegbild', 'statistik'
	],
	klasse6: [
		'units',
		'anteile_easy', 'anteile_normal', 'percent_easy', 'percent_normal',
		'geometry', 'geometry_rechteck', 'geometry_dreieck',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'winkel', 'schraegbild', 'statistik', 'wkt'
	],
	klasse7: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr',
		'terme', 'equations', 'equations_lin', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	],
	klasse8: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	],
	klasse9: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'geometry_koerper_pyramide_easy', 'geometry_koerper_pyramide_normal',
		'geometry_koerper_kegel_easy', 'geometry_koerper_kegel_normal',
		'geometry_koerper_kugel_easy', 'geometry_koerper_kugel_normal',
		'winkel', 'schraegbild', 'kongruenz', 'trigonometrie_rechtwinklig',
		'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	],
	klasse10: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'geometry_koerper_pyramide_easy', 'geometry_koerper_pyramide_normal',
		'geometry_koerper_kegel_easy', 'geometry_koerper_kegel_normal',
		'geometry_koerper_kugel_easy', 'geometry_koerper_kugel_normal',
		'winkel', 'schraegbild', 'kongruenz', 'trigonometrie_rechtwinklig', 'sinus_kosinus_satz',
		'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	]
};

/* TODO / Roadmap 
	{ name: 'Beton', rho: 2.3 },
	{ name: 'Eisen', rho: 7.86 },
	{ name: 'Silber', rho: 10.50 },
	{ name: 'Stahl', rho: 7.8 }
];

// Sichtbare Aufgabentypen je Klassenstufe (wird vom UI-Dropdown genutzt)
const taskTypesByGrade = {
	klasse5: [
		'units',
		'geometry', 'geometry_rechteck', 'geometry_dreieck', 'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal', 'winkel', 'schraegbild', 'statistik'
	],
	klasse6: [
		'units',
		'anteile_easy', 'anteile_normal', 'percent_easy', 'percent_normal',
		'geometry', 'geometry_rechteck', 'geometry_dreieck',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'winkel', 'schraegbild', 'statistik', 'wkt'
	],
	klasse7: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr',
		'terme', 'equations', 'equations_lin', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	],
	klasse8: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'winkel', 'schraegbild', 'kongruenz', 'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	],
	klasse9: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'geometry_koerper_pyramide_easy', 'geometry_koerper_pyramide_normal',
		'geometry_koerper_kegel_easy', 'geometry_koerper_kegel_normal',
		'geometry_koerper_kugel_easy', 'geometry_koerper_kugel_normal',
		'winkel', 'schraegbild', 'kongruenz', 'trigonometrie_rechtwinklig',
		'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
	],
	klasse10: [
		'units',
		'anteile_easy', 'anteile_normal',
		'prop_easy', 'prop_normal',
		'percent_easy', 'percent_normal',
		'pv_easy', 'pv_normal',
		'zinsrechnung_tr', 'zinseszins_tr', 'wirtschaftliches_rechnen_tr',
		'terme', 'equations', 'equations_adv', 'equations_lin', 'equations_system', 'formel_umstellen',
		'geometry',
		'geometry_rechteck', 'geometry_dreieck', 'geometry_parallelogramm', 'geometry_trapez', 'geometry_kreis', 'geometry_kreisring',
		'geometry_koerper_wuerfel_easy', 'geometry_koerper_wuerfel_normal',
		'geometry_koerper_quader_easy', 'geometry_koerper_quader_normal',
		'geometry_koerper_prisma_dreieck_easy', 'geometry_koerper_prisma_dreieck_normal',
		'geometry_koerper_zylinder_easy', 'geometry_koerper_zylinder_normal',
		'geometry_koerper_pyramide_easy', 'geometry_koerper_pyramide_normal',
		'geometry_koerper_kegel_easy', 'geometry_koerper_kegel_normal',
		'geometry_koerper_kugel_easy', 'geometry_koerper_kugel_normal',
		'winkel', 'schraegbild', 'kongruenz', 'trigonometrie_rechtwinklig', 'sinus_kosinus_satz',
		'statistik', 'wkt', 'linear_function', 'funktionen_linear', 'funktionen_quadratisch'
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
	['zinsrechnung_tr', 'Zinsrechnung (TR)', 'Kapital, Zinsen, Zinssatz und Laufzeit mit Taschenrechner berechnen'],
	['zinseszins_tr', 'Zinseszins (TR)', 'Zinseszinsaufgaben mit Endkapital, Anfangskapital und Zinssatz berechnen'],
	['wirtschaftliches_rechnen_tr', 'Wirtschaftliches Rechnen (TR)', 'Rabatt, Skonto, Mehrwertsteuer und Preisänderungen mit Taschenrechner berechnen'],

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
	['geometry_koerper_wuerfel_easy', 'Körper Würfel (easy)', 'Würfel: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_wuerfel_normal', 'Körper Würfel (normal)', 'Würfel: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['geometry_koerper_quader_easy', 'Körper Quader (easy)', 'Quader: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_quader_normal', 'Körper Quader (normal)', 'Quader: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['geometry_koerper_prisma_dreieck_easy', 'Körper Dreiecksprisma (easy)', 'Dreiecksprisma: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_prisma_dreieck_normal', 'Körper Dreiecksprisma (normal)', 'Dreiecksprisma: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['geometry_koerper_zylinder_easy', 'Körper Kreiszylinder (easy)', 'Kreiszylinder: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_zylinder_normal', 'Körper Kreiszylinder (normal)', 'Kreiszylinder: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['geometry_koerper_pyramide_easy', 'Körper Pyramide (easy)', 'Pyramide: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_pyramide_normal', 'Körper Pyramide (normal)', 'Pyramide: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['geometry_koerper_kegel_easy', 'Körper Kreiskegel (easy)', 'Kreiskegel: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_kegel_normal', 'Körper Kreiskegel (normal)', 'Kreiskegel: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['geometry_koerper_kugel_easy', 'Körper Kugel (easy)', 'Kugel: nur Volumen und Oberfläche berechnen'],
	['geometry_koerper_kugel_normal', 'Körper Kugel (normal)', 'Kugel: Volumen, Oberfläche, Masse und ggf. Formelumstellung'],
	['winkel', 'Winkel', 'Winkel zeichnen und berechnen'],
	['schraegbild', 'Schrägbilder', 'Schrägbilder von Körpern zeichnen'],
	['kongruenz', 'Kongruenzsätze', 'Dreiecke mit Kongruenzsätzen konstruieren'],
	['trigonometrie_rechtwinklig', 'Trigonometrie rechtwinklig', 'Seiten und Winkel im rechtwinkligen Dreieck mit Sinus, Kosinus und Tangens berechnen'],
	['sinus_kosinus_satz', 'Sinus- und Kosinussatz', 'Seiten und Winkel in beliebigen Dreiecken mit Sinus- und Kosinussatz berechnen'],

	// Funktionen, Statistik & Wahrscheinlichkeiten
	['wkt', 'Wahrscheinlichkeiten', 'Wahrscheinlichkeiten bestimmen'],
	['linear_function', 'Lineare Funktionen zeichnen', 'Lineare Funktionen grafisch darstellen'],
	['funktionen_linear', 'Lineare Funktionen berechnen', 'Funktionswerte, Argumente und Eigenschaften linearer Funktionen bestimmen'],
	['funktionen_quadratisch', 'Quadratische Funktionen berechnen', 'Funktionswerte, Argumente und Eigenschaften quadratischer Funktionen bestimmen'],
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

	const choose = (values) => values[randInt(0, values.length - 1)];
	const round2 = (value) => Math.round(value * 100) / 100;
	const num2 = (value) => formatDecimal(value, 2);
	const num1 = (value) => formatDecimal(value, 1);
	const formatMoney = (value) => `${formatFixedDecimal(value, 2)} €`;
	const toRadians = (degrees) => degrees * Math.PI / 180;
	const toDegrees = (radians) => radians * 180 / Math.PI;

	// Beispiel für die Nutzung von isEasyMode:
	// if (isEasyMode) { Z1 = rnd(2, 5); } else { Z1 = rnd(5, 20); }

	let v1, v2;
	let rd;
	switch (normalizedType) {

		case 'percent':
			let p;
			let pVal;
			const einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			rd = Math.random();
			if (rd > 0.5) {
				pVal = effectiveEasyMode ? rnd(2, 11) * 100 : randInt(250, 2800) / 10;
				p = [3, 4, 5, 6, 7, 8, 9, 11, 12, 20, 25, 30, 35, 40, 60, 70, 80, 90][randInt(0, 17)];
				textDisplay = `${p} % von ${formatByUnit(pVal, einheit, 1)} ${einheit} sind ${blank(3)}`;
				s = `100 % ≙ ${formatByUnit(pVal, einheit, 1)} ${einheit}<br>1 % ≙ ${formatByUnit(pVal / 100, einheit, 2)} ${einheit}<br>${p} % ≙ <b>${formatByUnit((pVal / 100) * p, einheit, 2)} ${einheit}</b>`;
			} else if (rd > 0.3) {
				p = [20, 25, 30, 40, 50, 60, 70, 80, 90][randInt(0, 8)];
				if (effectiveEasyMode) {
					pVal = rnd(2, 9) * p;
				} else {
					const baseValue = randInt(200, 4000) / 10;
					pVal = (baseValue * p) / 100;
				}
				textDisplay = `${p} % sind ${formatByUnit(pVal, einheit, 2)} ${einheit} von ${blank(3)}`;
				s = `${p} % ≙ ${formatByUnit(pVal, einheit, 2)} ${einheit}<br>1 % ≙ ${formatByUnit(pVal / p, einheit, 2)} ${einheit}<br>100 % ≙ <b>${formatByUnit((pVal / p) * 100, einheit, 2)} ${einheit}</b>`;
			} else {
				const pList = effectiveEasyMode ? [2, 3, 5, 10, 20, 25, 50, 75, 80, 90] : [2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 80, 90, 95];
				const p = pList[randInt(0, pList.length - 1)];
				const G = effectiveEasyMode ? (rnd(2, 15) * 10) : (randInt(200, 4500) / 10);
				const W = (G * p) / 100;
				textDisplay = `${formatByUnit(W, einheit, 2)} ${einheit} von ${formatByUnit(G, einheit, 1)} ${einheit} sind ${blank(2)} %`;
				s = `100 % ≙ ${formatByUnit(G, einheit, 1)} ${einheit}<br>1 % ≙ ${formatByUnit(G / 100, einheit, 2)} ${einheit}<br><b>${p} %</b> ≙ ${formatByUnit(W, einheit, 2)} ${einheit}`;
			}
			break;

		case 'pv': {
			const einheit = ['€', 'm', 'kg', 't', 'g', 'm²', 'm³', 'ha', 's', 'h'][randInt(0, 9)];
			let p = [3, 4, 5, 6, 7, 10, 20, 25, 50][randInt(0, 8)];
			const pVal = effectiveEasyMode ? (rnd(2, 11) * 100) : (randInt(250, 3500) / 10);
			const pvType = randInt(0, 5); // 0: Erhöhung um p%, 1: Reduzierung um p%, 2: Erhöhung auf 100+p%, 3: Reduzierung auf 100-p%, 4: Rabatt-Fall 1, 5: Rabatt-Fall 2
			switch (pvType) {
				case 0: // Erhöhung um p%
					textDisplay = `${formatByUnit(pVal, einheit, 1)} ${einheit} um ${p} % erhöht sind ${blank(3)}`;
					s = `100 % ≙ ${formatByUnit(pVal, einheit, 1)} ${einheit}<br>1 % ≙ ${formatByUnit(pVal / 100, einheit, 2)} ${einheit}<br>${100 + p} % ≙ <b>${formatByUnit(pVal + ((pVal / 100) * p), einheit, 2)} ${einheit}</b>`;
					break;
				case 1: // Reduzierung um p%
					textDisplay = `${formatByUnit(pVal, einheit, 1)} ${einheit} um ${p} % reduziert sind ${blank(3)}`;
					s = `100 % ≙ ${formatByUnit(pVal, einheit, 1)} ${einheit}<br>1 % ≙ ${formatByUnit(pVal / 100, einheit, 2)} ${einheit}<br>${100 - p} % ≙ <b>${formatByUnit(pVal - ((pVal / 100) * p), einheit, 2)} ${einheit}</b>`;
					break;
				case 2: // Erhöhung auf 100+p%
					textDisplay = `${formatByUnit(pVal, einheit, 1)} ${einheit} auf ${100 + p} % erhöht sind ${blank(3)}`;
					s = `100 % ≙ ${formatByUnit(pVal, einheit, 1)} ${einheit}<br>1 % ≙ ${formatByUnit(pVal / 100, einheit, 2)} ${einheit}<br>${100 + p} % ≙ <b>${formatByUnit(pVal + ((pVal / 100) * p), einheit, 2)} ${einheit}</b>`;
					break;
				case 3: // Reduzierung auf 100-p%
					textDisplay = `${formatByUnit(pVal, einheit, 1)} ${einheit} auf ${100 - p} % reduziert sind ${blank(3)}`;
					s = `100 % ≙ ${formatByUnit(pVal, einheit, 1)} ${einheit}<br>1 % ≙ ${formatByUnit(pVal / 100, einheit, 2)} ${einheit}<br>${100 - p} % ≙ <b>${formatByUnit(pVal - ((pVal / 100) * p), einheit, 2)} ${einheit}</b>`;
					break;
				case 4: {// Rabatt-Fall 1
					p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
					const originalPrice = pVal;
					const discountedPrice = originalPrice - (originalPrice / 100 * p);
					textDisplay = `${p} % Rabatt auf ${formatFixedDecimal(originalPrice, 2)} €. Neuer Preis: ${blank(3)}`;
					s = `100 % ≙ ${formatFixedDecimal(originalPrice, 2)} €<br>1 % ≙ ${formatFixedDecimal(originalPrice / 100, 2)} €<br>${100 - p} % ≙ <b>${formatFixedDecimal(discountedPrice, 2)} €</b>`;
					break;
				}
				case 5: {// Rabatt-Fall 2
					p = [3, 4, 5, 6, 7, 10, 20, 25][randInt(0, 7)];
					const originalPrice = pVal;
					const discountedPrice = originalPrice - (originalPrice / 100 * p);
					textDisplay = `Preissenkung von ${formatFixedDecimal(originalPrice, 2)} € auf ${formatFixedDecimal(discountedPrice, 2)} €. Rabatt: ${blank(2)} %`;
					s = `100 % ≙ ${formatFixedDecimal(originalPrice, 2)} €<br>1 % ≙ ${formatFixedDecimal(originalPrice / 100, 2)} €<br><b>${p} %</b> ≙ ${formatFixedDecimal(originalPrice - discountedPrice, 2)} €`;
					break;
				}
			}
			break;
		}

		case 'zinsrechnung_tr': {
			const subType = randInt(0, 3);
			if (subType === 0) {
				const K = randInt(800, 6000) / 2;
				const p = choose([1.5, 1.8, 2.2, 2.5, 2.8, 3.2, 3.5, 3.8, 4.2, 4.5]);
				const t = choose([1, 2, 3, 4, 5]);
				const Z = round2(K * p / 100 * t);
				textDisplay = `Auf einem Konto liegen \\( K = ${formatMoney(K)} \\) zu \\( p = ${num2(p)} \\% \\) für \\( ${t} \\) Jahre.<br>Berechne die Zinsen \\(Z\\).`;
				textPrint = `Zinsrechnung: K = ${formatMoney(K)}, p = ${num2(p)} %, t = ${t} Jahre. Berechne Z.${space(1.8)}`;
				s = `\\[ \\begin{aligned}
				Z &= K \\cdot \\frac{p}{100} \\cdot t \\\\
				Z &= ${num2(K)} \\cdot \\frac{${num2(p)}}{100} \\cdot ${t} \\\\
				Z &= ${formatMoney(Z)}
				\\end{aligned} \\]`;
			} else if (subType === 1) {
				const K = randInt(1200, 9000) / 2;
				const p = choose([1.2, 1.5, 2.0, 2.4, 2.8, 3.0, 3.6, 4.0]);
				const months = choose([3, 6, 9, 12, 18, 24]);
				const t = months / 12;
				const Z = round2(K * p / 100 * t);
				textDisplay = `Ein Kapital von \\( K = ${formatMoney(K)} \\) ist für \\( ${months} \\) Monate zu \\( p = ${num2(p)} \\% \\) angelegt.<br>Berechne die Zinsen \\(Z\\).`;
				textPrint = `Zinsrechnung: K = ${formatMoney(K)}, p = ${num2(p)} %, Laufzeit ${months} Monate. Berechne Z.${space(1.8)}`;
				s = `\\[ \\begin{aligned}
				t &= ${months} : 12 = ${num2(t)} \\text{ Jahre} \\\\
				Z &= K \\cdot \\frac{p}{100} \\cdot t \\\\
				Z &= ${num2(K)} \\cdot \\frac{${num2(p)}}{100} \\cdot ${num2(t)} \\\\
				Z &= ${formatMoney(Z)}
				\\end{aligned} \\]`;
			} else if (subType === 2) {
				const K = randInt(1000, 8000) / 2;
				const p = choose([1.5, 2.0, 2.5, 3.0, 3.5, 4.0]);
				const t = choose([2, 3, 4, 5]);
				const Z = round2(K * p / 100 * t);
				textDisplay = `Gegeben sind \\( K = ${formatMoney(K)} \\), \\( Z = ${formatMoney(Z)} \\) und eine Laufzeit von \\( ${t} \\) Jahren.<br>Berechne den Zinssatz \\(p\\).`;
				textPrint = `Zinsrechnung: K = ${formatMoney(K)}, Z = ${formatMoney(Z)}, t = ${t} Jahre. Berechne p.${space(1.8)}`;
				s = `\\[ \\begin{aligned}
				Z &= K \\cdot \\frac{p}{100} \\cdot t \\\\
				p &= \\frac{100 \\cdot Z}{K \\cdot t} = \\frac{100 \\cdot ${num2(Z)}}{${num2(K)} \\cdot ${t}} = ${num2(p)} \\%
				\\end{aligned} \\]`;
			} else {
				const K = randInt(1200, 9000) / 2;
				const p = choose([1.5, 2.0, 2.4, 2.8, 3.2, 3.5]);
				const t = choose([1, 2, 3, 4]);
				const Z = round2(K * p / 100 * t);
				textDisplay = `Gegeben sind \\( K = ${formatMoney(K)} \\), \\( p = ${num2(p)} \\% \\) und \\( Z = ${formatMoney(Z)} \\).<br>Berechne die Laufzeit \\(t\\) in Jahren.`;
				textPrint = `Zinsrechnung: K = ${formatMoney(K)}, p = ${num2(p)} %, Z = ${formatMoney(Z)}. Berechne t.${space(1.8)}`;
				s = `\\[ \\begin{aligned}
				t &= \\frac{Z}{K \\cdot p/100} = \\frac{${num2(Z)}}{${num2(K)} \\cdot ${num2(p)}/100} = ${num2(t)} \\text{ Jahre}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'zinseszins_tr': {
			const subType = randInt(0, 2);
			if (subType === 0) {
				const K0 = randInt(800, 5000) / 2;
				const p = choose([1.5, 1.8, 2.2, 2.5, 2.8, 3.0, 3.5, 4.0]);
				const n = choose([2, 3, 4, 5, 6]);
				const q = 1 + p / 100;
				const Kn = round2(K0 * q ** n);
				textDisplay = `Ein Kapital von \\( K_0 = ${formatMoney(K0)} \\) wird \\( ${n} \\) Jahre lang zu \\( p = ${num2(p)} \\% \\) mit Zinseszins angelegt.<br>Berechne das Endkapital \\( K_n \\).`;
				textPrint = `Zinseszins: K0 = ${formatMoney(K0)}, p = ${num2(p)} %, n = ${n}. Berechne Kn.${space(2)}`;
				s = `\\[ \\begin{aligned}
				q &= 1 + \\frac{p}{100} = ${num2(q)} \\\\
				K_n &= K_0 \\cdot q^n = ${num2(K0)} \\cdot ${num2(q)}^{${n}} \\\\
				K_n &\\approx ${formatMoney(Kn)}
				\\end{aligned} \\]`;
			} else if (subType === 1) {
				const K0 = randInt(900, 4000) / 2;
				const p = choose([1.5, 2.0, 2.4, 2.8, 3.2, 3.6]);
				const n = choose([2, 3, 4, 5]);
				const q = 1 + p / 100;
				const Kn = round2(K0 * q ** n);
				textDisplay = `Nach \\( ${n} \\) Jahren beträgt das Endkapital \\( K_n = ${formatMoney(Kn)} \\).<br>Der Zinssatz lag bei \\( p = ${num2(p)} \\% \\). Berechne das Anfangskapital \\( K_0 \\).`;
				textPrint = `Zinseszins: Kn = ${formatMoney(Kn)}, p = ${num2(p)} %, n = ${n}. Berechne K0.${space(2)}`;
				s = `\\[ \\begin{aligned}
				q &= 1 + \\frac{${num2(p)}}{100} = ${num2(q)} \\\\
				K_0 &= \\frac{K_n}{q^n} = \\frac{${num2(Kn)}}{${num2(q)}^{${n}}} \\\\
				K_0 &\\approx ${formatMoney(K0)}
				\\end{aligned} \\]`;
			} else {
				const K0 = randInt(1000, 3500) / 2;
				const p = choose([1.5, 2.0, 2.5, 3.0, 3.5]);
				const n = choose([2, 3, 4, 5]);
				const q = 1 + p / 100;
				const Kn = round2(K0 * q ** n);
				textDisplay = `Ein Kapital wächst in \\( ${n} \\) Jahren von \\( ${formatMoney(K0)} \\) auf \\( ${formatMoney(Kn)} \\).<br>Berechne den jährlichen Zinssatz \\(p\\) beim Zinseszins.`;
				textPrint = `Zinseszins: K0 = ${formatMoney(K0)}, Kn = ${formatMoney(Kn)}, n = ${n}. Berechne p.${space(2)}`;
				s = `\\[ \\begin{aligned}
				q^n &= \\frac{K_n}{K_0} = \\frac{${num2(Kn)}}{${num2(K0)}} \\\\
				q &= \\sqrt[${n}]{\\frac{${num2(Kn)}}{${num2(K0)}}} = ${num2(q)} \\\\
				p &= (q - 1) \\cdot 100 = ${num2(p)} \\%
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'wirtschaftliches_rechnen_tr': {
			const subType = randInt(0, 2);
			if (subType === 0) {
				const original = randInt(3500, 18000) / 100;
				const rabatt = choose([10, 12, 15, 20, 25]);
				const mwst = choose([7, 19]);
				const nachRabatt = round2(original * (100 - rabatt) / 100);
				const endpreis = round2(nachRabatt * (100 + mwst) / 100);
				textDisplay = `Ein Artikel kostet netto \\( ${formatMoney(original)} \\).<br>Zuerst werden \\( ${rabatt} \\% \\) Rabatt gewährt, danach werden \\( ${mwst} \\% \\) Mehrwertsteuer berechnet.<br>Bestimme den Endpreis.`;
				textPrint = `Wirtschaftliches Rechnen: Netto ${formatMoney(original)}, ${rabatt}% Rabatt, ${mwst}% MwSt. Bestimme den Endpreis.${space(2)}`;
				s = `\\[ \\begin{aligned}
				P_1 &= ${num2(original)} \\cdot ${num2((100 - rabatt) / 100)} = ${formatMoney(nachRabatt)} \\\\
				P_2 &= ${num2(nachRabatt)} \\cdot ${num2((100 + mwst) / 100)} = ${formatMoney(endpreis)}
				\\end{aligned} \\]`;
			} else if (subType === 1) {
				const listenpreis = randInt(5000, 25000) / 100;
				const rabatt = choose([5, 8, 10, 12, 15]);
				const skonto = choose([2, 3]);
				const zielpreis = round2(listenpreis * (100 - rabatt) / 100);
				const barpreis = round2(zielpreis * (100 - skonto) / 100);
				textDisplay = `Ein Listenpreis beträgt \\( ${formatMoney(listenpreis)} \\).<br>Es gibt \\( ${rabatt} \\% \\) Rabatt und anschließend \\( ${skonto} \\% \\) Skonto.<br>Berechne den Barzahlungspreis.`;
				textPrint = `Wirtschaftliches Rechnen: Listenpreis ${formatMoney(listenpreis)}, ${rabatt}% Rabatt, ${skonto}% Skonto. Berechne den Barzahlungspreis.${space(2)}`;
				s = `\\[ \\begin{aligned}
				Z &= ${num2(listenpreis)} \\cdot ${num2((100 - rabatt) / 100)} = ${formatMoney(zielpreis)} \\\\
				B &= ${num2(zielpreis)} \\cdot ${num2((100 - skonto) / 100)} = ${formatMoney(barpreis)}
				\\end{aligned} \\]`;
			} else {
				const alterPreis = randInt(4000, 15000) / 100;
				const erhoehung = choose([4, 5, 6, 8, 10]);
				const senkung = choose([10, 12, 15, 20]);
				const zwischenpreis = round2(alterPreis * (100 + erhoehung) / 100);
				const endpreis = round2(zwischenpreis * (100 - senkung) / 100);
				textDisplay = `Ein Preis wird zuerst um \\( ${erhoehung} \\% \\) erhöht und danach um \\( ${senkung} \\% \\) gesenkt.<br>Der Anfangspreis beträgt \\( ${formatMoney(alterPreis)} \\). Berechne den Endpreis.`;
				textPrint = `Preisänderungen: Startpreis ${formatMoney(alterPreis)}, +${erhoehung}%, danach -${senkung}%. Berechne den Endpreis.${space(2)}`;
				s = `\\[ \\begin{aligned}
				P_1 &= ${num2(alterPreis)} \\cdot ${num2((100 + erhoehung) / 100)} = ${formatMoney(zwischenpreis)} \\\\
				P_2 &= ${num2(zwischenpreis)} \\cdot ${num2((100 - senkung) / 100)} = ${formatMoney(endpreis)}
				\\end{aligned} \\]`;
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
			const num1 = (val) => formatDecimal(val, 1);
			const num2 = (val) => formatDecimal(val, 2);
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

		case 'geometry_koerper_wuerfel': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;

			if (!isRearrange) {
				const a = pickInt(2, 8, 3, 14);
				const V = round2(a ** 3);
				const O = round2(6 * a * a);

				if (effectiveEasyMode) {
					textDisplay = `Ein Würfel hat die Kantenlänge \\( a = ${a} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Würfel: a = ${a} ${unitL}. Berechne V und O.${space(1.8)}`;
					s = `\\[ \\begin{aligned}
					V &= a^3 = ${a}^3 = ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 6a^2 = 6 \\cdot ${a}^2 = ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Ein Würfel hat die Kantenlänge \\( a = ${a} \\) ${unitL}.<br>Der Stoff ist ${material.name} mit \\( \\rho = ${num2(rho)} \\) g/cm³.<br>Berechne \\(V\\), \\(O\\) und die Masse \\(m\\).`;
					textPrint = `Würfel: a = ${a} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O und m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					V &= a^3 = ${a}^3 = ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 6a^2 = 6 \\cdot ${a}^2 = ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const a = pickInt(3, 12, 3, 12);
				const V = round2(a ** 3);
				const O = round2(6 * a * a);
				const m = round2(rho * V);

				textDisplay = `Ein Würfel aus ${material.name} hat das Volumen \\( V = ${num2(V)} \\) ${unitV}.<br>Gegeben ist \\( \\rho = ${num2(rho)} \\) g/cm³. Bestimme zuerst die Kantenlänge \\(a\\), danach \\(O\\) und \\(m\\).`;
				textPrint = `Würfel (Umstellen): V = ${num2(V)} ${unitV}, rho = ${num2(rho)} g/cm^3. Bestimme a, dann O und m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				V &= a^3 \\\\
				${num2(V)} &= a^3 \\quad |\\sqrt[3]{\\phantom{0}} \\\\
				a &= ${num2(a)} \\text{ ${unitL}} \\\\
				O &= 6a^2 = 6 \\cdot ${num2(a)}^2 = ${num2(O)} \\text{ ${unitO}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'geometry_koerper_quader': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;

			if (!isRearrange) {
				const a = pickInt(2, 8, 3, 14);
				const b = pickInt(2, 8, 3, 12);
				const c = pickInt(2, 8, 3, 10);
				const V = round2(a * b * c);
				const O = round2(2 * (a * b + a * c + b * c));

				if (effectiveEasyMode) {
					textDisplay = `Ein Quader hat \\( a = ${a} \\) ${unitL}, \\( b = ${b} \\) ${unitL}, \\( c = ${c} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Quader: a = ${a} ${unitL}, b = ${b} ${unitL}, c = ${c} ${unitL}. Berechne V und O.${space(1.8)}`;
					s = `\\[ \\begin{aligned}
					V &= a \\cdot b \\cdot c = ${a} \\cdot ${b} \\cdot ${c} = ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 2(ab+ac+bc) = 2(${a}\\cdot${b} + ${a}\\cdot${c} + ${b}\\cdot${c}) = ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Ein Quader hat \\( a = ${a} \\) ${unitL}, \\( b = ${b} \\) ${unitL}, \\( c = ${c} \\) ${unitL}.<br>Der Stoff ist ${material.name} mit \\( \\rho = ${num2(rho)} \\) g/cm³.<br>Berechne \\(V\\), \\(O\\) und \\(m\\).`;
					textPrint = `Quader: a = ${a}, b = ${b}, c = ${c} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					V &= a \\cdot b \\cdot c = ${a} \\cdot ${b} \\cdot ${c} = ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 2(ab+ac+bc) = 2(${a}\\cdot${b} + ${a}\\cdot${c} + ${b}\\cdot${c}) = ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const a = pickInt(3, 10, 3, 10);
				const b = pickInt(3, 10, 3, 10);
				const c = pickInt(2, 9, 2, 9);
				const V = round2(a * b * c);
				const O = round2(2 * (a * b + a * c + b * c));
				const m = round2(rho * V);

				textDisplay = `Ein Quader aus ${material.name} hat \\( V = ${num2(V)} \\) ${unitV}, \\( a = ${a} \\) ${unitL} und \\( b = ${b} \\) ${unitL}.<br>Bestimme zuerst \\(c\\), dann \\(O\\) und \\(m\\). Gegeben: \\( \\rho = ${num2(rho)} \\) g/cm³.`;
				textPrint = `Quader (Umstellen): V = ${num2(V)} ${unitV}, a = ${a} ${unitL}, b = ${b} ${unitL}, rho = ${num2(rho)} g/cm^3. Bestimme c, O, m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				V &= a \\cdot b \\cdot c \\\\
				${num2(V)} &= ${a} \\cdot ${b} \\cdot c \\quad | :(${a}\\cdot${b}) \\\\
				c &= ${num2(V)} : ${num2(a * b)} = ${num2(c)} \\text{ ${unitL}} \\\\
				O &= 2(ab+ac+bc) = ${num2(O)} \\text{ ${unitO}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'geometry_koerper_prisma_dreieck': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;
			const useHeightTask = !effectiveEasyMode && !isRearrange && Math.random() < 0.4;

			if (!isRearrange) {
				const g = pickInt(3, 10, 3, 12);
				const hG = pickInt(3, 9, 3, 11);
				const H = pickInt(3, 10, 4, 14);
				const G = round2(0.5 * g * hG);
				const c = round2(Math.sqrt(g * g + hG * hG));
				const uG = round2(g + hG + c);
				const V = round2(G * H);
				const O = round2(2 * G + uG * H);

				if (effectiveEasyMode) {
					textDisplay = `Ein Prisma hat ein rechtwinkliges Dreieck als Grundfläche mit \\( g = ${g} \\) ${unitL}, \\( h_g = ${hG} \\) ${unitL} und Höhe \\( H = ${H} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Dreiecksprisma: g = ${g} ${unitL}, h_g = ${hG} ${unitL}, H = ${H} ${unitL}. Berechne V und O.${space(2)}`;
					s = `\\[ \\begin{aligned}
					G &= \\frac{1}{2}gh_g = \\frac{1}{2} \\cdot ${g} \\cdot ${hG} = ${num2(G)} \\text{ ${unitO}} \\\\
					V &= G \\cdot H = ${num2(G)} \\cdot ${H} = ${num2(V)} \\text{ ${unitV}} \\\\
					c &= \\sqrt{g^2+h_g^2} = \\sqrt{${g}^2+${hG}^2} = ${num2(c)} \\text{ ${unitL}} \\\\
					u_G &= g+h_g+c = ${g}+${hG}+${num2(c)} = ${num2(uG)} \\text{ ${unitL}} \\\\
					O &= 2G + u_G \\cdot H = 2 \\cdot ${num2(G)} + ${num2(uG)} \\cdot ${H} = ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else if (useHeightTask) {
					const g2 = pickInt(3, 8, 3, 8);
					const hG2 = pickInt(3, 8, 3, 8);
					const H2 = pickInt(4, 10, 4, 12);
					const c2 = round2(Math.sqrt(g2 * g2 + hG2 * hG2));
					const G2 = round2(0.5 * g2 * hG2);
					const uG2 = round2(g2 + hG2 + c2);
					const V2 = round2(G2 * H2);
					const O2 = round2(2 * G2 + uG2 * H2);
					const m2 = round2(rho * V2);
					textDisplay = `Ein Dreiecksprisma hat ein rechtwinkliges Grunddreieck mit Grundseite \\( g = ${g2} \\) ${unitL}, Hypotenuse \\( c = ${num2(c2)} \\) ${unitL} und Prismahöhe \\( H = ${H2} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Bestimme zuerst \\( h_g \\), danach \\(V\\), \\(O\\) und \\(m\\).`;
					textPrint = `Dreiecksprisma: g = ${g2}, c = ${num2(c2)}, H = ${H2} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Bestimme h_g, V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					h_g &= \\sqrt{c^2-g^2} = \\sqrt{${num2(c2)}^2-${g2}^2} = ${num2(hG2)} \\text{ ${unitL}} \\\\
					G &= \\frac{1}{2}gh_g = \\frac{1}{2} \\cdot ${g2} \\cdot ${num2(hG2)} = ${num2(G2)} \\text{ ${unitO}} \\\\
					V &= G \\cdot H = ${num2(G2)} \\cdot ${H2} = ${num2(V2)} \\text{ ${unitV}} \\\\
					u_G &= ${g2} + ${num2(hG2)} + ${num2(c2)} = ${num2(uG2)} \\text{ ${unitL}} \\\\
					O &= 2G + u_G \\cdot H = ${num2(O2)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V2)} = ${num2(m2)} \\text{ g}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Ein Dreiecksprisma hat ein rechtwinkliges Grunddreieck mit \\( g = ${g} \\) ${unitL}, \\( h_g = ${hG} \\) ${unitL} und Prismahöhe \\( H = ${H} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Berechne \\(V\\), \\(O\\), \\(m\\).`;
					textPrint = `Dreiecksprisma: g = ${g}, h_g = ${hG}, H = ${H} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					G &= \\frac{1}{2}gh_g = ${num2(G)} \\text{ ${unitO}} \\\\
					V &= G \\cdot H = ${num2(G)} \\cdot ${H} = ${num2(V)} \\text{ ${unitV}} \\\\
					c &= \\sqrt{g^2+h_g^2} = ${num2(c)} \\text{ ${unitL}} \\\\
					u_G &= ${num2(uG)} \\text{ ${unitL}} \\\\
					O &= 2G + u_G \\cdot H = ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const g = pickInt(3, 10, 3, 10);
				const hG = pickInt(3, 9, 3, 9);
				const H = pickInt(4, 12, 4, 12);
				const G = round2(0.5 * g * hG);
				const V = round2(G * H);
				const c = round2(Math.sqrt(g * g + hG * hG));
				const uG = round2(g + hG + c);
				const O = round2(2 * G + uG * H);
				const m = round2(rho * V);

				textDisplay = `Ein Dreiecksprisma aus ${material.name} hat \\( V = ${num2(V)} \\) ${unitV}, \\( h_g = ${hG} \\) ${unitL} und \\( H = ${H} \\) ${unitL}.<br>Bestimme zuerst die Grundseite \\(g\\), danach \\(O\\) und \\(m\\). Gegeben: \\( \\rho = ${num2(rho)} \\) g/cm³.`;
				textPrint = `Dreiecksprisma (Umstellen): V = ${num2(V)} ${unitV}, h_g = ${hG} ${unitL}, H = ${H} ${unitL}, rho = ${num2(rho)} g/cm^3. Bestimme g, O, m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				V &= \\frac{1}{2} g h_g H \\\\
				${num2(V)} &= \\frac{1}{2} \\cdot g \\cdot ${hG} \\cdot ${H} \\quad | \\cdot 2 \\\\
				${num2(2 * V)} &= g \\cdot ${num2(hG * H)} \\quad | :${num2(hG * H)} \\\\
				g &= ${num2(g)} \\text{ ${unitL}} \\\\
				c &= \\sqrt{g^2+h_g^2} = ${num2(c)} \\text{ ${unitL}} \\\\
				u_G &= ${num2(g)} + ${num2(hG)} + ${num2(c)} = ${num2(uG)} \\text{ ${unitL}} \\\\
				O &= 2G + u_G \\cdot H = ${num2(O)} \\text{ ${unitO}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'geometry_koerper_zylinder': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;
			const useHeightTask = !effectiveEasyMode && !isRearrange && Math.random() < 0.4;

			if (!isRearrange) {
				const r = pickInt(2, 7, 2, 11);
				const h = pickInt(3, 10, 3, 14);
				const V = round2(Math.PI * r * r * h);
				const O = round2(2 * Math.PI * r * (r + h));

				if (effectiveEasyMode) {
					textDisplay = `Ein Kreiszylinder hat Radius \\( r = ${r} \\) ${unitL} und Höhe \\( h = ${h} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Kreiszylinder: r = ${r} ${unitL}, h = ${h} ${unitL}. Berechne V und O.${space(1.8)}`;
					s = `\\[ \\begin{aligned}
					V &= \\pi r^2 h = \\pi \\cdot ${r}^2 \\cdot ${h} \\approx ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 2\\pi r(r+h) = 2\\pi \\cdot ${r} \\cdot (${r}+${h}) \\approx ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else if (useHeightTask) {
					const r2 = pickInt(2, 8, 2, 8);
					const h2 = pickInt(4, 12, 4, 12);
					const d2 = round2(Math.sqrt((2 * r2) ** 2 + h2 ** 2));
					const V2 = round2(Math.PI * r2 * r2 * h2);
					const O2 = round2(2 * Math.PI * r2 * (r2 + h2));
					const m2 = round2(rho * V2);
					textDisplay = `Ein Kreiszylinder hat Radius \\( r = ${r2} \\) ${unitL}. Die Diagonale des Axialschnitts beträgt \\( d = ${num2(d2)} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Bestimme zuerst die Höhe \\(h\\), danach \\(V\\), \\(O\\) und \\(m\\).`;
					textPrint = `Kreiszylinder: r = ${r2} ${unitL}, Diagonale d = ${num2(d2)} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Bestimme h, V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					h &= \\sqrt{d^2-(2r)^2} = \\sqrt{${num2(d2)}^2-${2 * r2}^2} = ${num2(h2)} \\text{ ${unitL}} \\\\
					V &= \\pi r^2 h = \\pi \\cdot ${r2}^2 \\cdot ${num2(h2)} \\approx ${num2(V2)} \\text{ ${unitV}} \\\\
					O &= 2\\pi r(r+h) = 2\\pi \\cdot ${r2} \\cdot (${r2}+${num2(h2)}) \\approx ${num2(O2)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V2)} = ${num2(m2)} \\text{ g}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Ein Kreiszylinder hat \\( r = ${r} \\) ${unitL}, \\( h = ${h} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Berechne \\(V\\), \\(O\\), \\(m\\).`;
					textPrint = `Kreiszylinder: r = ${r} ${unitL}, h = ${h} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					V &= \\pi r^2 h = \\pi \\cdot ${r}^2 \\cdot ${h} \\approx ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 2\\pi r(r+h) = 2\\pi \\cdot ${r} \\cdot (${r}+${h}) \\approx ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const r = pickInt(2, 9, 2, 9);
				const h = pickInt(3, 12, 3, 12);
				const vPiFactor = r * r * h;
				const V = round2(Math.PI * vPiFactor);
				const O = round2(2 * Math.PI * r * (r + h));
				const m = round2(rho * V);

				textDisplay = `Ein Kreiszylinder aus ${material.name} hat \\( V = ${vPiFactor}\\pi \\) ${unitV} und Radius \\( r = ${r} \\) ${unitL}.<br>Bestimme zuerst die Höhe \\(h\\), danach \\(O\\) und \\(m\\). Gegeben: \\( \\rho = ${num2(rho)} \\) g/cm³.`;
				textPrint = `Kreiszylinder (Umstellen): V = ${vPiFactor}pi ${unitV}, r = ${r} ${unitL}, rho = ${num2(rho)} g/cm^3. Bestimme h, O, m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				V &= \\pi r^2 h \\\\
				${vPiFactor}\\pi &= \\pi \\cdot ${r}^2 \\cdot h \\quad | :\\pi \\\\
				${vPiFactor} &= ${r * r} \\cdot h \\quad | :${r * r} \\\\
				h &= ${num2(h)} \\text{ ${unitL}} \\\\
				O &= 2\\pi r(r+h) = 2\\pi \\cdot ${r} \\cdot (${r}+${num2(h)}) \\approx ${num2(O)} \\text{ ${unitO}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'geometry_koerper_pyramide': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;
			const useHeightTask = !effectiveEasyMode && !isRearrange && Math.random() < 0.45;

			if (!isRearrange) {
				const a = pickInt(3, 8, 3, 10);
				const h = 3 * pickInt(1, 3, 1, 4);
				const G = round2(a * a);
				const V = round2((G * h) / 3);
				const sMantel = round2(Math.sqrt((a / 2) ** 2 + h ** 2));
				const O = round2(G + 2 * a * sMantel);

				if (effectiveEasyMode) {
					textDisplay = `Eine regelmäßige quadratische Pyramide hat \\( a = ${a} \\) ${unitL} und Höhe \\( h = ${h} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Pyramide: a = ${a} ${unitL}, h = ${h} ${unitL}. Berechne V und O.${space(2)}`;
					s = `\\[ \\begin{aligned}
					G &= a^2 = ${a}^2 = ${num2(G)} \\text{ ${unitO}} \\\\
					V &= \\frac{1}{3} G h = \\frac{1}{3} \\cdot ${num2(G)} \\cdot ${h} = ${num2(V)} \\text{ ${unitV}} \\\\
					s &= \\sqrt{(a/2)^2+h^2} = \\sqrt{(${a}/2)^2+${h}^2} = ${num2(sMantel)} \\text{ ${unitL}} \\\\
					O &= G + 2as = ${num2(G)} + 2 \\cdot ${a} \\cdot ${num2(sMantel)} = ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else if (useHeightTask) {
					const a2 = pickInt(3, 8, 3, 8);
					const h2 = 3 * pickInt(1, 3, 1, 3);
					const s2 = round2(Math.sqrt((a2 / 2) ** 2 + h2 ** 2));
					const G2 = round2(a2 * a2);
					const V2 = round2((G2 * h2) / 3);
					const O2 = round2(G2 + 2 * a2 * s2);
					const m2 = round2(rho * V2);
					textDisplay = `Eine quadratische Pyramide hat Grundkante \\( a = ${a2} \\) ${unitL} und Seitenhöhe \\( s = ${num2(s2)} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Bestimme zuerst die Körperhöhe \\(h\\), danach \\(V\\), \\(O\\) und \\(m\\).`;
					textPrint = `Pyramide: a = ${a2} ${unitL}, Seitenhöhe s = ${num2(s2)} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Bestimme h, V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					h &= \\sqrt{s^2-(a/2)^2} = \\sqrt{${num2(s2)}^2-(${a2}/2)^2} = ${num2(h2)} \\text{ ${unitL}} \\\\
					G &= a^2 = ${a2}^2 = ${num2(G2)} \\text{ ${unitO}} \\\\
					V &= \\frac{1}{3}Gh = \\frac{1}{3} \\cdot ${num2(G2)} \\cdot ${num2(h2)} = ${num2(V2)} \\text{ ${unitV}} \\\\
					O &= G + 2as = ${num2(G2)} + 2 \\cdot ${a2} \\cdot ${num2(s2)} = ${num2(O2)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V2)} = ${num2(m2)} \\text{ g}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Eine quadratische Pyramide hat \\( a = ${a} \\) ${unitL}, \\( h = ${h} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Berechne \\(V\\), \\(O\\), \\(m\\).`;
					textPrint = `Pyramide: a = ${a} ${unitL}, h = ${h} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					G &= a^2 = ${num2(G)} \\text{ ${unitO}} \\\\
					V &= \\frac{1}{3}Gh = ${num2(V)} \\text{ ${unitV}} \\\\
					s &= \\sqrt{(a/2)^2+h^2} = ${num2(sMantel)} \\text{ ${unitL}} \\\\
					O &= G + 2as = ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const a = pickInt(3, 9, 3, 9);
				const h = 3 * pickInt(1, 4, 1, 4);
				const G = round2(a * a);
				const V = round2((G * h) / 3);
				const sMantel = round2(Math.sqrt((a / 2) ** 2 + h ** 2));
				const O = round2(G + 2 * a * sMantel);
				const m = round2(rho * V);

				textDisplay = `Eine quadratische Pyramide aus ${material.name} hat \\( V = ${num2(V)} \\) ${unitV} und Grundkante \\( a = ${a} \\) ${unitL}.<br>Bestimme zuerst die Höhe \\(h\\), danach \\(O\\) und \\(m\\). Gegeben: \\( \\rho = ${num2(rho)} \\) g/cm³.`;
				textPrint = `Pyramide (Umstellen): V = ${num2(V)} ${unitV}, a = ${a} ${unitL}, rho = ${num2(rho)} g/cm^3. Bestimme h, O, m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				V &= \\frac{1}{3}a^2h \\\\
				${num2(V)} &= \\frac{1}{3} \\cdot ${a}^2 \\cdot h \\quad | \\cdot 3 \\\\
				${num2(3 * V)} &= ${a * a} \\cdot h \\quad | :${a * a} \\\\
				h &= ${num2(h)} \\text{ ${unitL}} \\\\
				s &= \\sqrt{(a/2)^2+h^2} = \\sqrt{(${a}/2)^2+${num2(h)}^2} = ${num2(sMantel)} \\text{ ${unitL}} \\\\
				O &= a^2 + 2as = ${num2(O)} \\text{ ${unitO}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'geometry_koerper_kegel': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;
			const useHeightTask = !effectiveEasyMode && !isRearrange && Math.random() < 0.45;

			if (!isRearrange) {
				const r = pickInt(2, 7, 2, 10);
				const h = 3 * pickInt(1, 3, 1, 4);
				const sMantel = round2(Math.sqrt(r * r + h * h));
				const V = round2((Math.PI * r * r * h) / 3);
				const O = round2(Math.PI * r * (r + sMantel));

				if (effectiveEasyMode) {
					textDisplay = `Ein Kreiskegel hat Radius \\( r = ${r} \\) ${unitL} und Höhe \\( h = ${h} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Kreiskegel: r = ${r} ${unitL}, h = ${h} ${unitL}. Berechne V und O.${space(2)}`;
					s = `\\[ \\begin{aligned}
					s &= \\sqrt{r^2+h^2} = \\sqrt{${r}^2+${h}^2} = ${num2(sMantel)} \\text{ ${unitL}} \\\\
					V &= \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ${r}^2 \\cdot ${h} \\approx ${num2(V)} \\text{ ${unitV}} \\\\
					O &= \\pi r(r+s) = \\pi \\cdot ${r} \\cdot (${r}+${num2(sMantel)}) \\approx ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else if (useHeightTask) {
					const r2 = pickInt(2, 7, 2, 7);
					const h2 = 3 * pickInt(1, 3, 1, 3);
					const s2 = round2(Math.sqrt(r2 * r2 + h2 * h2));
					const V2 = round2((Math.PI * r2 * r2 * h2) / 3);
					const O2 = round2(Math.PI * r2 * (r2 + s2));
					const m2 = round2(rho * V2);
					textDisplay = `Ein Kreiskegel hat Radius \\( r = ${r2} \\) ${unitL} und Mantellinie \\( s = ${num2(s2)} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Bestimme zuerst die Höhe \\(h\\), danach \\(V\\), \\(O\\) und \\(m\\).`;
					textPrint = `Kreiskegel: r = ${r2} ${unitL}, Mantellinie s = ${num2(s2)} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Bestimme h, V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					h &= \\sqrt{s^2-r^2} = \\sqrt{${num2(s2)}^2-${r2}^2} = ${num2(h2)} \\text{ ${unitL}} \\\\
					V &= \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ${r2}^2 \\cdot ${num2(h2)} \\approx ${num2(V2)} \\text{ ${unitV}} \\\\
					O &= \\pi r(r+s) = \\pi \\cdot ${r2} \\cdot (${r2}+${num2(s2)}) \\approx ${num2(O2)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V2)} = ${num2(m2)} \\text{ g}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Ein Kreiskegel hat \\( r = ${r} \\) ${unitL}, \\( h = ${h} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Berechne \\(V\\), \\(O\\), \\(m\\).`;
					textPrint = `Kreiskegel: r = ${r} ${unitL}, h = ${h} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					s &= \\sqrt{r^2+h^2} = ${num2(sMantel)} \\text{ ${unitL}} \\\\
					V &= \\frac{1}{3}\\pi r^2 h \\approx ${num2(V)} \\text{ ${unitV}} \\\\
					O &= \\pi r(r+s) \\approx ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const r = pickInt(2, 8, 2, 8);
				const h = 3 * pickInt(1, 4, 1, 4);
				const vPiFactor = round2((r * r * h) / 3);
				const sMantel = round2(Math.sqrt(r * r + h * h));
				const V = round2(Math.PI * vPiFactor);
				const O = round2(Math.PI * r * (r + sMantel));
				const m = round2(rho * V);

				textDisplay = `Ein Kreiskegel aus ${material.name} hat \\( V = ${num2(vPiFactor)}\\pi \\) ${unitV} und Radius \\( r = ${r} \\) ${unitL}.<br>Bestimme zuerst die Höhe \\(h\\), danach \\(O\\) und \\(m\\). Gegeben: \\( \\rho = ${num2(rho)} \\) g/cm³.`;
				textPrint = `Kreiskegel (Umstellen): V = ${num2(vPiFactor)}pi ${unitV}, r = ${r} ${unitL}, rho = ${num2(rho)} g/cm^3. Bestimme h, O, m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				V &= \\frac{1}{3}\\pi r^2 h \\\\
				${num2(vPiFactor)}\\pi &= \\frac{1}{3}\\pi \\cdot ${r}^2 \\cdot h \\quad | \\cdot 3 : \\pi \\\\
				${num2(3 * vPiFactor)} &= ${r * r} \\cdot h \\quad | :${r * r} \\\\
				h &= ${num2(h)} \\text{ ${unitL}} \\\\
				s &= \\sqrt{r^2+h^2} = ${num2(sMantel)} \\text{ ${unitL}} \\\\
				O &= \\pi r(r+s) \\approx ${num2(O)} \\text{ ${unitO}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'geometry_koerper_kugel': {
			const unitL = 'cm';
			const unitV = 'cm^3';
			const unitO = 'cm^2';
			const round2 = (val) => Math.round(val * 100) / 100;
			const num2 = (val) => formatDecimal(val, 2);
			const pickInt = (easyMin, easyMax, normalMin, normalMax) => randInt(effectiveEasyMode ? easyMin : normalMin, effectiveEasyMode ? easyMax : normalMax);
			const material = bodyMaterialDensities[randInt(0, bodyMaterialDensities.length - 1)];
			const rho = material.rho;
			const isRearrange = !effectiveEasyMode && Math.random() < 0.5;

			if (!isRearrange) {
				const r = pickInt(2, 8, 2, 10);
				const V = round2((4 / 3) * Math.PI * r ** 3);
				const O = round2(4 * Math.PI * r * r);

				if (effectiveEasyMode) {
					textDisplay = `Eine Kugel hat Radius \\( r = ${r} \\) ${unitL}.<br>Berechne Volumen \\(V\\) und Oberfläche \\(O\\).`;
					textPrint = `Kugel: r = ${r} ${unitL}. Berechne V und O.${space(1.8)}`;
					s = `\\[ \\begin{aligned}
					V &= \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot ${r}^3 \\approx ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 4\\pi r^2 = 4\\pi \\cdot ${r}^2 \\approx ${num2(O)} \\text{ ${unitO}}
					\\end{aligned} \\]`;
				} else {
					const m = round2(rho * V);
					textDisplay = `Eine Kugel hat Radius \\( r = ${r} \\) ${unitL}.<br>Stoff: ${material.name}, \\( \\rho = ${num2(rho)} \\) g/cm³. Berechne \\(V\\), \\(O\\), \\(m\\).`;
					textPrint = `Kugel: r = ${r} ${unitL}, Stoff: ${material.name}, rho = ${num2(rho)} g/cm^3. Berechne V, O, m.${space(2)}`;
					s = `\\[ \\begin{aligned}
					V &= \\frac{4}{3}\\pi r^3 \\approx ${num2(V)} \\text{ ${unitV}} \\\\
					O &= 4\\pi r^2 \\approx ${num2(O)} \\text{ ${unitO}} \\\\
					m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
					\\end{aligned} \\]`;
				}
			} else {
				const r = pickInt(2, 9, 2, 9);
				const O = round2(4 * Math.PI * r * r);
				const V = round2((4 / 3) * Math.PI * r ** 3);
				const m = round2(rho * V);

				textDisplay = `Eine Kugel aus ${material.name} hat die Oberfläche \\( O = ${num2(O)} \\) ${unitO}.<br>Bestimme zuerst den Radius \\(r\\), danach \\(V\\) und \\(m\\). Gegeben: \\( \\rho = ${num2(rho)} \\) g/cm³.`;
				textPrint = `Kugel (Umstellen): O = ${num2(O)} ${unitO}, rho = ${num2(rho)} g/cm^3. Bestimme r, V, m.${space(2)}`;
				s = `\\[ \\begin{aligned}
				O &= 4\\pi r^2 \\\\
				${num2(O)} &= 4\\pi r^2 \\quad | : (4\\pi) \\\\
				r^2 &= ${num2(round2(O / (4 * Math.PI)))} \\quad | \\sqrt{\\phantom{0}} \\\\
				r &= ${num2(r)} \\text{ ${unitL}} \\\\
				V &= \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot ${num2(r)}^3 \\approx ${num2(V)} \\text{ ${unitV}} \\\\
				m &= \\rho \\cdot V = ${num2(rho)} \\cdot ${num2(V)} = ${num2(m)} \\text{ g}
				\\end{aligned} \\]`;
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

			const formatHalf = (val) => Number.isInteger(val) ? `${val}` : formatFixedDecimal(val, 1);
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
					step1 = `${aTerm} ${cSigned} &= ${bTerm} &&| \\, : ${fmt(b_lin)}`;
					finalStep = `y &= ${formatLinearExpr(a_lin / b_lin, c_lin / b_lin)}`;
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

			const x0 = formatDecimal(xIntercept, 2);
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
				resStr = `h = \\( \\dfrac{${treffer}}{${gesamt}} \\) = ${formatFixedDecimal(prozent, 0)} %`;
				
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

		case 'trigonometrie_rechtwinklig': {
			const subType = randInt(0, 4);
			if (subType === 0) {
				const c = randInt(70, 180) / 10;
				const alpha = choose([24, 28, 32, 35, 41, 47, 53, 58, 64]);
				const a = round2(c * Math.sin(toRadians(alpha)));
				textDisplay = `Ein rechtwinkliges Dreieck hat Hypotenuse \\( c = ${num2(c)} \\) cm und Gegenkathete \\( a = ${num2(a)} \\) cm.<br>Berechne den Winkel \\( \\alpha \\).`;
				textPrint = `Rechtwinkliges Dreieck: c = ${num2(c)} cm, a = ${num2(a)} cm. Berechne alpha.${space(2)}`;
				s = `\\[ \\begin{aligned}
				\\sin(\\alpha) &= \\frac{a}{c} = \\frac{${num2(a)}}{${num2(c)}} \\\\
				\\alpha &= \\sin^{-1}\\left(\\frac{${num2(a)}}{${num2(c)}}\\right) \\approx ${num1(alpha)}^\\circ
				\\end{aligned} \\]`;
			} else if (subType === 1) {
				const c = randInt(80, 200) / 10;
				const alpha = choose([21, 27, 33, 39, 45, 52, 57, 63]);
				const b = round2(c * Math.cos(toRadians(alpha)));
				textDisplay = `Ein rechtwinkliges Dreieck hat Hypotenuse \\( c = ${num2(c)} \\) cm und Ankathete \\( b = ${num2(b)} \\) cm.<br>Berechne den Winkel \\( \\alpha \\).`;
				textPrint = `Rechtwinkliges Dreieck: c = ${num2(c)} cm, b = ${num2(b)} cm. Berechne alpha.${space(2)}`;
				s = `\\[ \\begin{aligned}
				\\cos(\\alpha) &= \\frac{b}{c} = \\frac{${num2(b)}}{${num2(c)}} \\\\
				\\alpha &= \\cos^{-1}\\left(\\frac{${num2(b)}}{${num2(c)}}\\right) \\approx ${num1(alpha)}^\\circ
				\\end{aligned} \\]`;
			} else if (subType === 2) {
				const b = randInt(60, 160) / 10;
				const alpha = choose([18, 24, 29, 34, 38, 43, 49, 56, 61]);
				const a = round2(b * Math.tan(toRadians(alpha)));
				textDisplay = `Ein rechtwinkliges Dreieck hat Ankathete \\( b = ${num2(b)} \\) cm und Gegenkathete \\( a = ${num2(a)} \\) cm.<br>Berechne den Winkel \\( \\alpha \\).`;
				textPrint = `Rechtwinkliges Dreieck: b = ${num2(b)} cm, a = ${num2(a)} cm. Berechne alpha.${space(2)}`;
				s = `\\[ \\begin{aligned}
				\\tan(\\alpha) &= \\frac{a}{b} = \\frac{${num2(a)}}{${num2(b)}} \\\\
				\\alpha &= \\tan^{-1}\\left(\\frac{${num2(a)}}{${num2(b)}}\\right) \\approx ${num1(alpha)}^\\circ
				\\end{aligned} \\]`;
			} else if (subType === 3) {
				const c = randInt(90, 220) / 10;
				const alpha = choose([24, 30, 36, 42, 48, 54, 60]);
				const a = round2(c * Math.sin(toRadians(alpha)));
				const b = round2(c * Math.cos(toRadians(alpha)));
				textDisplay = `Ein rechtwinkliges Dreieck hat Hypotenuse \\( c = ${num2(c)} \\) cm und Winkel \\( \\alpha = ${alpha}^\\circ \\).<br>Berechne Gegenkathete \\(a\\) und Ankathete \\(b\\).`;
				textPrint = `Rechtwinkliges Dreieck: c = ${num2(c)} cm, alpha = ${alpha}°. Berechne a und b.${space(2)}`;
				s = `\\[ \\begin{aligned}
				a &= c \\cdot \\sin(\\alpha) = ${num2(c)} \\cdot \\sin(${alpha}^\\circ) \\approx ${num2(a)} \\text{ cm} \\\\
				b &= c \\cdot \\cos(\\alpha) = ${num2(c)} \\cdot \\cos(${alpha}^\\circ) \\approx ${num2(b)} \\text{ cm}
				\\end{aligned} \\]`;
			} else {
				const b = randInt(70, 160) / 10;
				const alpha = choose([22, 27, 31, 37, 44, 51, 59]);
				const c = round2(b / Math.cos(toRadians(alpha)));
				const a = round2(b * Math.tan(toRadians(alpha)));
				textDisplay = `Ein rechtwinkliges Dreieck hat Ankathete \\( b = ${num2(b)} \\) cm und Winkel \\( \\alpha = ${alpha}^\\circ \\).<br>Berechne Hypotenuse \\(c\\) und Gegenkathete \\(a\\).`;
				textPrint = `Rechtwinkliges Dreieck: b = ${num2(b)} cm, alpha = ${alpha}°. Berechne c und a.${space(2)}`;
				s = `\\[ \\begin{aligned}
				c &= \\frac{b}{\\cos(\\alpha)} = \\frac{${num2(b)}}{\\cos(${alpha}^\\circ)} \\approx ${num2(c)} \\text{ cm} \\\\
				a &= b \\cdot \\tan(\\alpha) = ${num2(b)} \\cdot \\tan(${alpha}^\\circ) \\approx ${num2(a)} \\text{ cm}
				\\end{aligned} \\]`;
			}
			break;
		}

		case 'sinus_kosinus_satz': {
			const subType = randInt(0, 1);
			if (subType === 0) {
				const alpha = choose([32, 38, 44, 51, 57, 63]);
				const beta = choose([41, 47, 53, 58, 64, 69]);
				const gamma = 180 - alpha - beta;
				const a = randInt(70, 180) / 10;
				const b = round2(a * Math.sin(toRadians(beta)) / Math.sin(toRadians(alpha)));
				const c = round2(a * Math.sin(toRadians(gamma)) / Math.sin(toRadians(alpha)));
				textDisplay = `In einem Dreieck sind \\( a = ${num2(a)} \\) cm, \\( \\alpha = ${alpha}^\\circ \\) und \\( \\beta = ${beta}^\\circ \\) gegeben.<br>Berechne \\( \\gamma \\), \\(b\\) und \\(c\\) mit dem Sinussatz.`;
				textPrint = `Dreieck: a = ${num2(a)} cm, alpha = ${alpha}°, beta = ${beta}°. Berechne gamma, b und c.${space(2)}`;
				s = `\\[ \\begin{aligned}
				\\gamma &= 180^\\circ - ${alpha}^\\circ - ${beta}^\\circ = ${gamma}^\\circ \\\\
				\\frac{a}{\\sin(\\alpha)} &= \\frac{b}{\\sin(\\beta)} = \\frac{c}{\\sin(\\gamma)} \\\\
				b &= \\frac{a \\cdot \\sin(\\beta)}{\\sin(\\alpha)} = \\frac{${num2(a)} \\cdot \\sin(${beta}^\\circ)}{\\sin(${alpha}^\\circ)} \\approx ${num2(b)} \\text{ cm} \\\\
				c &= \\frac{a \\cdot \\sin(\\gamma)}{\\sin(\\alpha)} = \\frac{${num2(a)} \\cdot \\sin(${gamma}^\\circ)}{\\sin(${alpha}^\\circ)} \\approx ${num2(c)} \\text{ cm}
				\\end{aligned} \\]`;
			} else {
				const a = randInt(60, 140) / 10;
				const b = randInt(70, 160) / 10;
				const gamma = choose([38, 46, 54, 61, 68, 75]);
				const c = round2(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRadians(gamma))));
				const alpha = round2(toDegrees(Math.asin((a * Math.sin(toRadians(gamma))) / c)));
				const beta = round2(180 - gamma - alpha);
				textDisplay = `In einem Dreieck sind \\( a = ${num2(a)} \\) cm, \\( b = ${num2(b)} \\) cm und \\( \\gamma = ${gamma}^\\circ \\) gegeben.<br>Berechne zunächst \\(c\\) mit dem Kosinussatz und danach \\( \\alpha \\) und \\( \\beta \\).`;
				textPrint = `Dreieck: a = ${num2(a)} cm, b = ${num2(b)} cm, gamma = ${gamma}°. Berechne c, alpha und beta.${space(2)}`;
				s = `\\[ \\begin{aligned}
				c^2 &= a^2+b^2-2ab \\cos(\\gamma) \\\\
				c^2 &= ${num2(a)}^2+${num2(b)}^2-2 \\cdot ${num2(a)} \\cdot ${num2(b)} \\cdot \\cos(${gamma}^\\circ) \\\\
				c &\\approx ${num2(c)} \\text{ cm} \\\\
				\\frac{a}{\\sin(\\alpha)} &= \\frac{c}{\\sin(\\gamma)} \\\\
				\\alpha &= \\sin^{-1}\\left(\\frac{${num2(a)} \\cdot \\sin(${gamma}^\\circ)}{${num2(c)}}\\right) \\approx ${num2(alpha)}^\\circ \\\\
				\\beta &= 180^\\circ - ${gamma}^\\circ - ${num2(alpha)}^\\circ \\approx ${num2(beta)}^\\circ
				\\end{aligned} \\]`;
			}
			break;
		}

		// ── Lineare Funktionen ──────────────────────────────────────────────────
		case 'funktionen_linear': {
			const fmtFunctionNumber = (value) => comma(value);
			const choose = (values) => values[randInt(0, values.length - 1)];
			const appendConstant = (expr, value) => {
				if (value > 0) return `${expr} + ${fmtFunctionNumber(value)}`;
				if (value < 0) return `${expr} - ${fmtFunctionNumber(Math.abs(value))}`;
				return expr;
			};
			const oppositeOperation = (value) => value >= 0
				? `- ${fmtFunctionNumber(Math.abs(value))}`
				: `+ ${fmtFunctionNumber(Math.abs(value))}`;
			const buildLinearExpression = (slope, intercept) => {
				const mStr = slope === 1 ? '' : (slope === -1 ? '-' : fmtFunctionNumber(slope));
				return appendConstant(`${mStr}x`, intercept);
			};
			const buildValueTable = (calcF, isFilled, isCentered = true) => {
				const xValues = [-2, -1, 0, 1, 2];
				const xRow = xValues.map((x, idx) => `<td style="padding:6px 10px; text-align:center; min-width:40px; border-bottom:1px solid #333; ${idx < xValues.length - 1 ? 'border-right:1px solid #333;' : ''}">${fmtFunctionNumber(x)}</td>`).join('');
				const yRow = xValues.map((x, idx) => {
					const value = isFilled ? `${fmtFunctionNumber(calcF(x))}` : '&nbsp;';
					return `<td style="padding:6px 10px; text-align:center; min-width:34px; ${idx < xValues.length - 1 ? 'border-right:1px solid #333;' : ''}">${value}</td>`;
				}).join('');
				return `<table style="border-collapse:separate; border-spacing:0; margin:${isCentered ? '8px auto 0 auto' : '8px 0 0 0'};">` +
					`<tr><th style="padding:6px 10px; min-width:30px; font-weight:400; border-right:1px solid #333; border-bottom:1px solid #333;">x</th>${xRow}</tr>` +
					`<tr><th style="padding:6px 10px; min-width:30px; font-weight:400; border-right:1px solid #333;">y</th>${yRow}</tr>` +
				`</table>`;
			};
			const buildLinearFunction = () => {
				const slope = choose([-4, -3, -2, -1, 1, 2, 3, 4]);
				const root = randInt(-8, 8) / 2;
				const intercept = -slope * root;
				const exprStr = buildLinearExpression(slope, intercept);
				return {
					slope,
					intercept,
					root,
					exprStr,
					funcStr: `f(x) = ${exprStr}`,
					calcF: (x) => slope * x + intercept
				};
			};

			const subType = choose([0, 1, 2, 3, 4, 5]);
			let functionData = buildLinearFunction();
			let funcStr = functionData.funcStr;
			let calcF = functionData.calcF;
			let exprStr = functionData.exprStr;

			switch (subType) {
				case 0: {
					const xVal = randInt(-8, 8) / 2;
					textDisplay = `Berechne bei der Funktion \\( ${funcStr} \\) den Funktionswert zum Argument \\( ${fmtFunctionNumber(xVal)} \\).`;
					s = `\\( f(${fmtFunctionNumber(xVal)}) = ${exprStr.replace(/x/g, `(${fmtFunctionNumber(xVal)})`)} = ${fmtFunctionNumber(calcF(xVal))} \\)`;
					break;
				}
				case 1: {
					const targetX = randInt(-8, 8) / 2;
					const targetY = calcF(targetX);
					const lines = [];
					if (functionData.intercept !== 0) {
						lines.push(`${fmtFunctionNumber(targetY)} &= ${exprStr} &&| \\, ${oppositeOperation(functionData.intercept)}`);
						lines.push(`${fmtFunctionNumber(targetY - functionData.intercept)} &= ${functionData.slope === 1 ? '' : (functionData.slope === -1 ? '-' : fmtFunctionNumber(functionData.slope))}x &&| \\, : ${fmtFunctionNumber(functionData.slope)}`);
					} else {
						lines.push(`${fmtFunctionNumber(targetY)} &= ${functionData.slope === 1 ? '' : (functionData.slope === -1 ? '-' : fmtFunctionNumber(functionData.slope))}x &&| \\, : ${fmtFunctionNumber(functionData.slope)}`);
					}
					lines.push(`x &= ${fmtFunctionNumber(targetX)}`);
					textDisplay = `Berechne bei der Funktion \\( ${funcStr} \\) das Argument zum Funktionswert \\( ${fmtFunctionNumber(targetY)} \\).`;
					s = `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]`;
					break;
				}
				case 2: {
					functionData = buildLinearFunction();
					funcStr = functionData.funcStr;
					exprStr = functionData.exprStr;
					const lines = [];
					if (functionData.intercept !== 0) {
						lines.push(`${exprStr} &= 0 &&| \\, ${oppositeOperation(functionData.intercept)}`);
						lines.push(`${functionData.slope === 1 ? '' : (functionData.slope === -1 ? '-' : fmtFunctionNumber(functionData.slope))}x &= ${fmtFunctionNumber(-functionData.intercept)} &&| \\, : ${fmtFunctionNumber(functionData.slope)}`);
					} else {
						lines.push(`${functionData.slope === 1 ? '' : (functionData.slope === -1 ? '-' : fmtFunctionNumber(functionData.slope))}x &= 0 &&| \\, : ${fmtFunctionNumber(functionData.slope)}`);
					}
					lines.push(`x &= ${fmtFunctionNumber(functionData.root)}`);
					textDisplay = `Bestimme die Nullstelle von \\( ${funcStr} \\).`;
					s = `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]`;
					break;
				}
				case 3: {
					const px = randInt(-4, 4) / 2;
					const py = calcF(px);
					if (randInt(0, 1) === 0) {
						textDisplay = `\\( P(${fmtFunctionNumber(px)} | y) \\) liegt auf \\( ${funcStr} \\).<br>Bestimme \\( y \\).`;
						s = `\\( y = f(${fmtFunctionNumber(px)}) = ${exprStr.replace(/x/g, `(${fmtFunctionNumber(px)})`)} = ${fmtFunctionNumber(py)} \\)`;
					} else {
						const lines = [];
						textDisplay = `\\( P(x | ${fmtFunctionNumber(py)}) \\) liegt auf \\( ${funcStr} \\).<br>Bestimme \\( x \\).`;
						if (functionData.intercept !== 0) {
							lines.push(`${fmtFunctionNumber(py)} &= ${exprStr} &&| \\, ${oppositeOperation(functionData.intercept)}`);
							lines.push(`${fmtFunctionNumber(py - functionData.intercept)} &= ${functionData.slope === 1 ? '' : (functionData.slope === -1 ? '-' : fmtFunctionNumber(functionData.slope))}x &&| \\, : ${fmtFunctionNumber(functionData.slope)}`);
						} else {
							lines.push(`${fmtFunctionNumber(py)} &= ${functionData.slope === 1 ? '' : (functionData.slope === -1 ? '-' : fmtFunctionNumber(functionData.slope))}x &&| \\, : ${fmtFunctionNumber(functionData.slope)}`);
						}
						lines.push(`x &= ${fmtFunctionNumber(px)}`);
						s = `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]`;
					}
					break;
				}
				case 4: {
					textDisplay = `Fülle die Wertetabelle für \\( ${funcStr} \\) aus. Nutze die x-Werte \\( -2, -1, 0, 1, 2 \\).`;
					textPrint = `Fülle die Wertetabelle für \\( ${funcStr} \\) aus. Nutze die x-Werte \\( -2, -1, 0, 1, 2 \\).`;
					s = `${buildValueTable(calcF, true)}<br>Kontrolle: Trage z. B. die Punkte \\( P(-1|${fmtFunctionNumber(calcF(-1))}) \\), \\( Q(0|${fmtFunctionNumber(calcF(0))}) \\) und \\( R(1|${fmtFunctionNumber(calcF(1))}) \\) in das Koordinatensystem ein.`;
					break;
				}
				case 5: {
					const testX = randInt(-6, 6) / 2;
					const isTrue = randInt(0, 1) === 0;
					const realY = calcF(testX);
					const testY = isTrue ? realY : realY + choose([-2, -1, 1, 2]);
					textDisplay = `Punktprobe:<br>Liegt \\( P(${fmtFunctionNumber(testX)} | ${fmtFunctionNumber(testY)}) \\) auf \\( ${funcStr} \\)?`;
					if (isTrue) {
						s = `\\( f(${fmtFunctionNumber(testX)}) = ${fmtFunctionNumber(realY)} = ${fmtFunctionNumber(testY)} \\)<br>Ja, der Punkt liegt auf dem Graphen.`;
					} else {
						s = `\\( f(${fmtFunctionNumber(testX)}) = ${fmtFunctionNumber(realY)} \\neq ${fmtFunctionNumber(testY)} \\)<br>Nein, der Punkt liegt nicht auf dem Graphen.`;
					}
					break;
				}
			}
			break;
		}

		// ── Quadratische Funktionen ──────────────────────────────────────────────
		case 'funktionen_quadratisch': {
			const fmtFunctionNumber = (value) => comma(value);
			const choose = (values) => values[randInt(0, values.length - 1)];
			const appendConstant = (expr, value) => {
				if (value > 0) return `${expr} + ${fmtFunctionNumber(value)}`;
				if (value < 0) return `${expr} - ${fmtFunctionNumber(Math.abs(value))}`;
				return expr;
			};
			const oppositeOperation = (value) => value >= 0
				? `- ${fmtFunctionNumber(Math.abs(value))}`
				: `+ ${fmtFunctionNumber(Math.abs(value))}`;
			const buildQuadraticNormalExpression = (p, q) => {
				let expr = 'x^2';
				if (p > 0) expr += p === 1 ? ' + x' : ` + ${fmtFunctionNumber(p)}x`;
				else if (p < 0) expr += p === -1 ? ' - x' : ` - ${fmtFunctionNumber(Math.abs(p))}x`;
				if (q > 0) expr += ` + ${fmtFunctionNumber(q)}`;
				else if (q < 0) expr += ` - ${fmtFunctionNumber(Math.abs(q))}`;
				return expr;
			};
			const buildVertexExpression = (h, k) => {
				const squareExpr = h === 0
					? 'x^2'
					: `(x ${h >= 0 ? '-' : '+'} ${fmtFunctionNumber(Math.abs(h))})^2`;
				return appendConstant(squareExpr, k);
			};
			const formatSolutionSet = (solutions) => {
				const sorted = [...solutions].sort((a, b) => a - b);
				if (sorted.length === 1) return `x &= ${fmtFunctionNumber(sorted[0])}`;
				return `x_1 &= ${fmtFunctionNumber(sorted[0])} \\\\ \n\t\t\t\tx_2 &= ${fmtFunctionNumber(sorted[1])}`;
			};
			const buildValueTable = (calcF, isFilled, isCentered = true) => {
				const xValues = [-2, -1, 0, 1, 2];
				const xRow = xValues.map((x, idx) => `<td style="padding:6px 10px; text-align:center; min-width:40px; border-bottom:1px solid #333; ${idx < xValues.length - 1 ? 'border-right:1px solid #333;' : ''}">${fmtFunctionNumber(x)}</td>`).join('');
				const yRow = xValues.map((x, idx) => {
					const value = isFilled ? `${fmtFunctionNumber(calcF(x))}` : '&nbsp;';
					return `<td style="padding:6px 10px; text-align:center; min-width:34px; ${idx < xValues.length - 1 ? 'border-right:1px solid #333;' : ''}">${value}</td>`;
				}).join('');
				return `<table style="border-collapse:separate; border-spacing:0; margin:${isCentered ? '8px auto 0 auto' : '8px 0 0 0'};">` +
					`<tr><th style="padding:6px 10px; min-width:30px; font-weight:400; border-right:1px solid #333; border-bottom:1px solid #333;">x</th>${xRow}</tr>` +
					`<tr><th style="padding:6px 10px; min-width:30px; font-weight:400; border-right:1px solid #333;">y</th>${yRow}</tr>` +
				`</table>`;
			};
			const buildGenericQuadraticFunction = () => {
				const variant = choose(['shifted', 'scaled', 'normal', 'vertex']);
				if (variant === 'shifted') {
					const c = rnd(-6, 6);
					const exprStr = appendConstant('x^2', c);
					return { variant, exprStr, funcStr: `f(x) = ${exprStr}`, calcF: (x) => x * x + c };
				}
				if (variant === 'scaled') {
					const a = choose([-4, -3, -2, 2, 3, 4]);
					const exprStr = a === 1 ? 'x^2' : (a === -1 ? '-x^2' : `${fmtFunctionNumber(a)}x^2`);
					return { variant, exprStr, funcStr: `f(x) = ${exprStr}`, calcF: (x) => a * x * x };
				}
				if (variant === 'normal') {
					const r1 = randInt(-4, 4);
					const r2 = randInt(-4, 4);
					const p = -(r1 + r2);
					const q = r1 * r2;
					const exprStr = buildQuadraticNormalExpression(p, q);
					return { variant, exprStr, funcStr: `f(x) = ${exprStr}`, calcF: (x) => x * x + p * x + q };
				}
				const h = randInt(-3, 3);
				const k = rnd(-6, 6);
				const exprStr = buildVertexExpression(h, k);
				return { variant: 'vertex', exprStr, funcStr: `f(x) = ${exprStr}`, calcF: (x) => (x - h) * (x - h) + k };
			};
			const buildQuadraticArgumentTask = () => {
				const variant = choose(['shifted', 'scaled', 'normal', 'vertex']);
				if (variant === 'shifted') {
					const xTarget = randInt(-4, 4);
					const c = rnd(-6, 6);
					const targetY = xTarget * xTarget + c;
					const exprStr = appendConstant('x^2', c);
					const lines = [];
					if (c !== 0) {
						lines.push(`${fmtFunctionNumber(targetY)} &= ${exprStr} &&| \\, ${oppositeOperation(c)}`);
						lines.push(`${fmtFunctionNumber(targetY - c)} &= x^2`);
					} else {
						lines.push(`${fmtFunctionNumber(targetY)} &= x^2`);
					}
					lines.push(formatSolutionSet(xTarget === 0 ? [0] : [-Math.abs(xTarget), Math.abs(xTarget)]));
					return { funcStr: `f(x) = ${exprStr}`, targetY, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
				}
				if (variant === 'scaled') {
					const a = choose([-4, -3, -2, 2, 3, 4]);
					const xTarget = randInt(-4, 4);
					const targetY = a * xTarget * xTarget;
					const exprStr = a === -1 ? '-x^2' : `${fmtFunctionNumber(a)}x^2`;
					const lines = [
						`${fmtFunctionNumber(targetY)} &= ${exprStr} &&| \\, : ${fmtFunctionNumber(a)}`,
						`${fmtFunctionNumber(xTarget * xTarget)} &= x^2`,
						formatSolutionSet(xTarget === 0 ? [0] : [-Math.abs(xTarget), Math.abs(xTarget)])
					];
					return { funcStr: `f(x) = ${exprStr}`, targetY, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
				}
				if (variant === 'normal') {
					let x1 = randInt(-4, 4);
					let x2 = randInt(-4, 4);
					const targetY = rnd(-4, 4);
					if (Math.random() < 0.7) {
						while (x2 === x1) x2 = randInt(-4, 4);
					}
					const p = -(x1 + x2);
					const q = x1 * x2 + targetY;
					const exprStr = buildQuadraticNormalExpression(p, q);
					const reducedExpr = buildQuadraticNormalExpression(p, q - targetY);
					const lines = [
						`${fmtFunctionNumber(targetY)} &= ${exprStr} &&| \\, ${oppositeOperation(targetY)}`,
						`0 &= ${reducedExpr}`,
						formatSolutionSet(x1 === x2 ? [x1] : [x1, x2])
					];
					return { funcStr: `f(x) = ${exprStr}`, targetY, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
				}
				const h = randInt(-3, 3);
				const distance = randInt(0, 3);
				const k = rnd(-5, 5);
				const targetY = distance * distance + k;
				const exprStr = buildVertexExpression(h, k);
				const squareExpr = h === 0 ? 'x^2' : `(x ${h >= 0 ? '-' : '+'} ${fmtFunctionNumber(Math.abs(h))})^2`;
				const solutions = distance === 0 ? [h] : [h - distance, h + distance];
				const lines = [];
				if (k !== 0) {
					lines.push(`${fmtFunctionNumber(targetY)} &= ${exprStr} &&| \\, ${oppositeOperation(k)}`);
					lines.push(`${fmtFunctionNumber(targetY - k)} &= ${squareExpr}`);
				} else {
					lines.push(`${fmtFunctionNumber(targetY)} &= ${squareExpr}`);
				}
				lines.push(formatSolutionSet(solutions));
				return { funcStr: `f(x) = ${exprStr}`, targetY, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
			};
			const buildQuadraticRootTask = () => {
				const variant = choose(['shifted', 'scaled', 'normal', 'vertex']);
				if (variant === 'shifted') {
					const root = randInt(0, 4);
					const c = -(root * root);
					const exprStr = appendConstant('x^2', c);
					const lines = [
						`${exprStr} &= 0 &&| \\, ${oppositeOperation(c)}`,
						`x^2 &= ${fmtFunctionNumber(root * root)}`,
						formatSolutionSet(root === 0 ? [0] : [-root, root])
					];
					return { funcStr: `f(x) = ${exprStr}`, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
				}
				if (variant === 'scaled') {
					const a = choose([-4, -3, -2, 2, 3, 4]);
					const exprStr = a === -1 ? '-x^2' : `${fmtFunctionNumber(a)}x^2`;
					const lines = [
						`${exprStr} &= 0 &&| \\, : ${fmtFunctionNumber(a)}`,
						`x^2 &= 0`,
						`x &= 0`
					];
					return { funcStr: `f(x) = ${exprStr}`, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
				}
				if (variant === 'normal') {
					let r1 = randInt(-4, 4);
					let r2 = randInt(-4, 4);
					if (Math.random() < 0.7) {
						while (r2 === r1) r2 = randInt(-4, 4);
					}
					const p = -(r1 + r2);
					const q = r1 * r2;
					const exprStr = buildQuadraticNormalExpression(p, q);
					const lines = [
						`${exprStr} &= 0`,
						formatSolutionSet(r1 === r2 ? [r1] : [r1, r2])
					];
					return { funcStr: `f(x) = ${exprStr}`, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
				}
				const h = randInt(-3, 3);
				const distance = randInt(0, 3);
				const k = -(distance * distance);
				const exprStr = buildVertexExpression(h, k);
				const squareExpr = h === 0 ? 'x^2' : `(x ${h >= 0 ? '-' : '+'} ${fmtFunctionNumber(Math.abs(h))})^2`;
				const solutions = distance === 0 ? [h] : [h - distance, h + distance];
				const lines = [
					`${exprStr} &= 0 &&| \\, ${oppositeOperation(k)}`,
					`${squareExpr} &= ${fmtFunctionNumber(distance * distance)}`,
					formatSolutionSet(solutions)
				];
				return { funcStr: `f(x) = ${exprStr}`, solution: `\\[ \\begin{aligned}\n\t\t\t\t${lines.join(' \\\\ \n\t\t\t\t')}\n\t\t\t\\end{aligned} \\]` };
			};

			const subType = choose([0, 1, 2, 3, 4, 5, 6]);
			let functionData = buildGenericQuadraticFunction();
			let funcStr = functionData.funcStr;
			let calcF = functionData.calcF;
			let exprStr = functionData.exprStr;

			switch (subType) {
				case 0: {
					const xVal = randInt(-4, 4);
					textDisplay = `Berechne bei der Funktion \\( ${funcStr} \\) den Funktionswert zum Argument \\( ${fmtFunctionNumber(xVal)} \\).`;
					s = `\\( f(${fmtFunctionNumber(xVal)}) = ${exprStr.replace(/x/g, `(${fmtFunctionNumber(xVal)})`)} = ${fmtFunctionNumber(calcF(xVal))} \\)`;
					break;
				}
				case 1: {
					const argumentTask = buildQuadraticArgumentTask();
					textDisplay = `Berechne bei der Funktion \\( ${argumentTask.funcStr} \\) das Argument zum Funktionswert \\( ${fmtFunctionNumber(argumentTask.targetY)} \\).`;
					s = argumentTask.solution;
					break;
				}
				case 2: {
					const rootTask = buildQuadraticRootTask();
					textDisplay = `Bestimme die Nullstellen von \\( ${rootTask.funcStr} \\).`;
					s = rootTask.solution;
					break;
				}
				case 3: {
					const px = randInt(-4, 4);
					const py = calcF(px);
					if (randInt(0, 1) === 0) {
						textDisplay = `\\( P(${fmtFunctionNumber(px)} | y) \\) liegt auf \\( ${funcStr} \\).<br>Bestimme \\( y \\).`;
						s = `\\( y = f(${fmtFunctionNumber(px)}) = ${exprStr.replace(/x/g, `(${fmtFunctionNumber(px)})`)} = ${fmtFunctionNumber(py)} \\)`;
					} else {
						const argumentTask = buildQuadraticArgumentTask();
						textDisplay = `\\( P(x | ${fmtFunctionNumber(argumentTask.targetY)}) \\) liegt auf \\( ${argumentTask.funcStr} \\).<br>Bestimme \\( x \\).`;
						s = argumentTask.solution;
					}
					break;
				}
				case 4: {
					textDisplay = `Fülle die Wertetabelle für \\( ${funcStr} \\) aus. Nutze die x-Werte \\( -2, -1, 0, 1, 2 \\).`;
					textPrint = `Fülle die Wertetabelle für \\( ${funcStr} \\) aus. Nutze die x-Werte \\( -2, -1, 0, 1, 2 \\).`;
					s = `${buildValueTable(calcF, true)}<br>Kontrolle: Trage z. B. die Punkte \\( P(-1|${fmtFunctionNumber(calcF(-1))}) \\), \\( Q(0|${fmtFunctionNumber(calcF(0))}) \\) und \\( R(1|${fmtFunctionNumber(calcF(1))}) \\) in das Koordinatensystem ein.`;
					break;
				}
				case 5: {
					const testX = randInt(-3, 3);
					const isTrue = randInt(0, 1) === 0;
					const realY = calcF(testX);
					const testY = isTrue ? realY : realY + choose([-2, -1, 1, 2]);
					textDisplay = `Punktprobe:<br>Liegt \\( P(${fmtFunctionNumber(testX)} | ${fmtFunctionNumber(testY)}) \\) auf \\( ${funcStr} \\)?`;
					if (isTrue) {
						s = `\\( f(${fmtFunctionNumber(testX)}) = ${fmtFunctionNumber(realY)} = ${fmtFunctionNumber(testY)} \\)<br>Ja, der Punkt liegt auf dem Graphen.`;
					} else {
						s = `\\( f(${fmtFunctionNumber(testX)}) = ${fmtFunctionNumber(realY)} \\neq ${fmtFunctionNumber(testY)} \\)<br>Nein, der Punkt liegt nicht auf dem Graphen.`;
					}
					break;
				}
				case 6: {
					const variant = choose(['shifted', 'scaled', 'normal', 'vertex']);
					let localFuncStr = '';
					let sx = 0;
					let sy = 0;
					if (variant === 'shifted') {
						const c = rnd(-6, 6);
						sy = c;
						localFuncStr = `f(x) = ${appendConstant('x^2', c)}`;
					} else if (variant === 'scaled') {
						const a = choose([-4, -3, -2, 2, 3, 4]);
						localFuncStr = `f(x) = ${fmtFunctionNumber(a)}x^2`;
						sx = 0;
						sy = 0;
					} else if (variant === 'normal') {
						const d = randInt(-3, 3);
						const e = rnd(-6, 6);
						const p = -2 * d;
						const q = d * d + e;
						localFuncStr = `f(x) = ${buildQuadraticNormalExpression(p, q)}`;
						sx = d;
						sy = e;
					} else {
						const d = randInt(-3, 3);
						const e = rnd(-6, 6);
						localFuncStr = `f(x) = ${buildVertexExpression(d, e)}`;
						sx = d;
						sy = e;
					}
					textDisplay = `Bestimme den Scheitelpunkt der Funktion \\( ${localFuncStr} \\).`;
					s = `\\( S(${fmtFunctionNumber(sx)} | ${fmtFunctionNumber(sy)}) \\)`;
					break;
				}
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
				mean = formatDecimal(sum / n, 2);
				
				if (lastVal <= 13) {
					sum = currentSum + lastVal;
					// Prüfe: Entweder glatt teilbar ODER (bei n=6) Rest ist 3
					if (sum % n === 0 || (n === 6 && sum % n === 3)) {
						mean = formatDecimal(sum / n, 2);
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
						let medianStr = formatDecimal(median, 2);
						
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
			const cm = (x) => formatDecimal(x, 1);
			const pickDec = (minTenths, maxTenths) => randInt(minTenths, maxTenths) / 10;

			// Typen:
			// Gültig: 0: SSS, 1: SWS, 2: WSW, 3: SsW
			// Kein Satz: 4: WWW, 5: WWS (nicht anliegend), 6: sSw (Winkel ggü. kleinerer Seite), 7: Dreiecksungleichung verletzt
			const mode = randInt(0, 7);

			let givenParts = [];
			let theoremName = '';
			let explanation = '';

			if (mode === 0) {
				// SSS: 3 Seiten mit gültiger Dreiecksungleichung
				let s1, s2, s3;
				do {
					s1 = pickDec(30, 80);
					s2 = pickDec(30, 80);
					s3 = pickDec(30, 80);
				} while (s1 + s2 <= s3 || s1 + s3 <= s2 || s2 + s3 <= s1);

				givenParts = [
					`a = ${cm(s1)}\\,\\text{cm}`,
					`b = ${cm(s2)}\\,\\text{cm}`,
					`c = ${cm(s3)}\\,\\text{cm}`
				];
				theoremName = 'SSS';
				explanation = 'Drei Seiten gegeben, Dreiecksungleichung erfüllt.';
			} else if (mode === 1) {
				// SWS: 2 Seiten und der eingeschlossene Winkel
				const pairIdx = randInt(0, 2); // 0: (a,b)->gamma, 1: (b,c)->alpha, 2: (a,c)->beta
				const s1 = pickDec(30, 80);
				const s2 = pickDec(30, 80);
				const ang = randInt(25, 120);

				if (pairIdx === 0) {
					givenParts = [`a = ${cm(s1)}\\,\\text{cm}`, `b = ${cm(s2)}\\,\\text{cm}`, `\\gamma = ${ang}^\\circ`];
				} else if (pairIdx === 1) {
					givenParts = [`b = ${cm(s1)}\\,\\text{cm}`, `c = ${cm(s2)}\\,\\text{cm}`, `\\alpha = ${ang}^\\circ`];
				} else {
					givenParts = [`a = ${cm(s1)}\\,\\text{cm}`, `c = ${cm(s2)}\\,\\text{cm}`, `\\beta = ${ang}^\\circ`];
				}
				theoremName = 'SWS';
				explanation = 'Zwei Seiten und der von ihnen eingeschlossene Winkel sind gegeben.';
			} else if (mode === 2) {
				// WSW: 1 Seite und die beiden anliegenden Winkel
				const sideIdx = randInt(0, 2); // 0: a mit beta/gamma, 1: b mit alpha/gamma, 2: c mit alpha/beta
				const sVal = pickDec(30, 80);
				let a1 = randInt(25, 75);
				let a2 = randInt(25, 75);

				if (sideIdx === 0) {
					givenParts = [`a = ${cm(sVal)}\\,\\text{cm}`, `\\beta = ${a1}^\\circ`, `\\gamma = ${a2}^\\circ`];
				} else if (sideIdx === 1) {
					givenParts = [`b = ${cm(sVal)}\\,\\text{cm}`, `\\alpha = ${a1}^\\circ`, `\\gamma = ${a2}^\\circ`];
				} else {
					givenParts = [`c = ${cm(sVal)}\\,\\text{cm}`, `\\alpha = ${a1}^\\circ`, `\\beta = ${a2}^\\circ`];
				}
				theoremName = 'WSW';
				explanation = 'Eine Seite und die beiden anliegenden Winkel sind gegeben.';
			} else if (mode === 3) {
				// SsW: 2 Seiten und der Winkel gegenüber der GRÖSSEREN Seite
				const pairIdx = randInt(0, 2); // 0: a, b; 1: b, c; 2: a, c
				let sBig = pickDec(55, 85);
				let sSmall = pickDec(30, 50);
				const ang = randInt(35, 95);

				if (pairIdx === 0) {
					// a > b, Winkel alpha
					givenParts = [`a = ${cm(sBig)}\\,\\text{cm}`, `b = ${cm(sSmall)}\\,\\text{cm}`, `\\alpha = ${ang}^\\circ`];
				} else if (pairIdx === 1) {
					// b > c, Winkel beta
					givenParts = [`b = ${cm(sBig)}\\,\\text{cm}`, `c = ${cm(sSmall)}\\,\\text{cm}`, `\\beta = ${ang}^\\circ`];
				} else {
					// c > a, Winkel gamma
					givenParts = [`c = ${cm(sBig)}\\,\\text{cm}`, `a = ${cm(sSmall)}\\,\\text{cm}`, `\\gamma = ${ang}^\\circ`];
				}
				theoremName = 'SsW';
				explanation = 'Zwei Seiten und der Gegenwinkel der größeren Seite sind gegeben.';
			} else if (mode === 4) {
				// WWW: 3 Winkel
				let a1 = randInt(30, 80);
				let a2 = randInt(30, 80);
				let a3 = 180 - a1 - a2;
				if (a3 <= 10) {
					a1 = 50; a2 = 60; a3 = 70;
				}
				givenParts = [`\\alpha = ${a1}^\\circ`, `\\beta = ${a2}^\\circ`, `\\gamma = ${a3}^\\circ`];
				theoremName = 'kein';
				explanation = 'Drei gegebene Winkel (WWW) legen nur die Form fest, nicht aber die Größe des Dreiecks.';
			} else if (mode === 5) {
				// WWS / SWW: 2 Winkel und eine nicht-anliegende bzw. nicht-eingeschlossene Seite
				const sVal = pickDec(30, 80);
				let a1 = randInt(25, 75);
				let a2 = randInt(25, 75);
				const variant = randInt(0, 2);
				if (variant === 0) {
					givenParts = [`a = ${cm(sVal)}\\,\\text{cm}`, `\\alpha = ${a1}^\\circ`, `\\beta = ${a2}^\\circ`];
				} else if (variant === 1) {
					givenParts = [`b = ${cm(sVal)}\\,\\text{cm}`, `\\beta = ${a1}^\\circ`, `\\gamma = ${a2}^\\circ`];
				} else {
					givenParts = [`c = ${cm(sVal)}\\,\\text{cm}`, `\\alpha = ${a1}^\\circ`, `\\gamma = ${a2}^\\circ`];
				}
				theoremName = 'kein';
				explanation = 'WWS/SWW ist kein Kongruenzsatz (die Seite liegt nicht zwischen den beiden Winkeln).';
			} else if (mode === 6) {
				// sSw: 2 Seiten und der Winkel gegenüber der KLEINEREN Seite
				const pairIdx = randInt(0, 2);
				let sSmall = pickDec(30, 48);
				let sBig = pickDec(55, 85);
				const ang = randInt(35, 75);

				if (pairIdx === 0) {
					// a < b, aber Winkel alpha (gegenüber a)
					givenParts = [`a = ${cm(sSmall)}\\,\\text{cm}`, `b = ${cm(sBig)}\\,\\text{cm}`, `\\alpha = ${ang}^\\circ`];
				} else if (pairIdx === 1) {
					// b < c, aber Winkel beta (gegenüber b)
					givenParts = [`b = ${cm(sSmall)}\\,\\text{cm}`, `c = ${cm(sBig)}\\,\\text{cm}`, `\\beta = ${ang}^\\circ`];
				} else {
					// a < c, aber Winkel alpha (gegenüber a)
					givenParts = [`a = ${cm(sSmall)}\\,\\text{cm}`, `c = ${cm(sBig)}\\,\\text{cm}`, `\\alpha = ${ang}^\\circ`];
				}
				theoremName = 'kein';
				explanation = 'Der gegebene Winkel liegt der kleineren Seite gegenüber (sSw ist kein Kongruenzsatz).';
			} else {
				// Dreiecksungleichung verletzt: 3 Seiten
				let s1 = pickDec(20, 35);
				let s2 = pickDec(20, 35);
				let s3 = pickDec(75, 95); // s1 + s2 < s3
				givenParts = [`a = ${cm(s1)}\\,\\text{cm}`, `b = ${cm(s2)}\\,\\text{cm}`, `c = ${cm(s3)}\\,\\text{cm}`];
				theoremName = 'kein';
				explanation = 'Die Dreiecksungleichung ist verletzt (Summe zweier Seiten ist kleiner als die dritte Seite).';
			}

			// Reihenfolge der gegebenen Angaben zufällig mischen
			const displayGiven = fisherYatesShuffle(givenParts).join('; \\; ');
			const displayPrompt = 'Welcher Kongruenzsatz liegt vor? (SSS, SWS, WSW, SsW oder kein)';

			textDisplay = `${displayPrompt} <br>\\( ${displayGiven} \\)`;
			textPrint = `${displayPrompt} \\( ${displayGiven} \\)`;

			if (theoremName === 'kein') {
				s = `\\[ \\text{Kein Kongruenzsatz} \\] (${explanation})`;
			} else {
				s = `\\[ \\text{Kongruenzsatz } \\mathbf{${theoremName}} \\] (${explanation})`;
			}
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
				{ z: 5, n: 6 }, { z: 3, n: 8 }, { z: 3, n: 10 }, { z: 7, n: 10 }, { z: 9, n: 10 }, 
				{ z: 2, n: 7 }, { z: 4, n: 3 }, { z: 5, n: 4 }, { z: 7, n: 5 }, { z: 3, n: 11 }
			];
			
			// Wähle einen zufälligen Bruch aus dem Pool
			const frac = fractions[randInt(0, fractions.length - 1)];
			const z = frac.z;
			const n = frac.n;
			
			if (rd > 0.6) {
				// TYP 1: Anteil berechnen (Bruch von Ganzem)
				// Damit es glatt aufgeht, muss das Ganze ein Vielfaches des Nenners sein.
				const scale = Math.random() > 0.5 ? 10 : 1; // Sorgt manchmal für Hunderter/Zehner-Werte
				const multiplier = effectiveEasyMode ? rnd(2, 9) : rnd(3, 15);
				const normalFactor = effectiveEasyMode ? 1 : (randInt(10, 25) / 10);
				const G = n * multiplier * scale * normalFactor; // Das Ganze (Grundwert)
				const W = (G / n) * z;                           // Der Anteil

				textDisplay = `\\( \\frac{${z}}{${n}} \\) von ${formatByUnit(G, einheit, 1)} ${einheit} sind ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) von ${formatByUnit(G, einheit, 1)} ${einheit} sind ${formatByUnit(W, einheit, 2)} ${einheit}<br>
				\\((${formatByUnit(G, einheit, 1)} : ${n} \\cdot ${z} = ${formatByUnit(W, einheit, 2)})\\)`;

			} else if (rd > 0.3) {
				// TYP 2: Ganzes berechnen (Bruch sind Anteil von...)
				// Damit es glatt aufgeht, muss der Anteil ein Vielfaches des Zählers sein.
				const scale = Math.random() > 0.5 ? 10 : 1;
				const multiplier = effectiveEasyMode ? rnd(2, 9) : rnd(3, 15);
				const normalFactor = effectiveEasyMode ? 1 : (randInt(10, 25) / 10);
				const W = z * multiplier * scale * normalFactor; // Der Anteil
				const G = (W / z) * n;                            // Das Ganze
				
				textDisplay = `\\( \\frac{${z}}{${n}} \\) sind ${formatByUnit(W, einheit, 2)} ${einheit} von ${blank(3)}`;
				s = `\\( \\frac{${z}}{${n}} \\) sind ${formatByUnit(W, einheit, 2)} ${einheit} von ${formatByUnit(G, einheit, 2)} ${einheit}<br>
				\\((${formatByUnit(W, einheit, 2)} : ${z} \\cdot ${n} = ${formatByUnit(G, einheit, 2)})\\)`;

			} else {
				// TYP 3: Bruch berechnen (Anteil von Ganzem sind...)
				// Wir nehmen den generierten Bruch und erzeugen dazu passende glatte Werte.
				const multiplier = rnd(2, 9);
				const W = z * multiplier;
				const G = n * multiplier;
				const Wint = Math.round(W);
				const Gint = Math.round(G);
				const gcd = mathUtils.getGcd(Math.abs(Wint), Math.abs(Gint));
				const zK = Wint / gcd;
				const nK = Gint / gcd;
				const pK = (zK / nK) * 100;
				textDisplay = `${formatByUnit(W, einheit, 2)} ${einheit} von ${formatByUnit(G, einheit, 2)} ${einheit} sind ${blank(3)} (als max. gek. Bruch)`;
				s = `${formatByUnit(W, einheit, 2)} ${einheit} von ${formatByUnit(G, einheit, 2)} ${einheit} sind \\(\\dfrac{${Wint}}{${Gint}} = \\dfrac{${zK}}{${nK}}\\)`;

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
			
			const de = (num, unit = sz.einheit2) => formatByUnit(num, unit, 2);

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
		
			const fmtNum = (num) => formatDecimal(num, 1);
		
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





