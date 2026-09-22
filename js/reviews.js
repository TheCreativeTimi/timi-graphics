/* ==========================================================
   CLIENT REVIEWS  -  edit this list to add / change reviews
   ----------------------------------------------------------
   name    : who said it
   role    : their role, business, or how they know you (short)
   quote   : the review text (keep it a sentence or two)
   rating  : 1-5 (whole number)
   initial : leave '' to auto-use the first letter of name,
             or set a custom 1-2 letter tag (e.g. 'CA' for a church)
   ========================================================== */
const REVIEWS = [
  { name: 'Sister Bukola',  role: 'Christ Apostolic Church, Hallelujah District', quote: 'The birthday flyers Timi designs for our church always come out clean and on time. Even members who don’t use social media stop to compliment them.', rating: 5, initial: '' },
  { name: 'Mrs. Adeyemi',   role: 'Proprietress, Mother & Child School',          quote: 'Our certificate design looked far more professional than what we had before. Timi listened to exactly what we wanted and delivered quickly.', rating: 5, initial: '' },
  { name: 'A LASUSTECH classmate', role: '100L Computer Science',                 quote: 'The CBT practice app genuinely helped me prepare for exams. Simple to use and the explanations after each question made revision so much faster.', rating: 5, initial: '' }
];

/* ---- nothing below needs editing ---- */
(function renderReviews() {
  const grid = document.getElementById('revGrid');
  if (!grid) return;
  const star = '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.8l7.1-.7z"/></svg>';
  REVIEWS.forEach((r) => {
    const el = document.createElement('article');
    el.className = 'glass rev';
    el.setAttribute('data-reveal', 'up');
    const initial = (r.initial || r.name.trim().charAt(0)).toUpperCase();
    const stars = Array.from({ length: 5 }, (_, i) => '<span class="' + (i < r.rating ? 'on' : '') + '">' + star + '</span>').join('');
    el.innerHTML =
      '<div class="rev-stars">' + stars + '</div>' +
      '<p class="rev-quote"></p>' +
      '<div class="rev-who"><span class="rev-avatar"></span><span><b class="rev-name"></b><small class="rev-role"></small></span></div>';
    el.querySelector('.rev-quote').textContent = '\u201C' + r.quote + '\u201D';
    el.querySelector('.rev-avatar').textContent = initial;
    el.querySelector('.rev-name').textContent = r.name;
    el.querySelector('.rev-role').textContent = r.role;
    grid.appendChild(el);
  });
})();
