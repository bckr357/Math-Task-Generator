# 🎯 Neue Features & Refactoring (April 2026)

## ✨ Neue Aufgabentypen (3)

### 1. `equations_lin` - Lineare Gleichungen nach y umstellen
**Grade:** Klasse 7+  
**Beschreibung:** Schüler stellen lineare Gleichungen der Form nach `y` um.

**Unterstützte Formen:**
- `ax + by = c`
- `ax + c = by`
- `ax = by + c`
- `by = ax + c`

**Parameter:**
- `a, b, c`: Ganzzahlen von -20 bis 20 (ohne 0)
- Division durch `b` ergibt immer ganze oder halbe Zahlen (x.5)
- Lösungsweg mit strukturiertem `aligned`-LaTeX

**Beispiel-Output:**
```
Aufgabe: 3x + 2y = 18
Lösung: y = -1,5x + 9
```

---

### 2. `word_terms` - Wortterme übersetzen & berechnen
**Grade:** Klasse 7+  
**Beschreibung:** Schüler übersetzen Wortterme in mathematische Symbole und berechnen sie.

**10 Variationen:**
- Summe: "Addiere 7 und -5"
- Differenz: "Subtrahiere 3 von 12"
- Produkt: "Multipliziere -2 und 8"
- Quotient: "Dividiere 20 durch -4"
- Produkt + Summe: "Addiere das Produkt von 3 und -5 mit 7"
- Produkt + Differenz: "Subtrahiere das Produkt von 2 und 3 von 20"
- Summe × Zahl: "Multipliziere die Summe von 4 und -3 mit 5"
- Differenz × Zahl: "Multipliziere die Differenz von 8 und 2 mit -2"
- (Summe) ÷ Zahl: "Dividiere die Summe von 10 und 5 durch 3"
- (Differenz) ÷ Zahl: "Dividiere die Differenz von 15 und 6 durch 3"

**Beispiel-Output:**
```
Übersetze in einen Term und berechne:
Addiere das Produkt von 7 und -5 mit 19
Term: 7 · (-5) + 19 = -16
```

---

### 3. `linear_function` - Grafische Darstellung linearer Funktionen
**Grade:** Klasse 7+  
**Beschreibung:** Schüler zeichnen eine lineare Funktion mit Koordinatensystem.

**Features:**
- SVG-basierte Grafik (keine externe Library nötig)
- Koordinatensystem mit Gitter
- Gerade wird automatisch gezeichnet
- Markante Punkte: y-Achsenabschnitt (blau), Nullstelle (grün)
- Ausgangsgleichung: `f(x) = mx + b`

**Lösung zeigt:**
- y-Achsenabschnitt mit Koordinaten
- Nullstelle (falls vorhanden)
- Steigung `m`
- Zwei Punkte auf der Geraden

**Beispiel-Output:**
```
Zeichne die Gerade: f(x) = 2x - 3
[SVG-Grafik mit Koordinatensystem und Gerade]
Lösung:
- y-Achsenabschnitt: P(0 | -3)
- Nullstelle: x = 1,50
- Steigung: m = 2
```

---

## 🔧 Refactoring Phase 1 ✅ (Abgeschlossen)

### Neue Utility-Funktionen in `js/utils.js`

#### 1. `formatUtils.formatSignedValue(value, options)`
Einheitliche Formatierung von Zahlen mit Vorzeichen.

```javascript
// Beispiele:
formatSignedValue(5, { prefix: true })        // "+ 5"
formatSignedValue(-5, { prefix: true })       // "- 5"
formatSignedValue(-5, { parentheses: true })  // "(-5)"
formatSignedValue(3)                          // "3"
```

**Options:**
- `prefix`: Vorzeichen als "+" oder "-" Präfix
- `absolute`: Nur Absolutwert verwenden
- `parentheses`: Negative Zahlen in Klammern
- `noZero`: Gibt '' für 0 zurück

---

#### 2. `formatUtils.generateCoprimeFraction(config)`
Generiert einen Bruch mit `gcd(zähler, nenner) = 1`.

```javascript
// Beispiele:
generateCoprimeFraction()
// → [3, 7] (immer mit gcd=1)

generateCoprimeFraction({ 
  minNum: 1, maxNum: 20,
  minDen: 2, maxDen: 12,
  forbiddenDen: [6, 8]
})
```

**Config-Optionen:**
- `minNum, maxNum`: Bereich für Zähler
- `minDen, maxDen`: Bereich für Nenner
- `forbiddenDen`: Ausgeschlossene Nenner
- `maxAttempts`: Max. Versuche (default 100)

---

#### 3. `buildTrainingOrPairTasks(createEntryFn, isTraining, buildTableFn)`
Vereinheitlicht Training (1 Aufgabe) vs. Quiz (2 Aufgaben in Tabelle).

```javascript
const result = buildTrainingOrPairTasks(
  () => ({ 
    expr: "5 + 3", 
    solution: "8" 
  }),
  isTraining,
  buildTwoColumnTaskTable
);

// result = { textDisplay: "...", solution: "..." }
```

---

## 📊 Codebase-Verbesserungen

### Reduzierte Code-Duplikation
- **Vorzeichen-Formatierung:** 10+ Vorkommen → einheitliche Funktion
- **Bruch-Generierung:** 5+ Do-While-Schleifen → `generateCoprimeFraction()`
- **Training/Quiz Pattern:** 7 Cases mit ähnlichem Code → `buildTrainingOrPairTasks()`

### Impact
- ≈ 150-200 Zeilen Code gespart
- Wartbarkeit erhöht
- Konsistenz verbessert

---

## 📋 Geplante Phase 2 Verbesserungen

- [ ] `frac_convert` aufteilen (aktuell 400 Zeilen)
- [ ] CONFIG-Konstanten für Magic Numbers
- [ ] Generischer Operationstabellen-Generator
- [ ] `formel_umstellen` externe Konfiguration

---

## 🧪 Testen

Die neuen Aufgabentypen sind in folgenden Klassen verfügbar:
- `equations_lin`: Klasse 7-10
- `word_terms`: Klasse 7-10
- `linear_function`: Klasse 7-10

Alle neuen Cases enthalten:
- ✅ Keine Syntax-Fehler
- ✅ Korrekte Ausgabeformate
- ✅ Integrierte Hilfsfunktionen
