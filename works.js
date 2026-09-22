/* ==========================================================
   YOUR WORK  -  edit this list to add / change projects
   ----------------------------------------------------------
   type   : 'web' or 'design'
   title  : name shown on the card
   desc   : one short line
   image  : file inside assets/work/  (jpg, png, webp or svg)
            Cards crop it to a 2:1 banner; visitors can click a card
            to see the full image. Replace the sample pictures below
            with your real screenshots / designs (same file name, or
            change the name here).
   pos    : (optional) which part of the image the card banner shows,
            e.g. '50% 20%' = centred, near the top. Default is the middle.
   url    : live link for web projects (opens in a new tab).
            Leave '' if there is none.
   ========================================================== */
const WORKS = [
  { type: 'web',    title: 'DeskReady Course Website',     desc: 'Step-by-step Word & Excel course',         image: 'assets/work/deskready-shot.webp', pos: '50% 30%', url: 'https://deskready-by-timi.netlify.app/' },
  { type: 'design', title: 'Teens Conference Flyer',       desc: 'Church event flyer',                       image: 'assets/work/teens-conference.webp',  pos: '50% 36%', url: '' },
  { type: 'web',    title: 'Birthday Flyer Generator',     desc: 'React app with photo crop and 6 themes',   image: 'assets/work/flyer-generator-shot.webp',    url: 'https://cac-birthday-template-2-0.vercel.app' },
  { type: 'design', title: 'Football Poster',              desc: 'Sports poster design',                     image: 'assets/work/sports-poster.webp',     pos: '50% 22%', url: '' },
  { type: 'web',    title: 'LASUSTECH CBT Practice',       desc: 'PHY 102 & MTH 102 with instant answers',   image: 'assets/work/cbt-simulators.svg',     url: 'https://phynmth-cbt.tiiny.site' },
  { type: 'design', title: 'Certificate of Excellence',    desc: 'Certificate design',                       image: 'assets/work/certificate.webp',       pos: '50% 45%', url: '' },
  { type: 'web',    title: 'Timi Graphics Portfolio (v1)', desc: 'My first portfolio website',               image: 'assets/work/old-portfolio.svg',      url: 'https://timigraphics-portfolio.netlify.app/' }
];

/* ---- nothing below needs editing ---- */
(function renderWork() {
  const grid = document.getElementById('grid');
  if (!grid) return;
  const anchor = grid.querySelector('.ig-card');
  WORKS.forEach((w) => {
    const web = w.type === 'web';
    const el = document.createElement('article');
    el.className = 'proj';
    el.dataset.cat = w.type;
    el.setAttribute('data-reveal', 'up');
    el.innerHTML =
      '<div class="thumb ' + w.type + '"><svg class="ic ph"><use href="#' + (web ? 'i-code' : 'i-pen') + '"/></svg></div>' +
      '<div class="pinfo"><span class="ptag"></span><h3></h3><p></p></div>';
    el.querySelector('.ptag').textContent = web ? 'WEB DEVELOPMENT' : 'GRAPHIC DESIGN';
    el.querySelector('h3').textContent = w.title;
    el.querySelector('p').textContent = w.desc;

    if (w.image) {
      const img = new Image();
      img.className = 'shot';
      img.alt = w.title;
      img.loading = 'lazy';
      img.onerror = () => { img.remove(); el.classList.remove('zoom'); el.removeAttribute('tabindex'); el.removeAttribute('role'); };
      if (w.pos) img.style.objectPosition = w.pos;
      img.src = w.image;
      el.querySelector('.thumb').appendChild(img);
    }
    if (w.url) {
      const a = document.createElement('a');
      a.className = 'cover';
      a.href = w.url; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', 'Open ' + w.title + ' (new tab)');
      el.appendChild(a);
      const live = document.createElement('span');
      live.className = 'live';
      live.innerHTML = 'Live site <svg class="ic"><use href="#i-arrow"/></svg>';
      el.querySelector('.thumb').appendChild(live);
    } else if (w.image) {
      el.classList.add('zoom');
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'View ' + w.title);
      el.dataset.full = w.image;
    }
    grid.insertBefore(el, anchor);
  });
})();
