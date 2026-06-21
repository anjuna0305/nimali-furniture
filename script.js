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
    rootMargin: "0px",
    threshold: 0.15,
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

  document.querySelectorAll(".gallery-item").forEach((item) => {
    const img = item.querySelector("img");
    galleryImages.push(img.getAttribute("data-highq") || img.src);
    const idx = galleryImages.length - 1;
    item.style.cursor = "zoom-in";
    item.addEventListener("click", () => openLightbox(idx));
  });

  function openLightbox(index) {
    console.log("lightbox open called");
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
      title: "Sofas",
      images: [
        "assets/categories/sofa/1.jpg",
        "assets/categories/sofa/green-sofa-4.jpg",
        "assets/categories/sofa/IMG_8343.jpg",
        "assets/categories/sofa/IMG_8344.jpg",
        "assets/categories/sofa/IMG_8345.jpg",
        "assets/categories/sofa/IMG_8346.jpg",
        "assets/categories/sofa/IMG_8348.jpg",
        "assets/categories/sofa/IMG_8349.jpg",
        "assets/categories/sofa/IMG_8352.jpg",
        "assets/categories/sofa/ts-2.jpg",
        "assets/categories/sofa/ts-3.jpg",
        "assets/categories/sofa/WhatsApp Image 2024-09-01 at 8.18.53 PM (1).jpeg",
      ],
    },
    "kitchen-pantries": {
      title: "Kitchen & Pantries",
      images: [
        "assets/categories/kitchen-pantries/1.jpg",
        "assets/categories/kitchen-pantries/2.jpg",
        "assets/categories/kitchen-pantries/3.jpg",
        "assets/categories/kitchen-pantries/4.jpg",
        "assets/categories/kitchen-pantries/5.jpg",
        "assets/categories/kitchen-pantries/gp-1.jpg",
        "assets/categories/kitchen-pantries/gp-2.jpg",
        "assets/categories/kitchen-pantries/gp-3.jpg",
        "assets/categories/kitchen-pantries/gp-5.jpg",
        "assets/categories/kitchen-pantries/gp-6.jpg",
        "assets/categories/kitchen-pantries/gp-7.jpg",
        "assets/categories/kitchen-pantries/IMG_1586.jpg",
        "assets/categories/kitchen-pantries/IMG_1595-1.jpg",
        "assets/categories/kitchen-pantries/IMG_1596.jpg",
        "assets/categories/kitchen-pantries/IMG_1597.jpg",
        "assets/categories/kitchen-pantries/IMG_1599-1.jpg",
      ],
    },
    bespoke: {
      title: "Bespoke Creations",
      images: [
        "assets/categories/bespoke/3.jpg",
        "assets/categories/bespoke/IMG_1082.JPG",
        "assets/categories/bespoke/IMG_1083.JPG",
        "assets/categories/bespoke/IMG_1085.JPG",
        "assets/categories/bespoke/IMG_1087.JPG",
        "assets/categories/bespoke/IMG_8356.jpg",
        "assets/categories/bespoke/IMG_8363.jpg",
        "assets/categories/bespoke/IMG_8918.jpg",
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
