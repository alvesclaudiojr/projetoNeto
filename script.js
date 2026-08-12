const CONFIG = {
  whatsapp: "5511999999999", // Troque pelo número da clínica: DDI + DDD + número
  clinicName: "Dr. Armelin Neto"
};

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  const closeMenu = () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    toggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
    if (window.lucide) lucide.createIcons();
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  window.addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const message = encodeURIComponent(`Olá! Vim pelo site da ${CONFIG.clinicName} e gostaria de agendar uma avaliação.`);
    link.href = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const service = link.dataset.service;
      const message = encodeURIComponent(`Olá! Vim pelo site da ${CONFIG.clinicName} e gostaria de saber mais sobre ${service}.`);
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
    });
  });

  document.querySelectorAll("details").forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll("details").forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.classList.add("motion-ready");
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(element);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
