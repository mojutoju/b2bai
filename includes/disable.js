document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("toggleActive");
    const overlay = document.getElementById("overlay");

    // Ensure overlay initially matches the toggle's state
    if (!toggle.checked) {
        overlay.classList.add("inactive");
        document.body.classList.add("no-interaction");
    }

    toggle.addEventListener("change", function () {
        if (!this.checked) {
            // Inactive mode: show overlay and disable content
            overlay.classList.add("inactive");
            document.body.classList.add("no-interaction");
        } else {
            // Active mode: hide overlay and enable content
            overlay.classList.remove("inactive");
            document.body.classList.remove("no-interaction");
        }
    });

    // Prevent overlay clicks from affecting the toggle
    overlay.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Prevent unintended reactivation of the toggle
    document.addEventListener("click", function (event) {
        if (!toggle.checked && event.target.id !== "toggleActive" && !overlay.contains(event.target)) {
            event.preventDefault(); // Prevent unwanted behavior
        }
    });
});
