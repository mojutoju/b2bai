 // Function to toggle accordion content
 function toggleAccordionContent(button) {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains("open");

    // Close all open accordions and reset arrow icons
    document.querySelectorAll(".custom-accordion-content").forEach((item) => {
      item.style.maxHeight = null;
      item.classList.remove("open");
    });
    document.querySelectorAll(".arrow-icon").forEach((icon) => {
      icon.classList.remove("fa-arrow-down");
      icon.classList.add("fa-arrow-right");
      icon.classList.remove("down");
    });

    // Open the clicked accordion and update arrow icon
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
      const arrow = button.querySelector(".arrow-icon");
      arrow.classList.remove("fa-arrow-right");
      arrow.classList.add("fa-arrow-down");
      arrow.classList.add("down");
    }
  }



  const Accordion = {
    toggle(button, section) {
      const content = document.querySelector(`.custom-accordion-content[data-accordion="${section}"]`);
      const allContents = document.querySelectorAll(".custom-accordion-content");

      allContents.forEach(item => {
        if (item !== content) {
          item.style.maxHeight = null;
          item.classList.remove("open");
        }
      });

      button.classList.toggle("active");
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("open");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
      }
    }
  };

  const Tabs = {
    switch(tabButton, section, targetId) {
      const tabContainer = document.querySelector(`.custom-accordion-content[data-accordion="${section}"]`);
      const tabButtons = tabContainer.querySelectorAll(".tab-button");
      const tabContents = tabContainer.querySelectorAll(`.tab-content[data-parent="${section}"]`);

      tabButtons.forEach(button => button.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      tabButton.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    }
  };