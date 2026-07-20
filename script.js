function initSlider({ slider, dotsEl, prevBtn, nextBtn, dotClass, hoverContainer, intervalMs = 5000 }) {
  const slides = slider.children;
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

  const container = hoverContainer || slider.parentElement;
  container.addEventListener("mouseenter", () => clearInterval(timer));
  container.addEventListener("mouseleave", resetTimer);

  window.addEventListener("resize", update);

  update();

  return {
    destroy() {
      clearInterval(timer);
      window.removeEventListener("resize", update);
    },
  };
}

initSlider({
  slider: document.getElementById("hero-slider"),
  dotsEl: document.getElementById("hero-dots"),
  prevBtn: document.getElementById("hero-prev"),
  nextBtn: document.getElementById("hero-next"),
  dotClass: "hero-dot",
  hoverContainer: document.querySelector(".hero"),
});

initSlider({
  slider: document.getElementById("outside-slider"),
  dotsEl: document.getElementById("outside-dots"),
  prevBtn: document.getElementById("outside-prev"),
  nextBtn: document.getElementById("outside-next"),
  dotClass: "outside-dot",
  hoverContainer: document.querySelector(".outside-slider-wrap"),
});

const floorData = {
  f5: {
    label: "5층",
    title: "5층",
    rooms: [
      {
        room: "501호",
      },
      {
        room: "502호",
        area: "45.71㎡ (13.8평)",
        deposit: "2,000만원",
        rent: "100만원",
        link: "room-502.html",
        images: [
          "Pictures/Ruchea%20502호/KakaoTalk_Image_2026-07-15-12-00-15_015.jpeg",
          "Pictures/Ruchea%20502호/KakaoTalk_Photo_2026-07-20-13-40-16%20004.jpeg",
        ],
      },
      {
        room: "503호",
      },
    ],
  },
  f4: {
    label: "4층",
    title: "4층",
    rooms: [
      {
        room: "401호",
        area: "99.84㎡ (30.2평)",
        deposit: "3,000만원",
        rent: "210만원",
        link: "room-401.html",
        images: [
          "Pictures/Ruchea%20401호/KakaoTalk_Image_2026-07-15-12-00-14_012.jpeg",
          "Pictures/Ruchea%20401호/KakaoTalk_Image_2026-07-15-12-00-14_013.jpeg",
          "Pictures/Ruchea%20401호/KakaoTalk_Image_2026-07-15-12-00-15_014.jpeg",
          "Pictures/Ruchea%20401호/KakaoTalk_Photo_2026-07-20-13-40-16%20003.jpeg",
        ],
      },
      {
        room: "402호",
      },
    ],
  },
  f3: {
    label: "3층",
    title: "3층",
    rooms: [
      {
        room: "301호",
        area: "77.23㎡ (23.4평)",
        deposit: "3,000만원",
        rent: "160만원",
        link: "room-301.html",
        images: [
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%201.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%202.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%203.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%204.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%205.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%206.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%207.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%208.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%209.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301%20-%2010.jpeg",
          "Pictures/Ruchea%20301호/Ruchea%20301호%20-%201.jpeg",
          "Pictures/Ruchea%20301호/KakaoTalk_Photo_2026-07-20-13-40-15%20001.jpeg",
        ],
      },
      {
        room: "302호",
        area: "65.45㎡ (19.8평)",
        deposit: "2,000만원",
        rent: "140만원",
        link: "room-302.html",
        images: [
          "Pictures/Ruchea%20302호/KakaoTalk_Image_2026-07-15-12-00-12_008.jpeg",
          "Pictures/Ruchea%20302호/KakaoTalk_Image_2026-07-15-12-00-12_009.jpeg",
          "Pictures/Ruchea%20302호/KakaoTalk_Image_2026-07-15-12-00-13_010.jpeg",
          "Pictures/Ruchea%20302호/KakaoTalk_Image_2026-07-15-12-00-13_011.jpeg",
          "Pictures/Ruchea%20302호/KakaoTalk_Photo_2026-07-20-13-40-15%20001%20copy.jpeg",
          "Pictures/Ruchea%20302호/KakaoTalk_Photo_2026-07-20-13-40-15%20002.jpeg",
        ],
      },
    ],
  },
  f2: {
    label: "2층",
    title: "2층",
    rooms: [
      {
        room: "201호",
        area: "104.94㎡ (31.7평)",
        deposit: "3,000만원",
        rent: "210만원",
        link: "room-201.html",
        images: [
          "Pictures/Ruchea%20201호/Ruchea%20201%20-%201.jpeg",
          "Pictures/Ruchea%20201호/Ruchea%20201%20-%202.jpeg",
          "Pictures/Ruchea%20201호/Ruchea%20201%20-%203.jpeg",
          "Pictures/Ruchea%20201호/Ruchea%20201%20-%204.jpeg",
          "Pictures/Ruchea%20201호/Ruchea%20201%20-%205.jpeg",
          "Pictures/Ruchea%20201호/KakaoTalk_Photo_2026-07-20-13-40-15%20001%20copy.jpeg",
        ],
      },
      {
        room: "202호",
        area: "50.51㎡ (15.3평)",
        deposit: "2,000만원",
        rent: "100만원",
        link: "room-202.html",
        images: [
          "Pictures/Ruchea%20202호/Ruchea%20202%20-%201.jpeg",
          "Pictures/Ruchea%20202호/Ruchea%20202%20-%202.jpeg",
          "Pictures/Ruchea%20202호/Ruchea%20202호%20-%202.jpeg",
        ],
      },
      {
        room: "203호",
      },
    ],
  },
  f1: {
    label: "1층",
    title: "1층 · 상가",
    rooms: [
      {
        room: "101호",
        area: "54.82㎡ (16.6평)",
        deposit: "2,000만원",
        rent: "160만원",
        link: "room-101.html",
        images: [
          "Pictures/Ruchea%20101호/루체아%20빌딩%20101호%20-%201.jpeg",
          "Pictures/Ruchea%20101호/루체아%20빌딩%20101호%20-%202.jpeg",
          "Pictures/Ruchea%20101호/Ruchea%20101%20-%203.jpeg",
          "Pictures/Ruchea%20101호/Ruchea%20101%20-%204.jpeg",
          "Pictures/Ruchea%20101호/Ruchea%20101%20-%205.jpeg",
          "Pictures/Ruchea%20101호/Ruchea%20101%20-%206.jpeg",
        ],
      },
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
    rooms: [
      {
        room: "주차장",
        desc: "입주 세대를 위한 지하 주차장입니다.",
        link: "room-b1.html",
        images: ["Pictures/Ruchea%20Basement/Ruchea%20B1%20-%201.jpeg"],
      },
    ],
  },
};

const floors = document.querySelectorAll(".floor");
const label = document.getElementById("floor-label");
const title = document.getElementById("floor-title");
const roomsEl = document.getElementById("floor-rooms");
const content = document.getElementById("floor-info-content");

let activeRoomSliders = [];

function renderFloor(key) {
  const data = floorData[key];

  label.textContent = data.label;
  title.textContent = data.title;
  roomsEl.innerHTML = "";

  activeRoomSliders.forEach((s) => s.destroy());
  activeRoomSliders = [];

  data.rooms.forEach((r) => {
    const hasImages = r.images && r.images.length > 0;
    const hasMultiple = hasImages && r.images.length > 1;
    const cardTag = r.link ? "a" : "div";

    const block = document.createElement("div");
    block.className = "room-block";
    block.innerHTML = `
      ${hasImages ? `
      <div class="room-slider-wrap">
        <div class="room-slider">
          ${r.images.map((src) => `<div class="room-slide" style="background-image:url('${src}')"></div>`).join("")}
        </div>
        ${hasMultiple ? `
        <button class="room-slider-arrow room-slider-arrow-prev" aria-label="이전 사진">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="room-slider-arrow room-slider-arrow-next" aria-label="다음 사진">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div class="room-slider-dots"></div>` : ""}
      </div>` : ""}
      <${cardTag} class="${r.link ? "room room-linked" : "room"}" ${r.link ? `href="${r.link}"` : ""}>
        <div class="room-head">
          <span class="room-number">${r.room}</span>
          ${r.area ? `<span class="room-area">${r.area}</span>` : ""}
        </div>
        ${r.deposit ? `
        <div class="room-terms">
          <span>보증금 ${r.deposit}</span>
          <span>월세 ${r.rent}</span>
        </div>` : ""}
        ${r.note ? `<div class="room-note">${r.note}</div>` : ""}
        ${r.desc ? `<div class="room-note">${r.desc}</div>` : ""}
      </${cardTag}>
    `;
    roomsEl.appendChild(block);

    if (hasMultiple) {
      const wrap = block.querySelector(".room-slider-wrap");
      activeRoomSliders.push(
        initSlider({
          slider: wrap.querySelector(".room-slider"),
          dotsEl: wrap.querySelector(".room-slider-dots"),
          prevBtn: wrap.querySelector(".room-slider-arrow-prev"),
          nextBtn: wrap.querySelector(".room-slider-arrow-next"),
          dotClass: "room-slider-dot",
          hoverContainer: wrap,
          intervalMs: 4000,
        })
      );
    }
  });
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

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/gJgCUKEi";

const contactSubmitBtn = document.getElementById("contact-submit");
const contactNameInput = document.getElementById("contact-name");
const contactPhoneInput = document.getElementById("contact-phone");
const contactUnitSelect = document.getElementById("contact-unit");

contactSubmitBtn.addEventListener("click", () => {
  const name = contactNameInput.value.trim();
  const phone = contactPhoneInput.value.trim();
  const unit = contactUnitSelect.options[contactUnitSelect.selectedIndex].text;
  const message = contactMessage.value.trim();

  if (!name || !phone) {
    alert("성함과 연락처를 입력해주세요.");
    return;
  }

  const text = `[루체아빌딩 문의]\n성함: ${name}\n연락처: ${phone}\n선호 호수: ${unit}\n문의 사항: ${message || "없음"}`;

  window.open(KAKAO_OPEN_CHAT_URL, "_blank", "noopener,noreferrer");

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("문의 내용이 복사되었습니다. 열리는 카카오톡 채팅방에 붙여넣기 해주세요.");
    })
    .catch(() => {
      alert("문의 내용을 자동으로 복사하지 못했습니다. 카카오톡 채팅방에 직접 입력해주세요.");
    });
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
