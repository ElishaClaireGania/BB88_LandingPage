document.addEventListener("DOMContentLoaded", function () {
  const hamburg = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (hamburg && navMenu) {
    hamburg.addEventListener("click", function (e) {
      e.stopPropagation();

      //   Toggle to make an X animation
      this.classList.toggle("active");

      // Toggle the menu visibility
      navMenu.classList.toggle("open");
      navMenu.classList.toggle("hidden");
      navMenu.classList.toggle("flex");
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburg.classList.remove("active");
        navMenu.classList.remove("open");
        navMenu.classList.add("hidden");
        navMenu.classList.remove("flex");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInside =
        navMenu.contains(event.target) || hamburg.contains(event.target);
      if (!isClickInside && navMenu.classList.contains("open")) {
        hamburg.classList.remove("active");
        navMenu.classList.remove("open");
        navMenu.classList.add("hidden");
        navMenu.classList.remove("flex");
      }
    });

    // Close menu when pressing the Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("open")) {
        hamburg.classList.remove("active");
        navMenu.classList.remove("open");
        navMenu.classList.add("hidden");
        navMenu.classList.remove("flex");
      }
    });
  }
});
