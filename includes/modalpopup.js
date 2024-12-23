const steps = [
    {
        label: "Confirm ",
        content: `Do you want to start using SDR Agent? <br>
                  This will automatically set the agent to active. You can quit anytime by setting it to inactive.<br>`
    },
    {
        label: "Step 2",
        content: `Before proceeding, fill in a few details. This allows your SDR Agent to work autonomously. <br>`
    },
    {
        label: "Step 3",
        content: `<img src='../img/zapier.png' alt='Zapier' width='50px'> <br>
                  Do you have a Zapier Account? <br>
                  Your Zapier business account will be used to authenticate the services. <br>
                  <a href='https://zapier.com/docs' target='_blank'>Read how Zapier uses their NLA tools for AI Actions here</a><br>
                  <button class='btn btn-success btn-sm' onclick='handleStep(true)'>Yes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>No</button>`
    },
    {
        label: "Step 4",
        content: `Integrate your ZAPIER Account. <br>
                  <a href='https://zapier.com/docs' target='_blank'>Read how you can collect your Zapier NLA API Key here</a><br>
                  Your API Key is given in the Development Resources on the left sidebar.<br>
                  <input type='text' id='zapierApiKey' required placeholder='Enter your Zapier NLA API Key' class='form-control'><br>
                  <button class='btn btn-success btn-sm' onclick='saveApiKey()'>Save API Key</button>`
    },
    {
        label: "Step 5",
        content: `Email Service <br>
                  Would you like the SDR Agent to use Email Service? <br>
                  <button class='btn btn-success btn-sm' onclick='handleStep(true)'>Yes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>No</button>`
    },
    {
        label: "Step 6",
        content: `Select your email service <br>
                  <input type='checkbox' id='emailGmail'> Gmail<br>
                  <input type='checkbox' id='emailOutlook'> Outlook<br>
                  <button class='btn btn-primary btn-sm' onclick='handleStep(true)'>Proceed</button>
                  <button class='btn btn-secondary btn-sm' onclick='handleStep(false)'>Go Back</button>`
    },
    {
        label: "Step 7",
        content: `You have selected Gmail as your email service. Would you like to proceed? <br>
                  Allowing Gmail as your email service will let your SDR Agent send and receive mails and schedule events. <br>
                  <button class='btn btn-success btn-sm' onclick='handleStep(true)'>Yes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>No</button>`
    },
    {
        label: "Step 8",
        content: `Email Credentials <br>
                  Please provide your email credentials. <br>
                  <input type='email' id='emailField' required placeholder='Enter your email' class='form-control'><br>
                  <button class='btn btn-primary btn-sm' onclick='saveEmailCredentials()'>Proceed</button>
                  <button class='btn btn-secondary btn-sm' onclick='handleStep(false)'>Go Back</button>`
    },
    {
        label: "Step 9",
        content: `Voice Over Assistance <br>
                  Would you like to activate Voice Over Assistance in your SDR Agent? <br>
                  <button class='btn btn-success btn-sm' onclick='handleStep(true)'>Yes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>No</button>`
    },
    {
        label: "Step 10",
        content: `Call Service <br>
                  Select your Voice Over Assistance service <br>
                  <input type='checkbox' id='voiceTwilio'> Twilio<br>
                  <input type='checkbox' id='voiceTeams'> Teams<br>
                  <button class='btn btn-primary btn-sm' onclick='handleStep(true)'>Proceed</button>
                  <button class='btn btn-secondary btn-sm' onclick='handleStep(false)'>Go Back</button>`
    },
    {
        label: "Step 11",
        content: `You have selected Twilio as your call service. Would you like to proceed? <br>
                  <button class='btn btn-success btn-sm' onclick='handleStep(true)'>Yes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>No</button>`
    },
    {
        label: "Step 12",
        content: `Call Service Numbers <br>
                  Please provide your call service phone numbers. <br>
                  <input type='text' id='callServiceNumber' placeholder='Enter your Twilio phone number' class='form-control'><br>
                  <button class='btn btn-primary btn-sm' onclick='saveCallServiceNumber()'>Proceed</button>
                  <button class='btn btn-secondary btn-sm' onclick='handleStep(false)'>Go Back</button>`
    },
    {
        label: "Step 13",
        content: `Schedule Agent Services <br>
                  Schedule your agent's email and call service. Your agent will work according to this schedule. <br>
                  <select id='timeZone' class='form-select'>
                      <option value=''>Select Timezone</option>
                      <option value='EST'>EST</option>
                      <option value='PST'>PST</option>
                  </select><br>
                  <input type='time' id='startTime' class='form-control'><br>
                  <input type='time' id='endTime' class='form-control'><br>
                  <div>
                      <input type='checkbox' id='dayMonday'> Monday<br>
                      <input type='checkbox' id='dayTuesday'> Tuesday<br>
                      <!-- Add other days similarly -->
                  </div>
                  <button class='btn btn-primary btn-sm' onclick='saveSchedule()'>Proceed</button>
                  <button class='btn btn-secondary btn-sm' onclick='handleStep(false)'>Go Back</button>`
    },
    {
        label: "Step 14",
        content: `Confirm Schedule <br>
                  You have scheduled a workflow for your agent. Would you like to proceed? <br>
                  <button class='btn btn-success btn-sm' onclick='handleStep(true)'>Yes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>No</button>`
    },
    {
        label: "Step 15",
        content: `Save Changes <br>
                  Would you like to save these changes? You can change these options later. <br>
                  <button class='btn btn-success btn-sm' onclick='saveDataToFile()'>Save Changes</button>
                  <button class='btn btn-danger btn-sm' onclick='handleStep(false)'>Cancel</button>`
    }
];

let currentStep = 0;
let userData = {};

function renderStep() {
    const step = steps[currentStep];
    document.getElementById('multiStepModalLabel').innerText = step.label;
    document.getElementById('stepContent').innerHTML = step.content;

    // Toggle back button visibility
    document.getElementById('goBackButton').style.display = currentStep > 0 ? 'block' : 'none';
}

function handleStep(next) {
    if (next) {
        currentStep++;
    } else {
        currentStep--;
    }
    if (currentStep < steps.length) {
        renderStep();
    } else {
        closeModal();
    }
}

function saveApiKey() {
    const apiKey = document.getElementById('zapierApiKey').value;
    if (apiKey) {
        userData.zapierApiKey = apiKey;
    }
    handleStep(true);
}

function saveEmailCredentials() {
    const email = document.getElementById('emailField').value;
    if (email) {
        userData.email = email;
    }
    handleStep(true);
}

function saveCallServiceNumber() {
    const callServiceNumber = document.getElementById('callServiceNumber').value;
    if (callServiceNumber) {
        userData.callServiceNumber = callServiceNumber;
    }
    handleStep(true);
}

function saveSchedule() {
    const timeZone = document.getElementById('timeZone').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const days = [];
    if (document.getElementById('dayMonday').checked) days.push('Monday');
    if (document.getElementById('dayTuesday').checked) days.push('Tuesday');
    // Add other days similarly

    if (timeZone && startTime && endTime) {
        userData.schedule = { timeZone, startTime, endTime, days };
    }
    handleStep(true);
}

function saveDataToFile() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "user_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function closeModal() {
    const modalInstance = mdb.Modal.getInstance(document.getElementById('multiStepModal'));
    modalInstance.hide();
}

// Initialize the modal and first step
document.addEventListener('DOMContentLoaded', () => {
    renderStep();
    const modalInstance = new mdb.Modal(document.getElementById('multiStepModal'));
    modalInstance.show();

    // Event listeners for modal navigation
    document.getElementById('nextButton').addEventListener('click', () => handleStep(true));
    document.getElementById('goBackButton').addEventListener('click', () => handleStep(false));
});
