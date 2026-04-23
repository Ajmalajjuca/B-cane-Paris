/**
 * Bécane Paris — Site-matched JS
 * · Product numbering (01, 02…) injected above each product card image
 * · Header scroll state (transparent → opaque at 80px)
 * · IntersectionObserver fade-in on scroll
 * · Smooth page opacity entry
 * · Hero stagger animation (label → h1 → desc → CTA)
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

        if (item.querySelector('.bp-number')) return;

        const num = document.createElement('span');
        num.className = 'bp-number';
        num.textContent = String(i + 1).padStart(2, '0');
        gallery.parentNode.insertBefore(num, gallery);
      });
    });
  }

  addProductNumbers();

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
    '.footer-content'
  ).forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
    observer.observe(el);
  });

  // ── 4. Page entry fade ──────────────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // ── 5. Hero stagger animation ───────────────────────────────
  // Stagger all direct children inside hero content wrapper
  const heroContent = document.querySelector('.hero__content, .hero__content-wrapper');
  if (heroContent) {
    const children = Array.from(heroContent.children);
    children.forEach((el, i) => {
      const delay = 0.15 + i * 0.12;
      Object.assign(el.style, {
        opacity: '0',
        transform: 'translateY(22px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      });
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        children.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // ── 6. Product section count display ───────────────────────
  // Inject count badge next to product section title (e.g. "All Products  27")
  const sectionHeader = document.querySelector('.section-resource-list__header');
  if (sectionHeader) {
    const cards = document.querySelectorAll('.resource-list__item, .product-grid__item');
    if (cards.length > 0) {
      const countEl = document.createElement('span');
      countEl.className = 'bp-product-count';
      countEl.style.cssText = `
        font-family: 'Space Mono', monospace;
        font-size: 0.6rem;
        color: #888;
        letter-spacing: 0.08em;
        margin-left: 0.75rem;
        font-weight: 400;
      `;
      countEl.textContent = String(cards.length).padStart(2, '0');
      const titleEl = sectionHeader.querySelector('p, h2, h3, .rte');
      if (titleEl) titleEl.appendChild(countEl);
    }
  }

});
