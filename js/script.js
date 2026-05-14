// ── Build sprocket holes (duplicated for seamless CSS loop) ──
function buildHoles(trackEl, count) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count * 2; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    frag.appendChild(hole);
  }
  trackEl.appendChild(frag);
}

buildHoles(document.getElementById('holes-left'), 60);
buildHoles(document.getElementById('holes-right'), 60);

// ── Pause film strip animation on hover ──
const strip       = document.querySelector('.film-strip');
const framesInner = document.querySelector('.frames-inner');

strip.addEventListener('mouseenter', () => {
  framesInner.style.animationPlayState = 'paused';
  document.querySelectorAll('.sprocket-track').forEach(t => {
    t.style.animationPlayState = 'paused';
  });
});

strip.addEventListener('mouseleave', () => {
  framesInner.style.animationPlayState = 'running';
  document.querySelectorAll('.sprocket-track').forEach(t => {
    t.style.animationPlayState = 'running';
  });
});

// ── Scroll-reveal project cards ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = `opacity 0.6s ${i * 0.09}s, transform 0.6s ${i * 0.09}s`;
  observer.observe(card);
});