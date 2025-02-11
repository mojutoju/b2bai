
    

document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.getElementById("dropdownMenuButton");
    const dropdownMenu = document.querySelector(".dropdown-menu");
  
    // Add animation classes
    dropdownMenu.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    dropdownMenu.style.opacity = "0";
    dropdownMenu.style.transform = "translateY(-10px)";
  
    // Toggle dropdown menu visibility with animation
    dropdownToggle.addEventListener("click", function () {
      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.transform = "translateY(-10px)";
        setTimeout(() => dropdownMenu.classList.remove("show"), 300);
      } else {
        dropdownMenu.classList.add("show");
        setTimeout(() => {
          dropdownMenu.style.opacity = "1";
          dropdownMenu.style.transform = "translateY(0)";
        }, 10);
      }
    });
  
    // Close the dropdown menu if clicked outside
    document.addEventListener("click", function (event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.transform = "translateY(-10px)";
        setTimeout(() => dropdownMenu.classList.remove("show"), 300);
      }
    });
  
    // Optional: Add keyboard accessibility (e.g., close menu with Esc key)
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.transform = "translateY(-10px)";
        setTimeout(() => dropdownMenu.classList.remove("show"), 300);
      }
    });
  });



  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.display = "none"; // Hide the loader
    }, 1000); // Adds a slight delay to ensure visibility during the load
});
