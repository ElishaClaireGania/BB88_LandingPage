document.addEventListener("DOMContentLoaded", () => {
  // Database ng mga teksto para sa bawat role
  const roleData = {
    software: {
      title: "Software Engineers",
      desc: "Our Software Engineers are responsible for building robust backend infrastructures, managing reliable databases, and integrating systems to ensure seamless and high-performing web and mobile platform integrations."
    },
    web: {
      title: "Web Developers",
      desc: "Web Developers focus on implementing responsive, cutting-edge user interfaces using frameworks like Angular and Tailwind CSS. They bring design wireframes to life with dynamic client-side interactions."
    },
    app: {
      title: "App Developers",
      desc: "App Developers specialize in creating powerful mobile applications (such as Flutter solutions) that ensure a consistent, secure, and intuitive user experience across both iOS and Android environments."
    },
    graphic: {
      title: "Graphic Artists",
      desc: "Graphic Artists craft unique visual identities, logo kits, and brand assets. They make sure the color palettes, shapes, and marketing graphics are highly visually appealing and convey the exact message of your business."
    },
    multimedia: {
      title: "Multimedia Artists",
      desc: "Multimedia Artists are similar to Graphic Artists, but they specialize in creating dynamic and interactive content like videos, 3D animations, and virtual reality experiences. They use a variety of software tools to create engaging and immersive experiences for users."
    },
    writers: {
      title: "Creative Writers",
      desc: "Our Creative Writers design engaging copies, optimize SEO descriptions, draft professional project plans, and establish high-quality communication strategies tailored directly to your target audiences."
    },
    director: {
      title: "Creative Director",
      desc: "The Creative Director steers the overall design direction and vision of the projects, aligning team output with client goals to build a powerful and highly-marketable branding narrative."
    }
  };

  const cards = document.querySelectorAll(".team-card");
  const speechBubble = document.getElementById("team-speech-bubble");
  const arrow = document.getElementById("bubble-arrow");
  const roleTitle = document.getElementById("role-title");
  const roleDesc = document.getElementById("role-desc");

  // Function para i-kalkula at i-slide ang arrow pointer sa gitna ng aktibong card
  function updateArrowPosition(targetCard) {
    if (!speechBubble || !arrow || !targetCard) return;

    requestAnimationFrame(() => {
      const bubbleRect = speechBubble.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const cardCenterInBubble = (cardRect.left + (cardRect.width / 2)) - bubbleRect.left;
      
      let percentLeft = (cardCenterInBubble / bubbleRect.width) * 100;
      percentLeft = Math.max(6, Math.min(94, percentLeft)); // Safety boundary para sa gilid ng rounded border
      arrow.style.left = `${percentLeft}%`;
    });
  }

  if (cards.length > 0 && roleTitle && roleDesc) {
    const defaultCard = document.getElementById("btn-multimedia");
    
    // Unang alignment trigger pagka-load ng page (ihahanda sa Multimedia Artists)
    if (defaultCard) {
      setTimeout(() => updateArrowPosition(defaultCard), 300);
    }

    window.addEventListener("load", () => {
      const activeCard = document.querySelector(".team-card.active-card") || defaultCard;
      if (activeCard) {
        updateArrowPosition(activeCard);
      }
    });

    // Event listener para sa click action ng mga cards
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
            circleIcon.classList.remove("bg-[#3ba28a]");
            circleIcon.classList.add("bg-gray-300");
          }
        });

        // 2. Ilapat ang active design rules sa pinindot na card (magiging transparent ang background band nito para lumitaw ang kulay ng card)
        card.classList.add("active-card");

        const activeBand = card.querySelector(".card-band");
        if (activeBand) {
          activeBand.classList.remove("bg-brandTeal", "text-white");
          activeBand.classList.add("bg-transparent", "text-brandTeal");
        }

        const activeCircleIcon = card.querySelector(".active-circle");
        if (activeCircleIcon) {
          activeCircleIcon.classList.remove("bg-gray-300");
          activeCircleIcon.classList.add("bg-[#3ba28a]");
        }

        // 3. I-update ang text contents sa bubble at pakilusin ang sliding pointer
        roleTitle.textContent = data.title;
        roleDesc.textContent = data.desc;
        updateArrowPosition(card);
      });
    });

    // Siguraduhing responsive ang slide ng arrow kapag binabago ang laki ng screen
    window.addEventListener("resize", () => {
      const activeCard = document.querySelector(".team-card.active-card");
      if (activeCard) {
        updateArrowPosition(activeCard);
      }
    });
  }
});