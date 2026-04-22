/**
 * Bécane Paris — Site-matched JS
 * · Product numbering (01, 02…) injected above each product card image
 * · Header scroll state (transparent → opaque at 80px)
 * · IntersectionObserver fade-in on scroll
 * · Smooth page opacity entry
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Product numbering — inject "01" above each card image ──
  function addProductNumbers() {
    const grids = document.querySelectorAll(
      '.product-grid, .resource-list, .collection-wrapper .grid'
    );

    grids.forEach(grid => {
      const items = grid.querySelectorAll(
        '.product-grid__item, .resource-list__item'
      );

      items.forEach((item, i) => {
        const gallery = item.querySelector(
          '.product-card__gallery, .card-gallery, .product-card__image'
        );
        if (!gallery) return;

        // Only add if not already added
        if (item.querySelector('.bp-number')) return;

        const num = document.createElement('span');
        num.className = 'bp-number';
        num.textContent = String(i + 1).padStart(2, '0');

        // Insert before the gallery (above the image)
        gallery.parentNode.insertBefore(num, gallery);
      });
    });
  }

  addProductNumbers();

  // Re-run after any AJAX loads (infinite scroll, etc.)
  const gridContainer = document.querySelector('.product-grid-container');
  if (gridContainer) {
    new MutationObserver(addProductNumbers).observe(gridContainer, {
      childList: true,
      subtree: true,
    });
  }

  // ── 2. Header scroll state ──────────────────────────────────
  const header = document.querySelector('header-component, .header');
  if (header) {
    let ticking = false;
    const THRESHOLD = 80;

    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── 3. Scroll fade-in via IntersectionObserver ──────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll(
    '.product-grid__item, .resource-list__item, ' +
    '.media-with-content, .reveal, [data-reveal], ' +
    '.hero__content, .footer-content'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // ── 4. Page entry fade ──────────────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // ── 5. Hero entry animation ─────────────────────────────────
  const heroEl = document.querySelector('.hero h1, .hero__heading');
  if (heroEl) {
    Object.assign(heroEl.style, {
      opacity: '0',
      transform: 'translateY(28px)',
      transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s',
    });
    requestAnimationFrame(() => {
      heroEl.style.opacity = '1';
      heroEl.style.transform = 'translateY(0)';
    });
  }

});
