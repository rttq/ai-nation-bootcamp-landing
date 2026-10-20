// Рисует PNG-сертификаты буткемпа /dev/ по src/dev/data/certificates.json в стиле
// MINIMAL STEEL: цвета и шрифты берутся прямо из src/dev/styles/tokens.css и @fontsource.
// QR ведёт на страницу проверки ai-nation.ru/dev/verify/<id>/.
//
//   node _certificates.mjs <папка> <начало ID>      // «02-» — весь поток, «02-001» — один
//
// Макет 1600×1000, снимок в 2× → 3200×2000. Рисует локальный Chrome (путь — переменная
// CHROME, по умолчанию стандартный для Windows), сеть не нужна. Поле `lessons` у записи
// необязательное: нет его — нет и плашки «Пройдено уроков».
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import qrcode from 'qrcode-generator';

const [out, prefix] = process.argv.slice(2);
if (!out || !prefix) {
  console.error('node _certificates.mjs <папка> <начало ID>');
  process.exit(1);
}
const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const certs = JSON.parse(readFileSync('src/dev/data/certificates.json', 'utf8')).filter((c) => c.id.startsWith(prefix));
if (!certs.length) {
  console.error(`нет сертификатов с ID на «${prefix}»`);
  process.exit(1);
}

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const file = (p) => pathToFileURL(path.resolve(p)).href;

// Свой SVG из модулей, а не createSvgTag: один <path> без отступов, размер задаёт CSS.
function qrSvg(text) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
  return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path d="${d}"/></svg>`;
}

function page(c) {
  const [stream, , dmy] = c.id.split('-');
  const date = `${Number(dmy.slice(0, 2))} ${months[dmy.slice(2, 4) - 1]} 20${dmy.slice(4)}`;
  const period = c.cohort.split(' / ')[1] ?? '';
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<link rel="stylesheet" href="${file('node_modules/@fontsource-variable/inter/index.css')}">
<link rel="stylesheet" href="${file('node_modules/@fontsource-variable/jetbrains-mono/index.css')}">
<link rel="stylesheet" href="${file('src/dev/styles/tokens.css')}">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:1000px;overflow:hidden}
body{background:var(--c-white);color:var(--c-ink);font-family:var(--f-sans);padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;-webkit-font-smoothing:antialiased}
.mono{font-family:var(--f-mono);font-weight:700;font-size:16px;line-height:1.4;letter-spacing:2.5px;text-transform:uppercase;color:var(--c-muted)}
.top{display:flex;justify-content:space-between;align-items:center}
.lockup{font-weight:900;font-style:italic;font-size:40px;letter-spacing:3px}
.label{display:flex;align-items:center;gap:14px;color:var(--c-ink)}
.label::before{content:'';width:14px;height:14px;background:var(--c-accent)}
.name{font-weight:900;font-size:112px;line-height:.95;letter-spacing:-3px;text-transform:uppercase;margin-top:32px}
.program{font-size:34px;line-height:1.3;margin-top:36px;max-width:980px}
.program em{font-style:normal;color:var(--c-accent-text)}
.bottom{display:flex;align-items:flex-end;gap:16px;white-space:nowrap}
.stat{background:var(--c-bg);padding:26px 28px;display:flex;flex-direction:column;gap:16px}
.stat b{font-size:30px;line-height:1;font-weight:800;letter-spacing:-.5px;color:var(--c-ink)}
.verify{margin-left:auto;display:flex;flex-direction:column;gap:20px}
.verify .mono{display:flex;flex-direction:column;gap:4px;font-size:14px;letter-spacing:1.5px}
.verify .ink{color:var(--c-ink)}
.qr{width:260px;height:260px}
.qr svg{display:block;width:100%;height:100%;fill:var(--c-ink)}
</style></head><body>
<div class="top"><span class="lockup">НЭЙШН</span><span class="mono">[BOOTCAMP_${stream}] // AI &gt;&gt; NATIVE DEVELOPER</span></div>
<div>
  <p class="mono label">Сертификат о завершении программы</p>
  <h1 class="name">${c.name.replace(' ', '<br>')}</h1>
  <p class="program">Онлайн-буткемп для разработчиков<br>по внедрению <em>AI в рабочий процесс</em></p>
</div>
<div class="bottom">
  <div class="stat"><span class="mono">Поток ${stream}</span><b>${period}</b></div>
  ${c.lessons ? `<div class="stat"><span class="mono">Пройдено уроков</span><b>${c.lessons}</b></div>` : ''}
  <div class="stat"><span class="mono">Дата выдачи</span><b>${date}</b></div>
  <div class="verify">
    <div class="mono"><span>Проверить подлинность</span><span class="ink">ai-nation.ru/dev/verify</span><span class="ink">ID ${c.id}</span></div>
    <div class="qr">${qrSvg(`https://ai-nation.ru/dev/verify/${c.id}/`)}</div>
  </div>
</div>
</body></html>`;
}

mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), 'cert-'));
try {
  for (const c of certs) {
    const html = path.join(tmp, 'cert.html');
    const png = path.resolve(out, `${c.name}.png`);
    writeFileSync(html, page(c));
    execFileSync(chrome, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      `--user-data-dir=${path.join(tmp, 'profile')}`, '--allow-file-access-from-files',
      '--force-device-scale-factor=2', '--window-size=1600,1000', '--virtual-time-budget=3000',
      `--screenshot=${png}`, pathToFileURL(html).href,
    ], { stdio: 'ignore' });
    console.log(`${c.id}  ${png}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
