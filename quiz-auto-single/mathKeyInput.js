// ============================================================
// QUIZ-AUTO-SINGLE: Eingabefeld mit optionaler virtueller Tastatur
// Vorbereitet für die spätere Erweiterung auf Exponenten (x^y)
// und visuelle Bruch-Templates (a/b-Vorlagen).
// Nutzung: <math-key-input v-model="value" @confirm="..." />
// ============================================================

(function () {
	// Standard Tasten-Layout
	const KEY_ROWS = [
		['7', '8', '9'],
		['4', '5', '6'],
		['1', '2', '3'],
		['-', '0', '/']
	];

	// Platzhalter für zukünftige erweiterte Tastenzeile (z. B. Potenzen/Wurzeln)
	// Zukünftige Erweiterung: ['x²', 'x^y', '√', '.']
	const ADVANCED_KEY_ROW = ['^', '.', '(', ')'];

	const MathKeyInputComponent = {
		props: {
			modelValue: { type: String, default: '' },
			disabled: { type: Boolean, default: false },
			mode: { type: String, default: 'basic' } // 'basic' | 'advanced'
		},
		emits: ['update:modelValue', 'confirm'],
		data() {
			return {
				keyboardOpen: false
			};
		},
		methods: {
			setValue(next) {
				this.$emit('update:modelValue', next);
			},
			onInput(event) {
				this.setValue(event.target.value);
			},
			pressKey(key) {
				if (this.disabled) return;
				// Erweiterungspunkt für spezielle mathematische Symbole
				if (key === 'x²') {
					this.setValue(`${this.modelValue}^2`);
				} else {
					this.setValue(`${this.modelValue}${key}`);
				}
				this.focusInput();
			},
			backspace() {
				if (this.disabled) return;
				this.setValue(this.modelValue.slice(0, -1));
				this.focusInput();
			},
			clear() {
				if (this.disabled) return;
				this.setValue('');
				this.focusInput();
			},
			confirm() {
				this.$emit('confirm');
			},
			onKeydown(event) {
				if (event.key === 'Enter') {
					this.confirm();
				}
			},
			toggleKeyboard() {
				this.keyboardOpen = !this.keyboardOpen;
			},
			focusInput() {
				this.$refs.input?.focus();
			}
		},
		template: `
			<div class="math-key-input">
				<div class="math-key-input-row">
					<input
						ref="input"
						type="text"
						inputmode="text"
						class="math-key-input-field"
						:value="modelValue"
						:disabled="disabled"
						@input="onInput"
						@keydown="onKeydown"
						placeholder="z. B. 4 oder 3/4"
						autocomplete="off"
					>
					<button type="button" class="math-key-input-toggle" @click="toggleKeyboard" :aria-pressed="keyboardOpen" title="Tastatur ein-/ausblenden">⌨</button>
				</div>
				<div v-if="keyboardOpen" class="math-key-pad">
					<div v-for="(row, rowIndex) in $options.KEY_ROWS" :key="rowIndex" class="math-key-pad-row">
						<button v-for="key in row" :key="key" type="button" class="math-key-pad-btn" @click="pressKey(key)" :disabled="disabled">{{ key }}</button>
					</div>
					<!-- Erweiterbare Tastaturzeile für Potenzen / Symbole -->
					<div v-if="mode === 'advanced'" class="math-key-pad-row">
						<button v-for="key in $options.ADVANCED_KEY_ROW" :key="key" type="button" class="math-key-pad-btn" @click="pressKey(key)" :disabled="disabled">{{ key }}</button>
					</div>
					<div class="math-key-pad-row">
						<button type="button" class="math-key-pad-btn math-key-pad-btn--wide" @click="backspace" :disabled="disabled">⌫</button>
						<button type="button" class="math-key-pad-btn math-key-pad-btn--wide math-key-pad-btn--confirm" @click="confirm" :disabled="disabled">Prüfen ↵</button>
					</div>
				</div>
			</div>
		`,
		KEY_ROWS,
		ADVANCED_KEY_ROW
	};

	if (typeof window !== 'undefined') {
		window.MathKeyInputComponent = MathKeyInputComponent;
	}
})();
