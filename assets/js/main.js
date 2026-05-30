(function () {
  "use strict";

  /* Preloader */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("loaded");
    });
  }

  /* Navbar scroll glass effect */
  const header = document.querySelector("#header");
  function toggleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", toggleHeaderScroll);
  window.addEventListener("load", toggleHeaderScroll);

  /* Mobile nav toggle */
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  function toggleMobileNav() {
    document.body.classList.toggle("mobile-nav-active");
    if (mobileNavToggle) {
      mobileNavToggle.classList.toggle("bi-list");
      mobileNavToggle.classList.toggle("bi-x");
    }
  }
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", toggleMobileNav);
  }

  /* Close mobile nav on link click */
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        toggleMobileNav();
      }
    });
  });

  /* Scroll top button */
  const scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (!scrollTop) return;
    if (window.scrollY > 300) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  window.addEventListener("load", toggleScrollTop);
  window.addEventListener("scroll", toggleScrollTop);

  /* AOS init */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-out",
        once: true,
        mirror: false,
      });
    }
  }
  window.addEventListener("load", aosInit);

  /* GLightbox init */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  /* Isotope init */
  document.querySelectorAll(".isotope-layout").forEach((isotopeItem) => {
    const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    const container = isotopeItem.querySelector(".isotope-container");
    if (!container) return;

    if (typeof imagesLoaded !== "undefined") {
      imagesLoaded(container, function () {
        initIsotope = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });
    }

    isotopeItem.querySelectorAll(".isotope-filters li").forEach((filterBtn) => {
      filterBtn.addEventListener(
        "click",
        function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            ?.classList.remove("filter-active");
          this.classList.add("filter-active");
          if (initIsotope) {
            initIsotope.arrange({ filter: this.getAttribute("data-filter") });
          }
          if (typeof aosInit === "function") {
            aosInit();
          }
        },
        false
      );
    });
  });

  /* FAQ toggle */
  document
    .querySelectorAll(".faq-item h3")
    .forEach((item) => {
      item.addEventListener("click", function () {
        const parent = this.parentNode;
        parent.classList.toggle("faq-active");
      });
    });

  /* Scrollspy - Active nav link on scroll */
  const navLinks = document.querySelectorAll(".navmenu a");
  function navSpy() {
    const scrollPos = window.scrollY + 120;
    navLinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("load", navSpy);
  window.addEventListener("scroll", navSpy);

  /* Smooth scroll for nav links */
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (!this.hash || this.hash === "#") return;
      const target = document.querySelector(this.hash);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
