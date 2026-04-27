// ===== Age Calculator =====
(function calculateAge() {
  const ageText = document.getElementById("age-text");

  if (!ageText) {
    return;
  }

  const birthDate = new Date(2003, 8, 11);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (today.getMonth() < birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
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

const observer = new IntersectionObserver((entries) => {
  // เลือกเฉพาะ entry แรกที่ isIntersecting
  const activeEntry = entries.find(entry => entry.isIntersecting);
  
  if (activeEntry) {
    currentSection = activeEntry.target.id;
  }

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
  });
}, observerOptions);

sections.forEach(id => {
  const element = document.getElementById(id);
  if (element) observer.observe(element);
});

// ===== Modal Functionality =====
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
});

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

    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
    gradient.addColorStop(0, 'rgba(29, 78, 216, 0.15)');
    gradient.addColorStop(1, 'transparent');

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(draw);
  }

  draw();
})();
