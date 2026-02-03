// ======= CUSTOMIZE THESE =======
const GF_NAME = "Kim";
const BIRTHDAY_DATE = "2026-02-10"; // YYYY-MM-DD (Philippines local time)
// ===============================

const gfNameEl = document.getElementById("gfName");
if (gfNameEl) gfNameEl.textContent = GF_NAME;

// ---- Scroll reveal animations ----
const revealTargets = document.querySelectorAll(".section, .tl-card, .pic, .card, .letter");
revealTargets.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// ---- Countdown ----
const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");
const note = document.getElementById("countdownNote");

function getTargetDate(dateStr){
  const [y, mo, d] = dateStr.split("-").map(Number);
  return new Date(y, mo - 1, d, 0, 0, 0);
}

const target = getTargetDate(BIRTHDAY_DATE);

function tick(){
  if(!dEl || !hEl || !mEl || !sEl || !note) return;

  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if(diff <= 0){
    dEl.textContent = "0";
    hEl.textContent = "0";
    mEl.textContent = "0";
    sEl.textContent = "0";
    note.textContent = "Happy Birthday Babi! 🎂💖";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  dEl.textContent = String(days);
  hEl.textContent = String(hours);
  mEl.textContent = String(mins);
  sEl.textContent = String(secs);

  note.textContent = `Counting down to ${GF_NAME}'s day 💗`;
}
tick();
setInterval(tick, 1000);

// ---- Floating hearts generator ----
const heartsLayer = document.querySelector(".hearts");

function spawnHeart(){
  if(!heartsLayer) return;

  const heart = document.createElement("div");
  heart.textContent = Math.random() > 0.5 ? "💗" : "💖";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-40px";
  heart.style.fontSize = (16 + Math.random() * 22) + "px";
  heart.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);

  const drift = (Math.random() * 80 - 40);
  const duration = 5000 + Math.random() * 4000;

  heart.animate(
    [
      { transform: `translate(0, 0)`, opacity: heart.style.opacity },
      { transform: `translate(${drift}px, -110vh)`, opacity: 0 }
    ],
    { duration, easing: "ease-in-out" }
  );

  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration);
}
setInterval(spawnHeart, 380);

// ---- Floating cakes generator (NEW) ----
const cakesLayer = document.querySelector(".cakes");

function spawnCake(){
  if(!cakesLayer) return;

  const cake = document.createElement("div");
  cake.textContent = Math.random() > 0.5 ? "🎂" : "🍰";
  cake.style.position = "absolute";
  cake.style.left = Math.random() * 100 + "vw";
  cake.style.bottom = "-40px";
  cake.style.fontSize = (18 + Math.random() * 18) + "px";
  cake.style.opacity = (0.20 + Math.random() * 0.45).toFixed(2);

  const drift = (Math.random() * 120 - 60);
  const duration = 6500 + Math.random() * 4500;

  cake.animate(
    [
      { transform: `translate(0, 0)`, opacity: cake.style.opacity },
      { transform: `translate(${drift}px, -110vh)`, opacity: 0 }
    ],
    { duration, easing: "ease-in-out" }
  );

  cakesLayer.appendChild(cake);
  setTimeout(() => cake.remove(), duration);
}
setInterval(spawnCake, 1200);

// ---- Music button ----
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
let musicOn = false;

if (musicBtn && music){
  musicBtn.addEventListener("click", async () => {
    try{
      if(!musicOn){
        await music.play();
        musicOn = true;
        musicBtn.textContent = "🔇 Stop Music";
      }else{
        music.pause();
        musicOn = false;
        musicBtn.textContent = "🔊 Play Music";
      }
    }catch(e){
      alert("Ilgay ang song sa assets folder as: assets/music.mp3 ✅");
    }
  });
}

// ---- Gift modal ----
const openGift = document.getElementById("openGift");
const closeGift = document.getElementById("closeGift");
const giftModal = document.getElementById("giftModal");

if(openGift && giftModal){
  openGift.addEventListener("click", () => {
    giftModal.classList.add("show");
    giftModal.setAttribute("aria-hidden", "false");
  });
}
if(closeGift && giftModal){
  closeGift.addEventListener("click", () => {
    giftModal.classList.remove("show");
    giftModal.setAttribute("aria-hidden", "true");
  });
}
if(giftModal){
  giftModal.addEventListener("click", (e) => {
    if(e.target === giftModal){
      giftModal.classList.remove("show");
      giftModal.setAttribute("aria-hidden", "true");
    }
  });
}

// ---- Back to top ----
const scrollTopBtn = document.getElementById("scrollTop");
if(scrollTopBtn){
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- Confetti ----
const confettiBtn = document.getElementById("confettiBtn");
const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;

let confettiPieces = [];
let confettiActive = false;

function resizeCanvas(){
  if(!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function makeConfetti(){
  if(!canvas) return;
  const count = 220;
  confettiPieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height,
    r: 4 + Math.random() * 6,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 5,
    rot: Math.random() * Math.PI,
    vr: -0.2 + Math.random() * 0.4,
    life: 220 + Math.random() * 140
  }));
}

function drawConfetti(){
  if(!confettiActive || !ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 260));
    ctx.fillStyle = `hsl(${Math.floor(Math.random()*360)}, 90%, 70%)`;
    ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(p => p.life > 0 && p.y < canvas.height + 40);

  if(confettiPieces.length === 0){
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  requestAnimationFrame(drawConfetti);
}

if(confettiBtn){
  confettiBtn.addEventListener("click", () => {
    makeConfetti();
    confettiActive = true;
    drawConfetti();
  });
}

