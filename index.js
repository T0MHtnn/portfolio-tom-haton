const skillsButtons = document.querySelectorAll(".skills-nav button");
const skillsSections = document.querySelectorAll(".skills-section");
const infosButtons = document.querySelectorAll(".infos-nav button");
const infosSections = document.querySelectorAll(".infos-section");
const infoBoxes = document.querySelectorAll(".info");
const bg = document.querySelector(".animated-bg");
const avatar = document.getElementById("avatar");
const chemin = document.querySelector(".chemin");

//Ce code se déclenche au chargement de la page, et force le scroll tout en haut.
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 200); // décalage progressif
        observer.unobserve(entry.target); // une seule fois
      }
    });
  },
  {
    threshold: 0.2,
  }
);

infoBoxes.forEach((box) => observer.observe(box));

skillsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    skillsSections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });
  });
});

document.querySelector(".infos-section").classList.add("active"); // Affiche la première section par défaut

infosButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    infosSections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });
  });
});

document.querySelector(".infos-section").classList.add("active"); // Affiche la première section par défaut

//Effet Tilt 3D
infoBoxes.forEach((box) => {
  box.addEventListener("mousemove", (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    box.style.transform = `translateX(${
      box.classList.contains("info-left")
        ? "calc(-100% - 100px)"
        : box.classList.contains("info-right")
        ? "100px"
        : "-50%"
    }) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    box.style.boxShadow = `${-rotateY * 2}px ${
      -rotateX * 2
    }px 20px rgba(0,0,0,0.3)`;
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = `translateX(${
      box.classList.contains("info-left")
        ? "calc(-100% - 100px)"
        : box.classList.contains("info-right")
        ? "100px"
        : "-50%"
    }) rotateX(0deg) rotateY(0deg)`;
    box.style.boxShadow = `0 0 10px rgba(0,0,0,0.2)`;
  });
});

//Background animé
function randomPercent() {
  return Math.floor(Math.random() * 100);
}

function updateBackgroundPosition() {
  const x = randomPercent();
  const y = randomPercent();
  bg.style.backgroundPosition = `${x}% ${y}%`;
}

updateBackgroundPosition(); // Initialisation

setInterval(updateBackgroundPosition, 3000); // Mise à jour toutes les 3 secondes

//ProgressBar
window.addEventListener("DOMContentLoaded", () => {
  const ids = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit"];
  const boxes = ids.map((id) => document.getElementById(id));
  const pointsContainer = document.getElementById("scroll-points");
  const indicator = document.getElementById("scroll-indicator");

  boxes.forEach((box, index) => {
    if (!box) return; // sécurité si un id est manquant

    const point = document.createElement("div");
    point.classList.add("scroll-point");

    const titleElement = box.querySelector("h2");
    const title = titleElement
      ? titleElement.textContent.trim()
      : `Section ${index + 1}`;
    point.setAttribute("data-title", title);

    const boxTop = box.offsetTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = (boxTop / docHeight) * 100;
    point.style.top = `${percent}%`;

    point.addEventListener("click", () => {
      box.scrollIntoView({ behavior: "smooth" });

      //Avatar qui suit le click
      const boxTop = box.offsetTop;
      avatar.style.top = `${boxTop}px`;
    });

    pointsContainer.appendChild(point);
  });

  document
    .querySelectorAll(".scroll-point")
    .forEach((p) => console.log(p.dataset.title));

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.getElementById("scroll-fill").style.height = `${scrollPercent}%`;
    indicator.style.top = `${scrollPercent}%`;
  });
});

//Avatar qui suit le scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  const sceneHeight = document.querySelector(".scene").offsetHeight;
  const avatarY = scrollPercent * sceneHeight;

  avatar.style.top = `${avatarY}px`;
});

//Avatar qui va au click
chemin.addEventListener("click", (e) => {
  const cheminRect = chemin.getBoundingClientRect();
  const clickY = e.clientY - cheminRect.top;

  // Position relative à la scène
  const sceneTop = document.querySelector(".scene").getBoundingClientRect().top;
  const avatarY = e.clientY - sceneTop;

  avatar.style.top = `${avatarY}px`;
});

//Révèle la box quand l'avatar l'atteint
function checkAvatarProximity() {
  const avatarTop = avatar.getBoundingClientRect().top + window.scrollY;

  infoBoxes.forEach((box) => {
    const boxTop = box.offsetTop;
    const distance = Math.abs(avatarTop - boxTop);

    if (distance < 100 && !box.classList.contains("revealed")) {
      box.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", () => {
  // ton code existant pour déplacer l'avatar
  checkAvatarProximity();
});

//Révéler la box au click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const boxTop = box.offsetTop;
    avatar.style.top = `${boxTop}px`;

    setTimeout(() => {
      box.classList.add("revealed");
    }, 400); // laisse le temps à l’avatar d’arriver
  });
});

//Avatar interactif
function triggerAvatarInteraction() {
  avatar.classList.add("interact");
  setTimeout(() => avatar.classList.remove("interact"), 600);
}
