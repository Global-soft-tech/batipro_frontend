/**
 * BATIPRO — Carousel Témoignages
 * Fichier : assets/js/testimonials.js
 */

const testimonials = [
  {
    quote: "Avant BATIPRO, je perdais 30 minutes à refaire le même devis à la main. Maintenant c'est fait en 2 minutes, envoyé sur WhatsApp, et le client répond dans la foulée.",
    name: "Jean-Baptiste Mfou",
    role: "Plombier — Yaoundé",
    avatar: "./assets/images/testi-1.jpg",
  },
  {
    quote: "Je travaille souvent sur chantier sans laptop. BATIPRO depuis le téléphone, c'est exactement ce qu'il me fallait. Le PDF sort professionnel, mes clients prennent ça au sérieux.",
    name: "Rodrigue Essomba",
    role: "Électricien — Douala",
    avatar: "./assets/images/testi-2.jpg",
  },
  {
    quote: "J'ai testé plusieurs outils mais ils étaient en euros, sans FCFA, sans WhatsApp. BATIPRO c'est fait pour nous. Le catalogue de prestations me fait gagner un temps fou.",
    name: "Hervé Nkoulou",
    role: "Entrepreneur BTP — Bafoussam",
    avatar: "./assets/images/testi-3.jpg",
  },
];

(function () {
  let current = 0;
  let autoTimer = null;
  const AUTO_DELAY = 5000;

  const quoteEl  = document.getElementById("testi-quote");
  const nameEl   = document.getElementById("testi-name");
  const roleEl   = document.getElementById("testi-role");
  const avatarEl = document.getElementById("testi-avatar");
  const bgEl     = document.getElementById("testi-avatar-bg");
  const dotsWrap = document.getElementById("testi-dots");
  const btnPrev  = document.getElementById("testimonial-prev");
  const btnNext  = document.getElementById("testimonial-next");

  if (!quoteEl || !btnNext) return;

  /* ── Dots ── */
  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "testi-dot w-2 h-2 rounded-full transition-all duration-300 cursor-pointer";
    dot.style.backgroundColor = i === 0 ? "#F97316" : "rgba(255,255,255,0.25)";
    dot.setAttribute("aria-label", `Témoignage ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    dotsWrap.querySelectorAll(".testi-dot").forEach((d, i) => {
      d.style.backgroundColor = i === current ? "#F97316" : "rgba(255,255,255,0.25)";
      d.style.transform = i === current ? "scale(1.4)" : "scale(1)";
    });
  }

  function render(index, dir) {
    const t = testimonials[index];
    const animated = [quoteEl, nameEl, roleEl, avatarEl];

    /* fade out */
    animated.forEach(el => {
      el.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      el.style.opacity    = "0";
      el.style.transform  = dir > 0 ? "translateX(-14px)" : "translateX(14px)";
    });

    setTimeout(() => {
      quoteEl.textContent = `« ${t.quote} »`;
      nameEl.textContent  = t.name;
      roleEl.textContent  = t.role;

      if (avatarEl) { avatarEl.src = t.avatar; avatarEl.alt = t.name; }

      /* Photo de fond — cross-fade */
      if (bgEl) {
        bgEl.style.transition = "opacity 0.4s ease";
        bgEl.style.opacity = "0";
        setTimeout(() => {
          bgEl.src = t.avatar;
          bgEl.style.opacity = "1";
        }, 200);
      }

      /* fade in depuis l'autre côté */
      animated.forEach(el => {
        el.style.transform = dir > 0 ? "translateX(14px)" : "translateX(-14px)";
      });
      requestAnimationFrame(() => {
        animated.forEach(el => {
          el.style.opacity   = "1";
          el.style.transform = "translateX(0)";
        });
      });
    }, 260);

    updateDots();
  }

  function goTo(index, dir) {
    const direction = dir !== undefined ? dir : (index > current ? 1 : -1);
    current = (index + testimonials.length) % testimonials.length;
    render(current, direction);
    resetAuto();
  }

  function next() { goTo(current + 1,  1); }
  function prev() { goTo(current - 1, -1); }

  function startAuto() { autoTimer = setInterval(next, AUTO_DELAY); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  /* Swipe mobile */
  let touchStartX = 0;
  const section = quoteEl.closest("section");
  if (section) {
    section.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    section.addEventListener("touchend",   e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    }, { passive: true });
  }

  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  render(0, 1);
  startAuto();
})();