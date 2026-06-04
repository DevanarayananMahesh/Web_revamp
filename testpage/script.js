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

// --------------------------------------------------------------------------------------------
//                                HERO HEAD TEXT ANIMATION
// --------------------------------------------------------------------------------------------

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

async function heroType(el, text) {
  el.appendChild(cursor);
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    el.appendChild(cursor);
    await sleep(TYPE_SPEED);
  }
}

async function heroDelete(el) {
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
    await heroType(el1, line1);
    await heroType(el2, line2);
    await sleep(HOLD);
    await heroDelete(el2);
    await heroDelete(el1);
    await sleep(200);
    current = (current + 1) % sequences.length;
  }
}

loop();

// --------------------------------------------------------------------------------------------
//                              CIRCLE CHART ANIMATION
// --------------------------------------------------------------------------------------------

const ring = document.getElementById('ring');
const counter = document.getElementById('counter');
const ringTarget = 16;
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
  animateCounter(0, ringTarget, 3500);
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

// --------------------------------------------------------------------------------------------
//                               GRANT NUMBER ANIMATION
// --------------------------------------------------------------------------------------------

const grantCounter = document.getElementById("grant_num_pannel");
const grantTarget = 375000;
const grantDuration = 2300;

function animateGrantCounter() {
  const grantStart = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - grantStart;
    const progress = Math.min(elapsed / grantDuration, 1);
    const value = Math.floor(progress * grantTarget);
    grantCounter.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

animateGrantCounter();

// --------------------------------------------------------------------------------------------
//                                    ABOUT CARD STACK ANIMATION
// --------------------------------------------------------------------------------------------

let currentSlide = 0;

const slides = [
  document.getElementById("slide_engineering"),
  document.getElementById("slide_programming"),
  document.getElementById("slide_capstone")
];

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    slide.style.opacity = index === currentSlide ? '1' : '0';
    slide.style.pointerEvents = index === currentSlide ? 'all' : 'none';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

updateSlides();

// --------------------------------------------------------------------------------------------
//                                    CARD STACK ANIMATION
// --------------------------------------------------------------------------------------------

const stackCards = Array.from(document.querySelectorAll('.card'));
let orderIndex = 0;

function applyPositions() {
  const positions = ['front', 'middle', 'back'];
  stackCards.forEach((card, i) => {
    card.classList.remove('front', 'middle', 'back');
    card.classList.add(positions[(i - orderIndex + stackCards.length) % stackCards.length]);
  });
}

applyPositions();

function cycle() {
  const frontCard = stackCards[orderIndex % stackCards.length];
  frontCard.classList.remove('front');
  frontCard.classList.add('flying');
  setTimeout(() => {
    orderIndex = (orderIndex + 1) % stackCards.length;
    applyPositions();
    frontCard.classList.remove('flying');
  }, 500);
}

setInterval(cycle, 7500);

// --------------------------------------------------------------------------------------------
//                                SEEKING TYPE ANIMATION
// --------------------------------------------------------------------------------------------

const seekingLines = document.querySelectorAll('#seeking .note p');

function typeLine(el, text) {
  const cursor = document.createElement('span');
  cursor.className = 'seeking-cursor';
  el.textContent = '';
  el.appendChild(cursor);

  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    el.appendChild(cursor);
    i++;
    if (i === text.length) {
      clearInterval(timer);
      setTimeout(() => cursor.remove(), 1200);
    }
  }, 18);
}

const lineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      lineObserver.unobserve(el);
      const text = el.dataset.text;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => typeLine(el, text), delay);
    }
  });
}, { threshold: 0.2 });

seekingLines.forEach(p => lineObserver.observe(p));







// --------------------------------------------------------------------------------------------
//                                SEEKING TYPE ANIMATION
// --------------------------------------------------------------------------------------------



const TO_EMAIL = 'brooksr@mcmsnj.net';
 
function openGmail() {
  const replyTo = document.getElementById('from-email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const body    = document.getElementById('description').value.trim();
  const error   = document.getElementById('error');
 
  if (!subject || !body) {
    error.style.display = 'block';
    error.textContent = 'Please fill in at least a subject and message.';
    return;
  }
  error.style.display = 'none';
 
  const fullBody = replyTo
    ? `${body}\n\n— Sent by: ${replyTo}`
    : body;
 
  const gmailURL = 'https://mail.google.com/mail/?view=cm'
    + `&to=${encodeURIComponent(TO_EMAIL)}`
    + `&su=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(fullBody)}`;
 
  window.open(gmailURL, '_blank');
}
