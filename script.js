const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-navigation");
const navList = document.querySelector("#mega-nav-list");
const siteHeader = document.querySelector(".site-header");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
const revealElements = document.querySelectorAll(".reveal");
const sectionElements = document.querySelectorAll("main section[id]");

const CONTACT_EMAIL = "hr_india@youwin.com";
const desktopQuery = window.matchMedia("(min-width: 1024px)");

const megaMenuData = [
  {
    id: "about",
    label: "About Us",
    href: "#about",
    panelType: "overview",
    panel: {
      kicker: "Who We Are",
      title: "Consulting and software delivery aligned to business outcomes.",
      description:
        "YouWin delivers impactful solutions in software consulting and software development, helping businesses close skill gaps, streamline operations, and build scalable technology systems.",
      cards: [
        {
          title: "Strategy + Execution",
          description: "With a strong foundation in strategy, people, process, and technology, we enable organizations to achieve faster results and sustainable growth."
        },
        {
          title: "Client-Centered Delivery",
          description: "Our client-focused and collaborative approach ensures transparency, reduced risk, and successful execution in every engagement."
        },
        {
          title: "Scalable Partnerships",
          description: "By aligning the right talent, smart consulting, and innovative solutions with business goals, we help clients drive efficiency, innovation, and long-term success."
        }
      ],
      ctaLabel: "Explore More",
      ctaHref: "about.html"
    }
  },
  {
    id: "services",
    label: "Products & Services",
    href: "#services",
    panelType: "nested",
    panel: {
      kicker: "Capabilities",
      title: "Technology services engineered for modernization and growth.",
      description:
        "From cloud and analytics to digital platforms and enterprise systems, we help organizations move with more speed, clarity, and resilience.",
      ctaLabel: "Explore More",
      ctaHref: "services.html",
      categories: [
        {
          title: "Cloud",
          blurb: "Platform foundations, migration planning, security, and delivery readiness across major cloud ecosystems.",
          items: [
            { title: "AWS", description: "Cloud architecture, migration planning, and managed modernization support." },
            { title: "Azure", description: "Enterprise-ready services, governance alignment, and solution rollout support." },
            { title: "Google Cloud", description: "Flexible workloads, analytics foundations, and modern application hosting." },
            { title: "DevOps", description: "Pipelines, release automation, deployment consistency, and engineering efficiency." },
            { title: "Security", description: "Controls, access discipline, platform hardening, and compliance-aware operations." }
          ]
        },
        {
          title: "AI & Analytics",
          blurb: "Data pipelines, reporting layers, intelligent automation opportunities, and insight-led business support.",
          items: [
            { title: "Data Engineering", description: "Reliable flow design, transformation logic, and scalable data readiness." },
            { title: "Business Intelligence", description: "Dashboards and reports that improve leadership visibility and decision speed." },
            { title: "Automation", description: "Practical AI and workflow improvements focused on measurable business value." }
          ]
        },
        {
          title: "Web Development",
          blurb: "Premium web experiences, customer platforms, portals, and maintainable software products.",
          items: [
            { title: "Corporate Websites", description: "Modern brand-led experiences with performance and conversion in mind." },
            { title: "Portals", description: "Secure interfaces for employees, partners, and customers." },
            { title: "Custom Applications", description: "Business workflows translated into purposeful digital products." }
          ]
        },
        {
          title: "ERP Solutions",
          blurb: "Operational streamlining, system integration, and process consistency across enterprise functions.",
          items: [
            { title: "Implementation Support", description: "Structured rollout assistance and process mapping for smoother adoption." },
            { title: "Optimization", description: "Workflow refinement and system improvement around real operating needs." },
            { title: "Integrations", description: "Reliable data movement between business systems and supporting platforms." }
          ]
        }
      ]
    }
  },
  {
    id: "clients",
    label: "Clients",
    href: "#clients",
    panelType: "clients",
    panel: {
      kicker: "Trusted Engagements",
      title: "Enterprise support shaped around cloud, analytics, and digital transformation.",
      description:
        "We proudly support reputed enterprise clients across cloud modernization, analytics, and digital transformation initiatives.",
      cards: [
        {
          title: "CloudPaths",
          description: "Cloud modernization and delivery acceleration support for enterprise platform initiatives."
        },
        {
          title: "Dattansa",
          description: "Analytics, data operations, and reporting support for insight-led business execution."
        }
      ],
      ctaLabel: "Explore More",
      ctaHref: "clients.html"
    }
  },
  {
    id: "careers",
    label: "Careers",
    href: "#careers",
    panelType: "careers",
    panel: {
      kicker: "Career Growth",
      title: "A workplace for professionals who want depth, variety, and real ownership.",
      description:
        "Explore how careers at YOUWIN can grow across engineering, cloud, data, sales, and client-facing delivery functions.",
      metrics: [
        { value: "3", label: "core talent tracks" },
        { value: "Growth", label: "learning-driven environment" }
      ],
      ctaLabel: "Explore Now",
      ctaHref: "careers.html"
    }
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "#contact",
    panelType: "contact",
    panel: {
      kicker: "Direct Contact",
      title: "Reach the YOUWIN team through the channel that best fits your need.",
      description:
        "For business enquiries, hiring conversations, partnerships, and follow-up support, we route communication directly through our team.",
      metrics: [
        { value: "1", label: "primary email channel" },
        { value: "Direct", label: "team-routed communication" }
      ],
      topics: ["Business Enquiries", "Partnerships", "Recruitment", "Support & Follow-up"],
      ctaLabel: "Go to Contact Section",
      ctaHref: "#contact"
    }
  }
];

const createInfoCards = (cards = []) =>
  cards
    .map(
      (card) => `
        <article class="mega-info-card">
          <strong>${card.title}</strong>
          <span>${card.description}</span>
        </article>
      `
    )
    .join("");

const createMetrics = (metrics = []) =>
  metrics
    .map(
      (metric) => `
        <article class="mega-metric">
          <strong>${metric.value}</strong>
          <span>${metric.label}</span>
        </article>
      `
    )
    .join("");

const createDetailsList = (items = []) =>
  items
    .map(
      (item) => `
        <li>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </li>
      `
    )
    .join("");

const createPanelMarkup = (item) => {
  const { panelType, panel } = item;

  if (panelType === "nested") {
    const categoryButtons = panel.categories
      .map(
        (category, index) => `
          <li>
            <button
              class="mega-submenu-button${index === 0 ? " is-active" : ""}"
              type="button"
              data-detail-trigger
              data-target="${item.id}-${index}"
              aria-pressed="${index === 0 ? "true" : "false"}"
            >
              <strong>${category.title}</strong>
              <span>${category.blurb}</span>
            </button>
          </li>
        `
      )
      .join("");

    const detailPanels = panel.categories
      .map(
        (category, index) => `
          <article
            class="mega-detail-panel${index === 0 ? " is-active" : ""}"
            data-detail-panel
            data-panel-id="${item.id}-${index}"
          >
            <h4>${category.title}</h4>
            <p>${category.blurb}</p>
            <ul class="mega-detail-list">
              ${createDetailsList(category.items)}
            </ul>
          </article>
        `
      )
      .join("");

    return `
      <div class="mega-panel-shell mega-panel-shell--nested">
        <div class="mega-panel-lead">
          <p class="mega-panel-kicker">${panel.kicker}</p>
          <h3>${panel.title}</h3>
          <p>${panel.description}</p>
          <a class="mega-panel-cta" href="${panel.ctaHref}">${panel.ctaLabel}</a>
        </div>
        <div class="mega-panel-nested">
          <ul class="mega-nav-submenu">
            ${categoryButtons}
          </ul>
          <div>
            ${detailPanels}
          </div>
        </div>
      </div>
    `;
  }

  if (panelType === "clients") {
    return `
      <div class="mega-panel-shell">
        <div class="mega-panel-lead">
          <p class="mega-panel-kicker">${panel.kicker}</p>
          <h3>${panel.title}</h3>
          <p>${panel.description}</p>
          <a class="mega-panel-cta" href="${panel.ctaHref}">${panel.ctaLabel}</a>
        </div>
        <div class="mega-panel-stack">
          ${createInfoCards(panel.cards)}
        </div>
      </div>
    `;
  }

  if (panelType === "careers") {
    return `
      <div class="mega-panel-shell">
        <div class="mega-panel-lead">
          <p class="mega-panel-kicker">${panel.kicker}</p>
          <h3>${panel.title}</h3>
          <p>${panel.description}</p>
          <a class="mega-panel-cta" href="${panel.ctaHref}">${panel.ctaLabel}</a>
        </div>
        <div class="mega-panel-grid">
          ${createMetrics(panel.metrics)}
        </div>
      </div>
    `;
  }

  if (panelType === "contact") {
    const topics = panel.topics
      .map((topic) => `<div class="mega-topic-pill">${topic}</div>`)
      .join("");

    return `
      <div class="mega-panel-shell">
        <div class="mega-panel-lead">
          <p class="mega-panel-kicker">${panel.kicker}</p>
          <h3>${panel.title}</h3>
          <p>${panel.description}</p>
          <a class="mega-panel-cta" href="${panel.ctaHref}">${panel.ctaLabel}</a>
        </div>
        <div class="mega-panel-stack">
          <div class="mega-panel-grid">
            ${createMetrics(panel.metrics)}
          </div>
          <div class="mega-info-card">
            <strong>Email</strong>
            <span>${CONTACT_EMAIL}</span>
          </div>
          <div class="mega-topics">
            ${topics}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="mega-panel-shell">
      <div class="mega-panel-lead">
        <p class="mega-panel-kicker">${panel.kicker}</p>
        <h3>${panel.title}</h3>
        <p>${panel.description}</p>
        <a class="mega-panel-cta" href="${panel.ctaHref}">${panel.ctaLabel}</a>
      </div>
      <div class="mega-panel-grid">
        ${createInfoCards(panel.cards)}
      </div>
    </div>
  `;
};

const createMenuMarkup = (item) => `
  <li class="mega-nav-item" data-menu-item="${item.id}">
    <a
      class="mega-nav-trigger"
      href="${item.href}"
      data-menu-trigger="${item.id}"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span>${item.label}</span>
      <span class="mega-nav-caret" aria-hidden="true"></span>
    </a>
    <div class="mega-panel" data-menu-panel="${item.id}">
      ${createPanelMarkup(item)}
    </div>
  </li>
`;

const renderNavigation = () => {
  if (!navList) return;
  navList.innerHTML = megaMenuData.map(createMenuMarkup).join("");
};

renderNavigation();

const navItems = [...document.querySelectorAll("[data-menu-item]")];
const menuTriggers = [...document.querySelectorAll("[data-menu-trigger]")];
const detailTriggerGroups = [...document.querySelectorAll("[data-menu-item]")];

let activeMenuId = null;
let closeTimer = null;

const setItemExpanded = (item, expanded) => {
  const trigger = item.querySelector("[data-menu-trigger]");
  trigger?.setAttribute("aria-expanded", String(expanded));
};

const closeAllMenus = () => {
  navItems.forEach((item) => {
    item.classList.remove("is-open");
    setItemExpanded(item, false);
  });
  activeMenuId = null;
};

const openMenu = (menuId) => {
  navItems.forEach((item) => {
    const isTarget = item.dataset.menuItem === menuId;
    item.classList.toggle("is-open", isTarget);
    setItemExpanded(item, isTarget);
  });
  activeMenuId = menuId;
};

const clearCloseTimer = () => {
  if (closeTimer) {
    window.clearTimeout(closeTimer);
    closeTimer = null;
  }
};

const queueCloseMenus = () => {
  clearCloseTimer();
  closeTimer = window.setTimeout(() => {
    closeAllMenus();
  }, 140);
};

const handleDesktopMenuState = () => {
  if (!desktopQuery.matches) {
    closeAllMenus();
    return;
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      clearCloseTimer();
      openMenu(item.dataset.menuItem);
    });

    item.addEventListener("mouseleave", () => {
      queueCloseMenus();
    });
  });
};

const activateDetailPanel = (menuItem, panelId) => {
  const detailButtons = menuItem.querySelectorAll("[data-detail-trigger]");
  const detailPanels = menuItem.querySelectorAll("[data-detail-panel]");

  detailButtons.forEach((button) => {
    const isActive = button.dataset.target === panelId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  detailPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panelId === panelId);
  });
};

detailTriggerGroups.forEach((menuItem) => {
  const detailButtons = menuItem.querySelectorAll("[data-detail-trigger]");

  detailButtons.forEach((button) => {
    const handler = () => activateDetailPanel(menuItem, button.dataset.target);
    button.addEventListener("mouseenter", () => {
      if (desktopQuery.matches) {
        handler();
      }
    });
    button.addEventListener("focus", handler);
    button.addEventListener("click", () => {
      if (!desktopQuery.matches) {
        handler();
      }
    });
  });
});

menuTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (desktopQuery.matches) {
      return;
    }

    event.preventDefault();
    const item = trigger.closest("[data-menu-item]");
    const shouldOpen = !item.classList.contains("is-open");

    navItems.forEach((navItem) => {
      navItem.classList.remove("is-open");
      setItemExpanded(navItem, false);
    });

    item.classList.toggle("is-open", shouldOpen);
    setItemExpanded(item, shouldOpen);
  });
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    siteNav.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("nav-open", willOpen);

    if (!willOpen) {
      closeAllMenus();
    }
  });
}

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!desktopQuery.matches) {
      siteNav.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      closeAllMenus();
    }
  });
});

window.addEventListener("resize", () => {
  if (desktopQuery.matches) {
    siteNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
});

desktopQuery.addEventListener("change", () => {
  closeAllMenus();
  if (desktopQuery.matches) {
    siteNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
});

document.addEventListener("click", (event) => {
  const clickedInsideNav = event.target.closest(".site-header");

  if (!clickedInsideNav) {
    closeAllMenus();
    siteNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllMenus();
    siteNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
});

const handleHeaderScroll = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();
handleDesktopMenuState();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const currentId = entry.target.id;

      navItems.forEach((item) => {
        item.classList.toggle("is-current", item.dataset.menuItem === currentId);
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0
  }
);

sectionElements.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      message
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "YOUWIN Website Enquiry"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    formFeedback.textContent = "Your email app is opening with the message prepared.";
    contactForm.reset();
  });
}
