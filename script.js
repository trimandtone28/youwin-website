const root = document.documentElement;
const body = document.body;
const header = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
const revealElements = document.querySelectorAll(".reveal");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const CONTACT_EMAIL = "hr_india@youwin.com";

const STORAGE_KEY = "youwin-theme";

const setTheme = (theme, { persist = true } = {}) => {
  const isDark = theme === "dark";
  body.classList.toggle("dark-theme", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle?.setAttribute(
    "title",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  root.style.setProperty("color-scheme", isDark ? "dark" : "light");
  themeColorMeta?.setAttribute("content", isDark ? "#071225" : "#0A1F44");

  if (persist) {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }
};

const getPreferredTheme = () => {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

setTheme(getPreferredTheme(), { persist: false });

const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const handleSystemThemeChange = (event) => {
  if (!window.localStorage.getItem(STORAGE_KEY)) {
    setTheme(event.matches ? "dark" : "light", { persist: false });
  }
};

if (typeof colorSchemeQuery.addEventListener === "function") {
  colorSchemeQuery.addEventListener("change", handleSystemThemeChange);
} else if (typeof colorSchemeQuery.addListener === "function") {
  colorSchemeQuery.addListener(handleSystemThemeChange);
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = body.classList.contains("dark-theme") ? "light" : "dark";
  setTheme(nextTheme);
});

const toggleNavigation = () => {
  const willOpen = !body.classList.contains("nav-open");
  body.classList.toggle("nav-open", willOpen);
  navToggle?.setAttribute("aria-expanded", String(willOpen));
};

navToggle?.addEventListener("click", toggleNavigation);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!body.classList.contains("nav-open")) {
    return;
  }

  const target = event.target;

  if (
    target instanceof Node &&
    !nav.contains(target) &&
    !navToggle?.contains(target)
  ) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const syncHeaderScrollState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", syncHeaderScrollState);
syncHeaderScrollState();

const observer = new IntersectionObserver(
  (entries, intersectionObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      intersectionObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => observer.observe(element));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "there";
  const email = formData.get("email")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";
  const subject = encodeURIComponent(`YOUWIN website enquiry - ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n")
  );
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  formFeedback.textContent = `Opening your email app for ${CONTACT_EMAIL}. If nothing opens, email us directly at ${CONTACT_EMAIL}.`;
  contactForm.reset();
  window.location.href = mailtoUrl;
});
/* ===================================
   MOBILE DROPDOWN
=================================== */

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {

  const btn = dropdown.querySelector(".dropdown-btn");

  btn.addEventListener("click", () => {

    if (window.innerWidth <= 1024) {
      dropdown.classList.toggle("active");
    }

  });

});
