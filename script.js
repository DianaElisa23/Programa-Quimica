document.addEventListener("DOMContentLoaded", () => {
    const dark = localStorage.getItem("dark-mode");
    if (dark === "enabled") {
      document.body.classList.add("dark-mode");
    }
  });
  
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
  }  