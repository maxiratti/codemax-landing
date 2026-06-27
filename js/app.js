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