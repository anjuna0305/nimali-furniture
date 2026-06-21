document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });

  // window.addEventListener(
  //   "scroll",
  //   () => {
  //     const scrollY = window.scrollY;

  //     if (scrollY > 50) {
  //       navbar.classList.add("scrolled");
  //     } else {
  //       navbar.classList.remove("scrolled");
  //     }

  //     if (scrollY > 400) {
  //       backToTop.classList.add("visible");
  //     } else {
  //       backToTop.classList.remove("visible");
  //     }
  //   },
  //   { passive: true },
  // );

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          navbar.classList.toggle("scrolled", scrollY > 50);
          backToTop.classList.toggle("visible", scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  const observerOptions = {
    root: null,
    // rootMargin: "0px",
    // threshold: 0.15,
    rootMargin: "0px 0px -60px 0px", // trigger 60px before the bottom edge
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".about, .products, .services, .gallery, .contact, " +
        ".product-card, .service-card, .about-grid, .about-stats, .contact-grid",
    )
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  // ==================== LIGHTBOX ====================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let galleryImages = [];
  let galleryIndex = 0;

  document.querySelectorAll(".gallery-item img").forEach((img) => {
    galleryImages.push(img.src);
    const idx = galleryImages.length - 1;
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(idx));
  });

  function openLightbox(index) {
    galleryIndex = index;
    lightboxImg.src = galleryImages[galleryIndex];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    lightboxPrev.style.display = galleryImages.length > 1 ? "flex" : "none";
    lightboxNext.style.display = galleryImages.length > 1 ? "flex" : "none";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  function navigateLightbox(direction) {
    galleryIndex =
      (galleryIndex + direction + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[galleryIndex];
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
  lightboxNext.addEventListener("click", () => navigateLightbox(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ==================== PRODUCT CAROUSEL ====================
  const carouselEl = document.getElementById("carousel");
  const carouselImg = document.getElementById("carouselImg");
  const carouselTitle = document.getElementById("carouselTitle");
  const carouselDots = document.getElementById("carouselDots");
  const carouselCounter = document.getElementById("carouselCounter");
  const carouselClose = document.getElementById("carouselClose");
  const carouselPrev = document.getElementById("carouselPrev");
  const carouselNext = document.getElementById("carouselNext");

  const productImages = {
    sofas: {
      title: "Living Room Sofas",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c7ea9c6d?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493663284031-b7e3a00cae00?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1550254478-ead40cc5832d?w=900&h=600&fit=crop",
      ],
    },
    dining: {
      title: "Dining Sets",
      images: [
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1538688524441-0e1af5c1126c?w=900&h=600&fit=crop",
      ],
    },
    bedroom: {
      title: "Bedroom Suites",
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70104?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522771739844-6a9fcb40e792?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=600&fit=crop",
      ],
    },
    office: {
      title: "Office Furniture",
      images: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518455027359-f93337b3d9c2?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&h=600&fit=crop",
      ],
    },
    storage: {
      title: "Storage & Shelves",
      images: [
        "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c7ea9c6d?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1538688524441-0e1af5c1126c?w=900&h=600&fit=crop",
      ],
    },
    bespoke: {
      title: "Bespoke Creations",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493663284031-b7e3a00cae00?w=900&h=600&fit=crop",
      ],
    },
  };

  let carouselImages = [];
  let carouselIndex = 0;

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.dataset.product;
      if (!productImages[key]) return;
      openCarousel(key);
    });
  });

  function openCarousel(key) {
    const product = productImages[key];
    carouselImages = product.images;
    carouselIndex = 0;
    carouselTitle.textContent = product.title;
    renderDots();
    showSlide();
    carouselEl.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCarousel() {
    carouselEl.classList.remove("active");
    document.body.style.overflow = "";
    carouselImg.classList.remove("visible");
  }

  function showSlide() {
    carouselImg.src = carouselImages[carouselIndex];
    carouselImg.onload = () => carouselImg.classList.add("visible");
    carouselCounter.textContent =
      carouselIndex + 1 + " / " + carouselImages.length;
    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === carouselIndex);
    });
  }

  function renderDots() {
    carouselDots.innerHTML = "";
    carouselImages.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to image " + (i + 1));
      dot.addEventListener("click", () => {
        carouselIndex = i;
        carouselImg.classList.remove("visible");
        showSlide();
      });
      carouselDots.appendChild(dot);
    });
  }

  function navigateCarousel(direction) {
    carouselIndex =
      (carouselIndex + direction + carouselImages.length) %
      carouselImages.length;
    carouselImg.classList.remove("visible");
    showSlide();
  }

  carouselClose.addEventListener("click", closeCarousel);
  carouselPrev.addEventListener("click", () => navigateCarousel(-1));
  carouselNext.addEventListener("click", () => navigateCarousel(1));

  carouselEl.addEventListener("click", (e) => {
    if (e.target === carouselEl) closeCarousel();
  });

  // ==================== GLOBAL KEYBOARD ====================
  document.addEventListener("keydown", (e) => {
    const lightboxActive = lightbox.classList.contains("active");
    const carouselActive = carouselEl.classList.contains("active");

    if (lightboxActive) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    }

    if (carouselActive) {
      if (e.key === "Escape") closeCarousel();
      if (e.key === "ArrowLeft") navigateCarousel(-1);
      if (e.key === "ArrowRight") navigateCarousel(1);
    }
  });
});
