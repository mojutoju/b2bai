document.getElementById('sendButton').addEventListener('click', () => {
    const chatInput = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');

    if (chatInput.value.trim() !== '') {
        const newMessage = document.createElement('div');
        newMessage.className = 'text-start bg-white p-2 rounded mb-2';
        newMessage.textContent = chatInput.value.trim();
        chatBox.appendChild(newMessage);

        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    }
});
