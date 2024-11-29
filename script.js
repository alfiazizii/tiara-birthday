// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Global variables
let typedInstance = null;

// Initialize swiper for memories section
function initializeSwiper() {
  const memorySwiper = new Swiper(".memory-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 800,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// Initialize scroll animations including memory section
function initializeScrollAnimations() {
  // Memory Section Animation
  const timelineSection = document.querySelector("#memories");
  if (timelineSection) {
    // Animate section entrance
    gsap.fromTo(
      timelineSection,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineSection,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate section title
    const sectionTitle = timelineSection.querySelector("h2");
    if (sectionTitle) {
      gsap.fromTo(
        sectionTitle,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionTitle,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate memory cards
    const memoryCards = timelineSection.querySelectorAll(".memory-card");
    memoryCards.forEach((card, index) => {
      // Create container for hover animations
      const container = document.createElement("div");
      container.className = "memory-card-container";
      card.parentNode.insertBefore(container, card);
      container.appendChild(card);

      // Initial animation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          rotation: index % 2 === 0 ? -5 : 5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation
      const img = card.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          {
            scale: 1.2,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            delay: index * 0.2 + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Content animations
      const content = card.querySelector(".memory-content");
      if (content) {
        const elements = content.children;
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: index * 0.2 + 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Hover animations
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        if (img) {
          gsap.to(img, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      });
    });

    // Add floating decoration elements
    const addFloatingElements = () => {
      const shapes = ["❤️", "✨", "🌟"];
      shapes.forEach((shape, index) => {
        const element = document.createElement("div");
        element.className = "floating-memory-element";
        element.innerHTML = shape;
        element.style.cssText = `
          position: absolute;
          font-size: ${20 + Math.random() * 20}px;
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        `;
        timelineSection.appendChild(element);

        gsap.fromTo(
          element,
          {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            opacity: 0,
          },
          {
            y: -100,
            opacity: 0.6,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: index * 0.5,
            ease: "power1.inOut",
            onRepeat: () => {
              gsap.set(element, {
                x: Math.random() * window.innerWidth,
                y: window.innerHeight,
              });
            },
          }
        );
      });
    };

    addFloatingElements();
  }
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeLandingPage();
  initializeSwiper();
  initializeGiftSection();
  initializeScrollAnimations();
  setupTypedLetter(); // Ganti initializeScrollTriggers() dengan setupTypedLetter()
});

// Add required styles
const memoryStyles = document.createElement("style");
memoryStyles.textContent = `
  #memories {
    position: relative;
    overflow: hidden;
  }

  .memory-card-container {
    position: relative;
    perspective: 1000px;
  }

  .memory-card {
    transform-origin: center center;
    transition: transform 0.3s ease;
    overflow: hidden;
    border-radius: 15px;
    background: white;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    will-change: transform;
  }

  .memory-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease;
    will-change: transform;
  }

  .floating-memory-element {
    position: absolute;
    pointer-events: none;
    z-index: 1;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.1));
  }

  .swiper-button-next,
  .swiper-button-prev {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    transform: scale(1.1);
  }
`;
document.head.appendChild(memoryStyles);

// Initialize scroll animations
function initializeScrollAnimations() {
  // Animate sections on scroll
  gsap.utils.toArray(".section").forEach((section, index) => {
    // Initial state
    gsap.set(section, { opacity: 0, y: 50 });

    // Create scroll trigger for each section
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
      onLeave: () => {
        gsap.to(section, {
          opacity: 0.5,
          duration: 0.5,
        });
      },
      onEnterBack: () => {
        gsap.to(section, {
          opacity: 1,
          duration: 0.5,
        });
      },
      onLeaveBack: () => {
        gsap.to(section, {
          opacity: 0.5,
          duration: 0.5,
        });
      },
    });
  });

  // Animate memories section
  const timelineSection = document.querySelector("#memories");
  if (timelineSection) {
    const memorySlides = timelineSection.querySelectorAll(".swiper-slide");

    memorySlides.forEach((slide, index) => {
      gsap.set(slide, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
      });

      ScrollTrigger.create({
        trigger: slide,
        start: "top 80%",
        onEnter: () => {
          gsap.to(slide, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.2,
          });
        },
      });
    });
  }

  // Animate gift boxes
  const giftSection = document.querySelector("#gifts");
  if (giftSection) {
    const mysteryBoxes = giftSection.querySelectorAll(".mystery-box");

    mysteryBoxes.forEach((box, index) => {
      gsap.set(box, {
        opacity: 0,
        scale: 0.8,
        rotation: -15,
      });

      ScrollTrigger.create({
        trigger: box,
        start: "top 85%",
        onEnter: () => {
          gsap.to(box, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.2,
          });
        },
      });
    });
  }

  // Enhance letter section animation
  const letterSection = document.querySelector("#letter");
  if (letterSection) {
    gsap.set(letterSection, {
      opacity: 0,
      scale: 0.95,
    });

    ScrollTrigger.create({
      trigger: letterSection,
      start: "top 70%",
      onEnter: () => {
        gsap.to(letterSection, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            // Start background animation
            gsap.to(letterSection, {
              background:
                "linear-gradient(135deg, var(--pale-pink), var(--light-pink), var(--pale-pink))",
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "none",
            });
          },
        });
      },
    });
  }

  // Add parallax effect to background elements
  const parallaxElements = document.querySelectorAll(
    ".stars-container, .floating-hearts-container"
  );
  parallaxElements.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
      y: (i, target) =>
        -ScrollTrigger.maxScroll(window) * target.dataset.speed || -100,
      ease: "none",
    });
  });
}

// Initialize landing page features
function initializeLandingPage() {
  const landingPage = document.querySelector(".landing-page");
  const musicToggle = document.querySelector(".music-toggle");
  const bgMusic = document.getElementById("bgMusic");
  const starsContainer = document.querySelector(".stars-container");
  const floatingHeartsContainer = document.querySelector(
    ".floating-hearts-container"
  );
  const journeyButton = document.querySelector(".journey-button");
  let isPlaying = false;

  // Create stars
  function createStars() {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
      starsContainer?.appendChild(star);
    }
  }

  // Create floating heart for landing page
  function createFloatingHeart(e) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤️";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;

    heart.style.setProperty("--float-x", `${-50 + Math.random() * 100}px`);
    heart.style.setProperty(
      "--float-rotation",
      `${-180 + Math.random() * 360}deg`
    );

    floatingHeartsContainer?.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }

  // Setup music toggle
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      isPlaying = !isPlaying;
      if (isPlaying) {
        bgMusic.play();
        musicToggle.classList.add("playing");
      } else {
        bgMusic.pause();
        musicToggle.classList.remove("playing");
      }
    });
  }

  // Setup landing page interactions
  landingPage?.addEventListener("click", createFloatingHeart);

  journeyButton?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector(".timeline")?.scrollIntoView({ behavior: "smooth" });
  });

  // Initialize stars
  createStars();

  // Setup loading animation
  const loadingOverlay = document.querySelector(".loading-overlay");
  if (loadingOverlay) {
    gsap.to(loadingOverlay, {
      opacity: 0,
      duration: 1,
      delay: 1,
      onComplete: () => loadingOverlay.remove(),
    });
  }

  // Add scroll to memory section functionality
  document.querySelector(".button-content")?.addEventListener("click", (e) => {
    e.preventDefault();
    const memoriesSection = document.querySelector("#memories");
    if (memoriesSection) {
      memoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Initial animations
  const landingAnimation = gsap.timeline();
  landingAnimation
    .from(".title", {
      opacity: 0,
      y: -100,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    })
    .from(
      ".birthday-message",
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "back.out(1.5)",
      },
      "-=0.5"
    )
    .from(
      ".journey-button",
      {
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );
}

// Setup typed letter and scroll animations
function setupTypedLetter() {
  // Parallax effect
  gsap.utils.toArray(".section").forEach((section) => {
    const bg = section.querySelector(".background");
    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: "20%",
      });
    }
  });

  // Setup typed letter trigger
  const loveLetterSection = document.querySelector(".love-letter");
  if (loveLetterSection) {
    ScrollTrigger.create({
      trigger: ".love-letter",
      start: "top center",
      onEnter: () => {
        if (!typedInstance) {
          initializeTypedLetter();
        }
      },
    });
  }
}

// Function to handle auto-scrolling
function autoScroll(element) {
  const containerHeight = window.innerHeight;
  const contentHeight = element.scrollHeight;
  const currentScroll = window.scrollY;
  const elementTop = element.getBoundingClientRect().top + currentScroll;
  const currentTypingPosition = element.scrollHeight - element.clientHeight;

  // Calculate if we need to scroll
  if (contentHeight > containerHeight) {
    const targetScroll = elementTop + currentTypingPosition;

    // Smooth scroll to the typing position
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }
}

// Function to create floating hearts for letter
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "typed-floating-heart";
  heart.innerHTML = "❤️";

  const size = 20 + Math.random() * 20;
  const startX = Math.random() * window.innerWidth;

  heart.style.cssText = `
    left: ${startX}px;
    bottom: -50px;
    font-size: ${size}px;
    position: absolute;
  `;

  const letterSection = document.querySelector(".love-letter");
  if (letterSection) {
    letterSection.appendChild(heart);

    gsap.to(heart, {
      y: -window.innerHeight - 100,
      x: Math.random() * 100 - 50,
      rotation: Math.random() * 360,
      duration: 3 + Math.random() * 2,
      ease: "power1.out",
      onComplete: () => heart.remove(),
    });
  }
}

// Function to create heart shower effect
function createHeartShower() {
  for (let i = 0; i < 20; i++) {
    setTimeout(createFloatingHeart, i * 150);
  }
}

// Function to animate background
function startBackgroundAnimation() {
  const letterSection = document.querySelector(".love-letter");
  if (letterSection) {
    gsap.to(letterSection, {
      background:
        "linear-gradient(135deg, var(--pale-pink), var(--light-pink), var(--pale-pink))",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }
}

// Initialize typed letter
function initializeTypedLetter() {
  const typedElement = document.getElementById("typedLetter");

  if (!typedElement) {
    console.error("Typed element not found");
    return;
  }

  const typedOptions = {
    strings: [
      `Dearest Tiara,^1000\n
      On this special day, I want to tell you something...^1500\n
      Every morning I wake up feeling blessed,^800
      Because I have someone as wonderful as you in my life.^1000\n
      Your smile brightens my darkest days,^800
      Your laugh is my favorite melody,^800
      And your love gives me strength to face anything.^1500\n
      I cherish every moment we spend together,^800
      Every little conversation,^500
      Every shared laugh,^500
      Every precious memory.^1500\n
      As you celebrate another year of your beautiful life,^800
      I wish you all the happiness in the world.^800
      May your days be filled with joy,^500
      Your nights with peaceful dreams,^500
      And your heart with endless love.^1500\n
      Happy Birthday, my love!^1000\n
      With all my heart,^800
      ❤️ Alfi^500\n
      P.S. You make my world complete.^1000`,
    ],
    typeSpeed: 40,
    backSpeed: 0,
    fadeOut: true,
    loop: false,
    showCursor: true,
    cursorChar: "❤️",
    autoInsertCss: true,
    preStringTyped: (arrayPos, self) => {
      typedElement.style.opacity = "1";
      startBackgroundAnimation();
    },
    onStringTyped: (arrayPos, self) => {
      if (self.strings[0].split("\n")[arrayPos].includes("love")) {
        createFloatingHeart();
      }
      // Add auto-scroll after each string is typed
      autoScroll(typedElement);
    },
    // Add auto-scroll during typing
    onTypingPause: (arrayPos, self) => {
      autoScroll(typedElement);
    },
    onComplete: (self) => {
      typedElement.classList.add("letter-complete");
      createHeartShower();
      gsap.to(self.cursor, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
      });
      // Final scroll to ensure everything is visible
      autoScroll(typedElement);
    },
  };

  // Destroy existing instance if it exists
  if (typedInstance) {
    typedInstance.destroy();
  }

  // Create new instance
  typedInstance = new Typed(typedElement, typedOptions);
}

// Initialize Swiper
function initializeSwiper() {
  const swiper = new Swiper(".memory-swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 800,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    on: {
      init: function () {
        gsap.from(".memory-card", {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      },
    },
  });
}

const initializeGiftSection = () => {
  const mysteryBoxes = document.querySelectorAll(".mystery-box");
  const modal = document.querySelector(".gift-modal");
  const modalContent = document.querySelector(".modal-gift-content");
  const closeModal = document.querySelector(".close-modal");

  // Gift content mapping
  const giftContents = {
    ring: {
      title: "A Special Promise Ring 💍",
      message:
        "This ring symbolizes my promise to always be by your side, to cherish and love you forever.",
      image: "images/ring.webp",
    },
    bracelet: {
      title: "A Beautiful Bracelet 💕",
      message:
        "This bracelet is a symbol of our bond. Just like the links of this bracelet, may our love grow stronger with each passing day. Wear it and remember, you are always cherished.",
      image: "images/bracelet.webp",
    },
    necklace: {
      title: "A Beautiful Necklace ✨",
      message:
        "A beautiful piece for a beautiful soul. May this necklace remind you of my love whenever you wear it.",
      image: "images/necklace.webp",
    },
  };

  const createConfetti = () => {
    const colors = ["#ff69b4", "#fff", "#ffd1dc", "#e6e6fa"];

    // Buat lebih banyak confetti untuk efek yang lebih meriah
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      // Random properties for each confetti
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * window.innerWidth;
      const size = Math.random() * 10 + 5;
      const angle = Math.random() * 360;
      const velocity = 5 + Math.random() * 5;
      const spin = Math.random() * 15 - 7.5;

      // Set initial styles
      confetti.style.cssText = `
        position: fixed;
        z-index: 9999;
        left: ${left}px;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        transform: rotate(${angle}deg);
      `;

      // Add to body
      document.body.appendChild(confetti);

      // Animate
      const animation = confetti.animate(
        [
          {
            top: "-20px",
            transform: `rotate(${angle}deg)`,
          },
          {
            top: "100vh",
            transform: `rotate(${angle + spin * 360}deg)`,
          },
        ],
        {
          duration: 2000 + Math.random() * 1000,
          easing: "ease-in",
          iterations: 1,
        }
      );

      // Remove confetti after animation
      animation.onfinish = () => confetti.remove();
    }
  };

  // Open box and show modal
  const openBox = (box) => {
    if (box.classList.contains("opened")) return;

    // Add opening animation
    box.classList.add("opened");

    // Create confetti effect
    createConfetti();

    // Get gift content
    const giftType = box.dataset.gift;
    const gift = giftContents[giftType];

    // Update modal content
    modalContent.innerHTML = `
      <h3>${gift.title}</h3>
      <img src="${gift.image}" alt="${gift.title}" style="max-width: 200px; margin: 1rem 0;">
      <p style="white-space: pre-line;">${gift.message}</p>
    `;

    // Show modal with animation
    modal.style.display = "flex";
    gsap.from(modal, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Add click listeners to boxes
  mysteryBoxes.forEach((box) => {
    box.addEventListener("click", () => openBox(box));

    // Add hover animation
    box.addEventListener("mouseenter", () => {
      gsap.to(box.querySelector(".box"), {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    box.addEventListener("mouseleave", () => {
      gsap.to(box.querySelector(".box"), {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none";
        modal.style.opacity = 1;
      },
    });
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal.click();
    }
  });
};

// Cleanup function
window.addEventListener("beforeunload", () => {
  if (typedInstance) {
    typedInstance.destroy();
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
