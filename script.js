/* ═══════════════════════════════════════════════════
   NAMITH NAYAK K — Portfolio JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── SECURITY SCAN ANIMATION ───
  const scanOverlay = document.getElementById('security-scan');
  const scanBar = document.getElementById('scan-bar-fill');
  const scanLabel = document.getElementById('scan-label');
  const scanDetails = document.getElementById('scan-details');

  const scanMessages = [
    { pct: 10, label: 'SCANNING PORTS...', detail: 'Checking open ports on target...' },
    { pct: 25, label: 'ENUMERATING SERVICES...', detail: 'Nmap -sV scan running...' },
    { pct: 40, label: 'VULNERABILITY ASSESSMENT...', detail: 'Running OWASP ZAP analysis...' },
    { pct: 55, label: 'PAYLOAD INJECTION TEST...', detail: 'Testing XSS / SQLi vectors...' },
    { pct: 70, label: 'BRUTE FORCE CHECK...', detail: 'Hydra checking credentials...' },
    { pct: 85, label: 'GENERATING REPORT...', detail: 'Compiling findings...' },
    { pct: 100, label: 'SCAN COMPLETE ✓', detail: 'No vulnerabilities found. Access granted.' },
  ];

  let scanIndex = 0;
  const scanInterval = setInterval(() => {
    if (scanIndex >= scanMessages.length) {
      clearInterval(scanInterval);
      setTimeout(() => {
        scanOverlay.classList.add('hidden');
        setTimeout(() => scanOverlay.style.display = 'none', 600);
      }, 500);
      return;
    }
    const msg = scanMessages[scanIndex];
    scanBar.style.width = msg.pct + '%';
    scanLabel.textContent = msg.label;
    scanDetails.textContent = msg.detail;
    scanIndex++;
  }, 350);

  // ─── HERO PARTICLE CANVAS ───
  const heroCanvas = document.getElementById('hero-canvas');
  const hCtx = heroCanvas.getContext('2d');
  let particles = [];

  function resizeHeroCanvas() {
    heroCanvas.width = heroCanvas.parentElement.offsetWidth;
    heroCanvas.height = heroCanvas.parentElement.offsetHeight;
  }
  resizeHeroCanvas();
  window.addEventListener('resize', resizeHeroCanvas);

  class Particle {
    constructor(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 1;
      this.color = ['#00f5ff', '#39ff14', '#bf5fff'][Math.floor(Math.random() * 3)];
    }
    update(w, h) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((heroCanvas.width * heroCanvas.height) / 12000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(heroCanvas.width, heroCanvas.height));
    }
  }
  initParticles();

  // Hex grid
  function drawHexGrid(ctx, w, h) {
    const size = 30;
    const hGap = size * 1.75;
    const vGap = size * 1.5;
    ctx.strokeStyle = 'rgba(0,245,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let row = -1; row < h / vGap + 1; row++) {
      for (let col = -1; col < w / hGap + 1; col++) {
        const x = col * hGap + (row % 2 ? hGap / 2 : 0);
        const y = row * vGap;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px = x + size * Math.cos(angle);
          const py = y + size * Math.sin(angle);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  function animateHero() {
    const w = heroCanvas.width, h = heroCanvas.height;
    hCtx.clearRect(0, 0, w, h);
    drawHexGrid(hCtx, w, h);

    particles.forEach(p => { p.update(w, h); p.draw(hCtx); });

    // Draw connections
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          hCtx.beginPath();
          hCtx.moveTo(particles[i].x, particles[i].y);
          hCtx.lineTo(particles[j].x, particles[j].y);
          hCtx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / maxDist)})`;
          hCtx.lineWidth = 0.5;
          hCtx.stroke();
        }
      }
    }
    requestAnimationFrame(animateHero);
  }
  animateHero();

  // ─── TYPING ANIMATION ───
  const roles = [
    'Penetration Tester',
    'AI/ML Engineer',
    'Full Stack Developer',
    'VAPT Specialist',
    'CTF Player'
  ];
  const typingEl = document.getElementById('typing-text');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIdx];
    if (!deleting) {
      typingEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx >= current.length) {
        setTimeout(() => { deleting = true; typeLoop(); }, 1800);
        return;
      }
      setTimeout(typeLoop, 70);
    } else {
      typingEl.textContent = current.slice(0, charIdx);
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 40);
    }
  }
  setTimeout(typeLoop, 2800);

  // ─── CURSOR TRAIL ───
  const trailCanvas = document.getElementById('cursor-trail');
  const tCtx = trailCanvas.getContext('2d');
  let trails = [];

  function resizeTrail() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }
  resizeTrail();
  window.addEventListener('resize', resizeTrail);

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      trails.push({ x: e.clientX, y: e.clientY, alpha: 0.5, size: 3 });
      if (trails.length > 30) trails.shift();
    });
  }

  function animateTrail() {
    tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    trails.forEach((t, i) => {
      t.alpha -= 0.015;
      t.size *= 0.97;
      if (t.alpha > 0) {
        tCtx.beginPath();
        tCtx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        tCtx.fillStyle = `rgba(0,245,255,${t.alpha})`;
        tCtx.fill();
      }
    });
    trails = trails.filter(t => t.alpha > 0);
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // ─── NAVBAR ───
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const sections = document.querySelectorAll('.section');
  const navAnchors = document.querySelectorAll('.nav-links a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active section highlight + domain color shift
  const domainColors = {
    skills: '#00f5ff',
    projects: '#00f5ff',
    domains: '#bf5fff',
    certifications: '#39ff14',
    contact: '#00f5ff',
    about: '#00f5ff',
  };

  function updateActiveNav() {
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) currentSection = sec.id;
    });

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.dataset.section === currentSection);
    });

    const color = domainColors[currentSection] || '#00f5ff';
    navbar.style.borderBottomColor = color + '30';
    document.querySelectorAll('.nav-links a.active::after').forEach(el => {
      el.style.background = color;
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // ─── SCROLL FADE-IN ───
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => fadeObserver.observe(el));

  // ─── TERMINAL TYPING (About section) ───
  const terminalBody = document.getElementById('terminal-body');
  if (terminalBody) {
    const termItems = terminalBody.querySelectorAll('.terminal-line, .terminal-output');
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          termItems.forEach(item => {
            const delay = parseInt(item.dataset.delay || 0);
            setTimeout(() => {
              item.classList.add('visible');
              if (item.dataset.text) {
                item.textContent = item.dataset.text;
                if (item.dataset.class) item.classList.add(item.dataset.class);
              }
            }, delay);
          });
          termObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    termObserver.observe(terminalBody);
  }

  // ─── PROJECT FILTERS ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.domain === filter) {
          card.classList.remove('hidden-card');
          card.style.display = '';
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });

  // ─── CONTACT FORM ───
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit span:first-child');
      btn.textContent = 'Sent! ✓';
      setTimeout(() => { btn.textContent = 'Send Message'; }, 2500);
      contactForm.reset();
    });
  }

  // ─── SMOOTH SCROLL for CTA ───
  document.getElementById('cta-work')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  });

});
