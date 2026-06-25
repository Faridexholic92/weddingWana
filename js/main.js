/* ===== Walimatul Urus · Hafiz & Aswana — main.js ===== */
// >>> TUKAR TARIKH MAJLIS DI SINI (YYYY, bulan 0=Jan, hari, jam, minit) <<<
const WEDDING_DATE = new Date(2025, 11, 20, 10, 0, 0); // 20 Disember 2025, 10:00 pagi

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNav();
  initReveal();
  initCountdown();
  initMusic();
  initPetals();
  initBackToTop();
  initWishes();
  initRSVP();
  initCopy();
});

/* Preloader */
function initPreloader(){
  const pre = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => pre.classList.add('hide'), 700));
  // fallback
  setTimeout(() => pre.classList.add('hide'), 3500);
}

/* Navigation */
function initNav(){
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    spyScroll();
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });
  links.forEach(l => l.addEventListener('click', () => {
    toggle.classList.remove('active');
    menu.classList.remove('open');
  }));

  function spyScroll(){
    const sections = document.querySelectorAll('section[id]');
    let cur = '';
    sections.forEach(s => { if(window.scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
}

/* Reveal on scroll */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* Countdown */
function initCountdown(){
  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');
  function tick(){
    const diff = WEDDING_DATE - new Date();
    if(diff <= 0){
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    const d = Math.floor(diff/86400000);
    const h = Math.floor(diff%86400000/3600000);
    const m = Math.floor(diff%3600000/60000);
    const s = Math.floor(diff%60000/1000);
    dEl.textContent = String(d).padStart(2,'0');
    hEl.textContent = String(h).padStart(2,'0');
    mEl.textContent = String(m).padStart(2,'0');
    sEl.textContent = String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* Background music */
function initMusic(){
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  let playing = false;
  btn.addEventListener('click', () => {
    if(playing){ audio.pause(); btn.classList.remove('playing'); }
    else { audio.play().catch(()=>{}); btn.classList.add('playing'); }
    playing = !playing;
  });
  // try autoplay on first interaction
  const tryPlay = () => {
    if(!playing){ audio.play().then(()=>{ playing=true; btn.classList.add('playing'); }).catch(()=>{}); }
    document.removeEventListener('click', tryPlay);
  };
  document.addEventListener('click', tryPlay);
}

/* Floating petals */
function initPetals(){
  const box = document.getElementById('petals-container');
  const icons = ['fa-leaf','fa-seedling','fa-spa'];
  setInterval(() => {
    if(document.hidden) return;
    const p = document.createElement('i');
    p.className = 'fas ' + icons[Math.floor(Math.random()*icons.length)] + ' petal';
    p.style.left = Math.random()*100 + 'vw';
    p.style.fontSize = (10 + Math.random()*14) + 'px';
    p.style.animationDuration = (7 + Math.random()*7) + 's';
    box.appendChild(p);
    setTimeout(() => p.remove(), 14000);
  }, 900);
}

/* Back to top */
function initBackToTop(){
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500));
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* Wishes wall (localStorage) */
function initWishes(){
  const form = document.getElementById('wishes-form');
  const wall = document.getElementById('wishes-wall');
  const KEY = 'wedding_wishes';
  loadSaved();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('wish-name').value.trim();
    const msg = document.getElementById('wish-message').value.trim();
    if(!name || !msg) return;
    const item = { name, msg };
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    arr.unshift(item);
    localStorage.setItem(KEY, JSON.stringify(arr));
    addCard(item, true);
    form.reset();
  });
  function loadSaved(){
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    arr.forEach(i => addCard(i, false));
  }
  function addCard(i, prepend){
    const div = document.createElement('div');
    div.className = 'wish-card';
    div.innerHTML = '<div class="av"><i class="fas fa-user-circle"></i></div><div><h4>'+escapeHtml(i.name)+'</h4><p>“'+escapeHtml(i.msg)+'”</p></div>';
    if(prepend) wall.prepend(div); else wall.appendChild(div);
  }
}

/* RSVP */
function initRSVP(){
  const form = document.getElementById('rsvp-form');
  const modal = document.getElementById('success-modal');
  const modalText = document.getElementById('modal-text');
  const close = document.getElementById('modal-close');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value.trim();
    const att = (form.querySelector('input[name=attendance]:checked')||{}).value;
    if(att === 'tidak'){
      modalText.textContent = 'Terima kasih ' + name + '. Maklum balas anda telah direkodkan. Kami doakan anda sihat sentiasa.';
    } else if(att === 'mungkin'){
      modalText.textContent = 'Terima kasih ' + name + '. Kami harap dapat berjumpa anda di majlis nanti!';
    } else {
      modalText.textContent = 'Terima kasih ' + name + '! RSVP anda telah berjaya dihantar. Kami menantikan kehadiran anda.';
    }
    modal.classList.add('show');
    form.reset();
  });
  close.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('show'); });
}

/* Copy account number */
function initCopy(){
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const txt = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(txt).then(() => {
        const html = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = html; }, 1800);
      });
    });
  });
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
