// ===== Age Calculator =====
(function calculateAge() {
  const ageText = document.getElementById("age-text");

  if (!ageText) {
    return;
  }

  const birthDate = new Date(2003, 8, 11);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  ageText.textContent = age;
})();

// ===== Active Navigation =====
const sectionIds = ["about", "experience", "projects"];
const navLinks = [...document.querySelectorAll(".nl")];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let currentSection = "about";

const navObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length > 0) {
      currentSection = visibleEntries[0].target.id;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
  },
  {
    root: null,
    rootMargin: "-22% 0px -52% 0px",
    threshold: [0.1, 0.35, 0.6],
  }
);

sections.forEach((section) => navObserver.observe(section));

// ===== Reveal On Scroll =====
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("is-visible")) {
      revealObserver.observe(element);
    }
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// ===== Modal =====
const modal = document.getElementById("modal");
const modalBox = document.getElementById("mbox");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
let lastFocusedElement = null;

function setBodyScrollLock(isLocked) {
  document.body.style.overflow = isLocked ? "hidden" : "";
}

function openModal() {
  if (!modal) {
    return;
  }

  lastFocusedElement = document.activeElement;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  setBodyScrollLock(true);

  const focusTarget = modal.querySelector("[data-modal-close]");
  if (focusTarget) {
    focusTarget.focus();
  }
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  setBodyScrollLock(false);

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openModal);
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("show")) {
    closeModal();
  }

  if (event.key === "Tab" && modal?.classList.contains("show") && modalBox) {
    const focusableElements = modalBox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});

// ===== Glow Effect =====
(function initGlowEffect() {
  if (prefersReducedMotion) {
    return;
  }

  const canvas = document.getElementById("glow");
  const context = canvas?.getContext("2d");

  if (!canvas || !context) {
    return;
  }

  let width = window.innerWidth;
  let height = window.innerHeight;
  let targetX = width * 0.68;
  let targetY = height * 0.24;
  let currentX = targetX;
  let currentY = targetY;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function updatePointerPosition(event) {
    targetX = event.clientX;
    targetY = event.clientY;
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", updatePointerPosition);

  resizeCanvas();

  function draw() {
    currentX = targetX;
    currentY = targetY;

    context.clearRect(0, 0, width, height);

    const gradient = context.createRadialGradient(currentX, currentY, 0, currentX, currentY, 420);
    gradient.addColorStop(0, "rgba(56, 189, 248, 0.16)");
    gradient.addColorStop(0.45, "rgba(37, 99, 235, 0.12)");
    gradient.addColorStop(1, "transparent");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(draw);
  }

  draw();
})();
