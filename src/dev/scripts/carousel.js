// Карусели: лента отзывов (с кольцом) и записи уроков (активный слайд по центру).
// Общий для главной /dev/ и /dev/special/. Раньше жил inline-скриптом в
// index.astro; модуль ничего не экспортирует, работает по data-js-крючкам и
// на странице без каруселей ничего не делает.

// Каруселей на главной две, поэтому querySelectorAll и поиск стрелок
// внутри своего .carousel: с document.querySelector обе кнопки одной
// карусели управляли бы чужим треком.
document.querySelectorAll('[data-js="carousel-track"]').forEach(function (track) {
  var root = track.closest('.carousel');
  var prev = root.querySelector('[data-js="carousel-prev"]');
  var next = root.querySelector('[data-js="carousel-next"]');

  // --- повадка вторая: активный слайд по центру, соседи приглушены ---
  // Ленты здесь нет — есть выбранный ролик и его соседи. Центрирование
  // делает CSS (scroll-snap-align:center + боковой отступ трека в половину
  // пустого места), скрипт только помечает, кто сейчас в центре.
  if (root.dataset.carousel === 'center') {
    var slides = [].slice.call(track.querySelectorAll('[data-js="center-slide"]'));
    if (!slides.length) return;

    // Считаем от getBoundingClientRect, а не от offsetLeft: offsetParent
    // у слайда — .carousel, и любой будущий отступ у трека увёл бы расчёт.
    function centerOffset(el) {
      var t = track.getBoundingClientRect(), r = el.getBoundingClientRect();
      return (r.left + r.width / 2) - (t.left + t.width / 2);
    }
    function nearest() {
      var best = 0, min = Infinity;
      slides.forEach(function (el, i) {
        var d = Math.abs(centerOffset(el));
        if (d < min) { min = d; best = i; }
      });
      return best;
    }
    // Уехавший из центра ролик продолжал играть: плеер сторонний, сам он
    // о переключении не знает. AccelPlayer слушает postMessage и
    // фильтрует по videoId — тому самому, что стоит в /v/<id> ссылки.
    // Кроме pause он понимает play, seekTo, mute, setVolume, getCurrentTime.
    function pauseOthers(keep) {
      slides.forEach(function (el, n) {
        if (n === keep) return;
        var f = el.querySelector('iframe');
        var id = f && (f.src.match(/\/v\/([^?]+)/) || [])[1];
        if (id && f.contentWindow) f.contentWindow.postMessage({ source: 'video', videoId: id, action: 'pause' }, '*');
      });
    }
    // Выходим, пока центр не сменился: mark() зовётся на каждый кадр
    // прокрутки, и без этого pause улетал бы по 60 раз в секунду.
    var current = -1;
    function mark() {
      var i = nearest();
      if (i === current) return;
      current = i;
      pauseOthers(i);
      slides.forEach(function (el, n) { el.classList.toggle('is-active', n === i); });
      // Крайние стрелки гасим: ленты с кольцом здесь нет, и молчащая
      // кнопка без объяснения читается как поломка.
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
    }
    function goTo(i) {
      var el = slides[Math.max(0, Math.min(slides.length - 1, i))];
      track.scrollBy({ left: centerOffset(el), behavior: 'smooth' });
    }
    // rAF, а не обработчик на каждый тик скролла: во время плавной
    // прокрутки событие приходит десятками, а пересчёт трогает классы.
    var queued = false;
    track.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; mark(); });
    });
    slides.forEach(function (el, i) {
      el.addEventListener('click', function () { if (!el.classList.contains('is-active')) goTo(i); });
    });
    prev && prev.addEventListener('click', function () { goTo(nearest() - 1); });
    next && next.addEventListener('click', function () { goTo(nearest() + 1); });
    addEventListener('resize', function () { current = -1; mark(); });
    mark();
    return;
  }

  function cardWidth() {
    var card = track.querySelector('.carousel__card');
    return card ? card.getBoundingClientRect().width + 24 : 340;
  }
  // Width of ONE copy of the list: the offset of the first clone. NOT
  // scrollWidth/2 — the two halves share one gap and there is no trailing
  // one, so that is half a gap short and every wrap would drift off the snap
  // points. Measuring the clone is exact whatever the gap and padding are.
  // 0 — список не продублирован (карусель уроков), закольцовывать нечего:
  // трек упрётся в свои края, как обычный скролл.
  function loop() {
    var kids = track.children;
    if (kids.length % 2) return 0;
    return kids[kids.length / 2].offsetLeft - kids[0].offsetLeft;
  }
  // Realign BEFORE scrolling, never during: assigning scrollLeft mid-flight
  // cancels the smooth animation, and the wrap is the one place it would be
  // most visible. Both ends stay a full copy away from the real edge, so
  // neither arrow can ever dead-end.
  function step(dir) {
    var L = loop();
    if (L) {
      if (dir > 0 && track.scrollLeft >= L) track.scrollLeft -= L;
      else if (dir < 0 && track.scrollLeft < cardWidth()) track.scrollLeft += L;
    }
    track.scrollBy({ left: dir * cardWidth(), behavior: 'smooth' });
  }
  prev && prev.addEventListener('click', function () { step(-1); });
  next && next.addEventListener('click', function () { step(1); });
});
