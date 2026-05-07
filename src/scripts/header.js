document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  let ticking = false;

  toggleBtn?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
  });

  function updateHeader() {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
});