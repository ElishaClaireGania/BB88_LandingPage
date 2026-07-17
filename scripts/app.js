document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const wrapper = document.querySelector(".carousel-wrapper");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!track) return;

  // Save original list reference and clone them to the end
  const originals = [...track.children];

  while (track.scrollWidth < window.innerWidth * 3) {
    originals.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });
  }
  //  Calculate the PERFECT loop boundary math
  let firstSetWidth = 0;
  function calculateWidths() {
    if (originals.length === 0) return;

    const firstItem = originals[0];
    const itemWidth = firstItem.getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(track);
    const gapValue = parseFloat(trackStyle.gap) || 0;
    const singleItemTotalWidth = itemWidth + gapValue;

    firstSetWidth = singleItemTotalWidth * originals.length;
  }

  calculateWidths();

  let x = 0;
  let speed = 0.7;
  let paused = false;

  // Build indicator dots
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    originals.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = "carousel-dot";
      if (index === 0) {
        dot.classList.add("active");
      }
      dotsContainer.appendChild(dot);
    });
  }

  // Update active dot
  function updateDots() {
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    const percentage = x / firstSetWidth;
    const index = Math.floor(percentage * originals.length) % originals.length;

    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  // Loop animation engine
  function animate() {
    if (!paused) {
      x += speed;

      if (x >= firstSetWidth) {
        x = 0;
      }

      track.style.transform = `translateX(-${x}px)`;
      updateDots();
    }
    requestAnimationFrame(animate);
  }

  animate();

  wrapper.addEventListener("mouseenter", () => {
    paused = true;
  });

  wrapper.addEventListener("mouseleave", () => {
    paused = false;
  });

  window.addEventListener("resize", () => {
    calculateWidths();
  });
});
