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

