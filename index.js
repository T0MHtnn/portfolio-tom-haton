const skillsButtons = document.querySelectorAll(".skills-nav button");
const skillsSections = document.querySelectorAll(".skills-section");
const infosButtons = document.querySelectorAll(".infos-nav button");
const infosSections = document.querySelectorAll(".infos-section");

//Ce code se déclenche au chargement de la page, et force le scroll tout en haut.
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

skillsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    skillsSections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });
  });
});

// Affiche la première section par défaut
document.querySelector(".infos-section").classList.add("active");

infosButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    infosSections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });
  });
});

// Affiche la première section par défaut
document.querySelector(".infos-section").classList.add("active");
