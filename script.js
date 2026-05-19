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
  for (let i = 0; i <= text.length; i++) {
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

const TOTAL_FRAMES = 57;
const SPEED = 1; // Lower = faster, Higher = slower. Try values like 0.1 to 1.0
const frameImg = document.getElementById("robot-frame");

function padded(n) {
  return `images/frames/${String(n).padStart(4, '0')}.png`;
}

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const img = new Image();
  img.src = padded(i);
}

window.addEventListener("scroll", () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = Math.min(Math.max(window.scrollY / (maxScroll * SPEED), 0), 1);
  const frameIndex = Math.min(Math.round(scrolled * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
  frameImg.src = padded(frameIndex);
}, { passive: true });

window.dispatchEvent(new Event("scroll"));