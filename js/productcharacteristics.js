$(document).ready(function() {
    // Define dropdown options
    const options = {
        painPoints: [
            "Regulatory Compliance", "Scalability", "Security", "Data Management",
            "Efficiency", "Integration", "Cost Management", "Innovation"
        ],
        goals: [
            "Regulatory Compliance", "Scalability", "Security", "Data Management",
            "Efficiency", "Integration", "Cost Management", "Innovation",
            "Cost Reduction", "Market Expansion", "Talent Acquisition and Retention", "Sustainability"
        ],
        valuePropositions: [
            "Convenience", "Productivity", "Experience", "Identity", "Profitability",
            "Innovation", "Quality", "Customization", "Reliability", "Sustainability"
        ]
    };

    // Populate dropdowns with Select2
    function populateSelect2(selector, options) {
        options.forEach(option => $(selector).append(new Option(option, option)));
        $(selector).select2({ placeholder: 'Search & Select', allowClear: true });
    }

    populateSelect2('#painPoints', options.painPoints);
    populateSelect2('#goals', options.goals);
    populateSelect2('#valuePropositions', options.valuePropositions);

    const icpData = JSON.parse(localStorage.getItem('icpData')) || {};

    function updatePreview() {
        const enteredPainPoints = $('#painPointsContainer .field-wrapper input').map((_, el) => el.value.trim()).get().filter(v => v);
        const enteredGoals = $('#goalsContainer .field-wrapper input').map((_, el) => el.value.trim()).get().filter(v => v);
        const enteredValueProps = $('#valuePropositionsContainer .field-wrapper input').map((_, el) => el.value.trim()).get().filter(v => v);
        const enteredProofPoints = $('#proofPointsContainer .field-wrapper input').map((_, el) => el.value.trim()).get().filter(v => v);

        const data = {
            ...icpData,
            product_characteristics: {
                productName: $('#productName').val(),
                organizationName: $('#organizationName').val(),
                websiteUrl: $('#websiteUrl').val(),
                overview: $('#overview').val(),
                pain_points: [...$('#painPoints').val(), ...enteredPainPoints],
                goals: [...$('#goals').val(), ...enteredGoals],
                value_proposition: [...$('#valuePropositions').val(), ...enteredValueProps],
                proof_points: enteredProofPoints
            }
        };

        previewContent.textContent = JSON.stringify(data, null, 2);
        return data;
    }

    // Add manual fields with remove button
    function addField(container) {
        const field = $(`
            <div class="field-wrapper d-flex align-items-center mb-2">
                <input type="text" class="form-control" placeholder="Enter text">
                <button type="button" class="remove-field btn btn-sm btn-danger"><i class="fa fa-times"></i></button>
            </div>
        `);

        field.find('.remove-field').click(() => field.remove());
        $(container).append(field);
    }

    $('#addPainPoint').click(() => addField('#painPointsContainer'));
    $('#addGoal').click(() => addField('#goalsContainer'));
    $('#addValueProposition').click(() => addField('#valuePropositionsContainer'));
    $('#addProofPoint').click(() => addField('#proofPointsContainer'));

    document.getElementById('saveProductForm').addEventListener('click', () => {
        const formData = updatePreview();
        localStorage.setItem('finalProductData', JSON.stringify(formData));
        alert('Product characteristics saved!');
    
        // Convert JSON data to a string and create a Blob
        const jsonData = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
    
        // Create a temporary download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "product_characteristics.json";
    
        // Append to body, trigger download, and remove the element
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    // Live Preview Toggle
    const togglePreviewButton = document.getElementById('togglePreview');
    const livePreview = document.getElementById('livePreview');

    togglePreviewButton.addEventListener('click', () => {
        livePreview.classList.toggle('hidden');
        togglePreviewButton.innerHTML = livePreview.classList.contains('hidden') ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
    });

    $('#productName, #organizationName, #websiteUrl, #overview, #painPoints, #goals, #valuePropositions').on('change keyup', updatePreview);
    updatePreview();
});
