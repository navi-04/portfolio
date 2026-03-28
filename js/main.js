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


document.addEventListener('DOMContentLoaded', () => {
    if (typeof portfolioData === 'undefined') return;

    // Navigation
    const navUl = document.getElementById('dynamic-nav');
    portfolioData.navigation.forEach(item => {
        navUl.innerHTML += <li><a href="${item.href}">${item.name}</a></li>;
    });

    // Hero
    document.getElementById('hero-greeting').textContent = portfolioData.hero.greeting;
    document.getElementById('hero-title-container').innerHTML = <span class="line-wrap"><span class="line-inner">${portfolioData.hero.title}</span></span>;
    document.getElementById('hero-description').textContent = portfolioData.hero.description;
    
    // About
    document.getElementById('about-paragraphs').innerHTML = portfolioData.about.paragraphs.map(p => <p class="reveal-text" style="font-size:1.2rem; margin-bottom:1rem; font-family:var(--font-primary);">${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>).join('');
    const skillsGrid = document.getElementById('about-skills');
    portfolioData.about.skills.forEach(skill => {
        skillsGrid.innerHTML += <span>${skill}</span>;
    });

    // Experience
    const expContainer = document.getElementById('experience-container');
    portfolioData.experience.forEach((exp, idx) => {
        const hls = exp.highlights.map(h => <li>${h}</li>).join('');
        const techs = exp.technologies.map(t => <span>${t}</span>).join('');
        expContainer.innerHTML += 
            <div class="experience-item stagger-${(idx%4)+1} reveal-up">
                <h3 class="experience-title">${exp.title}</h3>
                <span class="experience-meta">${exp.company} • ${exp.period}</span>
                <p class="experience-desc">${exp.description}</p>
                <ul style="margin-left: 20px; margin-bottom:1rem; color:var(--text-secondary); font-size:0.9rem;">${hls}</ul>
                <div class="experience-tech">${techs}</div>
            </div>;
    });

    // Projects (Work)
    const projContainer = document.getElementById('projects-grid');
    portfolioData.projects.forEach((proj, idx) => {
        const techs = proj.technologies.join(' • ');
        projContainer.innerHTML += 
            <article class="work-item">
                <div class="work-image parallax-img" style="display:flex;align-items:center;justify-content:center;font-size:5rem;">
                    ${proj.icon}
                </div>
                <div class="work-info">
                    <a href="${proj.links.demo}" target="_blank"><h3>${proj.title} (${proj.type})</h3></a>
                    <span>${techs}</span>
                </div>
                <p style="margin-top:0.5rem; color:var(--text-secondary);">${proj.description}</p>
            </article>;
    });

    // Contact
    document.getElementById('contact-subtitle').textContent = portfolioData.contact.subtitle;
    const contactList = document.getElementById('contact-info-list');
    portfolioData.contact.info.forEach(info => {
        const link = info.link ? <a href="${info.link}" style="text-decoration:underline;">${info.detail}</a> : <span>${info.detail}</span>;
        contactList.innerHTML += <div style="font-size:1.5rem; font-family:var(--font-heading);">${info.icon} ${info.title}: ${link}</div>;
    });
    
    const socialList = document.getElementById('contact-social-list');
    portfolioData.contact.social.forEach(social => {
        socialList.innerHTML += <a href="${social.link}" class="contact-social-link" target="_blank">${social.name}</a>;
    });

    document.getElementById('footer-name').textContent = portfolioData.personal.name;
    document.getElementById('nav-brand-text').textContent = portfolioData.personal.name.split(' ')[0] + '.';
});
