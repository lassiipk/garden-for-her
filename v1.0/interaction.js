// interaction.js — shared repulsion effect
(function() {
  function initRepulsion() {
    if (!GARDEN_CONFIG.repulsion.enabled) return;

    const cfg = GARDEN_CONFIG.repulsion;
    const elements = document.querySelectorAll('[data-repel]');
    if (!elements.length) return;

    const origins = Array.from(elements).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        ox: rect.left + rect.width / 2 + window.scrollX,
        oy: rect.top + rect.height / 2 + window.scrollY,
        cx: 0, cy: 0
      };
    });

    let mouseX = -9999, mouseY = -9999;
    let rafId = null;

    function update() {
      const intensity = cfg.intensity / 100;
      origins.forEach(o => {
        const dx = mouseX - (o.ox + o.cx);
        const dy = mouseY - (o.oy + o.cy);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < cfg.radius && dist > 0) {
          const force = (1 - dist / cfg.radius) * cfg.intensity * intensity;
          o.cx -= (dx / dist) * force * 0.5;
          o.cy -= (dy / dist) * force * 0.5;
        }

        // Drift back
        o.cx *= 0.92;
        o.cy *= 0.92;

        o.el.style.transform = `translate(${o.cx}px, ${o.cy}px)`;
        o.el.style.transition = `transform ${cfg.returnSpeed * 0.3}s ease-out`;
      });
      rafId = requestAnimationFrame(update);
    }

    function onMove(x, y) {
      mouseX = x + window.scrollX;
      mouseY = y + window.scrollY;
    }

    document.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    document.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    }, { passive: false });

    document.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

    rafId = requestAnimationFrame(update);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRepulsion);
  } else {
    initRepulsion();
  }
})();
