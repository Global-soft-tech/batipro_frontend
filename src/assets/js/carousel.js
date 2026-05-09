// ============================================================
// BATIPRO — Hero carousel focus central
// Crossfade transition + scale on inactive slides
// Left/right shadows handled in CSS (always visible)
// ============================================================

(function () {

  const CAPTIONS = [
    'Editeur de couleurs intuitif',
    'Gestion automatique de la TVA',
    'Suivi de vos revenus en temps reel',
    'Devis professionnel en 2 minutes',
  ];

  const slides  = document.querySelectorAll('.hero-slide');
  const dots    = document.querySelectorAll('.hero-dot');
  const caption = document.getElementById('hero-caption');
  const btnPrev = document.getElementById('hero-prev');
  const btnNext = document.getElementById('hero-next');

  let current = 0;
  let timer   = null;

  function render(index) {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      // Active: fully visible, normal scale
      // Inactive: invisible, slightly zoomed out (crossfade effect)
      slide.style.opacity   = isActive ? '1' : '0';
      slide.style.zIndex    = isActive ? '2' : '1';
      slide.style.transform = isActive ? 'scale(1)' : 'scale(1.04)';
    });

    // Update caption text
    if (caption) caption.textContent = CAPTIONS[index] || '';

    // Update dots
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.style.width           = active ? '20px' : '6px';
      dot.style.backgroundColor = active ? '#F97316' : 'rgba(255,255,255,0.35)';
    });

    current = index;
  }

  function goTo(i) {
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    render(i);
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  function resetAuto() {
    stopAuto();
    setTimeout(startAuto, 8000);
  }

  // Arrow buttons
  if (btnPrev) btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (btnNext) btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(+dot.dataset.dot); resetAuto(); });
  });

  // Touch swipe support
  let touchX = 0;
  const viewport = slides[0]?.parentElement;
  if (viewport) {
    viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', e => {
      const dx = touchX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) { goTo(dx > 0 ? current + 1 : current - 1); resetAuto(); }
    });
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    render(0);
    startAuto();
  });

})();