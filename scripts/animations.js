document.addEventListener("DOMContentLoaded", () => {
  // ===================================================
  // 1. LOGO CAROUSEL AUTO-PLAY & DRAG COMPONENT
  // ===================================================
  const viewport = document.getElementById("carousel-viewport");
  const dots = document.querySelectorAll(".dot");

  if (viewport) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Swipe / Mouse Drag to Scroll
    viewport.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
    });

    viewport.addEventListener("mouseleave", () => {
      isDown = false;
    });

    viewport.addEventListener("mouseup", () => {
      isDown = false;
    });

    viewport.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 2;
      viewport.scrollLeft = scrollLeft - walk;
    });

    // Auto-Scroll Loop (Moves every 4 seconds)
    let autoPlayInterval = setInterval(() => {
      // Only auto-scroll if the container has scrollable content
      if (!isDown && viewport.scrollWidth > viewport.clientWidth) {
        if (
          viewport.scrollLeft + viewport.clientWidth >=
          viewport.scrollWidth - 10
        ) {
          viewport.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          viewport.scrollBy({ left: 150, behavior: "smooth" });
        }
      }
    }, 4000);

    // Pause Autoplay on Hover
    viewport.addEventListener("mouseenter", () =>
      clearInterval(autoPlayInterval),
    );

    viewport.addEventListener("mouseleave", () => {
      autoPlayInterval = setInterval(() => {
        if (!isDown && viewport.scrollWidth > viewport.clientWidth) {
          if (
            viewport.scrollLeft + viewport.clientWidth >=
            viewport.scrollWidth - 10
          ) {
            viewport.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            viewport.scrollBy({ left: 150, behavior: "smooth" });
          }
        }
      }, 4000);
    });

    // Dynamic Dot Indicator Highlight
    viewport.addEventListener("scroll", () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (maxScroll <= 0) return; // Prevent division by 0

      const scrollPercentage = viewport.scrollLeft / maxScroll;
      const activeIndex = Math.min(
        Math.floor(scrollPercentage * dots.length),
        dots.length - 1,
      );

      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add("bg-brandTeal", "w-3", "h-3");
          dot.classList.remove("bg-brandTeal/30", "w-2", "h-2");
        } else {
          dot.classList.remove("bg-brandTeal", "w-3", "h-3");
          dot.classList.add("bg-brandTeal/30", "w-2", "h-2");
        }
      });
    });
  }
});

// ===================================================
// 2. TEAM TAB INTERACTIVE INTERACTION WITH SLIDING ARROW
// ===================================================
const roleData = {
  software: {
    title: "Software Engineers",
    desc: "Our Software Engineers are responsible for building robust backend infrastructures, managing reliable databases, and integrating systems to ensure seamless and high-performing web and mobile platform integrations.",
  },
  web: {
    title: "Web Developers",
    desc: "Web Developers focus on implementing responsive, cutting-edge user interfaces using frameworks like Angular and Tailwind CSS. They bring design wireframes to life with dynamic client-side interactions.",
  },
  app: {
    title: "App Developers",
    desc: "App Developers specialize in creating powerful mobile applications (such as Flutter solutions) that ensure a consistent, secure, and intuitive user experience across both iOS and Android environments.",
  },
  graphic: {
    title: "Graphic Artists",
    desc: "Graphic Artists craft unique visual identities, logo kits, and brand assets. They make sure the color palettes, shapes, and marketing graphics are highly visually appealing and convey the exact message of your business.",
  },
  multimedia: {
    title: "Multimedia Artists",
    desc: "Multimedia Artists are similar to Graphic Artists, but they specialize in creating dynamic and interactive content like videos, 3D animations, and virtual reality experiences. They use a variety of software tools to create engaging and immersive experiences for users.",
  },
  writers: {
    title: "Creative Writers",
    desc: "Our Creative Writers design engaging copies, optimize SEO descriptions, draft professional project plans, and establish high-quality communication strategies tailored directly to your target audiences.",
  },
  director: {
    title: "Creative Director",
    desc: "The Creative Director steers the overall design direction and vision of the projects, aligning team output with client goals to build a powerful and highly-marketable branding narrative.",
  },
};

const cards = document.querySelectorAll(".team-card");
const speechBubble = document.getElementById("team-speech-bubble");
const arrow = document.getElementById("bubble-arrow");
const roleTitle = document.getElementById("role-title");
const roleDesc = document.getElementById("role-desc");

// Kalkulahin ang eksaktong posisyon ng arrow pointer relative sa active card
function updateArrowPosition(targetCard) {
  if (!speechBubble || !arrow || !targetCard) return;

  requestAnimationFrame(() => {
    const bubbleRect = speechBubble.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();

    // Alamin ang center ng pinindot na card laban sa width ng speech bubble
    const cardCenterInBubble =
      cardRect.left + cardRect.width / 2 - bubbleRect.left;

    // I-convert sa relative percentage style
    let percentLeft = (cardCenterInBubble / bubbleRect.width) * 100;

    // Limitahan sa 6% hanggang 94% para hindi lumampas ang arrow sa gilid ng rounded borders
    percentLeft = Math.max(6, Math.min(94, percentLeft));

    // I-set ang istilo para gumalaw na ang arrow pointer
    arrow.style.left = `${percentLeft}%`;
  });
}

if (cards.length > 0 && roleTitle && roleDesc) {
  const defaultCard = document.getElementById("btn-multimedia");

  // Unang lagay ng arrow direction pagka-load ng JS file
  if (defaultCard) {
    setTimeout(() => updateArrowPosition(defaultCard), 300);
  }

  // Double-check alignment kapag loaded na lahat ng visual elements tulad ng images at borders
  window.addEventListener("load", () => {
    const activeCard =
      document.querySelector(".team-card.active-card") || defaultCard;
    if (activeCard) {
      updateArrowPosition(activeCard);
    }
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedRole = card.getAttribute("data-role");
      const data = roleData[selectedRole];

      if (!data) return;

      // 1. I-reset ang visual styling ng lahat ng cards
      cards.forEach((c) => {
        c.classList.remove("active-card");

        const band = c.querySelector(".card-band");
        if (band) {
          band.classList.remove("bg-transparent", "text-brandTeal");
          band.classList.add("bg-brandTeal", "text-white");
        }

        const circleIcon = c.querySelector(".active-circle");
        if (circleIcon) {
          circleIcon.classList.remove("bg-brandLime");
          circleIcon.classList.add("bg-brandTeal");
        }
      });

      // 2. Pagandahin ang itsura ng pinindot na card bilang Active State
      card.classList.add("active-card");

      const activeBand = card.querySelector(".card-band");
      if (activeBand) {
        activeBand.classList.remove("bg-brandTeal", "text-white");
        activeBand.classList.add("bg-transparent", "text-brandTeal");
      }

      const activeCircleIcon = card.querySelector(".active-circle");
      if (activeCircleIcon) {
        activeCircleIcon.classList.remove("bg-brandTeal");
        activeCircleIcon.classList.add("bg-brandLime");
      }

      // 3. I-update ang text contents at pakilusin ang dynamic pointer
      roleTitle.textContent = data.title;
      roleDesc.textContent = data.desc;
      updateArrowPosition(card);
    });
  });

  // Palaging i-recalculate kapag lumaki o sumikip ang viewport (browser responsive resizing)
  window.addEventListener("resize", () => {
    const activeCard = document.querySelector(".team-card.active-card");
    if (activeCard) {
      updateArrowPosition(activeCard);
    }
  });
}
