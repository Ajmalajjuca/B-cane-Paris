/**
 * Bécane Paris Animations & Interactions
 * Implements IntersectionObserver for fade-ins and scroll-triggered header background.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal, .hero h1, .hero h2, .hero p, .media-block');
  
  // Add .reveal class if not present for basic fade-ins
  document.querySelectorAll('.section, .product-card').forEach(el => {
    if (!el.classList.contains('hero')) {
      el.classList.add('reveal');
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 2. Header scroll background
  const header = document.querySelector('.header-section');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  // 3. Simple page opacity transition
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  window.requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
