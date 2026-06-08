let opened = false;
let opened2 = false;

const sequences = [
  { line1: "EB Magnet", line2: "AI & Robotics" },
  { line1: "The Future", line2: "Of Tech" }
];

function toggle_team_panel() {
  const button = document.getElementById("student_class");
  const banner_team = document.getElementById("team_banner");

  if (!opened) {
    button.style.width = "90%";
    banner_team.style.height = "25rem";
    banner_team.style.width = "100%";
  } else {
    button.style.width = "";
    banner_team.style.height = "";
    banner_team.style.width = "";
  }

  opened = !opened;
}



function toggle_team_panel2() {
  const button = document.getElementById("student_class2");
  const banner_team = document.getElementById("team_banner2");

  if (!opened2) {
    button.style.width = "90%";
    banner_team.style.height = "10rem";
    banner_team.style.width = "100%";
    
  } else {
    button.style.width = "";
    banner_team.style.height = "";
    banner_team.style.width = "";
  }

  opened2 = !opened2;
}





function openPopup(name) {
  document
    .getElementById("popup_overlay")
    .classList.add("active");

  title = document.getElementById("popup_title")
  content = document.getElementById("popup_content")
  nickname = document.getElementById("popup_nickname")
  district = document.getElementById("popup_district")

  if (name == "Jacob"){
    title.innerHTML = "Jacob Hart";
    nickname.innerHTML = "Mad Scientist";
    district.innerHTML = "Woodbridge";
    content.innerHTML = "Jacob specializes in electrical engineering and Software engineering, often creating extremely unique projects.";
  }
  if (name == "Deva"){
    title.innerHTML = "Devanarayanan Mahesh";
    nickname.innerHTML = "The designer";
    district.innerHTML = "East brunswick";
    content.innerHTML = "Deva is known for his amazing art and design skills, often covering the whiteboards with sketches. He specializes on the design aspects of technology.";
  }
  if (name == "Ani"){
    title.innerHTML = "Anirudh Krushnakumar";
    nickname.innerHTML = "The Scholar, Social Media Manager";
    district.innerHTML = "Monroe";
    content.innerHTML = "Anirudh has an extreme focus on academics and higher education, while also focusing on Computer Science and the beginnings of electrical Engineering.";
  }
  if (name == "David"){
    title.innerHTML = "David Hummel";
    nickname.innerHTML = "The Experimenter";
    district.innerHTML = "Woodbridge";
    content.innerHTML = "David focuses on Machine learning and Computer Science, doing much of the back end code for most projects he works on.";
  }
  if (name == "Hannah"){
    title.innerHTML = "Hannah Kinney";
    nickname.innerHTML = "jack of all trades";
    district.innerHTML = "East brunswick";
    content.innerHTML = "Hannah has no distinct focus, preferring to instead work on everything and anything to maximize her experience and options.";
  }
  if (name == "Shub"){
    title.innerHTML = "Shubham Mishra";
    nickname.innerHTML = "The All-rounder";
    district.innerHTML = "Monroe";
    content.innerHTML = "Shubham focuses on Vex V5 robotics, enjoying both the building and application of specialized sensors throughout.";
  }

}

function closePopup() {
  document
    .getElementById("popup_overlay")
    .classList.remove("active");
}




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
const SPEED = 0.2; // Lower = faster, Higher = slower. Try values like 0.1 to 1.0
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



const banner = document.querySelector('.team_banner');
let startX = 0;
let scrollStart = 0;
let isDragging = false;

// Safe layout wait before injecting initial scroll point
window.addEventListener('load', () => {
  setTimeout(() => {
    banner.scrollLeft = 120;
  }, 50); 
});

banner.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  scrollStart = banner.scrollLeft;
  banner.classList.add('dragging');
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  banner.scrollLeft = scrollStart - (e.clientX - startX);
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  banner.classList.remove('dragging');
});

banner.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  scrollStart = banner.scrollLeft;
}, { passive: true });

banner.addEventListener('touchmove', e => {
  banner.scrollLeft = scrollStart - (e.touches[0].clientX - startX);
}, { passive: true });