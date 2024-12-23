


// Step Data
const steps = [
    { label: "<h1 class='largetexter'>Confirm</h1>", content: "Welcome to the SDR Agent Setup Wizard! <br>This setup will guide you through configuring your agent for optimal performance. <br> <br>  <button class='btn btn-primary btn-sm' onclick='handleStep(1, true)'>NEXT</button>" },
    { label: "Details", content: "Please provide your details for the setup.<br>This will ensure your agent is configured correctly. <br>  <button class='btn btn-primary btn-sm' onclick='handleStep(2, true)'>NEXT</button> <button class='btn btn-secondary btn-sm' onclick='handleStep(0)'>Go Back</button> "  },
    { label: "Zapier Account", content: "Do you have a Zapier account?<br>Your Zapier account helps automate tasks for seamless integration. <br>  <button class='btn btn-primary btn-sm' onclick='handleStep(3, true)'>YES</button> <button class='btn btn-danger btn-sm' onclick='handleStep(1)'>No</button> " },
    { 
        label: "Zapier API Key", 
        content: `Provide your Zapier API key to link your account.<br>Your API Key can be found in your Zapier settings.<br>
            <input type='text' id='zapierApiKey' required='' placeholder='Enter API Key' class='form-control'>
            <div id='zapierApiKeyError' class='text-danger'></div> <br>  
            <button class='btn btn-success btn-sm' onclick='if (validateZapierApiKey()) handleStep(4, true)'>NEXT</button> 
            <button class='btn btn-secondary btn-sm' onclick='handleStep(1)'>Go Back</button>` 
    },
    { label: "Email Service", content: "Would you like the SDR Agent to use Email Service?<br><button class='btn btn-success btn-sm' onclick='handleStep(5, true)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(0, false)'>No</button>" },
    { label: "Confirm Email Service", content: "<input type='radio' name='emailService' id='emailGmail' required> Gmail<br><input type='radio' name='emailService' id='emailOutlook' required> Outlook<br><button class='btn btn-primary btn-sm' onclick='proceedWithEmailService()'>Proceed</button><button class='btn btn-secondary btn-sm' onclick='handleStep(4)'>Go Back</button>" },
    { label: "Confirm Gmail", content: "You have selected Gmail as your email service. Would you like to proceed? <br><button class='btn btn-success btn-sm' onclick='handleStep(8)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(5)'>No</button>" },
    { label: "Confirm Outlook", content: "You have selected Outlook as your email service. Would you like to proceed? <br><button class='btn btn-success btn-sm' onclick='handleStep(8)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(5)'>No</button>" },
    { label: "Email Credentials", content: "Please provide your email credentials.<br><br><input type='email' id='emailField' required placeholder='Enter your email' class='form-control '><br><button class='btn btn-primary btn-sm' onclick='saveEmailCredentials()'>Proceed</button><button class='btn btn-secondary btn-sm' onclick='handleStep(6)'>Go Back</button>" },
    { label: "Voice Over Assistance", content: "Would you like to activate Voice Over Assistance in your SDR Agent? <br><button class='btn btn-success btn-sm' onclick='handleStep(10, true)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(0, false)'>No</button>" },
    { label: "Call Service", content: "Select your Voice Over Assistance service<br><input type='radio' name='callService' id='voiceTwilio' required> Twilio<br><input type='radio' name='callService' id='voiceTeams' required> Teams<br><button class='btn btn-primary btn-sm' onclick='proceedWithCallService()'>Proceed</button><button class='btn btn-secondary btn-sm' onclick='handleStep(6)'>Go Back</button>" },
    { label: "Confirm Twilio", content: "You have selected Twilio as your call service. Would you like to proceed? <br><button class='btn btn-success btn-sm' onclick='handleStep(13)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(10)'>No</button>" },
    { label: "Confirm Teams", content: "You have selected Teams as your call service. Would you like to proceed? <br><button class='btn btn-success btn-sm' onclick='handleStep(14)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(10)'>No</button>" },
    { 
        label: "  Call Service Numbers", 
        content: `
          
            Please provide your call service phone numbers. <br>
            <input type='text' id='callServiceNumber' required placeholder='Enter your service phone number' class='form-control'>
            <br>
            <button class='btn btn-primary btn-sm' onclick='saveCallServiceNumber()'>Proceed</button>
            <button class='btn btn-secondary btn-sm' onclick='handleStep(11)'>Go Back</button>
        `
    },
    { label: "Schedule Agent Services ", content: "Schedule your agent's email and call service. Your agent will work according to this schedule.<br><select id='timeZone' class='form-select'><option value=''>Select Timezone</option><option value='EST'>EST</option><option value='PST'>PST</option></select><br><input type='time' id='startTime' required class='form-control'><br><input type='time' id='endTime' required class='form-control'><br><div><input type='checkbox' id='dayMonday'> Monday <input type='checkbox' id='dayTuesday'> Tuesday <input type='checkbox' id='dayWednesday'> Wednesday <input type='checkbox' id='dayThursday'> Thursday <input type='checkbox' id='dayFriday'> Friday</div> <button class='btn btn-primary btn-sm' onclick='saveSchedule()'>Proceed</button><button class='btn btn-secondary btn-sm' onclick='handleStep(13)'>Go Back</button>" },
    { label: "Confirm Schedule ", content: "You have scheduled a workflow for your agent. Would you like to proceed? <br><button class='btn btn-success btn-sm' onclick='handleStep(16)'>Yes</button><button class='btn btn-danger btn-sm' onclick='handleStep(0)'>No</button>" },
    { label: "Save Changes", content: "Would you like to save these changes? You can change these options later. <br><button class='btn btn-success btn-sm' onclick='saveDataToFile()'>Save Changes</button><button class='btn btn-danger btn-sm' onclick='handleStep(14)'>Cancel</button>" }
];

let currentStep = 0;
let formData = {};

function handleStep(stepNum) {
    if (stepNum >= 0 && stepNum < steps.length) {
        currentStep = stepNum;
    }
    displayStep(currentStep);
}


function validateEmailField() {
    const emailInput = document.getElementById('emailField');
    const errorDiv = document.createElement('div');
    errorDiv.id = 'emailFieldError';
    errorDiv.className = 'text-danger';
    
    // Ensure the error message container is present
    if (!emailInput.nextElementSibling || emailInput.nextElementSibling.id !== 'emailFieldError') {
        emailInput.insertAdjacentElement('afterend', errorDiv);
    }

    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

    if (!emailValue) {
        errorDiv.textContent = 'Email address is required.';
        return false;
    }

    if (!emailRegex.test(emailValue)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return false;
    }

    errorDiv.textContent = ''; // Clear any previous error message
    return true;
}


function validateZapierApiKey() {
    const apiKeyInput = document.getElementById('zapierApiKey');
    const errorDiv = document.getElementById('zapierApiKeyError');
    if (!apiKeyInput.value.trim()) {
        errorDiv.textContent = 'Please enter your Zapier API key.';
        return false;
    }
    errorDiv.textContent = ''; // Clear any previous error message
    return true;
}


        function proceed() {
            switch (currentStep) {
                case 5:  // Step 5: Proceed with email service choice
                    proceedWithEmailService();
                    break;
                case 9:  // Step 9: Proceed with call service choice
                    proceedWithCallService();
                    break;
                default:
                    currentStep++;
                    displayStep(currentStep);
                    break;
            }
        }
        function proceedWithEmailService() {
    const gmailChecked = document.getElementById('emailGmail').checked;
    const outlookChecked = document.getElementById('emailOutlook').checked;

    if (!gmailChecked && !outlookChecked) {
        alert('Please select an email service to proceed.');
        return; // Stop if no option is selected
    }

    formData.emailService = gmailChecked ? 'Gmail' : 'Outlook';
    currentStep = gmailChecked ? 6 : 7;
    displayStep(currentStep);
}
function proceedWithCallService() {
    if (document.getElementById('voiceTwilio').checked) {
        formData.callService = 'Twilio';
        currentStep = 11;  // If Twilio is selected, go to Step 11 for Twilio
    } else if (document.getElementById('voiceTeams').checked) {
        formData.callService = 'Teams';
        currentStep = 12;  // If Teams is selected, go to Step 11 for Teams
    }
    displayStep(currentStep);
}

      
function saveEmailCredentials() {
    if (!validateEmailField()) {
        return; // Stop if email validation fails
    }
    const emailInput = document.getElementById('emailField');
    formData.email = emailInput.value.trim();
    handleStep(9); // Proceed to the next step
}

function saveCallServiceNumber() {
    const callServiceNumberInput = document.getElementById('callServiceNumber');
    const callServiceNumber = callServiceNumberInput.value.trim();
    const errorDivId = 'callServiceNumberError';

    // Ensure error message container exists
    let errorDiv = document.getElementById(errorDivId);
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = errorDivId;
        errorDiv.className = 'text-danger';
        callServiceNumberInput.insertAdjacentElement('afterend', errorDiv);
    }

    // Validate the input
    if (!callServiceNumber) {
        errorDiv.textContent = 'Service number is required.';
        return; // Stop if validation fails
    }

    if (!/^\+?[0-9\s\-]+$/.test(callServiceNumber)) { // Basic phone number validation
        errorDiv.textContent = 'Please enter a valid phone number (digits, spaces, dashes, or a leading "+").';
        return; // Stop if validation fails
    }

    // Clear error and proceed
    errorDiv.textContent = '';
    formData.callServiceNumber = callServiceNumber; // Save the valid phone number
    handleStep(14); // Move to Step 14
}

function saveSchedule() {
    const timeZone = document.getElementById('timeZone').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Collect the names of the days that are checked
    const daysChecked = [];
    if (document.getElementById('dayMonday').checked) daysChecked.push('Monday');
    if (document.getElementById('dayTuesday').checked) daysChecked.push('Tuesday');
    if (document.getElementById('dayWednesday').checked) daysChecked.push('Wednesday');
    if (document.getElementById('dayThursday').checked) daysChecked.push('Thursday');
    if (document.getElementById('dayFriday').checked) daysChecked.push('Friday');

    // Validate the inputs
    if (!timeZone) {
        alert('Please select a timezone.');
        return; // Stop if no timezone is selected
    }
    if (!startTime || !endTime) {
        alert('Please specify start and end times.');
        return; // Stop if time is not specified
    }
    if (daysChecked.length === 0) {
        alert('Please select at least one day.');
        return; // Stop if no day is selected
    }

    // Save the schedule with the selected days
    formData.schedule = { timeZone, startTime, endTime, daysChecked };
    handleStep(15); // Move to Step 15
}

function saveDataToFile() {
    const blob = new Blob([JSON.stringify(formData, null, 4)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'agent-config.json';
    link.click();
}

function displayStep(stepNum) {
    document.getElementById('stepContent').innerHTML = `
        <h2>${steps[stepNum].label}</h2>
        <p>${steps[stepNum].content}</p>
    `;

    document.getElementById('previousBtn').style.display = stepNum > 0 ? 'inline-block' : 'none';
    document.getElementById('nextBtn').style.display = stepNum < steps.length - 1 ? 'inline-block' : 'none';
    document.getElementById('proceedBtn').style.display = stepNum === 5 || stepNum === 9 ? 'inline-block' : 'none'; // Show Proceed on specific steps
}

// Initialize display on the first step
displayStep(currentStep);


function displayStep(stepNum) {
document.getElementById('stepContent').innerHTML = `
<h2>${steps[stepNum].label}</h2>
<p>${steps[stepNum].content}</p>
`;

// Determine whether to show or hide buttons
const isYesNoStep = steps[stepNum].content.includes("Would you like to proceed?");
const isConfirmationStep = steps[stepNum].label.includes("Step 7") || steps[stepNum].label.includes("Step 11");

document.getElementById('previousBtn').style.display = (stepNum > 0 && !isYesNoStep) ? 'inline-block' : 'none';
document.getElementById('nextBtn').style.display = (stepNum < steps.length - 1 && !isYesNoStep && !isConfirmationStep) ? 'inline-block' : 'none';
document.getElementById('proceedBtn').style.display = (isYesNoStep || isConfirmationStep) ? 'none' : 'inline-block';  // Show 'Proceed' in regular form steps

// Hide proceed button on yes/no decision steps, and hide previous/next where applicable
if (isYesNoStep || isConfirmationStep) {
document.getElementById('previousBtn').style.display = 'none';
document.getElementById('nextBtn').style.display = 'none';
}
}

