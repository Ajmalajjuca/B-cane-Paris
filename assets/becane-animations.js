/**
 * Bécane Paris Animations & Interactions
 * Implements IntersectionObserver for fade-ins and scroll-triggered header background.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal, .hero h1, .media-block, .product-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Header scroll behavior - already handled by CSS grid borders mostly,
  // but we can add a 'compact' trigger if needed.
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
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
