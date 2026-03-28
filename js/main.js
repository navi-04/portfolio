document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      window.requestAnimationFrame(renderCursor);
    };

    window.requestAnimationFrame(renderCursor);

    const onEnter = () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.borderColor = 'var(--accent)';
    };

    const onLeave = () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'var(--text-secondary)';
    };

    document.body.addEventListener('mouseover', (event) => {
      if (event.target.closest('a, button, .work-item')) {
        onEnter();
      }
    });

    document.body.addEventListener('mouseout', (event) => {
      if (event.target.closest('a, button, .work-item')) {
        onLeave();
      }
    });
  }

  if (typeof portfolioData === 'undefined') {
    return;
  }

  const navUl = document.getElementById('dynamic-nav');
  if (navUl) {
    navUl.innerHTML = portfolioData.navigation
      .map((item) => `<li><a href="${item.href}">${item.name}</a></li>`)
      .join('');
  }

  const heroGreeting = document.getElementById('hero-greeting');
  const heroTitle = document.getElementById('hero-title-container');
  const heroDescription = document.getElementById('hero-description');
  const heroCta = document.getElementById('hero-cta');

  const heroData = portfolioData.hero || {};
  const heroCtaData = heroData.cta || {};
  const personalName = typeof portfolioData.personal?.name === 'string' ? portfolioData.personal.name.trim() : '';
  const heroGreetingText = typeof heroData.greeting === 'string' ? heroData.greeting : 'Hello, I am';
  const heroTitleText = personalName || (typeof heroData.title === 'string' ? heroData.title : 'Developer');
  const heroSubtitleText = typeof heroData.subtitle === 'string' ? heroData.subtitle : '';
  const heroDescriptionText = typeof heroData.description === 'string' ? heroData.description : '';
  const heroFinalDescription = [heroSubtitleText, heroDescriptionText].filter(Boolean).join(' ');
  const heroCtaText = typeof heroCtaData.text === 'string' ? heroCtaData.text : 'Explore';
  const heroCtaHref = typeof heroCtaData.link === 'string' ? heroCtaData.link : '#about';

  if (heroGreeting) {
    heroGreeting.textContent = heroGreetingText;
  }
  if (heroTitle) {
    heroTitle.innerHTML = `<span class="line-wrap"><span class="line-inner is-revealed">${heroTitleText}</span></span>`;
  }
  if (heroDescription) {
    heroDescription.textContent = heroFinalDescription;
  }
  if (heroCta) {
    heroCta.textContent = heroCtaText;
    heroCta.setAttribute('href', heroCtaHref);
  }

  const aboutParagraphs = document.getElementById('about-paragraphs');
  if (aboutParagraphs) {
    aboutParagraphs.innerHTML = portfolioData.about.paragraphs
      .map(
        (paragraph) =>
          `<p class="reveal-text about-paragraph">${paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
      )
      .join('');
  }

  const skillsGrid = document.getElementById('about-skills');
  if (skillsGrid) {
    skillsGrid.innerHTML = portfolioData.about.skills
      .map((skill) => `<span class="skill-chip">${skill}</span>`)
      .join('');
  }

  const expContainer = document.getElementById('experience-container');
  if (expContainer) {
    expContainer.innerHTML = portfolioData.experience
      .map((exp, idx) => {
        const highlights = exp.highlights.map((h) => `<li>${h}</li>`).join('');
        const technologies = exp.technologies.map((t) => `<span>${t}</span>`).join('');

        return `
          <article class="experience-item stagger-${(idx % 4) + 1} reveal-up">
            <h3 class="experience-title">${exp.title}</h3>
            <p class="experience-meta">${exp.company} • ${exp.period}</p>
            <p class="experience-desc">${exp.description}</p>
            <ul class="experience-highlights">${highlights}</ul>
            <div class="experience-tech">${technologies}</div>
          </article>
        `;
      })
      .join('');
  }

  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    const projects = Array.isArray(portfolioData.projects) ? portfolioData.projects : [];

    projectsGrid.innerHTML = projects
      .map((project) => {
        const title = typeof project.title === 'string' ? project.title : 'Untitled Project';
        const type = typeof project.type === 'string' ? project.type : 'Project';
        const description = typeof project.description === 'string' ? project.description : 'Description coming soon.';
        const technologies = Array.isArray(project.technologies)
          ? project.technologies.filter(Boolean).join(', ')
          : 'Tech details pending';

        const demoLink = typeof project.links?.demo === 'string' && project.links.demo.trim() !== '#'
          ? project.links.demo
          : null;

        const linkMarkup = demoLink
          ? `<a class="project-link" href="${demoLink}" target="_blank" rel="noopener noreferrer">View Project</a>`
          : '';

        return `
          <article class="work-item reveal-up">
            <h3 class="project-title">${title} <span>(${type})</span></h3>
            <p class="work-description">${description}</p>
            <p class="project-tech">${technologies}</p>
            ${linkMarkup}
          </article>
        `;
      })
      .join('');
  }

  const contactTitle = document.getElementById('contact-title');
  const contactSubtitle = document.getElementById('contact-subtitle');
  if (contactTitle) {
    contactTitle.textContent = portfolioData.contact.title;
  }
  if (contactSubtitle) {
    contactSubtitle.textContent = portfolioData.contact.subtitle;
  }

  const contactList = document.getElementById('contact-info-list');
  if (contactList) {
    contactList.innerHTML = portfolioData.contact.info
      .map((info) => {
        const detail = info.link
          ? `<a href="${info.link}" class="contact-inline-link">${info.detail}</a>`
          : `<span>${info.detail}</span>`;
        return `<p class="contact-row">${info.icon} ${info.title}: ${detail}</p>`;
      })
      .join('');
  }

  const socialList = document.getElementById('contact-social-list');
  if (socialList) {
    socialList.innerHTML = portfolioData.contact.social
      .map(
        (social) =>
          `<a href="${social.link}" class="contact-social-link" target="_blank" rel="noopener noreferrer">${social.name}</a>`
      )
      .join('');
  }

  const footerName = document.getElementById('footer-name');
  const navBrandText = document.getElementById('nav-brand-text');
  if (footerName) {
    footerName.textContent = portfolioData.personal.name;
  }
  if (navBrandText) {
    navBrandText.textContent = portfolioData.personal.name.split(' ')[0] + '.';
  }
});
