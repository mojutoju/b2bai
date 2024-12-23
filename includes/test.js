 // Function to toggle accordion content
 function toggleAccordionContent(button) {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains("open");

    // Close all open accordions and reset arrow icons
    document.querySelectorAll(".custom-accordion-content").forEach((item) => {
      item.style.maxHeight = null;
      item.classList.remove("open");
    });
    document.querySelectorAll(".arrow-icon").forEach((icon) => {
      icon.classList.remove("fa-arrow-down");
      icon.classList.add("fa-arrow-right");
      icon.classList.remove("down");
    });

    // Open the clicked accordion and update arrow icon
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
      const arrow = button.querySelector(".arrow-icon");
      arrow.classList.remove("fa-arrow-right");
      arrow.classList.add("fa-arrow-down");
      arrow.classList.add("down");
    }
  }



  const Accordion = {
    toggle(button, section) {
      const content = document.querySelector(`.custom-accordion-content[data-accordion="${section}"]`);
      const allContents = document.querySelectorAll(".custom-accordion-content");

      allContents.forEach(item => {
        if (item !== content) {
          item.style.maxHeight = null;
          item.classList.remove("open");
        }
      });

      button.classList.toggle("active");
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("open");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
      }
    }
  };

  const Tabs = {
    switch(tabButton, section, targetId) {
      const tabContainer = document.querySelector(`.custom-accordion-content[data-accordion="${section}"]`);
      const tabButtons = tabContainer.querySelectorAll(".tab-button");
      const tabContents = tabContainer.querySelectorAll(`.tab-content[data-parent="${section}"]`);

      tabButtons.forEach(button => button.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      tabButton.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    }
  };


// Get necessary DOM elements
const fileInput = document.getElementById('file-upload');
const filePreview = document.getElementById('file-preview');
const fileNameSpan = document.getElementById('file-name');
const cancelFileButton = document.getElementById('cancel-file');
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const chatContent = document.getElementById('chat-content');

// Handle file selection
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        // Display file name and cancel button
        fileNameSpan.textContent = fileInput.files[0].name;
        filePreview.style.display = 'flex'; // Show the preview container
        cancelFileButton.style.display = 'inline-block'; // Show the cancel button
    } else {
        // Hide preview and cancel button if no file is selected
        filePreview.style.display = 'none';
        cancelFileButton.style.display = 'none';
    }
});

// Handle cancel file button
cancelFileButton.addEventListener('click', () => {
    fileInput.value = ''; // Clear the file input value
    filePreview.style.display = 'none'; // Hide the file preview container
    cancelFileButton.style.display = 'none'; // Hide the cancel button
    fileNameSpan.textContent = ''; // Clear the file name preview
});

// Handle send message button
sendButton.addEventListener('click', () => {
    const userMessage = messageInput.value.trim();

    if (userMessage || fileInput.files.length > 0) {
        // Add user message to chat
        if (userMessage) {
            const userBubble = document.createElement('div');
            userBubble.className = 'message align-self-end p-3 bg-primary text-white rounded';
            userBubble.innerHTML = `<i class='fa fa-user-circle'></i> ${userMessage}`;
            chatContent.appendChild(userBubble);
        }

        // Add file to chat if selected
        if (fileInput.files.length > 0) {
            const fileBubble = document.createElement('div');
            fileBubble.className = 'message align-self-end p-3 bg-primary text-white rounded';
            fileBubble.innerHTML = `<i class='fa fa-file'></i> File: ${fileInput.files[0].name}`;
            chatContent.appendChild(fileBubble);

            // Clear file input and hide preview
            fileInput.value = '';
            filePreview.style.display = 'none';
            cancelFileButton.style.display = 'none';
            fileNameSpan.textContent = ''; // Clear file preview content
        }

        // Simulated bot response
        const botBubble = document.createElement('div');
        botBubble.className = 'message p-3 bg-light rounded';
        botBubble.innerHTML = `<i class='fa fa-user-circle'></i> Thank you! We'll review your message.`;
        chatContent.appendChild(botBubble);

        // Clear input field
        messageInput.value = '';
    }
});

const toggleSwitch = document.getElementById('toggle-switch');
  const overlay = document.getElementById('overlay');
  const body = document.body;

  toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
      // Active state, hide the overlay
      overlay.classList.remove('active');
      body.classList.remove('grayed-out');
    } else {
      // Inactive state, show the overlay
      overlay.classList.add('active');
      body.classList.add('grayed-out');
    }
  });


