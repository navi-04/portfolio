document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');

  const navLinks = document.querySelectorAll('.nav-links li a');

  let isNavOpen = false;

  navToggle.addEventListener('click', () => {
    isNavOpen = !isNavOpen;
    if (isNavOpen) {
      navOverlay.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      navOverlay.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      isNavOpen = false;
      navOverlay.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
});

