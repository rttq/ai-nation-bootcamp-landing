// Проверка диагностики /dev/diagnostika/: профили сходятся с порогами из
// прототипа, а комментарий для CRM в худшем случае влезает в 1500 знаков.
// Функция axl-lead режет комментарий по этому лимиту молча: лишнее пропало бы
// из карточки контакта без единой ошибки.
//
// Запуск: npm run check:diagnostic (читает .ts напрямую, node --experimental-strip-types).
import assert from 'node:assert/strict';
import { QUESTIONS, buildComment, outcome, scores } from './src/dev/data/diagnostic.ts';

const LIMIT = 1500; // functions/axl-lead/index.js: s(d.comment, 1500)

// Ответы собираем по номерам вариантов в порядке вопросов: role, exp, q3…q9.
const answers = (...picks) => Object.fromEntries(QUESTIONS.map((q, i) => [q.id, picks[i]]));

// Выходы: не разработчик и стаж меньше двух лет.
assert.equal(outcome(answers(7, 3, 3, 3, 3, 3, 3, 3, 3)), 'A');
assert.equal(outcome(answers(0, 0, 3, 3, 3, 3, 3, 3, 3)), 'A');

// Все максимальные ответы: высокий уровень по всем осям.
assert.equal(outcome(answers(0, 3, 3, 3, 3, 3, 3, 3, 3)), 'B');

// Агенты ниже 45%: «Ассистент», что бы ни было на остальных осях.
assert.equal(outcome(answers(0, 1, 0, 3, 3, 0, 3, 3, 3)), 'C');

// Спеки и контекст сильные, legacy слабый: «Личный чемпион».
assert.equal(outcome(answers(0, 2, 2, 3, 3, 2, 1, 0, 0)), 'E');

// Всё остальное: «Автоматизатор».
assert.equal(outcome(answers(0, 2, 2, 1, 2, 2, 1, 2, 2)), 'D');

// Оси считаются долей от максимума: два вопроса на ось, 3+0 из 6 даёт 50%.
assert.equal(scores(answers(0, 1, 3, 0, 0, 0, 0, 0, 0)).agents, 50);

// Худший случай по длине: на каждый вопрос самый длинный вариант, но не выходной.
const longest = Object.fromEntries(
  QUESTIONS.map((q) => {
    const skip = q.id === 'role' ? 7 : q.id === 'exp' ? 0 : -1;
    const pick = q.opts.reduce((best, o, i) => (i !== skip && o.length > q.opts[best].length ? i : best), skip === 0 ? 1 : 0);
    return [q.id, pick];
  }),
);
const worst = buildComment(
  longest,
  { goal: 'Внедрить AI в команде', telegram: `@${'a'.repeat(32)}` },
  '04.10.2026',
);
assert.ok(worst.length <= LIMIT, `комментарий ${worst.length} знаков, лимит ${LIMIT}`);

console.log(`diagnostic: ok, худший комментарий ${worst.length} из ${LIMIT} знаков`);
