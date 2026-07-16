const portfolioCards = [
  {
    image: "./assets/picture/pic1.png",
    title: "BC Bagsakan Pickup",
    description: "Your dependable partner in farm-to-market local logistics",
    category: "Mobile App",
  },
  {
    image: "./assets/picture/pic2.png",
    title: "Bio-MOBAPP",
    description:
      "Access agricultural biodata and systems right from your pocket",
    category: "Mobile App",
  },
  {
    image: "./assets/picture/pic3.png",
    title: "BC Bagsakan Delivery",
    description: "Direct tracking and seamless distribution logistics systems",
    category: "Mobile App",
  },
  {
    image: "./assets/picture/pic4.png",
    title: "Biorganism",
    description: "Katulong mo sa pagsasaka",
    category: "Mobile App",
  },
  {
    image: "./assets/picture/pic5.png",
    title: "EM & A Architectural",
    description: "Corporate identity and professional branding materials",
    category: "Brand & Design",
  },
  {
    image: "./assets/picture/pic6.png",
    title: "Greenhouse Paradise",
    description: "Branding concept and structural marketing documentation",
    category: "Brand & Design",
  },
  {
    image: "./assets/picture/pic7.png",
    title: "MHR",
    description: "Professional business stationery design and visual concepts",
    category: "Brand & Design",
  },
  {
    image: "./assets/picture/pic8.png",
    title: "Migs",
    description: "Complete localized system identity and design services",
    category: "Brand & Design",
  },
  {
    image: "./assets/picture/pic9.png",
    title: "Filipino Land",
    description: "Official identity and digital solution styling properties",
    category: "Brand & Design",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.getElementById("projects-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!projectGrid) {
    console.error(
      "Error: Could not find the portfolio grid element (#projects-grid) in the DOM.",
    );
    return;
  }

  // Rendering of Cards
  function displayCards(filterCategory) {
    // Clears the container completely
    projectGrid.innerHTML = "";

    const filteredCards = portfolioCards.filter((card) => {
      if (filterCategory === "All") return true;
      return card.category === filterCategory;
    });

    if (filteredCards.length === 0) {
      projectGrid.innerHTML = `<div class="no-projects text-center py-8 text-gray-500 w-full col-span-full">No projects found in this category.</div>`;
      return;
    }

    filteredCards.forEach((card) => {
      const cardHTML = `
        <div class="project-card">
          <div class="img-wrapper">
            <img src="${card.image}" alt="${card.title}" />
          </div>
          <h3>${card.title}</h3>

          <!-- THE HOVER CARD (Matches design) -->
          <div class="info-overlay">
            <div class="overlay-logo">
              <img src="${card.image}" alt="logo" />
            </div>
            <div class="overlay-title">${card.title}</div>
            <div class="overlay-description">${card.description}</div>
          </div>
        </div>`;

      projectGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
  }

  // Handle filter button click actions
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-filter");
      displayCards(category);
    });
  });

  // Initial render initialization
  displayCards("All");
});
