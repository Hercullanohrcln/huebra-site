// Config
const INSTAGRAM_URL = "https://www.instagram.com/auto_eletricahuebra_/";
const WHATSAPP_URL = "https://wa.me/5528999788862";

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav__link"));

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.contains("open");
  setMenu(!isOpen);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // fecha menu no mobile ao clicar
    if (window.matchMedia("(max-width: 899px)").matches) setMenu(false);
  });
});

// Fecha menu ao clicar fora (mobile)
document.addEventListener("click", (e) => {
  if (!nav.classList.contains("open")) return;
  const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
  if (!isClickInside) setMenu(false);
});

// Active link on scroll (simples)
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = `#${entry.target.id}`;
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

sections.forEach(sec => observer.observe(sec));

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

const galleryImgs = Array.from(document.querySelectorAll(".gallery img"));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = galleryImgs[currentIndex];
  if (!img) return;

  const full = img.dataset.full || img.src;
  lightboxImg.src = full;
  lightboxImg.alt = img.alt || "Imagem ampliada";
  lightboxCaption.textContent = img.alt || "";

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  // trava scroll do body
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  openLightbox(currentIndex);
}

  function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs }