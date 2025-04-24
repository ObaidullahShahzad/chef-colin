// Initialize GSAP with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  // === Mobile Menu Toggle ===
  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.querySelector(".nav-links");

  if (!burgerMenu || !navLinks) {
    console.error("Burger menu or nav links not found in the DOM");
    return;
  }

  burgerMenu.addEventListener("click", function () {
    console.log("Burger menu clicked"); // Debug log
    navLinks.classList.toggle("active");
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => bar.classList.toggle("change"));
  });

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-link");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        console.log("Nav link clicked, closing menu"); // Debug log
        navLinks.classList.remove("active");
        const bars = document.querySelectorAll(".bar");
        bars.forEach((bar) => bar.classList.remove("change"));
      }
    });
  });

  // === Smooth Scrolling for Navigation Links ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // === Manifesto Text Animation ===
  const manifestoEl = document.getElementById("manifesto-text");
  if (manifestoEl) {
    const originalText = manifestoEl.innerText;
    manifestoEl.innerHTML = ""; // Clear the element

    // Create spans for each character
    Array.from(originalText).forEach((char) => {
      if (char === " ") {
        const spaceSpan = document.createElement("span");
        spaceSpan.className = "space";
        spaceSpan.innerHTML = "&nbsp;";
        manifestoEl.appendChild(spaceSpan);
      } else {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.className = "char";
        charSpan.style.color = "#ccc"; // Initial color (light gray)
        manifestoEl.appendChild(charSpan);
      }
    });

    // Animate characters
    gsap.to(".char", {
      scrollTrigger: {
        trigger: manifestoEl,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.6,
        toggleActions: "play reverse play reverse",
      },
      color: "#000000",
      stagger: 0.005,
      ease: "none",
      duration: 0.1,
    });
  }

  // === Box and Image Animations ===
  function initAnimations() {
    // Clear existing ScrollTrigger instances for reveal elements
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.vars.trigger &&
        trigger.vars.trigger.classList &&
        trigger.vars.trigger.classList.contains("reveal-element")
      ) {
        trigger.kill();
      }
    });

    // Select all elements with the 'reveal-element' class
    const revealElements = document.querySelectorAll(".reveal-element");

    // Apply GSAP animation to each reveal element
    revealElements.forEach((element, index) => {
      gsap.set(element, { y: 50, opacity: 0 }); // Set initial state
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play reverse play reverse",

          once: false,
        },
      });

      tl.to(element, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.15,
      });
    });

    // Animation for the main title
    const mainTitle = document.querySelector(".main-title");
    if (mainTitle) {
      gsap.set(mainTitle, { y: 50, opacity: 0 }); // Set initial state
      gsap.to(mainTitle, {
        scrollTrigger: {
          trigger: ".services-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    }

    // Animation for beef image
    const beefImage = document.querySelector(".beef-image-container");
    if (beefImage) {
      gsap.set(beefImage, { y: 50, opacity: 0 }); // Set initial state
      gsap.to(beefImage, {
        scrollTrigger: {
          trigger: beefImage,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }

  // Initialize animations
  initAnimations();

  // Reinitialize animations on window resize to ensure responsiveness
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAnimations, 250);
  });

  // Create responsive image observer
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      // If the image container is resized, refresh the ScrollTrigger
      if (entry.target.classList.contains("beef-image-container")) {
        ScrollTrigger.refresh();
      }
    });
  });

  // Observe the beef image container if it exists
  const beefImageContainer = document.querySelector(".beef-image-container");
  if (beefImageContainer) {
    resizeObserver.observe(beefImageContainer);
  }

  // Ensure images are responsive
  window.addEventListener("load", function () {
    // Refresh ScrollTrigger after all images are loaded
    ScrollTrigger.refresh();
  });
});

// === Explore Section Animation ===
const leftCard = document.querySelector(".image-card");
const rightCard = document.querySelector(".text-card");

if (leftCard && rightCard) {
  gsap.set(leftCard, { x: -100, opacity: 0 });
  gsap.set(rightCard, { x: 100, opacity: 0 });

  gsap.to(leftCard, {
    scrollTrigger: {
      trigger: ".explore-wrapper",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  });

  gsap.to(rightCard, {
    scrollTrigger: {
      trigger: ".explore-wrapper",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    delay: 0.1,
  });
}
