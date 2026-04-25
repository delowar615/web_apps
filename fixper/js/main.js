// ========== MOBILE MENU ==========
function openMobileMenu() {
  document.getElementById("mobileMenu").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
  document.body.style.overflow = "";
}

// ========== DIAGNOSTIC BUTTONS ==========
document.querySelectorAll(".diag-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// ========== TEAM SLIDER ==========
let teamSlide = 0;
const teamTrack = document.getElementById("teamTrack");
const teamCards = teamTrack.querySelectorAll(".team-card");
const teamDotsContainer = document.getElementById("teamDots");

function getTeamCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function getTotalTeamSlides() {
  return Math.max(0, teamCards.length - getTeamCardsPerView());
}

function buildTeamDots() {
  teamDotsContainer.innerHTML = "";
  const total = getTotalTeamSlides();
  for (let i = 0; i <= total; i++) {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === teamSlide ? " active" : "");
    dot.addEventListener("click", () => goToTeamSlide(i));
    teamDotsContainer.appendChild(dot);
  }
}

function goToTeamSlide(index) {
  const max = getTotalTeamSlides();
  teamSlide = Math.max(0, Math.min(index, max));
  const cardWidth = 100 / getTeamCardsPerView();
  teamTrack.style.transform = `translateX(-${teamSlide * cardWidth}%)`;
  buildTeamDots();
}

function slideTeam(dir) {
  goToTeamSlide(teamSlide + dir);
}

// ========== REVIEW SLIDER ==========
let reviewSlide = 0;
const reviewTrack = document.getElementById("reviewTrack");
const reviewCards = reviewTrack.querySelectorAll(".review-card");
const reviewDotsContainer = document.getElementById("reviewDots");

function getReviewCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  return 2;
}

function getTotalReviewSlides() {
  return Math.max(0, reviewCards.length - getReviewCardsPerView());
}

function buildReviewDots() {
  reviewDotsContainer.innerHTML = "";
  const total = getTotalReviewSlides();
  for (let i = 0; i <= total; i++) {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === reviewSlide ? " active" : "");
    dot.addEventListener("click", () => goToReviewSlide(i));
    reviewDotsContainer.appendChild(dot);
  }
}

function goToReviewSlide(index) {
  const max = getTotalReviewSlides();
  reviewSlide = Math.max(0, Math.min(index, max));
  const cardWidth = 100 / getReviewCardsPerView();
  reviewTrack.style.transform = `translateX(-${reviewSlide * cardWidth}%)`;
  buildReviewDots();
}

function slideReview(dir) {
  goToReviewSlide(reviewSlide + dir);
}

// ========== FAQ ACCORDION ==========
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasActive = item.classList.contains("active");
  // Close all
  document
    .querySelectorAll(".faq-item")
    .forEach((i) => i.classList.remove("active"));
  // Toggle current
  if (!wasActive) item.classList.add("active");
}

// ========== INIT ==========
function initSliders() {
  buildTeamDots();
  buildReviewDots();
  goToTeamSlide(0);
  goToReviewSlide(0);
}

window.addEventListener("load", initSliders);
window.addEventListener("resize", () => {
  teamSlide = 0;
  reviewSlide = 0;
  initSliders();
});

// Touch/swipe support for sliders
function addSwipe(trackEl, slideFn) {
  let startX = 0,
    startY = 0;
  trackEl.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );
  trackEl.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        slideFn(dx < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );
}

addSwipe(teamTrack, slideTeam);
addSwipe(reviewTrack, slideReview);
