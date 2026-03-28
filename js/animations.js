document.addEventListener('DOMContentLoaded', () => {

  const loader = document.getElementById('loader');
  const loaderPercentage = document.querySelector('.loader-percentage');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('loader-fade-out');
        initScrollReveals();
      }, 500);
    }
    loaderPercentage.textContent = progress + '%';
  }, 100);

  const initScrollReveals = () => {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .line-inner');

    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  };

  /* Parallax Logic */
  const parallaxElements = document.querySelectorAll('.parallax-img');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = 0.15;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});

