document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-preview");
    const closeBtn = document.getElementById("close-preview");
    const previewSidebar = document.getElementById("preview-sidebar");

    // Close preview sidebar
    closeBtn.addEventListener("click", () => {
        previewSidebar.classList.add("closed");
        openBtn.style.display = "block"; // Show the open button
    });

    // Open preview sidebar
    openBtn.addEventListener("click", () => {
        previewSidebar.classList.remove("closed");
        openBtn.style.display = "none"; // Hide the open button
    });

    // Dynamically update the preview
    document.querySelectorAll("#knowledgebase-form input, #knowledgebase-form textarea").forEach(input => {
        input.addEventListener("input", () => {
            const previewId = `preview-${input.id}`;
            const previewElement = document.getElementById(previewId);
            const value = input.value.trim();

            if (input.id === "activities") {
                // Replace newlines with <br> for activities
                previewElement.innerHTML = value.replace(/\n/g, "<br>") || "Awaiting user input";
            } else {
                previewElement.textContent = value || "Awaiting user input";
            }
        });
    });

    // Handle file input changes
    document.getElementById("files").addEventListener("change", (event) => {
        const fileList = Array.from(event.target.files);
        const filePreviewContainer = document.getElementById("file-preview");
        filePreviewContainer.innerHTML = ""; // Clear previous preview

        fileList.forEach((file, index) => {
            const fileSize = (file.size / 1024).toFixed(2) + " KB";
            const fileDetails = `
                <div class="file-preview">
                    <p><strong>${file.name}</strong>: ${file.type}, ${fileSize}</p>
                    <div class="file-actions">
                        <button class="btn btn-success btn-sm approve-file" data-index="${index}">Approve</button>
                        <button class="btn btn-danger btn-sm delete-file" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
            filePreviewContainer.innerHTML += fileDetails;
        });
    });

    // Approve and delete file actions
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("approve-file")) {
            event.target.closest(".file-preview").style.backgroundColor = "#d4edda"; // Approved background color
            event.target.disabled = true;
        } else if (event.target.classList.contains("delete-file")) {
            event.target.closest(".file-preview").remove(); // Remove file preview
        }
    });

  // Submit button functionality
document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    // Gather form data
    const formData = {
        organisation: document.getElementById("organisation").value.trim(),
        department: document.getElementById("department").value.trim(),
        activities: document.getElementById("activities").value.trim(),
        files: [],
    };

    // Include files in the formData
    const fileInput = document.getElementById("files");
    const fileList = Array.from(fileInput.files);
    fileList.forEach(file => {
        formData.files.push({
            name: file.name,
            type: file.type,
            size: (file.size / 1024).toFixed(2) + " KB",
        });
    });

    // Display success alert
    alert("Form submitted successfully!");

    // Convert form data to JSON string for download
    const jsonData = JSON.stringify(formData, null, 2);

    // Download JSON file
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-data.json"; // File name
    a.click();
    URL.revokeObjectURL(url); // Clean up URL

    // Redirect to createicp.html with form data as query parameters
    const queryParams = new URLSearchParams(formData);
    window.location.href = `../includes/icp.html?${queryParams.toString()}`;
});
});



  