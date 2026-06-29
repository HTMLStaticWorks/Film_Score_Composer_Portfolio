/* ═══════════════════════════════════════════════════════════
   CineTone — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── THEME TOGGLE ──────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('cinetone-theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = saved || system;
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcons(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cinetone-theme', next);
  updateThemeIcons(next);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-icon').forEach(el => {
    el.className = 'theme-icon ' + (theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon');
  });
}

/* ─── RTL TOGGLE ────────────────────────────────────────── */
function initRTL() {
  const saved = localStorage.getItem('cinetone-dir');
  if (saved) document.documentElement.setAttribute('dir', saved);
}

function toggleRTL() {
  const current = document.documentElement.getAttribute('dir') || 'ltr';
  const next = current === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('dir', next);
  localStorage.setItem('cinetone-dir', next);
}

/* ─── NAVBAR ────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .drawer-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─── DRAWER ────────────────────────────────────────────── */
function initDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('drawer-close');
  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ─── SCROLL REVEAL ─────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ─── PROJECT ACCORDION ─────────────────────────────────── */
function initProjects() {
  document.querySelectorAll('.project-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.project-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.project-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─── TYPEWRITER EFFECT ─────────────────────────────────── */
function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const words = el.getAttribute('data-typewriter').split(',').map(w => w.trim());
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];
    if (deleting) {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; setTimeout(type, 400); return; }
    } else {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
    }
    setTimeout(type, deleting ? 60 : 90);
  }

  type();
}

/* ─── COUNTDOWN TIMER ───────────────────────────────────── */
function initCountdown() {
  const target = document.getElementById('countdown-target');
  if (!target) return;

  const deadline = new Date(target.getAttribute('data-deadline'));

  function update() {
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) { target.textContent = 'Live!'; return; }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent = pad(d);
    document.getElementById('cd-hours').textContent = pad(h);
    document.getElementById('cd-mins').textContent = pad(m);
    document.getElementById('cd-secs').textContent = pad(s);
  }

  update();
  setInterval(update, 1000);
}

/* ─── FORM VALIDATION ───────────────────────────────────── */
function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const val = field.value.trim();
        const err = field.nextElementSibling;

        field.classList.remove('error', 'success');
        if (err && err.classList.contains('form-error')) err.style.display = 'none';

        if (!val) {
          valid = false;
          field.classList.add('error');
          if (err && err.classList.contains('form-error')) {
            err.textContent = 'This field is required.';
            err.style.display = 'block';
          }
          return;
        }

        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          valid = false;
          field.classList.add('error');
          if (err && err.classList.contains('form-error')) {
            err.textContent = 'Please enter a valid email address.';
            err.style.display = 'block';
          }
          return;
        }

        if (field.type === 'password' && val.length < 8) {
          valid = false;
          field.classList.add('error');
          if (err && err.classList.contains('form-error')) {
            err.textContent = 'Password must be at least 8 characters.';
            err.style.display = 'block';
          }
          return;
        }

        field.classList.add('success');
      });

      // Confirm password
      const pwd = form.querySelector('[name="password"]');
      const confirm = form.querySelector('[name="confirm_password"]');
      if (pwd && confirm && pwd.value !== confirm.value) {
        valid = false;
        confirm.classList.remove('success');
        confirm.classList.add('error');
        const err = confirm.nextElementSibling;
        if (err && err.classList.contains('form-error')) {
          err.textContent = 'Passwords do not match.';
          err.style.display = 'block';
        }
      }

      // Terms checkbox
      const terms = form.querySelector('[name="terms"]');
      if (terms && !terms.checked) {
        valid = false;
        terms.closest('.form-group').style.color = '#E53E3E';
      }

      if (valid) {
        const msg = form.querySelector('.form-success-msg');
        if (msg) { msg.style.display = 'block'; }
        form.reset();
        setTimeout(() => { if (msg) msg.style.display = 'none'; }, 4000);
      }
    });

    // Live validation
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => {
        if (field.value.trim()) field.classList.remove('error');
      });
    });
  });
}

/* ─── AUDIO PLAYER MOCK ─────────────────────────────────── */
function initPlayer() {
  document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      const isPlaying = btn.classList.contains('playing');
      document.querySelectorAll('.play-btn.playing').forEach(b => {
        b.classList.remove('playing');
        const i = b.querySelector('i');
        if (i) { i.className = 'ph ph-play'; }
      });
      if (!isPlaying) {
        btn.classList.add('playing');
        if (icon) icon.className = 'ph ph-pause';
      }
    });
  });
}

/* ─── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initDrawer();
  initReveal();
  initProjects();
  initTypewriter();
  initCountdown();
  initForms();
  initPlayer();

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleRTL);
  });
});
