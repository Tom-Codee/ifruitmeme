document.addEventListener('DOMContentLoaded', () => {
    let isViewingChat = false;
    let currentChatPerson = '';
    let userId = Date.now().toString();

    const conversationsList = document.getElementById('conversations-list');
    const chatContainer = document.getElementById('chat-container');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatName = document.getElementById('chat-name');
    const chatImg = document.getElementById('chat-img');

    const API_URL = 'https://chat-server-vdot.onrender.com/chat';

    // Función para guardar el chat actual
    function saveChat() {
        sessionStorage.setItem(`chat-${currentChatPerson}`, chatBox.innerHTML);
    }

    // Entrar a una conversación
    document.querySelectorAll('.conversation').forEach(conversation => {
        conversation.addEventListener('click', () => {
            currentChatPerson = conversation.dataset.name;
            chatName.textContent = currentChatPerson;
            chatImg.src = conversation.dataset.img;

            // Cargar historial guardado si existe
            const saved = sessionStorage.getItem(`chat-${currentChatPerson}`);
            chatBox.innerHTML = saved || '';
            if (!saved) {
                addMessage(currentChatPerson, `Hi! I'm ${currentChatPerson}. What would you like to talk about?`, 'bot');
            }

            conversationsList.style.display = 'none';
            chatContainer.style.display = 'flex';
            isViewingChat = true;
        });
    });

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function addMessage(sender, text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<strong>${type === 'bot' ? sender : 'You'}:</strong> ${text}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveChat(); // Guardar cada mensaje
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message || !currentChatPerson) return;

        addMessage('You', message, 'user');
        userInput.value = '';

        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing';
        typingIndicator.textContent = `${currentChatPerson} is typing...`;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    character: currentChatPerson,
                    message: message,
                    userId: userId
                })
            });

            const data = await response.json();
            chatBox.removeChild(typingIndicator);

            if (data.response) {
                addMessage(currentChatPerson, data.response, 'bot');
            } else {
                addMessage(currentChatPerson, "Hmm, I'm not sure what to say...", 'bot');
            }

        } catch (error) {
            console.error('Error:', error);
            chatBox.removeChild(typingIndicator);
            addMessage(currentChatPerson, "Oops! I'm having connection issues. Try again.", 'bot');
        }
    }

    window.goBack = function () {
        if (isViewingChat) {
            conversationsList.style.display = 'block';
            chatContainer.style.display = 'none';
            isViewingChat = false;
        }
    };
});
