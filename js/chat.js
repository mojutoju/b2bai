const chatBody = document.getElementById('chatBody');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');
const attachButton = document.getElementById('attachButton');
const fileInput = document.getElementById('fileInput');
// Ensure chatBody remains scrollable and footer visibility stays intact
const updateScroll = () => {
chatBody.scrollTop = chatBody.scrollHeight; // Automatically scroll down
};

// Append user messages
const sendMessage = () => {
const message = messageInput.value.trim();
if (message === '') return;

const userMessage = document.createElement('div');
userMessage.classList.add('message', 'user');
userMessage.innerHTML = `<div class='message-bubble user'>${message}</div>`;

chatBody.appendChild(userMessage);
messageInput.value = '';
updateScroll();

// Simulate bot response
setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.innerHTML = `<div class='message-bubble bot'>Thanks for your message!</div>`;
    chatBody.appendChild(botMessage);
    updateScroll();
}, 1000);
};


window.addEventListener('resize', () => {
const viewportHeight = window.innerHeight;
document.querySelector('.chat-container').style.height = `${viewportHeight}px`;
});


sendMessageButton.addEventListener('click', () => {
sendMessage();
updateScroll();
});

messageInput.addEventListener('focus', () => {
updateScroll(); // Ensure footer remains visible
});

sendMessageButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Attach file handler
attachButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0]?.name || 'No file selected';
    const fileMessage = document.createElement('div');
    fileMessage.classList.add('message', 'user');
    fileMessage.innerHTML = `<div class='message-bubble user'>Attached: ${fileName}</div>`;
    chatBody.appendChild(fileMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
});




document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.display = "none"; // Hide the loader
    }, 1000); // Adds a slight delay to ensure visibility during the load
});
