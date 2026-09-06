const grading = require('../quiz-auto-single/grading.js');

const cases = [
  { answer: { kind: 'number', value: 3 }, raw: '3', expected: true },
  { answer: { kind: 'number', value: 5.5 }, raw: '5,5', expected: true },
  { answer: { kind: 'number', value: 5.5 }, raw: '5.5', expected: true },
  { answer: { kind: 'number', value: 3 }, raw: 'x=3', expected: true },
  { answer: { kind: 'number', value: 3 }, raw: 'x = 3', expected: true },
  { answer: { kind: 'number', value: 3 }, raw: 'x= 3 ', expected: true },
  { answer: { kind: 'list', values: [3, 5] }, raw: '5, 3', expected: true },
  { answer: { kind: 'list', values: [3, 5] }, raw: '3 5', expected: true },
  { answer: { kind: 'list', values: [3, 5] }, raw: '3,5', expected: true },
  { answer: { kind: 'list', values: [3, 5] }, raw: '5,4', expected: false },
  { answer: { kind: 'fraction', num: 1, den: 2 }, raw: '1/2', expected: true },
  { answer: { kind: 'fraction', num: 1, den: 2 }, raw: '2/4', expected: true },
  { answer: { kind: 'fraction', num: 1, den: 2 }, raw: '1 / 2', expected: true },
  { answer: { kind: 'fraction', num: 1, den: 3, exact: true }, raw: '1/3', expected: true },
  { answer: { kind: 'fraction', num: 1, den: 3, exact: true }, raw: '2/6', expected: false },
  { answer: { kind: 'fraction', num: 1, den: 3, exact: true }, raw: '3/9', expected: false },
  { answer: { kind: 'either', options: [0.5, 50] }, raw: '50 %', expected: true },
  { answer: { kind: 'either', options: [0.5, 50] }, raw: '50%', expected: true },
  { answer: { kind: 'either', options: [0.5, 50] }, raw: '1 / 2', expected: true },
  { answer: { kind: 'either', options: [2, 3] }, raw: '3', expected: true },
  { answer: { kind: 'either', options: [2, 3] }, raw: '4', expected: false }
];

let bad = 0;
for (const c of cases) {
  const got = grading.isCorrect(c.answer, c.raw);
  console.log(JSON.stringify({ raw: c.raw, expected: c.expected, got, answer: c.answer }));
  if (got !== c.expected) bad++;
}

if (bad > 0) {
  console.error(`FAIL: ${bad} regression(s) detected`);
  process.exit(1);
}

console.log('PASS: all grader checks succeeded');
