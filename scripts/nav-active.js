const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links a.active")?.classList.remove("active");
    this.classList.add("active");
  });
});
