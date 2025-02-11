$(document).ready(function() {
    $('#industry').select2({ placeholder: 'Select industries' });
    $('#department').select2({ placeholder: 'Select departments' });
    $('#headCount').select2({ placeholder: 'Select head counts' });
    $('#titles').select2({ placeholder: 'Select titles' });
    $('#revenue').select2({ placeholder: 'Select revenue ranges' });
    $('#location').select2({ placeholder: 'Select locations' });
    $('#stages').select2({ placeholder: 'Select company stages' });
    $('#subStages').select2({ placeholder: 'Select substages' });
});

// Stages and corresponding substages
const stagesToSubstages = {
    startup: ['Idea stage', 'Development stage', 'Launch stage'],
    seed: ['Validation stage', 'Early traction stage'],
    growth: ['Scaling stage', 'Market penetration stage', 'Series B to Series D funding'],
    expansion: ['Diversification Stage', 'Global Expansion Stage', 'Acquisition Stage'],
    maturity: ['Optimization Stage', 'Innovation Stage', 'Market Leadership Stage'],
    decline: ['Renewal Stage', 'Manage Decline Stage']
};

// Populate substages dynamically
$('#stages').on('change', function() {
    const selectedStages = $(this).val() || [];
    const subStagesSelect = $('#subStages');

    subStagesSelect.empty().prop('disabled', selectedStages.length === 0);
    
    selectedStages.forEach(stage => {
        if (stagesToSubstages[stage]) {
            stagesToSubstages[stage].forEach(substage => {
                subStagesSelect.append(new Option(substage, substage));
            });
        }
    });
});

// Add responsibilities with remove button
document.getElementById('addResponsibility').addEventListener('click', () => {
    const container = document.getElementById('responsibilitiesContainer');

    const wrapper = document.createElement('div');
    wrapper.className = 'responsibility-item d-flex align-items-center mb-2';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control me-2';
    input.placeholder = 'Enter a responsibility';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-sm';
    removeBtn.innerHTML = '<i class="fa fa-times"></i>';
    removeBtn.style.marginLeft = '10px';

    removeBtn.addEventListener('click', () => {
        wrapper.remove();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
});

// Toggle Preview Panel
document.addEventListener("DOMContentLoaded", function () {
    const togglePreviewButton = document.getElementById("togglePreview");
    const livePreview = document.getElementById("livePreview");

    togglePreviewButton.addEventListener("click", function () {
        if (livePreview.style.display === "none" || livePreview.style.display === "") {
            livePreview.style.display = "block";
            togglePreviewButton.innerHTML = '<i class="fa fa-eye-slash"></i>';
        } else {
            livePreview.style.display = "none";
            togglePreviewButton.innerHTML = '<i class="fa fa-eye"></i>';
        }
    });
});

// JSON download function
function downloadJSON(data, filename) {
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}

// Function to update preview with structured JSON
function updatePreview() {
    const responsibilities = Array.from(document.querySelectorAll('#responsibilitiesContainer input'))
        .map(input => input.value.trim())
        .filter(v => v);

    const selectedStages = $('#stages').val() || [];
    const selectedSubstages = $('#subStages').val() || [];

    // Create structured stage JSON
    const stageData = selectedStages.map(stage => ({
        type: stage + "_stage",
        level: selectedSubstages.filter(sub => stagesToSubstages[stage]?.includes(sub))
    }));

    const data = {
        driveName: document.getElementById('driveName').value,
        lead_characteristics: {
            industry: $('#industry').val(),
            department: $('#department').val(),
            headCount: $('#headCount').val(),
            revenue: $('#revenue').val(),
            location: $('#location').val(),
            locationreason: document.getElementById('locationreason').value
        },
        key_decision_makers: {
            titles: $('#titles').val(),
            responsibilities: responsibilities
        },
        stage: stageData
    };

    previewContent.textContent = JSON.stringify(data, null, 2);
    return data;
}

// Save form button event
document.getElementById('saveForm').addEventListener('click', () => {
    const formData = updatePreview();
    downloadJSON(formData, 'icp_form_data.json');
    alert('Form data saved and downloaded as JSON!');
});

// Update preview when inputs change
$('#industry, #department, #headCount, #titles, #revenue, #location, #stages, #subStages, #driveName, #locationreason').on('change keyup', updatePreview);

// Initial preview update
updatePreview();
