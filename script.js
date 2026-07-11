const floors = document.querySelectorAll(".floor");
const label = document.getElementById("floor-label");
const title = document.getElementById("floor-title");
const desc = document.getElementById("floor-desc");

function showFloor(floor) {
  floors.forEach((f) => f.classList.remove("active"));
  floor.classList.add("active");

  [label, title, desc].forEach((el) => (el.style.opacity = 0));

  setTimeout(() => {
    label.textContent = floor.dataset.label;
    title.textContent = floor.dataset.title;
    desc.textContent = floor.dataset.desc;
    [label, title, desc].forEach((el) => (el.style.opacity = 1));
  }, 150);
}

floors.forEach((floor) => {
  floor.addEventListener("mouseenter", () => showFloor(floor));
  floor.addEventListener("focus", () => showFloor(floor));
  floor.addEventListener("click", () => showFloor(floor));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".section-heading").forEach((el) => observer.observe(el));
