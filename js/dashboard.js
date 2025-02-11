document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.display = "none"; // Hide the loader
    }, 1000); // Adds a slight delay to ensure visibility during the load
});


function editAgent(id) {
    alert(`Edit SDR Agent with ID: ${id}`);
    // Redirect to editAgent.html with the agent's ID
}

function viewAgent(id) {
    alert(`View SDR Agent with ID: ${id}`);
    // Open a modal or redirect to a details page for the agent
}

function deleteAgent(id) {
    if (confirm(`Are you sure you want to delete SDR Agent with ID: ${id}?`)) {
        alert(`SDR Agent with ID: ${id} deleted.`);
        // Perform delete action (e.g., send request to backend)
    }
}