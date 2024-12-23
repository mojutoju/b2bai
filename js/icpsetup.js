
const majorCountriesWithCities = {
    "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
    "Japan": ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Fukuoka"]
};


const icpStepsConfig = [
    {
        label: "Requirements",
        content: "Setup your first ICP. Ideal Customer Profile (ICP) helps in finding leads and prospects suitable for your business. It is mandatory to setup the ICP if you want to use the SDR Agent. You can edit the ICP later.",
        actions: [
            { type: "button", text: "Next", action: "validateAndProceed(1)", class: "btn-primary" }
        ]
    },
    {
        label: "Enter your ICP",
        content: "Describe what you want to achieve through this ICP.",
        inputs: [
            { id: "icpInput", type: "text", placeholder: "Enter your goal", required: true }
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(0)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(2)", class: "btn-primary" }
        ]
    },
    {
        label: "Industry",
        content: "Select the industry and explain why they need your product.",
        inputs: [
            { id: "industrySelect", type: "select", options: [
                "Agriculture", "Automotive", "Aerospace", "Banking", "Biotechnology", "Chemicals", "Construction", 
                "Consumer Goods", "Defense", "Education", "Energy", "Entertainment", "Financial Services", 
                "Food and Beverage", "Government", "Healthcare", "Hospitality", "Information Technology", 
                "Insurance", "Legal Services", "Logistics", "Manufacturing", "Media", "Mining", 
                "Nonprofit", "Pharmaceuticals", "Real Estate", "Retail", "Technology", 
                "Telecommunications", "Textiles", "Transportation", "Travel and Tourism", 
                "Utilities", "Waste Management", "Wholesale Trade"
              ], multiple: true, required: true },
            { id: "productReason", type: "textarea", placeholder: "Reason", required: true }
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(1)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(3)", class: "btn-primary" }
        ]
    },
    {
        label: "Why Now?",
        content: "Explain the urgency of setting up this ICP.",
        inputs: [
            { id: "whyNowInput", type: "textarea", placeholder: "Explain here", required: true }
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(2)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(4)", class: "btn-primary" }
        ]
    },
    {
        label: "Revenue Details",
        content: "What is the average annual revenue of the companies you are targeting?",
        inputs: [
            {
                id: "revenueSelect",
                type: "select",
                options: ["Select Revenue","£0 - £50,000", "£50,001 - £500,000", "£500,001 - £1,000,000", "Above £1,000,000"],
                multiple: true,
                required: true,
            },
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(3)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(5)", class: "btn-primary" },
        ],
    },
    {
        label: "Employee Head Count",
        content: "Provide the employee details for the ideal companies.",
        inputs: [
            {
                id: "employeeCountSelect",
                type: "select",
                placeholder: "Select Employee Size",
                options: ["Select Employee Size","1-50", "51-100", "101-500", "More than 501"],
                multiple: true,
                required: true,
            },
            {
                id: "departmentCountSelect",
                type: "select",
                placeholder: "Select Department Size",
                options: ["Select Department Size","1-10", "11-50", "51-100"],
                multiple: true,
                required: true,
            },
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(4)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(6)", class: "btn-primary" },
        ],
    },
    {
        label: "Geography",
        content: "Where is your ideal company based?",
        inputs: [
            {
                id: "geographySelect",
                type: "select",
                placeholder: "Select Country",
                options: ["Select Country", ...Object.keys(majorCountriesWithCities)],
                multiple: true,  // Allow multiple selections
                required: true
            },
            {
                id: "citySelect",
                type: "select",
                placeholder: "Select Cities",
                options: ["Select City"],
                multiple: true,  // Allow multiple cities selection
                required: true
            },
            {
                id: "geographyReason",
                type: "textarea",
                placeholder: "Reason",
                required: true
            }
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(5)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(7)", class: "btn-primary" }
        ]
    },
    
    {
        label: "Key Challenges",
        content: "What are the main problems the ICP is trying to solve?",
        inputs: [
            { id: "challengesInput", type: "textarea", placeholder: "Describe challenges", required: true },
            { id: "painPointsSelect", type: "select", options: ["High Operational Costs", "Low Productivity", "Employee Turnover", "Market Competition"], multiple: true, required: true }
        ],
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(6)", class: "btn-secondary" },
            { type: "button", text: "Next", action: "validateAndProceed(8)", class: "btn-primary" }
        ]
    },
    {
        label: "Review",
        content: "Here are your inputs:",
        review: true, // Indicates this step dynamically shows user inputs
        actions: [
            { type: "button", text: "Go Back", action: "handleICP(7)", class: "btn-secondary" },
            { type: "button", text: "Submit", action: "downloadICP()", class: "btn-success" }
        ]
    }
];

let currentStep = 0;
let formData = {};

// Function to display a step
function displayStep(stepNum) {
    const step = icpStepsConfig[stepNum];
    const contentDiv = document.getElementById("stepContent");
    contentDiv.innerHTML = `<h2>${step.label}</h2><p>${step.content}</p>`;

    // Render inputs
    if (step.inputs) {
        step.inputs.forEach((input) => {
            if (input.type === "text" || input.type === "textarea") {
                contentDiv.innerHTML += `  
                    <p>
                        <input type="${input.type}" 
                               id="${input.id}" 
                               placeholder="${input.placeholder}" 
                               class="form-control" 
                               ${input.required ? "required" : ""} 
                               value="${formData[input.id] || ""}">
                        <span id="${input.id}-error" class="text-danger"></span>
                    </p>`;
            } else if (input.type === "select") {
                const options = input.options
                    .map((opt) => `<option ${formData[input.id]?.includes(opt) ? "selected" : ""}>${opt}</option>`)
                    .join("");
                contentDiv.innerHTML += `
                    <p>
                        <select id="${input.id}" 
                                class="form-select" 
                                multiple 
                                ${input.required ? "required" : ""}>
                            ${options}
                        </select>
                        <span id="${input.id}-error" class="text-danger"></span>
                        <div id="${input.id}-chips" class="chip-container mt-2"></div>
                    </p>`;
            }
        });
    }

    // Render review section
    if (step.review) {
        contentDiv.innerHTML += `<ul id="reviewList">
            ${Object.entries(formData)
                .map(([key, value]) => `<li>${key}: ${Array.isArray(value) ? value.join(", ") : value}</li>`)
                .join("")}
        </ul>`;
    }

    // Render actions
    contentDiv.innerHTML += step.actions
        .map(
            (action) =>
                `<button class="btn ${action.class}" onclick="${action.action}">${action.text}</button>`
        )
        .join("");

    // Add event listeners for select dropdowns
    step.inputs?.forEach((input) => {
        if (input.type === "select") {
            const selectElement = document.getElementById(input.id);
            const chipContainer = document.getElementById(`${input.id}-chips`);

            // Pre-fill chips
            if (formData[input.id]) {
                formData[input.id].forEach((option) => addChip(input.id, option, chipContainer));
            }

            // Handle dropdown changes
            selectElement.addEventListener("change", () => {
                const selectedOptions = Array.from(selectElement.selectedOptions).map((option) => option.value);
                formData[input.id] = selectedOptions;

                // Update chips
                chipContainer.innerHTML = "";
                selectedOptions.forEach((option) => addChip(input.id, option, chipContainer));

                // If the country is selected, populate cities
                if (input.id === "geographySelect") {
                    updateCities(selectedOptions);
                }
            });
        }
    });
}

// Function to update cities based on selected countries
function updateCities(countries) {
    const citySelect = document.getElementById("citySelect");
    
    // Clear previous city options
    citySelect.innerHTML = "<option>Select City</option>";

    // Create a list of cities for the selected countries
    let citiesToAdd = [];

    countries.forEach((country) => {
        if (majorCountriesWithCities[country]) {
            citiesToAdd = citiesToAdd.concat(majorCountriesWithCities[country]);
        }
    });

    // Remove duplicate cities
    citiesToAdd = [...new Set(citiesToAdd)];

    // Populate city options based on selected countries
    citiesToAdd.forEach((city) => {
        const option = document.createElement("option");
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // Reset city value if no valid city is selected
    formData["citySelect"] = [];
}
// Function to add a chip
function addChip(selectId, option, container) {
    const chip = document.createElement("div");
    chip.className = "chip d-inline-block bg-primary text-white rounded px-2 py-1 m-1";
    chip.innerHTML = `${option} <span class="ms-1 text-white" style="cursor: pointer; color:white;">&times;</span>`;

    // Add click event to remove chip
    chip.querySelector("span").addEventListener("click", () => {
        const index = formData[selectId].indexOf(option);
        if (index > -1) {
            formData[selectId].splice(index, 1);
        }

        // Update dropdown and chips
        const selectElement = document.getElementById(selectId);
        Array.from(selectElement.options).forEach((opt) => {
            if (opt.value === option) {
                opt.selected = false;
            }
        });

        chip.remove();
    });

    container.appendChild(chip);
}

// Function to validate inputs and proceed
function validateAndProceed(nextStep) {
    const step = icpStepsConfig[currentStep];
    let isValid = true;

    if (step.inputs) {
        step.inputs.forEach((input) => {
            const element = document.getElementById(input.id);
            const errorElement = document.getElementById(`${input.id}-error`);

            if (input.type === "select") {
                const selectedOptions = Array.from(element.selectedOptions).map((option) => option.value);
                if (input.required && selectedOptions.length === 0) {
                    errorElement.textContent = `Please select at least one option.`;
                    isValid = false;
                } else {
                    errorElement.textContent = ""; // Clear error
                    formData[input.id] = selectedOptions;
                }
            } else if (input.required && !element.value.trim()) {
                errorElement.textContent = `${input.placeholder} is required.`;
                isValid = false;
            } else {
                errorElement.textContent = ""; // Clear error
                formData[input.id] = element.value.trim();
            }
        });
    }

    if (isValid) {
        currentStep = nextStep;
        displayStep(currentStep);
    }
}

// Additional functions
function handleICP(previousStep) {
    currentStep = previousStep;
    displayStep(currentStep);
}

function downloadICP() {
    const blob = new Blob([JSON.stringify(formData, null, 4)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "icp-config.json";
    link.click();
}

// Initialize
displayStep(currentStep);
