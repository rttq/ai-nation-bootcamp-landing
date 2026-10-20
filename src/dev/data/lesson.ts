// Адреса, общие для всего, что связано с открытым уроком и заявками в CRM AXL:
// Diagnostic.astro (лид-магнит «диагностика»), LessonRegister.astro (лид-магнит
// «регистрация на урок») и LessonStrip.astro. Что за функция и как её выкатывать —
// docs/axl-quiz.md.

/** Cloud Function `axl-lead`: принимает заявку, кладёт контакт в CRM AXL. */
export const LEAD_URL = 'https://example.com/your-lead-endpoint';

/** Страница урока. Замок на ней смотрит на `lessonAccess` в localStorage. */
export const LESSON_URL = '/dev/agents-lesson/';
