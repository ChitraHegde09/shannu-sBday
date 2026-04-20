// ===== STARS =====
const starsEl = document.getElementById('stars');
for (let i = 0; i < 60; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 4 + 2;
  s.style.cssText = `
    width:${size}px;height:${size}px;
    left:${Math.random()*100}%;top:${Math.random()*100}%;
    --d:${2+Math.random()*4}s;--delay:${Math.random()*5}s;
  `;
  starsEl.appendChild(s);
}

// ===== FLOATING HEARTS =====
const hbg = document.getElementById('heartsBg');
const heartEmojis = ['💕','💖','💗','✨','🌸','💓','🌷','⭐'];
for (let i = 0; i < 18; i++) {
  const h = document.createElement('div');
  h.className = 'heart-float';
  h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  h.style.cssText = `
    left:${Math.random()*100}%;
    --s:${1 + Math.random() * 1.4}rem;
    --d:${6 + Math.random() * 8}s;
    --delay:${Math.random() * 6}s;
    --drift:${(Math.random()-0.5)*80}px;
  `;
  hbg.appendChild(h);
}

// ===== DATE =====
const opts = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('letterDate').textContent = new Date().toLocaleDateString('en-US', opts);

// ===== PAGE NAV =====
function goTo(targetId) {
  const current = document.querySelector('.page.active');
  const target  = document.getElementById(targetId);
  if (!current || !target) return;

  // Exit current
  current.classList.add('exit');
  current.classList.remove('active');
  setTimeout(() => current.classList.remove('exit'), 500);

  // Enter target
  target.classList.add('active');

  // Scroll card to top on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (targetId === 'page2') launchConfetti();
  if (targetId === 'page5') launchFinalHearts();
}

// ===== ENVELOPE OPEN =====
function openEnvelope() {
  const env = document.getElementById('envelope');
  env.style.animation  = 'none';
  env.style.transform  = 'scale(1.12) rotate(5deg)';
  env.style.opacity    = '0';
  env.style.transition = 'all .5s ease';
  setTimeout(() => goTo('page2'), 480);
}

// ===== CONFETTI =====
function launchConfetti() {
  const container = document.getElementById('confettiBurst');
  container.innerHTML = '';
  const colors = ['#ff8fab','#ffd6a5','#bdb2ff','#caffbf','#a0c4ff','#ffc6ff','#ffe066'];
  for (let i = 0; i < 45; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.cssText = `
      left:${15 + Math.random()*70}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --d:${1+Math.random()*1.6}s;
      --delay:${Math.random()*0.7}s;
      --dx:${(Math.random()-0.5)*180}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
    `;
    container.appendChild(c);
  }
}

// ===== FINAL HEARTS =====
function launchFinalHearts() {
  const anim = document.getElementById('finalAnim');
  anim.innerHTML = '';
  const emojis = ['💖','✨','🌸','💕','⭐','🌷'];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('div');
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${1+Math.random()*1.5}rem;
      animation:fadeInUp .8s ${Math.random()*1.2}s ease both;
      opacity:0;
      pointer-events:none;
    `;
    anim.appendChild(h);
  }
}

// ===== RESTART =====
function restart() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active','exit'));
  document.getElementById('page1').classList.add('active');
  const env = document.getElementById('envelope');
  env.style.cssText = '';
  window.scrollTo({ top: 0 });
}

// ===== WISH CARDS: tap sparkle =====
document.querySelectorAll('.wish-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const spark = document.createElement('span');
    spark.textContent = '✨';
    spark.style.cssText = `
      position:fixed;
      left:${e.clientX - 10}px;
      top:${e.clientY - 10}px;
      font-size:1.4rem;
      pointer-events:none;
      z-index:9999;
      animation:fadeInUp .7s ease forwards;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  });
});
