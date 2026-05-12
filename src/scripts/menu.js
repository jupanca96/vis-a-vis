  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".menu-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-menu");

      // Resetear
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Activar
      tab.classList.add("active");
      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.classList.add("active");
      }
      
      // Auto-scroll suave al centro en móviles
      tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  });