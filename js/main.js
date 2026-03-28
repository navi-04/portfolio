document.addEventListener('DOMContentLoaded', () => {

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(calc(vw / 2 - 50%), calc(vh / 2 - 50%))`;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  const renderCursor = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(renderCursor);
  };

  requestAnimationFrame(renderCursor);

  const interactables = document.querySelectorAll('a, button, .work-item');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.borderColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'var(--text-secondary)';
    });
  });
});

