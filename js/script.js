// ===== Age Calculator =====
(function() {
  const birthDate = new Date(2003, 8, 11);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (today.getMonth() < birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }

  document.getElementById('age-text').textContent = age;
})();

// ===== Navigation Active State =====
const sections = ['about', 'experience', 'projects'];
const links = document.querySelectorAll('.nl');
let currentSection = 'about';

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -66% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentSection = entry.target.id;
    }
  });

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
  document.getElementById('modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.body.style.overflow = '';
}

function handleClick(event) {
  if (event.target === document.getElementById('modal')) {
    closeModal();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// ===== Glow Effect (Mouse Tracking) =====
(function() {
  const canvas = document.getElementById('glow');
  const ctx = canvas.getContext('2d');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
    gradient.addColorStop(0, 'rgba(29, 78, 216, 0.15)');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
  }

  draw();
})();
