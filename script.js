const heroSlider = document.getElementById("hero-slider");
const heroSlides = heroSlider.children;
const heroDotsEl = document.getElementById("hero-dots");
const heroPrevBtn = document.getElementById("hero-prev");
const heroNextBtn = document.getElementById("hero-next");
let heroIndex = 0;
const heroDots = [];

Array.from(heroSlides).forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "hero-dot";
  dot.setAttribute("aria-label", `${i + 1}번째 사진 보기`);
  dot.addEventListener("click", () => {
    goToHeroSlide(i);
    resetHeroTimer();
  });
  heroDotsEl.appendChild(dot);
  heroDots.push(dot);
});

function updateHero() {
  const width = heroSlider.clientWidth;
  heroSlider.style.transform = `translateX(-${heroIndex * width}px)`;
  heroDots.forEach((dot, i) => dot.classList.toggle("active", i === heroIndex));
}

function goToHeroSlide(i) {
  const count = heroSlides.length;
  heroIndex = (i + count) % count;
  updateHero();
}

function nextHeroSlide() {
  goToHeroSlide(heroIndex + 1);
}

function prevHeroSlide() {
  goToHeroSlide(heroIndex - 1);
}

let heroTimer = setInterval(nextHeroSlide, 5000);

function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 5000);
}

heroPrevBtn.addEventListener("click", () => {
  prevHeroSlide();
  resetHeroTimer();
});

heroNextBtn.addEventListener("click", () => {
  nextHeroSlide();
  resetHeroTimer();
});

document.querySelector(".hero").addEventListener("mouseenter", () => clearInterval(heroTimer));
document.querySelector(".hero").addEventListener("mouseleave", resetHeroTimer);

window.addEventListener("resize", updateHero);

updateHero();

const floorData = {
  f5: {
    label: "5층",
    title: "5층",
    rooms: [
      { room: "502호", area: "45.71㎡ (13.8평)", deposit: "2,000만원", rent: "100만원" },
    ],
  },
  f4: {
    label: "4층",
    title: "4층",
    rooms: [
      { room: "401호", area: "99.84㎡ (30.2평)", deposit: "3,000만원", rent: "210만원" },
    ],
  },
  f3: {
    label: "3층",
    title: "3층",
    rooms: [
      { room: "301호", area: "77.23㎡ (23.4평)", deposit: "3,000만원", rent: "160만원" },
      { room: "302호", area: "65.45㎡ (19.8평)", deposit: "2,000만원", rent: "140만원" },
    ],
  },
  f2: {
    label: "2층",
    title: "2층",
    rooms: [
      { room: "201호", area: "104.94㎡ (31.7평)", deposit: "3,000만원", rent: "210만원" },
      { room: "202호", area: "50.51㎡ (15.3평)", deposit: "2,000만원", rent: "100만원" },
    ],
  },
  f1: {
    label: "1층",
    title: "1층 · 상가",
    rooms: [
      { room: "101호", area: "54.82㎡ (16.6평)", deposit: "2,000만원", rent: "160만원" },
      {
        room: "103호",
        area: "176.66㎡ (53.5평)",
        deposit: "6,000만원",
        rent: "520만원",
        note: "식당 설비 및 집기 구비 · 권리금 없음 (기존 감자탕 식당 운영, 업종 변경 가능)",
      },
    ],
  },
  b1: {
    label: "지하 1층",
    title: "지하 1층 · 주차장",
    desc: "입주 세대를 위한 지하 주차장입니다.",
  },
};

const floors = document.querySelectorAll(".floor");
const label = document.getElementById("floor-label");
const title = document.getElementById("floor-title");
const roomsEl = document.getElementById("floor-rooms");
const content = document.getElementById("floor-info-content");

function renderFloor(key) {
  const data = floorData[key];

  label.textContent = data.label;
  title.textContent = data.title;
  roomsEl.innerHTML = "";

  if (data.rooms) {
    data.rooms.forEach((r) => {
      const room = document.createElement("div");
      room.className = "room";
      room.innerHTML = `
        <div class="room-head">
          <span class="room-number">${r.room}</span>
          <span class="room-area">${r.area}</span>
        </div>
        <div class="room-terms">
          <span>보증금 ${r.deposit}</span>
          <span>월세 ${r.rent}</span>
        </div>
        ${r.note ? `<div class="room-note">${r.note}</div>` : ""}
      `;
      roomsEl.appendChild(room);
    });
  } else if (data.desc) {
    const empty = document.createElement("div");
    empty.className = "room-empty";
    empty.textContent = data.desc;
    roomsEl.appendChild(empty);
  }
}

function showFloor(floorEl) {
  const key = floorEl.dataset.floor;
  floors.forEach((f) => f.classList.remove("active"));
  floorEl.classList.add("active");

  content.style.opacity = 0;
  setTimeout(() => {
    renderFloor(key);
    content.style.opacity = 1;
  }, 150);
}

floors.forEach((floor) => {
  floor.addEventListener("mouseenter", () => showFloor(floor));
  floor.addEventListener("focus", () => showFloor(floor));
  floor.addEventListener("click", () => showFloor(floor));
});

renderFloor("f1");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".section-heading").forEach((el) => observer.observe(el));

const contactMessage = document.getElementById("contact-message");
const contactMessageCount = document.getElementById("contact-message-count");

contactMessage.addEventListener("input", () => {
  contactMessageCount.textContent = contactMessage.value.length;
});

const naverMapEl = document.getElementById("naver-map");

if (naverMapEl && window.naver && window.naver.maps) {
  const buildingPosition = new naver.maps.LatLng(37.6444917, 126.8785433);

  const map = new naver.maps.Map(naverMapEl, {
    center: buildingPosition,
    zoom: 17,
    zoomControl: true,
    zoomControlOptions: {
      position: naver.maps.Position.TOP_RIGHT,
    },
  });

  new naver.maps.Marker({
    position: buildingPosition,
    map,
    title: "루체아빌딩",
  });
}
