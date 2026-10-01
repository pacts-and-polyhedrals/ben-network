(() => {
  const root = document.documentElement;
  const aura = document.querySelector('.cursor-aura');
  const progress = document.getElementById('scrollProgress');
  const menu = document.getElementById('siteMenu');
  const menuToggle = document.querySelector('.menu-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor-reactive background and aura.
  if (!reducedMotion) {
    window.addEventListener('pointermove', (e) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
      if (aura) {
        aura.style.left = `${e.clientX}px`;
        aura.style.top = `${e.clientY}px`;
      }
    }, { passive: true });
  }

  // Scroll progress.
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${pct}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Reveal on scroll.
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    if (el.dataset.delay) el.style.setProperty('--delay', `${el.dataset.delay}ms`);
  });
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in-view'));
  }

  // Soft perspective tilt, intentionally subtle.
  if (!reducedMotion) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - .5;
        const y = (e.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(1100px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });

    // Magnetic buttons.
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .10;
        const y = (e.clientY - r.top - r.height / 2) * .12;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('pointerleave', () => btn.style.transform = '');
    });
  }

  // Mobile menu.
  menuToggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
    document.body.classList.toggle('menu-open', open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
    document.body.classList.remove('menu-open');
  }));

  // Interactive B.E.N. Test.
  const testItems = [...document.querySelectorAll('.test-item')];
  const meterFill = document.getElementById('meterFill');
  const meterText = document.getElementById('meterText');
  const meterMood = document.getElementById('meterMood');
  const moods = [
    'Start with one.', 'A good beginning.', 'Keep asking.', 'Momentum.',
    'More yes than no.', 'That’s benevolent energy.', 'Strong alignment.',
    'Nearly there.', 'Looking very B.E.N.', 'Probably heading in the right direction. 🌞🖤'
  ];
  const updateMeter = () => {
    const count = testItems.filter(item => item.getAttribute('aria-pressed') === 'true').length;
    const pct = (count / testItems.length) * 100;
    meterFill.style.width = `${pct}%`;
    meterText.textContent = `${count} of ${testItems.length} aligned`;
    meterMood.textContent = moods[count];
  };
  testItems.forEach(item => item.addEventListener('click', () => {
    const pressed = item.getAttribute('aria-pressed') === 'true';
    item.setAttribute('aria-pressed', String(!pressed));
    updateMeter();
  }));
  updateMeter();

  // Copy playful hashtag.
  const toast = document.getElementById('toast');
  let toastTimer;
  document.querySelectorAll('.copy-button').forEach(btn => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy || '';
    try {
      await navigator.clipboard.writeText(text);
      toast.textContent = `Copied ${text}`;
    } catch {
      toast.textContent = text;
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }));
})();
