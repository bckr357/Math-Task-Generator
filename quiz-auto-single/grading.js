// ============================================================
// QUIZ-AUTO-SINGLE: Auswertung von Nutzereingaben gegen ein `answer`-Objekt
// aus tasks.js ({kind:'number'|'fraction'|'either'|'expression', ...})
// ============================================================

(function (global) {
	const NUMERIC_TOLERANCE = 1e-6;

	const normalizeRaw = (raw) => String(raw ?? '').trim();

	const normalizeUnit = (unit) => String(unit ?? '').trim().replace(/\s+/g, '').toLowerCase();

	const parseSingleNumber = (value) => {
		const rawText = String(value ?? '').trim();
		if (!rawText) {
			return null;
		}

		const stripped = rawText.replace(/^([A-Za-z]+)\s*=\s*/i, '').trim();
		if (!stripped) {
			return null;
		}

		const isPercent = /%/i.test(stripped);
		const percentRemoved = stripped.replace(/%/gi, '').trim();
		const hasExplicitUnit = /[A-Za-z€$£¥µ²³°]/.test(percentRemoved);
		const match = percentRemoved.match(/^([-+]?(?:\d+(?:\.\d+)?|\.\d+)(?:\/(?:[-+]?(?:\d+(?:\.\d+)?|\.\d+)))?)(.*)$/);
		if (!match) {
			return null;
		}

		const [, numericPart, unitPart = ''] = match;
		const unit = normalizeUnit(unitPart);
		const normalized = numericPart.replace(',', '.');
		if (!/^(?:[-+]?(?:\d+(?:\.\d+)?|\.\d+))(?:\/(?:[-+]?(?:\d+(?:\.\d+)?|\.\d+)))?$/.test(normalized)) {
			return null;
		}

		if (normalized.includes('/')) {
			const parts = normalized.split('/');
			if (parts.length !== 2) {
				return null;
			}
			const num = Number(parts[0]);
			const den = Number(parts[1]);
			if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) {
				return null;
			}
			return { num, den, isPercent, unit: unit || undefined };
		}

		const parsedValue = Number(normalized);
		if (!Number.isFinite(parsedValue)) {
			return null;
		}
		return { value: parsedValue, isPercent, unit: unit || undefined };
	};

	// Liefert die Zahl aus einer Eingabe mit optionaler Einheit zurück, z. B. "12m", "12 m", "3/4kg".
	const extractNumericPart = (value) => {
		const match = String(value ?? '').match(/[-+]?(?:\d+(?:\.\d+)?|\.\d+)(?:\/[-+]?(?:\d+(?:\.\d+)?|\.\d+))?/);
		return match ? match[0] : '';
	};

	// Parst "3", "-3.5", "42%", "3/4", "-3/4", "x=3" und Listen wie "3, 5", "5,3" oder "3 5".
	function parseUserAnswer(raw) {
		const rawText = normalizeRaw(raw);
		if (!rawText) {
			return null;
		}

		let stripped = rawText.replace(/^([A-Za-z]+)\s*=\s*/i, '').trim();
		if (!stripped) {
			return null;
		}

		stripped = stripped
			.replace(/\s*%\s*/gi, '%')
			.replace(/\s*\/\s*/g, '/');

		const singleValue = parseSingleNumber(stripped);
		if (singleValue) {
			return singleValue;
		}

		const hasSeparator = /[,;]|\s+/.test(stripped);
		if (hasSeparator && !/[A-Za-z]/.test(stripped.replace(/[\d\s,;.%+\-\/]/g, ''))) {
			const pieces = stripped.includes(',') || stripped.includes(';')
				? stripped.split(/[;,]+/)
				: stripped.split(/\s+/);
			const parsedPieces = pieces.map(piece => parseSingleNumber(piece)).filter(Boolean);
			if (parsedPieces.length !== pieces.filter(Boolean).length) {
				return null;
			}
			return { values: parsedPieces };
		}

		return null;
	}

	const getGcd = (a, b) => {
		a = Math.abs(a);
		b = Math.abs(b);
		while (b) {
			[a, b] = [b, a % b];
		}
		return a || 1;
	};

	const normalizeExpressionText = (value) => String(value ?? '')
		.trim()
		.replace(/−/g, '-')
		.replace(/–/g, '-')
		.replace(/×/g, '*')
		.replace(/÷/g, '/')
		.replace(/\s+/g, '')
		.replace(/\^/g, '**')
		.replace(/(\d)([A-Za-z])/g, '$1*$2')
		.replace(/([A-Za-z])(\d)/g, '$1*$2')
		.replace(/\)([A-Za-z])/g, ')*$1');

	const evaluateExpression = (expr, valueMap) => {
		const normalized = normalizeExpressionText(expr);
		const keys = Object.keys(valueMap);
		const values = Object.values(valueMap);
		const fn = new Function(...keys, `return (${normalized});`);
		return fn(...values);
	};

	const expressionEquivalent = (expectedExpr, userExpr) => {
		const normalize = (expr) => normalizeExpressionText(expr).replace(/\*\*/g, '^');
		const expectedVars = [...new Set((String(expectedExpr ?? '').match(/[A-Za-z]/g) || []))];
		const userVars = [...new Set((String(userExpr ?? '').match(/[A-Za-z]/g) || []))];
		const vars = [...new Set([...expectedVars, ...userVars])].sort();
		if (!vars.length) {
			return normalize(expectedExpr) === normalize(userExpr);
		}

		const samples = [0, 1, -1, 2, -2, 3, -3, 5, -5];
		for (const sample of samples) {
			const valueMap = Object.fromEntries(vars.map((variable, index) => [variable, sample + index]));
			const expected = evaluateExpression(expectedExpr, valueMap);
			const actual = evaluateExpression(userExpr, valueMap);
			if (!Number.isFinite(expected) || !Number.isFinite(actual) || Math.abs(expected - actual) > 1e-6) {
				return false;
			}
		}
		return true;
	};

	const toComparableValue = (parsed) => {
		if (!parsed) {
			return null;
		}
		if ('value' in parsed) {
			return parsed.isPercent ? parsed.value / 100 : parsed.value;
		}
		return parsed.isPercent ? (parsed.num / parsed.den) / 100 : parsed.num / parsed.den;
	};

	// Prüft, ob zwei Bruchdarstellungen wertgleich sind (Kreuzprodukt-Vergleich).
	const fractionsEqual = (num1, den1, num2, den2) => num1 * den2 === num2 * den1;

	function isCorrect(answer, raw) {
		if (!answer) {
			return false;
		}

		if (answer.kind === 'expression') {
			const expectedExpr = normalizeExpressionText(answer.expr);
			const userExpr = normalizeExpressionText(raw);
			if (!expectedExpr || !userExpr) {
				return false;
			}
			return expressionEquivalent(expectedExpr, userExpr);
		}

		const parsed = parseUserAnswer(raw);
		if (!parsed) {
			return false;
		}

		const userValue = 'value' in parsed ? parsed.value : parsed.num / parsed.den;
		const equivalentValues = parsed.isPercent ? [userValue, userValue / 100] : [userValue];

		if (answer.kind === 'number') {
			if (answer.unit) {
				const expectedUnit = normalizeUnit(answer.unit);
				const parsedUnit = normalizeUnit(parsed.unit ?? (parsed.isPercent ? '%' : ''));
				if (!parsedUnit || parsedUnit !== expectedUnit) {
					return false;
				}
			}
			return equivalentValues.some(v => Math.abs(v - answer.value) < NUMERIC_TOLERANCE);
		}

		if (answer.kind === 'either') {
			return answer.options.some(option =>
				equivalentValues.some(value => Math.abs(value - option) < NUMERIC_TOLERANCE)
			);
		}

		if (answer.kind === 'list') {
			const actualValues = ('values' in parsed ? parsed.values : [parsed]).map(toComparableValue);
			if (actualValues.length !== answer.values.length) {
				return false;
			}
			const expectedValues = [...answer.values].sort((a, b) => a - b);
			const actualSorted = [...actualValues].sort((a, b) => a - b);
			return actualSorted.every((value, index) => Math.abs(value - expectedValues[index]) < NUMERIC_TOLERANCE);
		}

		if (answer.kind === 'fraction') {
			const expectedValue = answer.num / answer.den;
			if ('value' in parsed) {
				if (equivalentValues.some(v => Math.abs(v - expectedValue) < NUMERIC_TOLERANCE)) {
					return true;
				}
				return false;
			}
			if (parsed.isPercent) {
				if (equivalentValues.some(v => Math.abs(v - expectedValue) < NUMERIC_TOLERANCE)) {
					return true;
				}
			}
			if (!fractionsEqual(parsed.num, parsed.den, answer.num, answer.den)) {
				return false;
			}
			if (answer.requireReduced) {
				return getGcd(parsed.num, parsed.den) === 1;
			}
			return true;
		}

		return false;
	}

	const api = { parseUserAnswer, isCorrect };

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = api;
	}
	if (typeof global !== 'undefined') {
		global.quizAutoGrading = api;
	}
})(typeof window !== 'undefined' ? window : globalThis);
