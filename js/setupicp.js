// Global Variables
const selectedIndustrySet = new Set();
const selectedSizeSet = new Set();
const selectedRevenueSet = new Set();
const selectedLocationSet = new Set();
const selectedPainPointsSet = new Set();
const selectedGoalsSet = new Set();
const selectedValuePropsSet = new Set();

let currentStep = 0;
let selectedStage = '';
let selectedSubstage = '';
let selectedTitle = '';
let selectedPosition = '';
let selectedPainPoint = '';
let selectedGoal = '';
let selectedValueProp = '';


// Stages Data
const stages = {
    startup: ['Idea Stage', 'Development Stage', 'Launch Stage'],
    seed: ['Validation Stage', 'Early Traction Stage'],
    growth: ['Scaling Stage', 'Market Penetration Stage', 'Series B to Series D Funding'],
    expansion: ['Diversification Stage', 'Global Expansion Stage', 'Acquisition Stage'],
    maturity: ['Optimization Stage', 'Innovation Stage', 'Market Leadership Stage'],
    decline: ['Renewal Stage', 'Manage Decline Stage'],
};

// Industry, Revenue, Size, and Location Data
const industrySectors = [
    "Agriculture", "Automotive", "Aerospace", "Banking", "Construction",
    "Consumer Goods", "Education", "Energy", "Entertainment", "Finance",
    "Healthcare", "Hospitality", "Information Technology", "Insurance",
    "Manufacturing", "Media", "Pharmaceuticals", "Real Estate", "Retail",
    "Telecommunications", "Transportation", "Utilities", "Waste Management"
];

const companySizes = [
    { label: "Small (1-50 employees)", range: [1, 50] },
    { label: "Medium (51-200 employees)", range: [51, 200] },
    { label: "Large (201-500 employees)", range: [201, 500] },
    { label: "Enterprise (501-1,000 employees)", range: [501, 1000] },
    { label: "Large Enterprise (1,001+ employees)", range: [1001, Infinity] }
];

const revenueRanges = [
    { label: "Under $1M annually", range: [0, 1000000] },
    { label: "$1M-$10M annually", range: [1000001, 10000000] },
    { label: "$10M-$50M annually", range: [10000001, 50000000] },
    { label: "$50M-$100M annually", range: [50000001, 100000000] },
    { label: "$100M-$500M annually", range: [100000001, 500000000] },
    { label: "$500M-$1B annually", range: [500000001, 1000000000] },
    { label: "$1B+ annually", range: [1000000001, Infinity] }
];

const locations = [
    "North America", "Europe", "Asia", "South America", "Africa", "Australia", "Global"
];

// Titles and Positions Data
const titles = {
    "Executive Level": [
        "Chief Executive Officer (CEO)",
        "Chief Financial Officer (CFO)",
        "Chief Operating Officer (COO)",
        "Chief Technology Officer (CTO)",
        "Chief Information Officer (CIO)",
        "Chief Marketing Officer (CMO)",
        "Chief Revenue Officer (CRO)",
        "Chief Product Officer (CPO)",
        "Chief Medical Officer (CMO)",
        "Chief Scientific Officer (CSO)"
    ],
    "Senior Management": [
        "Vice President (VP) of Sales",
        "VP of Marketing",
        "VP of Engineering",
        "VP of Product",
        "VP of Operations",
        "VP of Human Resources",
        "VP of Research and Development",
        "VP of Clinical Operations"
    ],
    "Middle Management": [
        "Director of Sales",
        "Director of Marketing",
        "Director of Engineering",
        "Director of Product Management",
        "Director of IT",
        "Director of Operations",
        "Director of Human Resources",
        "Director of Clinical Research"
    ],
    "Department Heads": [
        "Head of Sales",
        "Head of Marketing",
        "Head of Engineering",
        "Head of Product",
        "Head of IT",
        "Head of Operations",
        "Head of Human Resources",
        "Head of Clinical Trials"
    ]
};

const painPoints = [
    "Regulatory Compliance", "Data Management", "Scalability", "Security",
    "Efficiency", "Integrations", "Innovation", "Cost Management", "Customer Satisfaction"
];

const goals = [
    "Regulatory Compliance", "Data Management", "Scalability", "Security",
    "Efficiency", "Integrations", "Innovation", "Cost Reduction", "Customer Satisfaction",
    "Market Expansion", "Talent Acquisition and Retention", "Sustainability"
];

const valuePropositions = [
    "Convenience", "Productivity", "Experience", "Identity", "Profitability",
    "Innovation", "Quality", "Customisation", "Sustainability", "Reliability"
];


// Navigation Elements
const steps = document.querySelectorAll('.step');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');


// Step 4 Elements
const titleRadios = document.querySelectorAll('.title-radio'); // Radio buttons for titles
const positionSelect = document.getElementById('position-select'); // Dropdown for positions
const responsibilitiesContainer = document.getElementById('responsibilities-container'); // Textarea container
const responsibilitiesTextarea = document.getElementById('responsibilitiesTextarea'); // Responsibilities textarea
const titleChips = document.getElementById('title-chips'); // Chips container for titles

// Step 6-8: Handle Pain Points, Goals, and Value Propositions
const painPointsContainer = document.getElementById('painpoint-container');
const goalsContainer = document.getElementById('goal-container');
const valuePropsContainer = document.getElementById('valueprop-container');

const painPointDescription = document.getElementById('painpoint-description');
const goalDescription = document.getElementById('goal-description');
const valuePropDescription = document.getElementById('valueprop-description');

const painPointChips = document.getElementById('painpoint-chips');
const goalChips = document.getElementById('goal-chips');
const valuePropChips = document.getElementById('valueprop-chips');



// Step Navigation Functions
function updateSteps() {
    steps.forEach((step, index) => step.classList.toggle('active', index === currentStep));
    prevButton.disabled = currentStep === 0;
    nextButton.disabled = currentStep === steps.length - 1;
}

prevButton.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateSteps();
    }
});

nextButton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
    }
});

updateSteps();

// Step 4: Handle Titles and Positions
titleRadios.forEach(radio => {
    radio.addEventListener('change', event => {
        const title = event.target.value; // Selected title category
        if (title) {
            selectedTitle = title;
            selectedPosition = ''; // Clear any previously selected position
            showPositions(title);
            updateTitleChips();
        }
    });
});

function showPositions(title) {
    const positions = titles[title]; // Get positions for selected title
    positionSelect.innerHTML = `<option value="" disabled selected>Select a position</option>`; // Reset dropdown

    // Populate the dropdown with relevant positions
    positions.forEach(pos => {
        const option = document.createElement('option');
        option.value = pos;
        option.textContent = pos;
        positionSelect.appendChild(option);
    });

    positionSelect.disabled = false; // Enable dropdown

    // Handle dropdown changes
    positionSelect.addEventListener('change', event => {
        selectedPosition = event.target.value; // Store selected position
        if (selectedPosition) {
            responsibilitiesContainer.style.display = 'block'; // Show responsibilities textarea
            responsibilitiesTextarea.value = `Responsibilities for ${selectedPosition}`; // Default text
        } else {
            responsibilitiesContainer.style.display = 'none'; // Hide textarea
        }
        updateTitleChips();
    });
}

function updateTitleChips() {
    titleChips.innerHTML = ''; // Clear existing chips
    if (selectedTitle) {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = `${selectedTitle}${selectedPosition ? ` - ${selectedPosition}` : ''}`;

        const button = document.createElement('button');
        button.textContent = 'x';
        button.addEventListener('click', () => {
            clearTitleAndPosition();
            updateTitleChips();
        });

        chip.appendChild(button);
        titleChips.appendChild(chip);
    }
}

function clearTitleAndPosition() {
    selectedTitle = '';
    selectedPosition = '';
    positionSelect.innerHTML = `<option value="" disabled selected>Select a position</option>`;
    positionSelect.disabled = true; // Disable dropdown
    responsibilitiesContainer.style.display = 'none'; // Hide responsibilities textarea
    responsibilitiesTextarea.value = ''; // Clear textarea
}


// Stage & Substage Elements
const stageRadios = document.querySelectorAll('.stage-radio');
const substageContainer = document.getElementById('substage-container');
const substageOptions = document.getElementById('substage-options');
const substageTextarea = document.getElementById('substage-textarea');

// Chips for Categories
const industryChips = document.getElementById('sectorChips');
const sizeChips = document.getElementById('sizeChips');
const revenueChips = document.getElementById('revenueChips');
const locationChips = document.getElementById('locationChips');
const stageChips = document.getElementById('selected-chips');

// Step Navigation Functions
function updateSteps() {
    steps.forEach((step, index) => step.classList.toggle('active', index === currentStep));
    prevButton.disabled = currentStep === 0;
    nextButton.disabled = currentStep === steps.length - 1;
}

prevButton.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateSteps();
    }
});

nextButton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
    }
});

updateSteps();

// Populate Containers and Add Chips
function populateContainer(data, container, chipsContainer, selectedSet) {
    data.forEach(item => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item.label || item;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(item.label || item));
        container.appendChild(label);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedSet.add(checkbox.value);
                addChip(checkbox.value, chipsContainer, selectedSet);
            } else {
                selectedSet.delete(checkbox.value);
                removeChip(checkbox.value, chipsContainer);
            }
        });
    });
}


function populateOptions(data, container, chipsContainer, selectedSet, descriptionElement) {
    data.forEach(item => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(item));
        container.appendChild(label);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedSet.add(checkbox.value);
                addChip(checkbox.value, chipsContainer, selectedSet);
                if (descriptionElement) {
                    descriptionElement.style.display = 'block';
                    descriptionElement.value = `${item} selected. Add more details if needed.`;
                }
            } else {
                selectedSet.delete(checkbox.value);
                removeChip(checkbox.value, chipsContainer);
                if (descriptionElement && selectedSet.size === 0) {
                    descriptionElement.style.display = 'none';
                    descriptionElement.value = '';
                }
            }
        });
    });
}


// Add and Remove Chips
function addChip(value, container, set) {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = value;

    const button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', () => {
        set.delete(value);
        removeChip(value, container);

        // Uncheck corresponding checkbox
        const checkbox = document.querySelector(`input[value="${value}"]`);
        if (checkbox) checkbox.checked = false;
    });

    chip.appendChild(button);
    container.appendChild(chip);
}

function removeChip(value, container) {
    [...container.children].forEach(chip => {
        if (chip.textContent.startsWith(value)) {
            container.removeChild(chip);
        }
    });
}

// Stage and Substage Functions
function showSubstages(stage) {
    substageContainer.style.display = 'block';
    substageOptions.innerHTML = '';
    selectedStage = stage;
    selectedSubstage = ''; // Reset substage if stage changes
    updateChips();

    stages[stage].forEach(substage => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="substage" value="${substage}"> ${substage}`;
        substageOptions.appendChild(label);
    });

    document.querySelectorAll('input[name="substage"]').forEach(radio => {
        radio.addEventListener('change', () => {
            selectedSubstage = radio.value;
            updateSubstageTextarea(); // Display the textarea when a substage is selected
            updateChips();
        });
    });
}

function updateSubstageTextarea() {
    if (selectedSubstage) {
        substageTextarea.style.display = 'block';
        substageTextarea.value = `Details for ${selectedSubstage}`; // Prefill textarea with default content
    } else {
        substageTextarea.style.display = 'none';
        substageTextarea.value = ''; // Clear textarea if no substage is selected
    }
}

function updateChips() {
    stageChips.innerHTML = '';
    if (selectedStage) {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.innerHTML = `
            ${selectedStage}${selectedSubstage ? ` - ${selectedSubstage}` : ''} 
            <button onclick="removeStageSubstageChip()">x</button>
        `;
        stageChips.appendChild(chip);
    }
}

function removeStageSubstageChip() {
    selectedStage = '';
    selectedSubstage = '';
    stageChips.innerHTML = '';

    // Deselect stage checkbox
    document.querySelectorAll('input[name="stage"]').forEach(radio => (radio.checked = false));

    // Clear substage container
    substageContainer.style.display = 'none';
    substageOptions.innerHTML = '';
    substageTextarea.style.display = 'none';
    substageTextarea.value = ''; // Clear the textarea
}

stageRadios.forEach(radio => {
    radio.addEventListener('change', () => showSubstages(radio.value));
});

// Populate Initial Containers
populateContainer(industrySectors, document.getElementById('sectorsContainer'), industryChips, selectedIndustrySet);
populateContainer(companySizes, document.getElementById('sizesContainer'), sizeChips, selectedSizeSet);
populateContainer(revenueRanges, document.getElementById('revenueContainer'), revenueChips, selectedRevenueSet);
populateContainer(locations, document.getElementById('locationContainer'), locationChips, selectedLocationSet);




// Populate Pain Points, Goals, and Value Propositions
populateOptions(painPoints, painPointsContainer, painPointChips, selectedPainPointsSet, painPointDescription);
populateOptions(goals, goalsContainer, goalChips, selectedGoalsSet, goalDescription);
populateOptions(valuePropositions, valuePropsContainer, valuePropChips, selectedValuePropsSet, valuePropDescription);
