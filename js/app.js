/* =====================================================
   CodeMax Academy
   app.js
===================================================== */

"use strict";

/*=========================================
  UTILIDADES
=========================================*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*=========================================
  NAVBAR MOBILE
=========================================*/

const menuButton = $(".menu-toggle");
const navMenu = $(".nav-links");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuButton.classList.toggle("active");

    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuButton.classList.remove("active");

        });

    });

}

/*=========================================
  HEADER STICKY
=========================================*/

const header = $("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}

/*=========================================
  BOTÓN VOLVER ARRIBA
=========================================*/

let topButton = document.createElement("button");

topButton.className = "scroll-top";

topButton.setAttribute("aria-label", "Volver arriba");

topButton.innerHTML = `
<i class="fa-solid fa-arrow-up"></i>
`;

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

/*=========================================
  FAQ
=========================================*/

const faqItems = $$(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {

                other.classList.remove("open");

            }

        });

        item.classList.toggle("open");

    });

});

/*=========================================
  SCROLL REVEAL
=========================================*/

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.15

    }

);

$$(".reveal").forEach(section => {

    observer.observe(section);

});

/*=========================================
  LINK ACTIVO EN NAVBAR
=========================================*/

const sections = $$("section[id]");
const navLinks = $$(".nav-links a");

if (sections.length > 0 && navLinks.length > 0) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/*=========================================
  AÑO AUTOMÁTICO FOOTER
=========================================*/

const year = $("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*=========================================
  ANIMACIÓN BOTONES
=========================================*/

$$(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

/*=========================================
  PRELOADER (opcional)
=========================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*=========================================
  FORMULARIO (solo visual)
=========================================*/

const form = $("form");

if (form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        alert("Formulario de demostración. No posee backend.");

    });

}




/* =================================================================
   app.js — Lógica compartida
   CodeMax Academy — Comparativa IA - Generado por CLAUDE SONNET 4.6
   ================================================================= */

/* ── Menú hamburguesa ── */
function initHamburger() {
  const btn = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
  });

  // Cierra al hacer click en un enlace
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });

  // Cierra con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      btn.focus();
    }
  });
}

/* ── FAQ accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      if (!answer) return;

      // Cierra todos los demás
      document.querySelectorAll('.faq-item__question').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });
}

/* ── Scroll spy: marca el enlace activo en el nav ── */
function initScrollSpy() {
  const links = document.querySelectorAll('.nav__link[href^="#"]');
  if (!links.length) return;

  const ids = Array.from(links).map(l => l.getAttribute('href').slice(1));
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.removeAttribute('aria-current'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.setAttribute('aria-current', 'page');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── Reveal on scroll ── */
function initReveal() {
  const targets = document.querySelectorAll(
    '.benefit-card, .course-card, .method-card, .project-card, ' +
    '.testimonial-card, .roadmap__step, .faq-item, .about__card'
  );

  if (!targets.length) return;

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

/* ── Smooth scroll para navegadores que no lo soportan nativamente ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initFAQ();
  initScrollSpy();
  initReveal();
  initSmoothScroll();
});