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

    // 🔹 Guardar el chat en sessionStorage
    function saveChat() {
        if (currentChatPerson) {
            // Guarda el contenido del chat
            sessionStorage.setItem(`chat-${currentChatPerson}`, chatBox.innerHTML);
    
            // 🔹 Guardar último mensaje como texto plano
            const messages = chatBox.querySelectorAll('.message');
            if (messages.length > 0) {
                const last = messages[messages.length - 1];
                const textOnly = last.textContent || '';
                sessionStorage.setItem(`preview-${currentChatPerson}`, textOnly.slice(0, 50));
            }
        }
    }



    function updatePreview(text, isBot) {
        const conversations = document.querySelectorAll('.conversation');
        conversations.forEach(conv => {
            if (conv.dataset.name === currentChatPerson) {
                const preview = conv.querySelector('.conversation-preview');
                const who = isBot ? currentChatPerson : 'You';
                preview.textContent = `${who}: ${text.slice(0, 50)}${text.length > 50 ? '...' : ''}`;
            }
        });
    }

    
    // 🔹 Añadir mensaje al chat
    function addMessage(sender, text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<strong>${type === 'bot' ? sender : 'You'}:</strong> ${text}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveChat(); // guardar cada vez que se escribe


        
    // 🔹 Actualizar preview de la conversación
    if (type === 'user' || type === 'bot') {
        updatePreview(text, type === 'bot');
    }
    }

    // 🔹 Entrar a una conversación
    document.querySelectorAll('.conversation').forEach(conversation => {
        conversation.addEventListener('click', () => {
            currentChatPerson = conversation.dataset.name;
            chatName.textContent = currentChatPerson;
            chatImg.src = conversation.dataset.img;

            conversationsList.style.display = 'none';
            chatContainer.style.display = 'flex';
            isViewingChat = true;

            // Recuperar chat si existe
            const saved = sessionStorage.getItem(`chat-${currentChatPerson}`);
            chatBox.innerHTML = saved || '';

                        // 🔹 Mostrar también el preview si hay
            const previewText = sessionStorage.getItem(`preview-${currentChatPerson}`);
            if (previewText) {
                updatePreview(previewText, false); // false = lo presenta como si lo hubiera enviado "You"
            }
            

            if (!saved) {
                addMessage(currentChatPerson, `Hi! I'm ${currentChatPerson}. What would you like to talk about?`, 'bot');
            }
        });
    });

    // 🔹 Enviar mensaje
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

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

    // 🔹 Botón de volver
    window.goBack = function () {
        if (isViewingChat) {
            conversationsList.style.display = 'block';
            chatContainer.style.display = 'none';
            isViewingChat = false;
        }
    };

    
});
