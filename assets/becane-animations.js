/**
 * Bécane Paris — Editorial Animations
 * Fade-in on scroll · transparent header · smooth page entry
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Scroll fade-in via IntersectionObserver ──────────────
  const revealTargets = document.querySelectorAll(
    '.product-card, .media-with-content, .hero__content, ' +
    '.section, .footer-content, .reveal, [data-reveal]'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => {
    if (!el.classList.contains('is-visible')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });

  // ── 2. Header: show background after 80px scroll ────────────
  const header = document.querySelector('header-component, .header');
  if (header) {
    const SCROLL_THRESHOLD = 80;
    let ticking = false;

    const updateHeader = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── 3. Smooth page entry ────────────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // ── 4. Hero headline fade-up on load ────────────────────────
  const heroHeading = document.querySelector('.hero h1, .hero__heading, .hero .heading');
  if (heroHeading) {
    heroHeading.style.opacity = '0';
    heroHeading.style.transform = 'translateY(32px)';
    heroHeading.style.transition = 'opacity 1s ease 0.3s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s';
    window.requestAnimationFrame(() => {
      heroHeading.style.opacity = '1';
      heroHeading.style.transform = 'translateY(0)';
    });
  }

  const heroSub = document.querySelector('.hero .subheading, .hero__subheading, .hero p');
  if (heroSub) {
    heroSub.style.opacity = '0';
    heroSub.style.transition = 'opacity 0.9s ease 0.65s';
    window.requestAnimationFrame(() => {
      heroSub.style.opacity = '1';
    });
  }

});
