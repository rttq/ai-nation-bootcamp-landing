// localhost — для проверки страниц на `astro dev`. Origin не граница безопасности:
// вне браузера его подделывают одной строкой, от ботов защищает ловушка `website`.
const ORIGINS = ['https://ai-nation.ru', 'https://www.ai-nation.ru', 'http://localhost:4321', 'http://127.0.0.1:4321'];
const { AXL_BASE } = process.env;
const AXL_TOKEN = (process.env.AXL_TOKEN || '').trim().replace(/^Bearer\s+/i, ''); // из админки ключ копируют и с «Bearer »
const s = (v, n = 500) => String(v ?? '').trim().slice(0, n) || undefined;

// Тег контакту по источнику формы. Клиент присылает только ключ из этого списка, а не
// сам тег: иначе любой с сайта навесил бы на контакт «bootcamp_03 заявка» и запустил
// чужие автоматизации. AXL создаёт тег по названию, если его ещё нет.
// Только для нового контакта: у существующего PUT заменяет весь список тегов, а прочитать
// текущие через API нельзя (tags всегда приходит пустым) — так затёрли бы ученикам их теги.
//
// Два независимых лид-магнита на /dev/ — у каждого свой тег, прогревы ведутся раздельно:
//   diagnostic  — диагностика /dev/diagnostika/;
//   lesson_form — регистрация на открытый урок (форма в конце программы).
// lesson_quiz — прежний общий ключ квиза: страницы, открытые у людей до перехода на два
// ключа выше, ещё могут его слать; тег у него тот же, что был.
const TAGS = {
  diagnostic: 'диагностика',
  lesson_form: 'открытый_урок',
  lesson_quiz: 'открытый_урок',
};

const axl = (method, path, body) => fetch(`${AXL_BASE}/api/v1${path}`, {
  method,
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${AXL_TOKEN}` },
  body: JSON.stringify(body),
});

// Контакт уже есть: дописываем ответы к его комментарию, старый текст остаётся.
// Таблица ищет по email точно и без учёта регистра; commentAppend добавляет с новой строки.
async function appendComment(email, text) {
  const found = await (await axl('POST', '/crm/lead/table', { filter: { email, take: 1, skip: 0 }, fields: '{id}' })).json();
  const id = found.body?.items?.[0]?.id;
  if (!id) throw new Error('contact not found');
  const put = await (await axl('PUT', '/crm/lead', { id, commentAppend: { value: text } })).json();
  if (!put.success) throw new Error(JSON.stringify(put.errors));
}

exports.handler = async (event) => {
  const origin = event.headers?.Origin || event.headers?.origin;
  const cors = {
    'Access-Control-Allow-Origin': ORIGINS.includes(origin) ? origin : ORIGINS[0],
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
  const reply = (statusCode, body = {}) => ({ statusCode, headers: cors, body: JSON.stringify(body) });

  if (event.httpMethod === 'OPTIONS') return reply(204);
  if (event.httpMethod !== 'POST' || !ORIGINS.includes(origin)) return reply(403);

  let d;
  try { d = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body); }
  catch { return reply(400); }

  if (d.website) return reply(200, { ok: true }); // ловушка для ботов: человек поле не видит
  const email = s(d.email);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return reply(400, { error: 'email' });

  const comment = s(d.comment, 1500);
  const tag = TAGS[d.source];
  const res = await axl('POST', '/crm/lead', {
    email, firstName: s(d.name), phone: s(d.phone), comment, tags: tag ? [tag] : undefined,
    utmSource: s(d.utmSource), utmMedium: s(d.utmMedium), utmCampaign: s(d.utmCampaign),
    utmTerm: s(d.utmTerm), utmContent: s(d.utmContent),
  });
  if (res.ok) return reply(200, { ok: true });

  const text = await res.text();
  if (!text.includes('emailAlreadyExists')) { console.error('axl', res.status, text); return reply(502); }

  // Человек уже в CRM: доступ ему нужен в любом случае, поэтому сбой дозаписи заявку не роняет.
  // Ответы в таком случае остаются в логе функции, чтобы их можно было внести руками.
  if (comment) await appendComment(email, comment).catch((e) => console.error('append failed', email, e.message, comment));
  return reply(200, { ok: true, existing: true });
};
