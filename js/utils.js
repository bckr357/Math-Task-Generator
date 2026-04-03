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
    comma: (val) => val.toString().replace('.', ','),
    
    fmt: (num) => num < 0 ? `(${num})` : num,
    
    toCleanString: (val) => {
        let s = Number(val.toFixed(3)).toString();
        return s.replace('.', ',');
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
