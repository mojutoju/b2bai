const formData = {};

        // Populate the form with existing data
        function populateForm() {
            const zapierApiKey = "yourSavedZapierKey"; // Replace with real data
            const emailService = "Gmail"; // Replace with real data
            const email = "user@example.com"; // Replace with real data
            const callServiceNumber = "+123456789"; // Replace with real data
            const timeZone = "EST"; // Replace with real data
            const startTime = "08:00";
            const endTime = "17:00";
            const activeDays = ["Monday", "Tuesday"];

            document.getElementById("zapierApiKey").value = zapierApiKey;
            document.getElementById(emailService === "Gmail" ? "emailGmail" : "emailOutlook").checked = true;
            document.getElementById("emailField").value = email;
            document.getElementById("callServiceNumber").value = callServiceNumber;
            document.getElementById("timeZone").value = timeZone;
            document.getElementById("startTime").value = startTime;
            document.getElementById("endTime").value = endTime;
            activeDays.forEach(day => {
                document.getElementById(`day${day}`).checked = true;
            });
        }

        // Save data from the form
        function saveFormData() {
            const zapierApiKey = document.getElementById("zapierApiKey").value.trim();
            const emailService = document.getElementById("emailGmail").checked ? "Gmail" : "Outlook";
            const email = document.getElementById("emailField").value.trim();
            const callServiceNumber = document.getElementById("callServiceNumber").value.trim();
            const timeZone = document.getElementById("timeZone").value;
            const startTime = document.getElementById("startTime").value;
            const endTime = document.getElementById("endTime").value;
            const activeDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].filter(day =>
                document.getElementById(`day${day}`).checked
            );

            formData.zapierApiKey = zapierApiKey;
            formData.emailService = emailService;
            formData.email = email;
            formData.callServiceNumber = callServiceNumber;
            formData.schedule = { timeZone, startTime, endTime, activeDays };

            console.log("Form Data Saved:", formData);
            alert("Your changes have been saved!");
        }

        // Initial population
        populateForm();