const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  ageText.textContent = String(age);
})();

// ===== Active Navigation =====
(function initActiveNavigation() {
  const navLinks = [...document.querySelectorAll(".nl")];
  const sections = ["about", "experience", "projects"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (navLinks.length === 0 || sections.length === 0) {
    return;
  }

  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", isActive);
    });
  }

  setActiveLink(sections[0].id);

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        setActiveLink(visibleEntries[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-20% 0px -45% 0px",
      threshold: [0.2, 0.4, 0.6],
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

// ===== Reveal On Scroll =====
(function initReveal() {
  const revealItems = [...document.querySelectorAll(".reveal")];

  if (revealItems.length === 0) {
    return;
  }

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
})();

// ===== Modal Functionality =====
(function initModal() {
  const modal = document.getElementById("modal");
  const modalTriggers = [...document.querySelectorAll("[data-modal-target='modal']")];
  const modalCloseButtons = modal ? [...modal.querySelectorAll("[data-modal-close]")] : [];
  let lastFocusedElement = null;

  function setBodyScrollLock(isLocked) {
    document.body.style.overflow = isLocked ? "hidden" : "";
  }

  function getFocusableElements() {
    if (!modal) {
      return [];
    }

    return [...modal.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )].filter((element) => !element.hasAttribute("disabled"));
  }

  function openModal() {
    if (!modal) {
      return;
    }

    lastFocusedElement = document.activeElement;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    setBodyScrollLock(true);

    const firstFocusableElement = getFocusableElements()[0];
    firstFocusableElement?.focus();
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
    if (!modal?.classList.contains("show")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();

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
  });
})();

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
  const easing = 0.08;

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
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    context.clearRect(0, 0, width, height);

    const gradient = context.createRadialGradient(currentX, currentY, 0, currentX, currentY, 600);
    gradient.addColorStop(0, "rgba(29, 78, 216, 0.15)");
    gradient.addColorStop(1, "transparent");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(draw);
  }

  draw();
})();
