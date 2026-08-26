/**
 * Mahad Ishaaq Lubega — AI & Data Science Portfolio
 * Vanilla JS: nav, scroll, theme, form, animations
 */
(function () {
  "use strict";

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");
  const backToTop = document.getElementById("back-to-top");
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const revealEls = document.querySelectorAll(".reveal");

  /* ---------- Theme ---------- */
  const THEME_KEY = "portfolio-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener("click", function () {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    navMenu.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  navToggle.addEventListener("click", function () {
    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navAnchors.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (href && href.charAt(0) === "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        closeMenu();
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Active nav on scroll ---------- */
  function updateActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var current = "";

    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute("id") || "";
      }
    });

    navAnchors.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + current);
    });
  }

  /* ---------- Back to top ---------- */
  function updateBackToTop() {
    var show = (window.scrollY || window.pageYOffset) > 400;
    if (show) {
      backToTop.hidden = false;
    } else {
      backToTop.hidden = true;
    }
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener(
    "scroll",
    function () {
      updateActiveNav();
      updateBackToTop();
    },
    { passive: true }
  );

  updateActiveNav();
  updateBackToTop();

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Hero typing (optional subtle effect) ---------- */
  var typedEl = document.querySelector(".typed-prefix");
  if (typedEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var fullText = typedEl.textContent.trim();
    typedEl.textContent = "";
    var i = 0;
    function typeNext() {
      if (i < fullText.length) {
        typedEl.textContent += fullText.charAt(i);
        i += 1;
        window.setTimeout(typeNext, 45);
      }
    }
    window.setTimeout(typeNext, 400);
  }

  /* ---------- Contact form validation (frontend demo only) ---------- */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setError(input, errorEl, message) {
    input.classList.add("is-invalid");
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove("is-invalid");
    errorEl.textContent = "";
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");
    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var messageError = document.getElementById("message-error");

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var message = messageInput.value.trim();
    var valid = true;

    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);
    formSuccess.hidden = true;

    if (!name) {
      setError(nameInput, nameError, "Please enter your name.");
      valid = false;
    }

    if (!email) {
      setError(emailInput, emailError, "Please enter your email.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setError(emailInput, emailError, "Please enter a valid email address.");
      valid = false;
    }

    if (!message) {
      setError(messageInput, messageError, "Please enter a message.");
      valid = false;
    }

    if (!valid) {
      var firstInvalid = contactForm.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    formSuccess.hidden = false;
    contactForm.reset();
    formSuccess.focus && formSuccess.setAttribute("tabindex", "-1");
    formSuccess.focus();
  });

  ["name", "email", "message"].forEach(function (id) {
    var input = document.getElementById(id);
    var errorEl = document.getElementById(id + "-error");
    input.addEventListener("input", function () {
      clearError(input, errorEl);
    });
  });
})();
