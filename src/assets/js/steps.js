// ============================================================
// BATIPRO — Steps section interaction
// Handles: timeline progress, dot states, photo crossfade, auto-cycle
// ============================================================

let currentStep = 0;
let cycleTimer  = null;

// Timeline progress line height per step index
const PROGRESS = ['0%', '50%', '100%'];

/**
 * Activate a step by index (0, 1, 2).
 * Updates dots, title colors, timeline line, and swaps the photo.
 */
function activateStep(index) {
  if (index === currentStep) return;

  currentStep = index;

  // --- Update dot + title styles for each step ---
  [0, 1, 2].forEach(i => {
    const dot   = document.getElementById('dot-'   + i);
    const num   = document.getElementById('num-'   + i);
    const title = document.getElementById('title-' + i);

    if (i < index) {
      // Past step: orange outline, orange number
      dot.style.borderColor     = '#F97316';
      dot.style.backgroundColor = '#0b231f';
      num.style.color           = '#F97316';
      if (title) title.style.color = 'rgba(255,255,255,0.7)';

    } else if (i === index) {
      // Active step: filled orange dot, dark number
      dot.style.borderColor     = '#F97316';
      dot.style.backgroundColor = '#F97316';
      num.style.color           = '#0b231f';
      if (title) title.style.color = '#F97316';

    } else {
      // Future step: dimmed
      dot.style.borderColor     = 'rgba(255,255,255,0.15)';
      dot.style.backgroundColor = '#0b231f';
      num.style.color           = 'rgba(255,255,255,0.25)';
      if (title) title.style.color = 'white';
    }
  });

  // --- Move the orange progress line ---
  const line = document.getElementById('timeline-progress');
  if (line) line.style.height = PROGRESS[index];

  // --- Crossfade photos ---
  document.querySelectorAll('.step-photo').forEach((photo, i) => {
    if (i === index) {
      photo.style.opacity   = '1';
      photo.style.transform = 'scale(1)';
    } else {
      photo.style.opacity   = '0';
      photo.style.transform = 'scale(1.03)';
    }
  });
}

/**
 * Start the auto-cycle timer (advances every 3.5s).
 */
function startCycle() {
  cycleTimer = setInterval(() => {
    const next = (currentStep + 1) % 3;
    activateStep(next);
  }, 3500);
}

/**
 * Stop the cycle, then restart it after a delay.
 * Called when the user clicks a step manually.
 */
function pauseThenResume() {
  clearInterval(cycleTimer);
  setTimeout(startCycle, 8000);
}

// ---- Boot on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
  // Reset progress line to zero on load
  const line = document.getElementById('timeline-progress');
  if (line) line.style.height = '0%';

  // Attach manual-click listeners to each step card
  document.querySelectorAll('.step-item').forEach(item => {
    item.addEventListener('click', pauseThenResume);
  });

  // Kick off the auto-cycle
  startCycle();
});