// ============================================================
// ZENTRALE UTILITY-FUNKTIONEN & FORMATIERUNG
// ============================================================

const mathUtils = {
    // Mathematische Funktionen
    getGcd: (a, b) => (b === 0 ? a : mathUtils.getGcd(b, a % b)),
    
    getPrimeFactors: (num) => {
        const primes = [];
        let d = 2;
        let temp = num;
        while (temp > 1) {
            while (temp % d === 0) {
                primes.push(d);
                temp /= d;
            }
            d++;
        }
        return primes.sort((a, b) => a - b);
    },
    
    isPrime: (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
};

// ============================================================
// ZENTRALE FORMATIERUNGS-FUNKTIONEN
// ============================================================
const formatUtils = {
    // Tauscht den Dezimalpunkt gegen ein Komma, wie es im deutschen Zahlensystem üblich ist.
    comma: (val) => val.toString().replace('.', ','),
    
    // Formatiert negative Werte für mathematische Ausdrücke.
    // Strings bleiben erhalten, sofern sie bereits in Klammern stehen.
    // Wenn das Ergebnis negativ ist, wird es in runde Klammern gesetzt.
    fmt: (value) => {
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed.startsWith('(') && trimmed.endsWith(')')) return value;
            return trimmed.startsWith('-') ? `(${value})` : value;
        }
        return value < 0 ? `(${value})` : value;
    },
    
    // Wandelt eine Zahl auf drei Nachkommastellen und ersetzt den Punkt durch ein Komma.
    toCleanString: (val) => {
        let s = Number(val.toFixed(3)).toString();
        return s.replace('.', ',');
    },

    // Gibt eine Zahl mit maximal `maxDecimals` Nachkommastellen zurück.
    // Unnötige Nullen werden abgeschnitten und der Dezimalpunkt durch ein Komma ersetzt.
    // Beispiele: 2.50 -> "2,5", 3.00 -> "3", 2.66666 -> "2,67".
    formatDecimal: (val, maxDecimals = 2) => {
        if (typeof val !== 'number' || !isFinite(val)) {
            return String(val);
        }
        return Number(val.toFixed(maxDecimals)).toString().replace('.', ',');
    },

    // Gibt eine Zahl mit genau `decimals` Nachkommastellen zurück.
    // Beispiel: 2 -> "2,00" bei decimals=2.
    formatFixedDecimal: (val, decimals = 2) => {
        if (typeof val !== 'number' || !isFinite(val)) {
            return String(val);
        }
        return Number(val).toFixed(decimals).replace('.', ',');
    },

    // Formatiert Werte einheitenabhängig.
    // Für Euro wird immer fest auf 2 Nachkommastellen formatiert.
    // Für andere Einheiten werden maxDecimals (ohne unnötige Nullen) verwendet.
    formatByUnit: (val, unit, maxDecimals = 2) => {
        if (unit === '€') {
            return formatUtils.formatFixedDecimal(val, 2);
        }
        return formatUtils.formatDecimal(val, maxDecimals);
    },

    // Formatiert einen Prozentwert mit fester Nachkommastellenzahl.
    formatPercent: (val, decimals = 2) => {
        return `${formatUtils.formatFixedDecimal(val, decimals)} %`;
    },

    /**
     * Formatiert eine Zahl mit Vorzeichen für mathematische Ausdrücke
     * @param {number} value - Die zu formatierende Zahl
     * @param {Object} options - Optionen: { prefix, absolute, parentheses, noZero }
     * @returns {string} Formatierte Zeichenkette
     */
    formatSignedValue: (value, options = {}) => {
        const { prefix = false, absolute = false, parentheses = false, noZero = false } = options;
        
        if (noZero && value === 0) return '';
        
        const absVal = absolute ? Math.abs(value) : value;
        const sign = value >= 0 ? '+' : '-';
        const absNum = Math.abs(absVal);
        
        let result = absolute ? absNum.toString() : (value >= 0 ? absNum.toString() : `-${absNum}`);
        
        if (prefix && value !== 0) {
            result = value >= 0 ? `+ ${absNum}` : `- ${absNum}`;
        }
        
        if (parentheses && value < 0) {
            result = `(${value})`;
        }
        
        return result;
    },

    /**
     * Generiert einen Bruch mit gcd(zähler, nenner) = 1
     * @param {Object} config - Konfiguration
     * @returns {Array} [zähler, nenner]
     */
    generateCoprimeFraction: (config = {}) => {
        const {
            minNum = 1, maxNum = 12,
            minDen = 2, maxDen = 12,
            forbiddenDen = [],
            maxAttempts = 100
        } = config;

        let z, n, attempt = 0;
        const getGcd = mathUtils.getGcd;

        do {
            z = randInt(minNum, maxNum);
            n = randInt(minDen, maxDen);
            attempt++;
        } while (
            attempt < maxAttempts &&
            (getGcd(z, n) !== 1 || forbiddenDen.includes(n))
        );

        return [z, n];
    }
};


// ============================================================
// ZUFALLSZAHLEN-GENERATOREN
// ============================================================

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const rnd = (min, max) => {
    let result; 
do { result = randInt(min, max); } while (result >= -1 && result <= 1);
    return result;
};

const trueDec = (min, max) => {
    let n;
    do {
        n = rnd(min * 10, max * 10);
    } while (n % 10 === 0); 
    return (n / 10);
};

// ============================================================
// IMPORT-SICHERHEIT, PARSING UND SHUFFLE
// ============================================================

const safeJSONParse = (jsonText) => {
    try {
        return { ok: true, data: JSON.parse(jsonText), error: null };
    } catch (error) {
        return { ok: false, data: null, error };
    }
};

const sanitizeStyleValue = (styleValue) => {
    const value = String(styleValue || '');
    const lower = value.toLowerCase();
    if (lower.includes('javascript:') || lower.includes('expression(') || lower.includes('url(')) {
        return '';
    }
    return value;
};

const sanitizeImportedHtml = (input) => {
    const raw = String(input ?? '');
    if (!raw) return '';

    const allowedTags = new Set([
        'br', 'b', 'strong', 'i', 'em', 'u', 'sup', 'sub', 'span', 'div', 'p',
        'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th'
    ]);
    const allowedAttributes = new Set(['class', 'colspan', 'rowspan', 'style', 'title']);

    const template = document.createElement('template');
    template.innerHTML = raw;

    const walk = (node) => {
        if (!node) return;

        if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            if (!allowedTags.has(tagName)) {
                const replacement = document.createTextNode(node.textContent || '');
                node.replaceWith(replacement);
                return;
            }

            const attrs = [...node.attributes];
            attrs.forEach(attr => {
                const attrName = attr.name.toLowerCase();
                const isAria = attrName.startsWith('aria-');
                const isData = attrName.startsWith('data-');
                const allowed = allowedAttributes.has(attrName) || isAria || isData;

                if (!allowed || attrName.startsWith('on')) {
                    node.removeAttribute(attr.name);
                    return;
                }

                if (attrName === 'style') {
                    const safeStyle = sanitizeStyleValue(attr.value);
                    if (!safeStyle) {
                        node.removeAttribute(attr.name);
                    } else {
                        node.setAttribute('style', safeStyle);
                    }
                }
            });
        }

        [...node.childNodes].forEach(child => walk(child));
    };

    [...template.content.childNodes].forEach(child => walk(child));
    return template.innerHTML;
};

const fisherYatesShuffle = (items) => {
    const arr = Array.isArray(items) ? [...items] : [];
    for (let index = arr.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
    }
    return arr;
};

if (typeof window !== 'undefined') {
    window.safeJSONParse = safeJSONParse;
    window.sanitizeImportedHtml = sanitizeImportedHtml;
    window.fisherYatesShuffle = fisherYatesShuffle;
}

// ============================================================
// TRAINING VS. PAIR AUFGABEN PATTERN
// ============================================================

/**
 * Standardisiert das Pattern: Training = 1 Aufgabe, Quiz = 2 Aufgaben in Tabelle
 * @param {Function} createEntryFn - Funktion, die { expr, solution } zurückgibt
 * @param {boolean} isTraining - Training-Modus?
 * @param {Function} buildTableFn - Funktion, die buildTwoColumnTaskTable äquivalent ist
 * @returns {Object} { textDisplay, solution }
 */
const buildTrainingOrPairTasks = (createEntryFn, isTraining, buildTableFn) => {
    if (isTraining) {
        const entry = createEntryFn();
        return {
            textDisplay: entry.expr,
            solution: entry.solution
        };
    } else {
        const firstEntry = createEntryFn();
        let secondEntry;
        let attempt = 0;
        
        do {
            secondEntry = createEntryFn();
            attempt += 1;
        } while (attempt < 10 && secondEntry.expr === firstEntry.expr);
        
        const entries = [firstEntry, secondEntry];
        return {
            textDisplay: buildTableFn(entries.map(e => e.expr)),
            solution: buildTableFn(entries.map(e => e.solution))
        };
    }
};

