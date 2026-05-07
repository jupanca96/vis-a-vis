  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const menus = document.querySelectorAll(".menu-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remover active de todos los tabs
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Ocultar todos los menús
        menus.forEach((menu) => menu.classList.remove("active"));

        // Mostrar el menú correspondiente
        const id = tab.dataset.menu;
        const activeMenu = document.getElementById(id);

        if (activeMenu) {
          activeMenu.classList.add("active");

          // Scroll suave hacia el contenido (mejora UX en mobile)
          activeMenu.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  });