function initSlider({ sliderId, dotsId, prevId, nextId, dotClass, intervalMs = 5000 }) {
  const slider = document.getElementById(sliderId);
  const slides = slider.children;
  const dotsEl = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dots = [];
  let index = 0;

  Array.from(slides).forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = dotClass;
    dot.setAttribute("aria-label", `${i + 1}번째 사진 보기`);
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetTimer();
    });
    dotsEl.appendChild(dot);
    dots.push(dot);
  });

  function update() {
    const width = slider.clientWidth;
    slider.style.transform = `translateX(-${index * width}px)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function goToSlide(i) {
    const count = slides.length;
    index = (i + count) % count;
    update();
  }

  function nextSlide() {
    goToSlide(index + 1);
  }

  function prevSlide() {
    goToSlide(index - 1);
  }

  let timer = setInterval(nextSlide, intervalMs);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalMs);
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  const container = slider.closest("section");
  container.addEventListener("mouseenter", () => clearInterval(timer));
  container.addEventListener("mouseleave", resetTimer);

  window.addEventListener("resize", update);

  update();
}

initSlider({
  sliderId: "hero-slider",
  dotsId: "hero-dots",
  prevId: "hero-prev",
  nextId: "hero-next",
  dotClass: "hero-dot",
});

initSlider({
  sliderId: "outside-slider",
  dotsId: "outside-dots",
  prevId: "outside-prev",
  nextId: "outside-next",
  dotClass: "outside-dot",
});

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
    image: "Pictures/루체아%20빌딩%20101호%20-%201.jpeg",
    rooms: [
      { room: "101호", area: "54.82㎡ (16.6평)", deposit: "2,000만원", rent: "160만원", link: "room-101.html" },
      {
        room: "103호",
        area: "176.66㎡ (53.5평)",
        deposit: "6,000만원",
        rent: "520만원",
        note: "현재 감자탕집 운영중",
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
const floorPreview = document.getElementById("floor-preview");
const floorPreviewImg = document.getElementById("floor-preview-img");

function renderFloor(key) {
  const data = floorData[key];

  label.textContent = data.label;
  title.textContent = data.title;
  roomsEl.innerHTML = "";

  if (data.image) {
    floorPreviewImg.src = data.image;
    floorPreviewImg.alt = `${data.label} 사진`;
    floorPreview.classList.add("visible");
  } else {
    floorPreview.classList.remove("visible");
  }

  if (data.rooms) {
    data.rooms.forEach((r) => {
      const room = document.createElement(r.link ? "a" : "div");
      room.className = r.link ? "room room-linked" : "room";
      if (r.link) room.href = r.link;
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
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: true,
    scaleControlOptions: {
      position: naver.maps.Position.BOTTOM_LEFT,
    },
  });

  new naver.maps.Marker({
    position: buildingPosition,
    map,
    title: "루체아빌딩",
  });
}
