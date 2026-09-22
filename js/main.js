/* Timi Graphics portfolio - interactions & motion (no libraries: Web Animations API + IntersectionObserver) */
(() => {
  'use strict';
  const html = document.documentElement;
  try { init(); } catch (err) { console.error(err); html.classList.add('no-anim'); }

  function init() {
    // ---- Social links for the laptop screen icons (fill in to enable) ----
    const LINKS = {
      github: 'https://github.com/TheCreativeTimi',
      instagram: 'https://www.instagram.com/1timigraphics',
      linkedin: ''                                       // e.g. 'https://www.linkedin.com/in/yourname'
    };

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const mobile = () => matchMedia('(max-width: 820px)').matches;
    const hasIO = 'IntersectionObserver' in window;
    const EASE = 'cubic-bezier(.22,1,.36,1)';
    const OUT = 'cubic-bezier(.16,1,.3,1)';
    const BACK = 'cubic-bezier(.34,1.56,.64,1)';

    // Run an animation, then commit the final state through the "is-in" class and drop the animation
    function play(el, frames, opt = {}) {
      if (!el) return Promise.resolve();
      if (reduce || !el.animate) { el.classList.add('is-in'); return Promise.resolve(); }
      const a = el.animate(frames, { duration: 800, easing: EASE, fill: 'both', ...opt });
      return a.finished.then(() => { el.classList.add('is-in'); a.cancel(); }).catch(() => {});
    }

    function countUp(el, to, { duration = 1400, delay = 0, suffix = '' } = {}) {
      if (reduce) { el.textContent = to + suffix; return; }
      const start = performance.now() + delay;
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3))) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    const K = {
      up:    [{ opacity: 0, transform: 'translateY(38px)' }, { opacity: 1, transform: 'none' }],
      left:  [{ opacity: 0, transform: 'translateX(-70px)' }, { opacity: 1, transform: 'none' }],
      right: [{ opacity: 0, transform: 'translateX(70px)' }, { opacity: 1, transform: 'none' }],
      pop:   [{ opacity: 0, transform: 'scale(.86)' }, { opacity: 1, transform: 'none' }],
      fade:  [{ opacity: 0 }, { opacity: 1 }]
    };

    function onView(els, cb, opts) {
      if (!hasIO) { els.forEach(cb); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } });
      }, opts);
      els.forEach((el) => io.observe(el));
    }

    // ================= NAV =================
    const nav = $('#nav');
    const bar = $('.progress');
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        nav.classList.toggle('scrolled', scrollY > 30);
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = $('#burger'), menu = $('#menu');
    function setMenu(open) {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    addEventListener('resize', () => { if (!mobile()) setMenu(false); });

    // scroll-spy
    const navLinks = $$('.links a[data-link]');
    if (hasIO) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const key = e.target.dataset.nav;
          navLinks.forEach((a) => {
            const on = a.dataset.link === key;
            a.classList.toggle('active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('main > section[data-nav]').forEach((s) => spy.observe(s));
    }

    // ================= HERO =================
    const typer = $('.type');
    let typeFull = '';
    if (typer) {
      typeFull = typer.dataset.text;
      if (!reduce) { $('.t', typer).textContent = ''; typer.classList.add('typing'); }
    }
    function typeText(delay, speed) {
      if (!typer || reduce) return;
      const t = $('.t', typer);
      setTimeout(() => {
        let i = 0;
        const iv = setInterval(() => {
          t.textContent = typeFull.slice(0, ++i);
          if (i >= typeFull.length) { clearInterval(iv); setTimeout(() => typer.classList.remove('typing'), 900); }
        }, speed);
      }, delay);
    }

    function heroIntro() {
      play(nav, [{ opacity: 0, transform: 'translateY(-26px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 100 });
      play($('[data-h="eyebrow"]'), K.up, { delay: 250 });
      const lineIn = [{ opacity: 1, transform: 'translateY(115%)' }, { opacity: 1, transform: 'none' }];
      play($('[data-h="l1"]'), lineIn, { duration: 1100, delay: 350, easing: OUT });
      play($('[data-h="l2"]'), lineIn, { duration: 1100, delay: 480, easing: OUT });
      typeText(1000, 26);
      play($('[data-h="tag"]'), K.up, { delay: 2150, duration: 800 });
      $$('[data-h="btn"]').forEach((b, i) => play(b, [{ opacity: 0, transform: 'translateY(20px) scale(.92)' }, { opacity: 1, transform: 'none' }], { delay: 1500 + i * 150, duration: 800, easing: BACK }));
      play($('[data-h="photo"]'), [{ opacity: 0, transform: 'translateX(90px) scale(1.05)' }, { opacity: 1, transform: 'none' }], { duration: 1500, delay: 300, easing: OUT });
    }
    const fontsReady = (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]) : Promise.resolve();
    fontsReady.then(heroIntro);

    // tool icons keep orbiting around the photo (they pass behind him, then in front)
    (function orbit() {
      const box = $('.hero-photo');
      const orbs = $$('.orb', box || document);
      if (!box || !orbs.length) return;
      const PHASE = [0, .25, .5, .75];
      const RXK = [1, 1.07, .94, 1.03];
      const CX = .5, CY = .60, RX = .52, RY = .17;   // relative to the photo box
      const PERIOD = 18000, START = 1100, GROW = 2400;
      const t0 = performance.now();
      let w = 0, h = 0, raf = 0, visible = true;
      const measure = () => { w = box.clientWidth; h = box.clientHeight; };
      measure(); addEventListener('resize', measure);
      function place(now, still) {
        const el = now - t0 - START;
        const p = still ? 1 : Math.max(0, Math.min(1, el / GROW));
        const grow = 1 - Math.pow(1 - p, 3);
        const ang = still ? 0 : (Math.max(0, el) / PERIOD) * Math.PI * 2;
        orbs.forEach((o, i) => {
          const th = ang + PHASE[i] * Math.PI * 2 + .6;
          const rr = .2 + .8 * grow;
          const x = w * (CX + RX * RXK[i] * rr * Math.cos(th));
          const y = h * (CY + RY * rr * Math.sin(th));
          const depth = (Math.sin(th) + 1) / 2;            // 0 = behind him, 1 = in front
          const s = (.8 + .4 * depth) * (.45 + .55 * grow);
          o.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + s.toFixed(3) + ')';
          o.style.opacity = (grow * (.55 + .45 * depth)).toFixed(3);
          o.style.zIndex = depth > .5 ? 3 : 1;
        });
      }
      if (reduce) { place(t0, true); return; }
      const loop = (now) => { place(now, false); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
      const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
      if (hasIO) new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) kick(); }, { threshold: 0 }).observe($('#home'));
      document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
      kick();
    })();

    // ================= SHOWCASE =================
    (function showcase() {
      const stage = $('#stage');
      if (!stage) return;
      const cnt = $$('[data-count]', stage);
      const pod = $('[data-s="podium"]', stage), lap = $('[data-s="laptop"]', stage);
      const tl = $('[data-s="tl"]', stage), tr = $('[data-s="tr"]', stage);
      const sl = $('[data-s="sl"]', stage), sr = $('[data-s="sr"]', stage);
      const glow = $('.sc-glow', stage), rip = $('.sc-ripple', stage), spin = $('.lp-spin', stage);

      // clickable social icons on the laptop screen
      $$('.hot', stage).forEach((a) => { const u = LINKS[a.dataset.social]; if (u) { a.href = u; a.hidden = false; } });

      if (reduce || !hasIO) {
        [pod, lap, tl, tr, sl, sr, glow].forEach((e) => e.classList.add('is-in'));
        return;
      }
      cnt.forEach((c) => { c.textContent = '0'; });
      const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: .4 });
      io.observe(stage);

      function go() {
        const isM = mobile();
        const H = stage.getBoundingClientRect().height;
        // 1. podium rises, ring lights up
        play(pod, [{ opacity: 0, transform: 'translateY(' + (H * .32) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 1100, easing: OUT });
        play(glow, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 550 });
        // 2. laptop drops in while spinning a full 360
        const t0 = 950;
        play(lap, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: t0, easing: 'ease-out' });
        const drop = lap.querySelector('.lp-drop');
        const dp = drop.animate([
          { transform: 'translateY(' + (-H * .16) + 'px) scale(.55)' },
          { transform: 'translateY(0) scale(1)' }
        ], { duration: 1300, delay: t0, easing: OUT, fill: 'both' });
        dp.finished.then(() => dp.cancel()).catch(() => {});
        const sp = spin.animate([
          { transform: 'perspective(1800px) rotateY(0deg)' },
          { transform: 'perspective(1800px) rotateY(360deg)' }
        ], { duration: 1900, delay: t0, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' });
        sp.finished.then(() => sp.cancel()).catch(() => {});
        // 3. titles burst out from behind the laptop
        const lc = lap.getBoundingClientRect();
        const cxL = lc.left + lc.width / 2, cyL = lc.top + lc.height / 2;
        [tl, tr].forEach((el, i) => {
          const b = el.getBoundingClientRect();
          const dx = cxL - (b.left + b.width / 2), dy = (cyL - (b.top + b.height / 2)) * .5;
          const from = { opacity: 0, transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.22)' };
          const to = { opacity: 1, transform: 'none' };
          if (!isM) { from.filter = 'blur(10px)'; to.filter = 'blur(0px)'; }
          play(el, [from, to], { duration: 1200, delay: t0 + 1500 + i * 150, easing: OUT });
        });
        rip.animate([{ opacity: .9, transform: 'scale(.6)' }, { opacity: 0, transform: 'scale(2.6)' }], { duration: 1500, delay: t0 + 1400, easing: 'ease-out' });
        // 4. stats rise and count up
        [sl, sr].forEach((el, i) => play(el, [{ opacity: 0, transform: 'translateY(36px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: t0 + 2150 + i * 160 }));
        cnt.forEach((c, i) => countUp(c, +c.dataset.count, { duration: i ? 1900 : 1300, delay: t0 + 2200 + i * 160 }));
      }
    })();

    // ================= SCROLL REVEALS =================
    $$('[data-stagger]').forEach((g) => {
      const step = +g.dataset.stagger || 80;
      const cols = g.classList.contains('grid') ? getComputedStyle(g).gridTemplateColumns.split(' ').length : 0;
      [...g.children].filter((c) => c.hasAttribute('data-reveal')).forEach((c, i) => {
        if (!c.dataset.delay) c.dataset.delay = (cols ? (i % cols) : i) * step;
      });
    });
    onView($$('[data-reveal]'), (el) => play(el, K[el.dataset.reveal] || K.up, { delay: +el.dataset.delay || 0 }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });

    // chips pop in one by one
    onView($$('[data-chips]'), (box) => {
      [...box.children].forEach((c, i) => play(c, [{ opacity: 0, transform: 'scale(.7) translateY(8px)' }, { opacity: 1, transform: 'none' }], { delay: 250 + i * 45, duration: 560, easing: BACK }));
    }, { threshold: .3 });

    // software bars fill + percentages count up
    onView($$('[data-bars]'), (box) => {
      box.classList.add('in');
      $$('[data-pct]', box).forEach((b, i) => countUp(b, +b.dataset.pct, { duration: 1500, delay: i * 150, suffix: '%' }));
    }, { threshold: .4 });

    // ================= LIGHTBOX (click a project to see the full image) =================
    (function lightbox() {
      const box = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCap'), close = $('#lbClose');
      if (!box) return;
      let last = null;
      function open(card) {
        const shot = $('.shot', card);
        if (!shot) return;
        last = card;
        img.src = card.dataset.full || shot.src;
        img.alt = shot.alt;
        cap.textContent = $('h3', card).textContent;
        box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        close.focus();
      }
      function shut() {
        if (!box.classList.contains('open')) return;
        box.classList.remove('open'); box.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (last) last.focus({ preventScroll: true });
      }
      document.addEventListener('click', (e) => {
        const card = e.target.closest && e.target.closest('.proj.zoom');
        if (card) { open(card); return; }
        if (e.target === box || e.target === close) shut();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') shut();
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('zoom')) { e.preventDefault(); open(document.activeElement); }
      });
    })();

    // ================= WORK FILTER =================
    const tabs = $$('.tab'), cards = $$('.proj');
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((t) => { const on = t === tab; t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', String(on)); });
      const f = tab.dataset.filter; let n = 0;
      cards.forEach((c) => {
        const show = f === 'all' || c.dataset.cat.split(' ').includes(f);
        c.hidden = !show;
        if (!show) return;
        c.classList.add('is-in');
        if (!reduce) c.animate([{ opacity: 0, transform: 'translateY(26px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: n * 60, easing: EASE, fill: 'backwards' });
        n++;
      });
    }));

    // ================= CONTACT FORM =================
    const form = $('#contactForm');
    if (form) {
      const note = $('#formNote'), btn = $('.btn-grad', form), lbl = $('.lbl', btn);
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        btn.disabled = true; lbl.textContent = 'Sending…'; note.className = 'form-note'; note.textContent = '';
        try {
          const body = new URLSearchParams(new FormData(form)).toString();
          const res = await fetch(form.getAttribute('action') || '/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
          if (!res.ok) throw new Error('status ' + res.status);
          btn.classList.add('is-sent'); lbl.textContent = 'Message sent';
          note.className = 'form-note ok'; note.textContent = 'Thanks! I’ll get back to you within 24 hours.';
          form.reset();
          setTimeout(() => { btn.classList.remove('is-sent'); lbl.textContent = 'Send message'; btn.disabled = false; }, 4500);
        } catch (err) {
          btn.disabled = false; lbl.textContent = 'Send message';
          note.className = 'form-note err';
          note.innerHTML = 'Couldn’t send that. Please <a href="https://wa.me/2348105447943" target="_blank" rel="noopener">message me on WhatsApp</a> instead.';
        }
      });
    }
  }
})();
