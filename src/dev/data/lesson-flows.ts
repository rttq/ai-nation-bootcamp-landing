/*
 * Схемы «что собираем» — по одной на каждый из семнадцати уроков.
 * Шаблон: вход → чем работаем → артефакт, последний узел залит акцентом.
 *
 * Цепочка — источник правды, схема из неё собирается. Правки вносятся в
 * lessonChains, схема пересобирается генератором целиком: так семнадцать
 * штук остаются одинаковыми, а не расходятся по мелочам.
 *
 * Зачем цепочка нужна отдельно от svg. Схема нарисована под 468 пикселей и
 * на телефон не помещается: на экране 390 панель отдаёт 294, а содержимое
 * 480 — сдвинуть надо почти двести, и уезжает вправо ровно артефакт, то
 * есть весь смысл схемы. Поэтому ниже 900 вместо картинки показывается та
 * же цепочка строкой: она переносится по словам, артефакт выделен, и
 * листать вбок не нужно.
 *
 * Наконечник стрелки объявлен внутри каждой схемы под своим номером. Один
 * общий маркер на страницу связывает схемы между собой: уберёшь первую —
 * у остальных пропадут стрелки. Ровно это было в исходной выгрузке.
 *
 * kind различает подпись под последним узлом. artifact — там, где на выходе
 * вещь. method — там, где вещи нет, а есть способ работы.
 */
export type LessonChain = { rubric: string; kind: 'artifact' | 'method'; nodes: string[] };

export const lessonChains: Record<string, LessonChain> = {
  '01': { rubric: 'ЛЕНДИНГ НА РЕАЛЬНОМ СЕРВЕРЕ', kind: 'artifact', nodes: ['Спецификация SDD', 'ИИ-агент', 'Деплой', 'Аналитика посещений'] },
  '02': { rubric: 'КОНВЕРСИЯ +5–15%', kind: 'artifact', nodes: ['Лендинг с урока 01', 'Chrome MCP + Web Visor', 'Агент читает скроллы, клики', 'Правки на бою'] },
  '03': { rubric: 'ОТ «В ЛОБ» К РЕЛИЗ-ГЕЙТУ', kind: 'artifact', nodes: ['key-value БД «в лоб»', 'Код-ревью: общие дефекты', 'SDD + TDD', 'Evals на свои промпты'] },
  '04': { rubric: 'ИЕРАРХИЯ ПАМЯТИ АГЕНТА', kind: 'artifact', nodes: ['md-файлы', 'MCP + PostgreSQL', 'Redis'] },
  '05': { rubric: 'ФРЕЙМВОРК РЕШЕНИЯ', kind: 'method', nodes: ['Cursor / OpenCode', 'Скиллы и правила', 'MCP · тул · правило · скрипт'] },
  '06': { rubric: 'МУЛЬТИАГЕНТНАЯ СИСТЕМА', kind: 'artifact', nodes: ['Свой MCP-сервер на fastMCP', 'Субагент на markdown', 'Router · Supervisor · Graph', 'Система под SDD-цикл'] },
  '07': { rubric: 'RAG С НУЛЯ', kind: 'artifact', nodes: ['Чанкинг Chonkie', 'Embeddings', 'ChromaDB + re-ranker', 'Оценка через RAGAS'] },
  '08': { rubric: 'АГЕНТ С RAG, MCP И СКИЛЛАМИ', kind: 'artifact', nodes: ['Responses API', 'Structured output', 'Function calling', 'Агент через общий tools'] },
  '09': { rubric: 'ЛИЧНЫЙ ТУЛСЕТ', kind: 'method', nodes: ['CodeGraph', 'Семантический поиск по коду', 'context7 · Chrome DevTools', 'Свой набор под задачи'] },
  '10': { rubric: 'АЛГОРИТМ НА КАЖДЫЙ КЕЙС', kind: 'artifact', nodes: ['Legacy-проект в Docker', 'Карта архитектуры репо', 'Аудит безопасности', 'Алгоритм под каждый кейс'] },
  '11': { rubric: 'ПРОДУКТОВАЯ СИСТЕМА ЦЕЛИКОМ', kind: 'artifact', nodes: ['UI-прототипы', 'Структура БД', 'API-контракты', 'Архитектура и бизнес-логика'] },
  '12': { rubric: 'ГРАФ ЗАВИСИМОСТЕЙ КОДОВОЙ БАЗЫ', kind: 'artifact', nodes: ['Open-source репозиторий', 'tree-sitter · LSP', 'Граф зависимостей', 'План изменений Code Map'] },
  '13': { rubric: 'КОНТРОЛЬ НАД СОТНЯМИ АГЕНТОВ', kind: 'method', nodes: ['Агентская платформа', 'Логи · трейсы · алерты', 'Детекция аномалий', 'LLM-судья и IAM'] },
  '14': { rubric: 'СПЕЦИФИКАЦИЯ ПЕРЕЕЗДА', kind: 'artifact', nodes: ['Монолит', 'DDD: bounded contexts', 'OpenSpec + ревьюеры', 'Контракт · runbook · тесты'] },
  '15': { rubric: 'СТРАТЕГИЯ ПОЗИЦИОНИРОВАНИЯ', kind: 'method', nodes: ['Данные hh.ru', 'Сдвиг грейдов', 'Профиль дженералиста', 'Своя вилка и позиция'] },
  '16': { rubric: 'ПЛАН ВНЕДРЕНИЯ В КОМАНДЕ', kind: 'method', nodes: ['Личная практика', 'Роль AI Champion', 'Метрики и ROI', 'План внедрения и академия'] },
  '17': { rubric: 'ЧТО УНОСИШЬ С СОБОЙ', kind: 'method', nodes: ['Стратегия развития', 'Чеклисты и промпты', 'Плейбуки', 'Вход в комьюнити'] },
};

export const lessonFlows: Record<string, string> = {
  '10': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="АЛГОРИТМ НА КАЖДЫЙ КЕЙС: Legacy-проект в Docker → Карта архитектуры репо → Аудит безопасности → Алгоритм под каждый кейс">
          <defs><marker id="nsArrow10" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">АЛГОРИТМ НА КАЖДЫЙ КЕЙС</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Legacy-проект</tspan><tspan x="54" dy="16">в Docker</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow10)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Карта</tspan><tspan x="174" dy="16">архитектуры</tspan><tspan x="174" dy="16">репо</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow10)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Аудит</tspan><tspan x="294" dy="16">безопасности</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow10)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Алгоритм под</tspan><tspan x="414" dy="16">каждый кейс</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '11': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ПРОДУКТОВАЯ СИСТЕМА ЦЕЛИКОМ: UI-прототипы → Структура БД → API-контракты → Архитектура и бизнес-логика">
          <defs><marker id="nsArrow11" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ПРОДУКТОВАЯ СИСТЕМА ЦЕЛИКОМ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">UI-прототипы</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow11)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Структура БД</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow11)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">API-контракты</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow11)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Архитектура и</tspan><tspan x="414" dy="16">бизнес-логика</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '12': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ГРАФ ЗАВИСИМОСТЕЙ КОДОВОЙ БАЗЫ: Open-source репозиторий → tree-sitter · LSP → Граф зависимостей → План изменений Code Map">
          <defs><marker id="nsArrow12" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ГРАФ ЗАВИСИМОСТЕЙ КОДОВОЙ БАЗЫ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Open-source</tspan><tspan x="54" dy="16">репозиторий</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow12)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">tree-sitter · LSP</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow12)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Граф</tspan><tspan x="294" dy="16">зависимостей</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow12)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">План</tspan><tspan x="414" dy="16">изменений</tspan><tspan x="414" dy="16">Code Map</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '13': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="КОНТРОЛЬ НАД СОТНЯМИ АГЕНТОВ: Агентская платформа → Логи · трейсы · алерты → Детекция аномалий → LLM-судья и IAM">
          <defs><marker id="nsArrow13" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">КОНТРОЛЬ НАД СОТНЯМИ АГЕНТОВ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Агентская</tspan><tspan x="54" dy="16">платформа</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow13)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Логи · трейсы ·</tspan><tspan x="174" dy="16">алерты</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow13)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Детекция</tspan><tspan x="294" dy="16">аномалий</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow13)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">LLM-судья и</tspan><tspan x="414" dy="16">IAM</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">ЧТО УНОСИШЬ</text>
        </svg>`,

  '14': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="СПЕЦИФИКАЦИЯ ПЕРЕЕЗДА: Монолит → DDD: bounded contexts → OpenSpec + ревьюеры → Контракт · runbook · тесты">
          <defs><marker id="nsArrow14" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">СПЕЦИФИКАЦИЯ ПЕРЕЕЗДА</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Монолит</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow14)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">DDD: bounded</tspan><tspan x="174" dy="16">contexts</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow14)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">OpenSpec +</tspan><tspan x="294" dy="16">ревьюеры</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow14)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Контракт ·</tspan><tspan x="414" dy="16">runbook ·</tspan><tspan x="414" dy="16">тесты</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '15': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="СТРАТЕГИЯ ПОЗИЦИОНИРОВАНИЯ: Данные hh.ru → Сдвиг грейдов → Профиль дженералиста → Своя вилка и позиция">
          <defs><marker id="nsArrow15" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">СТРАТЕГИЯ ПОЗИЦИОНИРОВАНИЯ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Данные hh.ru</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow15)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Сдвиг грейдов</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow15)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Профиль</tspan><tspan x="294" dy="16">дженералиста</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow15)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Своя вилка и</tspan><tspan x="414" dy="16">позиция</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">ЧТО УНОСИШЬ</text>
        </svg>`,

  '16': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ПЛАН ВНЕДРЕНИЯ В КОМАНДЕ: Личная практика → Роль AI Champion → Метрики и ROI → План внедрения и академия">
          <defs><marker id="nsArrow16" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ПЛАН ВНЕДРЕНИЯ В КОМАНДЕ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Личная</tspan><tspan x="54" dy="16">практика</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow16)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Роль AI</tspan><tspan x="174" dy="16">Champion</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow16)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Метрики и ROI</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow16)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">План</tspan><tspan x="414" dy="16">внедрения и</tspan><tspan x="414" dy="16">академия</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">ЧТО УНОСИШЬ</text>
        </svg>`,

  '17': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ЧТО УНОСИШЬ С СОБОЙ: Стратегия развития → Чеклисты и промпты → Плейбуки → Вход в комьюнити">
          <defs><marker id="nsArrow17" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ЧТО УНОСИШЬ С СОБОЙ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Стратегия</tspan><tspan x="54" dy="16">развития</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow17)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Чеклисты и</tspan><tspan x="174" dy="16">промпты</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow17)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Плейбуки</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow17)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Вход в</tspan><tspan x="414" dy="16">комьюнити</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">ЧТО УНОСИШЬ</text>
        </svg>`,

  '01': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ЛЕНДИНГ НА РЕАЛЬНОМ СЕРВЕРЕ: Спецификация SDD → ИИ-агент → Деплой → Аналитика посещений">
          <defs><marker id="nsArrow01" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ЛЕНДИНГ НА РЕАЛЬНОМ СЕРВЕРЕ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Спецификация</tspan><tspan x="54" dy="16">SDD</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow01)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">ИИ-агент</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow01)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Деплой</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow01)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Аналитика</tspan><tspan x="414" dy="16">посещений</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '02': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="КОНВЕРСИЯ +5–15%: Лендинг с урока 01 → Chrome MCP + Web Visor → Агент читает скроллы, клики → Правки на бою">
          <defs><marker id="nsArrow02" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">КОНВЕРСИЯ +5–15%</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Лендинг с</tspan><tspan x="54" dy="16">урока 01</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow02)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Chrome MCP +</tspan><tspan x="174" dy="16">Web Visor</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow02)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Агент читает</tspan><tspan x="294" dy="16">скроллы, клики</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow02)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Правки на</tspan><tspan x="414" dy="16">бою</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '03': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ОТ «В ЛОБ» К РЕЛИЗ-ГЕЙТУ: key-value БД «в лоб» → Код-ревью: общие дефекты → SDD + TDD → Evals на свои промпты">
          <defs><marker id="nsArrow03" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ОТ «В ЛОБ» К РЕЛИЗ-ГЕЙТУ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">key-value БД «в</tspan><tspan x="54" dy="16">лоб»</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow03)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Код-ревью:</tspan><tspan x="174" dy="16">общие</tspan><tspan x="174" dy="16">дефекты</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow03)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">SDD + TDD</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow03)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Evals на свои</tspan><tspan x="414" dy="16">промпты</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '04': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ИЕРАРХИЯ ПАМЯТИ АГЕНТА: md-файлы → MCP + PostgreSQL → Redis">
          <defs><marker id="nsArrow04" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ИЕРАРХИЯ ПАМЯТИ АГЕНТА</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">md-файлы</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow04)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">MCP +</tspan><tspan x="174" dy="16">PostgreSQL</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow04)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="244" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="294" dy="0">Redis</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="244" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '05': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ФРЕЙМВОРК РЕШЕНИЯ: Cursor / OpenCode → Скиллы и правила → MCP · тул · правило · скрипт">
          <defs><marker id="nsArrow05" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ФРЕЙМВОРК РЕШЕНИЯ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Cursor /</tspan><tspan x="54" dy="16">OpenCode</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow05)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Скиллы и</tspan><tspan x="174" dy="16">правила</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow05)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="244" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="294" dy="0">MCP · тул ·</tspan><tspan x="294" dy="16">правило ·</tspan><tspan x="294" dy="16">скрипт</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="244" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">ЧТО УНОСИШЬ</text>
        </svg>`,

  '06': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="МУЛЬТИАГЕНТНАЯ СИСТЕМА: Свой MCP-сервер на fastMCP → Субагент на markdown → Router · Supervisor · Graph → Система под SDD-цикл">
          <defs><marker id="nsArrow06" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">МУЛЬТИАГЕНТНАЯ СИСТЕМА</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Свой</tspan><tspan x="54" dy="16">MCP-сервер на</tspan><tspan x="54" dy="16">fastMCP</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow06)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Субагент на</tspan><tspan x="174" dy="16">markdown</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow06)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Router ·</tspan><tspan x="294" dy="16">Supervisor ·</tspan><tspan x="294" dy="16">Graph</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow06)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Система под</tspan><tspan x="414" dy="16">SDD-цикл</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '07': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RAG С НУЛЯ: Чанкинг Chonkie → Embeddings → ChromaDB + re-ranker → Оценка через RAGAS">
          <defs><marker id="nsArrow07" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">RAG С НУЛЯ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Чанкинг</tspan><tspan x="54" dy="16">Chonkie</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow07)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Embeddings</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow07)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">ChromaDB +</tspan><tspan x="294" dy="16">re-ranker</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow07)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Оценка через</tspan><tspan x="414" dy="16">RAGAS</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '08': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="АГЕНТ С RAG, MCP И СКИЛЛАМИ: Responses API → Structured output → Function calling → Агент через общий tools">
          <defs><marker id="nsArrow08" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">АГЕНТ С RAG, MCP И СКИЛЛАМИ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">Responses API</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow08)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Structured</tspan><tspan x="174" dy="16">output</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow08)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">Function calling</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow08)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Агент через</tspan><tspan x="414" dy="16">общий tools</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">АРТЕФАКТ</text>
        </svg>`,

  '09': `<svg viewBox="0 0 468 150" class="flow__svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ЛИЧНЫЙ ТУЛСЕТ: CodeGraph → Семантический поиск по коду → context7 · Chrome DevTools → Свой набор под задачи">
          <defs><marker id="nsArrow09" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8c9aa3"></path></marker></defs>
          <text x="4" y="14" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#8c9aa3">ЧТО СОБИРАЕМ</text>
          <text x="464" y="14" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1.4" fill="#0e1418">ЛИЧНЫЙ ТУЛСЕТ</text>
          <line x1="4" y1="24" x2="464" y2="24" stroke="#e9ecee" stroke-width="1"></line>
          <rect x="4" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="54" dy="0">CodeGraph</tspan></text>
          <line x1="108" y1="80" x2="120" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow09)"></line>
          <rect x="124" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="174" dy="0">Семантический</tspan><tspan x="174" dy="16">поиск по коду</tspan></text>
          <line x1="228" y1="80" x2="240" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow09)"></line>
          <rect x="244" y="44" width="100" height="72" fill="#e9ecee"></rect>
          <text y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#0e1418"><tspan x="294" dy="0">context7 ·</tspan><tspan x="294" dy="16">Chrome</tspan><tspan x="294" dy="16">DevTools</tspan></text>
          <line x1="348" y1="80" x2="360" y2="80" stroke="#8c9aa3" stroke-width="1" marker-end="url(#nsArrow09)"></line>
          <rect x="364" y="44" width="100" height="72" fill="#F5A623"></rect>
          <rect x="364" y="44" width="3" height="72" fill="#0e1418"></rect>
          <text y="74" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0e1418"><tspan x="414" dy="0">Свой набор</tspan><tspan x="414" dy="16">под задачи</tspan></text>
          <text x="4" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ВХОД</text>
          <text x="124" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#8c9aa3">ЧЕМ РАБОТАЕМ</text>
          <text x="364" y="140" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1.2" fill="#0e1418">ЧТО УНОСИШЬ</text>
        </svg>`,
};
