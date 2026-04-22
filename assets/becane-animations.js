/**
 * Bécane Paris Animations & Interactions
 * Implements IntersectionObserver for fade-ins and scroll-triggered header background.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Bécane Paris Brutalist Animations
  const revealElements = document.querySelectorAll('.grid-box, .product-card, .hero h1, .media-block, .reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // No unobserve if we want them to re-reveal, but usually once is enough
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01, // Reveal almost instantly
    rootMargin: '0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Header Scroll Compact
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
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
