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

const video = document.getElementById("robot-video");

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