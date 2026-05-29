function menu_open() {
    menu = document.getElementById("menu");
    overlay = document.getElementById("menu_overlay");
    menu.style = "transform: translateY(0%);";
    overlay.style = "opacity:1;";
}

function menu_close() {
    menu = document.getElementById("menu");
    overlay = document.getElementById("menu_overlay");
    menu.style = "transform: translateY(-220%);";
    overlay.style = "opacity:0;";
}

const sequences = [
  { line1: "EB Magnet", line2: "AI & Robotics" },
  { line1: "The Future", line2: "Of Tech" }
];

const el1 = document.getElementById("line1");
const el2 = document.getElementById("line2");

el1.textContent = "";
el2.textContent = "";

const cursor = document.createElement("span");
cursor.className = "cursor";
let current = 0;

const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const HOLD = 4000;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeText(el, text) {
  el.appendChild(cursor);
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    el.appendChild(cursor);
    await sleep(TYPE_SPEED);
  }
}

async function deleteText(el) {
  const text = el.textContent;
  el.appendChild(cursor);
  for (let i = text.length; i >= 0; i--) {
    el.textContent = text.slice(0, i);
    el.appendChild(cursor);
    await sleep(DELETE_SPEED);
  }
}

async function loop() {
  while (true) {
    const { line1, line2 } = sequences[current];
    await typeText(el1, line1);
    await typeText(el2, line2);
    await sleep(HOLD);
    await deleteText(el2);
    await deleteText(el1);
    await sleep(200);
    current = (current + 1) % sequences.length;
  }
}

loop();

const video = document.getElementById("robot-video");
if (video) {
  video.addEventListener("loadedmetadata", () => {
    video.pause();
    video.currentTime = 0;
  });

  window.addEventListener("scroll", () => {
    if (!video.duration) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / maxScroll;
    video.currentTime = video.duration * progress;
  }, { passive: true });
}

const ring = document.getElementById('ring');
const counter = document.getElementById('counter');
const target = 16;
let animated = false;

function animateCounter(from, to, duration) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    counter.textContent = Math.round(from + (to - from) * ease);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function trigger() {
  if (animated) return;
  animated = true;
  ring.classList.add('animated');
  animateCounter(0, target, 3500);
}

const scene = document.querySelector('.scene');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) trigger(); });
}, { threshold: 0.1 });
obs.observe(scene);

setTimeout(() => {
  const rect = scene.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) trigger();
}, 100);








const grantCounter = document.getElementById("grant_num_pannel");

const grantTarget = 375000;
const grantDuration = 2300; // 2 seconds

function animateGrantCounter() {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;

    // progress from 0 → 1
    const progress = Math.min(elapsed / grantDuration, 1);

    // smooth linear counting
    const value = Math.floor(progress * grantTarget);

    // adds commas: 375,000
    grantCounter.textContent = value.toLocaleString('de-DE');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

animateGrantCounter();



const cards = Array.from(document.querySelectorAll('.card'));
let orderIndex = 0;

function applyPositions() {
  const positions = ['front', 'middle', 'back'];
  cards.forEach((card, i) => {
    card.classList.remove('front', 'middle', 'back');
    card.classList.add(positions[(i - orderIndex + cards.length) % cards.length]);
  });
}

applyPositions();


function cycle() {
  const frontCard = cards[orderIndex % cards.length];

  frontCard.classList.remove('front');
  frontCard.classList.add('flying');

  setTimeout(() => {
    orderIndex = (orderIndex + 1) % cards.length;
    applyPositions();
    frontCard.classList.remove('flying');
  }, 500);
}

setInterval(cycle, 7500);
