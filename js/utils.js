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

