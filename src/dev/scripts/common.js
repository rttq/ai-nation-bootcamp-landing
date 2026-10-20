// Behaviour shared by more than one page. Everything here is driven by
// `data-js` / `data-modal` attributes, never by a visual class — restyling a
// page must not be able to break it (REDESIGN-PLAN.md rule 10).
//
// Lifted out of index.astro's inline script when /teams and /community moved
// onto the design system: teams had its own third copy of the modal logic
// (three near-identical open/close pairs) and community its own FAQ.
// Page-specific behaviour (tabs, carousel, streams, burger) stays inline on
// the page that owns it. The collapsible lesson list moved here once /dev/ and
// /dev/special/ both used it.

// --- FAQ accordion ---
// Three things move in lockstep: data-open on the row, aria-expanded on the
// question button, hidden on the answer.
document.querySelectorAll('[data-js="faq-row"]').forEach(function (row) {
  var toggle = row.querySelector('[data-js="faq-toggle"]');
  var answer = row.querySelector('.faq__a');
  if (!toggle || !answer) return;
  toggle.addEventListener('click', function () {
    var open = row.dataset.open === 'true';
    row.dataset.open = String(!open);
    toggle.setAttribute('aria-expanded', String(!open));
    answer.hidden = open;
  });
});

// --- collapsible lesson (program) ---
// Раскрытие урока в программе (/dev/ и /dev/special/). Слушаем шапку целиком, а кнопка —
// единственный элемент в фокусе: Enter и пробел на ней всплывают сюда, срабатывает один раз.
// Две вещи движутся вместе: aria-expanded на кнопке и hidden на теле (.lesson__top).
document.querySelectorAll('[data-js="lesson-head"]').forEach(function (head) {
  head.addEventListener('click', function () {
    var btn = head.querySelector('[data-js="lesson-toggle"]');
    var body = btn && document.getElementById(btn.getAttribute('aria-controls'));
    if (!body) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.hidden = open;
  });
});

// --- generic modal system ---
// One implementation for every overlay on the site, keyed by
// data-modal="<name>" on the dialog and data-modal-open="<name>" on triggers.
(function () {
  var modals = {};
  document.querySelectorAll('[data-js="modal"]').forEach(function (m) {
    modals[m.getAttribute('data-modal')] = m;
  });
  if (!Object.keys(modals).length) return;
  var lastFocused = null;

  // idx.xl.ru application widget. Injected lazily, never on initial page load:
  // it is a third-party render-blocking script and most visitors never reach
  // a form. Mount state is tracked per-container (dataset), not globally,
  // since the page can hold more than one independent widget container.
  function mountWidget(body, widgetId) {
    if (!body || body.dataset.mountedWidget === widgetId) return;
    body.innerHTML = '';
    body.dataset.mountedWidget = widgetId;
    var s = document.createElement('script');
    s.setAttribute('ao-number', '3272');
    s.setAttribute('ao-widget-id', widgetId);
    s.setAttribute('ao-domain', 'content.scalingclub.ru');
    s.src = 'https://idx.xl.ru/site/widget/widget.min.js';
    s.async = true;
    body.appendChild(s);
  }

  function openModal(name, widgetId) {
    var modal = modals[name];
    if (!modal) return;
    // Модалка может открыться поверх модалки: кнопка в «Что входит в буткемп»
    // ведёт в форму заявки. Предыдущую закрываем, иначе она остаётся слоем
    // ниже, держит body в overflow:hidden и один Escape гасит обе.
    // lastFocused при этом не перезаписываем — фокус должен вернуться на ту
    // кнопку страницы, с которой цепочка началась, а не внутрь закрытой формы.
    var stacked = openModals();
    stacked.forEach(function (m) { if (m !== modal) closeModal(m); });
    if (!stacked.length) lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var dialog = modal.querySelector('.modal__dialog');
    if (dialog) dialog.focus();
    // Fallback to a widget id declared on the modal itself: lets a modal embed
    // the form directly (no separate trigger button carrying data-widget-id).
    var wid = widgetId || modal.getAttribute('data-widget-id');
    if (wid) mountWidget(modal.querySelector('[data-js="widget-body"]'), wid);
  }
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }
  function openModals() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-js="modal"]')).filter(function (m) { return !m.hidden; });
  }

  document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      // Триггер может быть ссылкой (кнопки записи на /dev/ ведут в Telegram):
      // с JS открываем окно, без JS работает обычный переход по href.
      if (btn.tagName === 'A' && modals[btn.getAttribute('data-modal-open')]) e.preventDefault();
      // close the home page's burger panel if it happens to be open. The
      // burger's own aria-expanded has to come back with it, or the X stays
      // frozen open — visible now that the panel's CTA opens a modal instead
      // of navigating away.
      var burgerPanel = document.getElementById('nav-panel');
      if (burgerPanel) burgerPanel.classList.remove('is-open');
      var burgerBtn = document.querySelector('[data-js="burger"]');
      if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
      openModal(btn.getAttribute('data-modal-open'), btn.getAttribute('data-widget-id'));
    });
  });
  document.querySelectorAll('[data-js="modal-close"]').forEach(function (el) {
    el.addEventListener('click', function () {
      var modal = el.closest('[data-js="modal"]');
      if (modal) closeModal(modal);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    openModals().forEach(closeModal);
  });

  // Widget containers embedded straight in page content (no modal, no click
  // to defer to) carry their own data-widget-id and mount when scrolled near.
  //
  // rootMargin 800px — примерно экран мобильного форы. Было 200px: виджет
  // начинал грузиться, когда блок цены уже въезжал во вьюпорт, а сторонний
  // скрипт тратит 1–2 секунды на загрузку и инициализацию, и человек успевал
  // увидеть пустую дырку min-height:200px. Форму держим ленивой (большинство
  // до низа не доходит), но упреждение даём в размер экрана, а не в 200px.
  var inlineWidgets = document.querySelectorAll('[data-js="widget-body"][data-widget-id]');
  if (inlineWidgets.length) {
    var widgetObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        mountWidget(entry.target, entry.target.getAttribute('data-widget-id'));
        widgetObserver.unobserve(entry.target);
      });
    }, { rootMargin: '800px' });
    inlineWidgets.forEach(function (el) { widgetObserver.observe(el); });
  }
})();
