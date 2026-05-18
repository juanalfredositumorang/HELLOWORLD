/* ===========================
   Hello World - main.js
   =========================== */

// ---- Config ----
const WORDS = [
  { id: 'word1', chars: ['H', 'e', 'l', 'l', 'o'] },
  { id: 'word2', chars: ['W', 'o', 'r', 'l', 'd'] },
  { id: 'word3', chars: ['!'] }
];

const COLORS = [
  '#c084fc', '#818cf8', '#38bdf8',
  '#34d399', '#fb923c', '#f472b6', '#facc15'
];

const PARTICLE_COUNT = 24;
const STAR_COUNT = 70;

// ---- Build Letters ----
function buildLetters() {
  WORDS.forEach((word, wi) => {
    const container = document.getElementById(word.id);
    word.chars.forEach((ch, ci) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;

      // Staggered animation delay
      const delay = (wi * 5 + ci) * 0.09 + 0.2;
      span.style.animationDelay = delay + 's';

      // Click to change color
      span.addEventListener('click', () => {
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        span.style.color = c;
        span.style.textShadow = `0 0 20px ${c}, 0 0 50px ${c}, 0 0 80px ${c}`;
      });

      container.appendChild(span);
    });
  });
}

// ---- Spawn Floating Particles ----
function spawnParticles() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size  = Math.random() * 4 + 2;
    const x     = Math.random() * 100;
    const dx    = (Math.random() - 0.5) * 120;
    const dur   = Math.random() * 5 + 4;
    const delay = Math.random() * 6;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${x}%;
      bottom: ${Math.random() * -10}%;
      --dx: ${dx}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 8px ${color};
    `;

    document.body.appendChild(p);
  }
}

// ---- Canvas Starfield ----
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let W, H, stars = [];

function initStars() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;

  stars = Array.from({ length: STAR_COUNT }, () => ({
    x     : Math.random() * W,
    y     : Math.random() * H,
    r     : Math.random() * 1.2 + 0.3,
    angle : Math.random() * Math.PI * 2,
    speed : Math.random() * 0.005 + 0.002,
    amp   : Math.random() * 15 + 5,
    alpha : Math.random() * 0.5 + 0.2
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, W, H);

  stars.forEach(s => {
    s.angle += s.speed;
    const x = s.x + Math.sin(s.angle) * s.amp;
    const y = s.y + Math.cos(s.angle * 0.7) * (s.amp * 0.6);

    ctx.beginPath();
    ctx.arc(x, y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 160, 255, ${s.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

// ---- Init ----
function init() {
  buildLetters();
  spawnParticles();
  initStars();
  drawStars();
  window.addEventListener('resize', initStars);
}

document.addEventListener('DOMContentLoaded', init);
