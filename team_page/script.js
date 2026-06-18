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
    banner_team.style.opacity = "1";
  } else {
    button.style.width = "";
    banner_team.style.height = "0";
    banner_team.style.opacity = "0";
  }

  opened = !opened;
}



function toggle_team_panel2() {
  const button = document.getElementById("student_class2");
  const banner_team = document.getElementById("team_banner2");

  if (!opened2) {
    button.style.width = "90%";
    banner_team.style.height = "10rem";
    banner_team.style.opacity = "1";
    
  } else {
    button.style.width = "";
    banner_team.style.height = "0";
    banner_team.style.opacity = "0";
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
  full_nickname = document.getElementById("full_popup_nickname")
  full_from = document.getElementById("full_popup_from")
  image = document.getElementById("image_side")

  if (name == "Jacob"){
    title.innerHTML = "Jacob Hart";
    nickname.innerHTML = "Nicknamed Mad Scientist";
    district.innerHTML = "From Woodbridge";
    content.innerHTML = "Jacob specializes in electrical engineering and Software engineering, often creating extremely unique projects.";
    image.innerHTML = '<img src="../images/bio_pics/jacob.jpg" alt="Profile Image">';
  }
  if (name == "Deva"){
    title.innerHTML = "Devanarayanan Mahesh";
    nickname.innerHTML = "Nicknamed The designer";
    district.innerHTML = "From East brunswick";
    content.innerHTML = "Deva is known for his amazing art and design skills, often covering the whiteboards with sketches. He specializes on the design aspects of technology.";
    image.innerHTML = '<img src="../images/bio_pics/deva.png" alt="Profile Image">';
  }
  if (name == "Ani"){
    title.innerHTML = "Anirudh Krushnakumar";
    nickname.innerHTML = "Nicknamed The Scholar, Social Media Manager";
    district.innerHTML = "From Monroe";
    content.innerHTML = "Anirudh has an extreme focus on academics and higher education, while also focusing on Computer Science and the beginnings of electrical Engineering.";
    image.innerHTML = '<img src="../images/bio_pics/anirudh.jpg" alt="Profile Image">';
  }
  if (name == "David"){
    title.innerHTML = "David Hummel";
    nickname.innerHTML = "Nicknamed The Experimenter";
    district.innerHTML = "From Woodbridge";
    content.innerHTML = "David focuses on Machine learning and Computer Science, doing much of the back end code for most projects he works on.";
    image.innerHTML = '<img src="../images/bio_pics/david.jpg" alt="Profile Image">';
  }
  if (name == "Hannah"){
    title.innerHTML = "Hannah Kinney";
    nickname.innerHTML = "Nicknamed jack of all trades";
    district.innerHTML = "From East brunswick";
    content.innerHTML = "Hannah has no distinct focus, preferring to instead work on everything and anything to maximize her experience and options.";
    image.innerHTML = '<img src="../images/bio_pics/hannah.jpg" alt="Profile Image">';
  }
  if (name == "Shub"){
    title.innerHTML = "Shubham Mishra";
    nickname.innerHTML = "Nicknamed The All-rounder";
    district.innerHTML = "From Monroe";
    content.innerHTML = "Shubham focuses on Vex V5 robotics, enjoying both the building and application of specialized sensors throughout.";
    image.innerHTML = '<img src="../images/bio_pics/shubam.jpg" alt="Profile Image">';
  }
   if (name == "Brooks"){
    title.innerHTML = "Rachel Brooks";
    nickname.innerHTML = "Role as Teacher";
    district.innerHTML = "";
    content.innerHTML = "Rachel Brooks is a CTE instructor in AI & Robotics at East Brunswick Magnet School, where she helped develop the AI & Robotics curriculum and teaches programming, machine learning, electronics, and robotics. She holds a B.S. in Computer Science from The Pennsylvania State University while currently pursuing a Master's in Artificial Intelligence.";
    image.innerHTML = '<img src="../images/bio_pics/brooks.PNG" alt="Profile Image">';
  }
   if (name == "Benjamin"){
    title.innerHTML = "Benjamin Gurt";
    nickname.innerHTML = "The robot";
    district.innerHTML = "From Robot Land";
    content.innerHTML = "Benjamin's daily schedule consists of sleeping, draining some battery, waking up for photos, sleeping again, practicing some martial arts in his dreams, and sleeping some more!";
    image.innerHTML = '<img src="../images/bio_pics/benjaminn.png" alt="Profile Image">';
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