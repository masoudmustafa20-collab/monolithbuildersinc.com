document.addEventListener('DOMContentLoaded', () => {
  const images = [...document.querySelectorAll('.galleryImage')];
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !images.length) return;
  const view = lightbox.querySelector('.lightboxImage');
  const count = lightbox.querySelector('.lightboxCount');
  const closeBtn = lightbox.querySelector('.lightboxClose');
  const prevBtn = lightbox.querySelector('.lightboxPrev');
  const nextBtn = lightbox.querySelector('.lightboxNext');
  let current = 0;
  let touchStartX = 0;

  function show(i) {
    current = (i + images.length) % images.length;
    view.src = images[current].src;
    view.alt = images[current].alt;
    count.textContent = `${current + 1} / ${images.length}`;
  }
  function open(i) {
    show(i);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    images[current].focus();
  }
  images.forEach((img,i) => {
    img.addEventListener('click', () => open(i));
    img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
  }, {passive:true});
});
