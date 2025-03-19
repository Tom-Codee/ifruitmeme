// js/messages.js

document.addEventListener('DOMContentLoaded', () => {
    // Estado para rastrear si estamos en el chat
    let isViewingChat = false;
    let currentChatPerson = '';
    let conversationHistory = [];

    // Referencias a los elementos
    const screen = document.querySelector('.screen');
    const conversationsList = document.getElementById('conversations-list');
    const chatContainer = document.getElementById('chat-container');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatName = document.getElementById('chat-name');
    const chatImg = document.getElementById('chat-img');

    // Manejar clics en las conversaciones
    const conversations = document.querySelectorAll('.conversation');
    conversations.forEach(conversation => {
        conversation.addEventListener('click', () => {
            currentChatPerson = conversation.dataset.name;
            chatName.textContent = currentChatPerson;
            chatImg.src = conversation.dataset.img;
            chatBox.innerHTML = `<div class="message bot">Hello, I'm ${currentChatPerson}. How can I help you?</div>`;
            conversationsList.style.display = 'none';
            chatContainer.style.display = 'flex';
            isViewingChat = true;
            screen.classList.add('chat-active');
            chatBox.scrollTop = chatBox.scrollHeight;

            // Reiniciar historial al iniciar un nuevo chat
            conversationHistory = [
                { role: "bot", content: `Hello, I'm ${currentChatPerson}. How can I help you?` }
            ];
        });
    });

    // Enviar mensaje
    sendBtn.addEventListener('click', async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // Mostrar mensaje del usuario
        chatBox.innerHTML += `<div class="message user">${message}</div>`;
        userInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Agregar mensaje del usuario al historial
        conversationHistory.push({ role: "user", content: message });

        // Simular "escribiendo..."
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing');
        typingIndicator.textContent = `${currentChatPerson} is typing...`;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Obtener respuesta de la IA
        const response = await getAIResponse(currentChatPerson, conversationHistory);
        chatBox.removeChild(typingIndicator);
        chatBox.innerHTML += `<div class="message bot">${response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        // Agregar respuesta de la IA al historial
        conversationHistory.push({ role: "bot", content: response });

        // Limitar historial para no sobrecargar (últimos 10 mensajes)
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
    });

    // Manejar el botón de navegación
    window.goBack = function() {
        if (isViewingChat) {
            conversationsList.style.display = 'block';
            chatContainer.style.display = 'none';
            isViewingChat = false;
            screen.classList.remove('chat-active');
            conversationHistory = [];
        } else {
            console.log("Open recent apps");
        }
    };

    // Integración con Replicate API
    async function getAIResponse(person, history) {
        const apiToken = "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"; // Reemplaza con tu API Key de Replicate
        const url = "https://api.replicate.com/v1/predictions";
        
        try {
            // Crear un prompt con el contexto del personaje y el historial
            let prompt = `You are ${person}. Respond in English in a conversational style. `;
            
            // Añadir instrucciones específicas según el personaje
            if (person === 'Elon Musk') {
                prompt += `You are a visionary entrepreneur focused on technology, space exploration, and innovation. You often talk about Tesla, SpaceX, and ambitious ideas like colonizing Mars. Respond in a curious, forward-thinking, and slightly witty tone. `;
            } else if (person === 'Donald Trump') {
                prompt += `You are a confident and bold personality, known for using phrases like "tremendous," "fantastic," and "the best." You often speak in a direct, assertive tone and focus on winning and success. Respond in a brash, self-assured manner. `;
            } else if (person === 'Mr. Beast') {
                prompt += `You are an energetic and enthusiastic YouTuber known for big challenges, giveaways, and stunts. You often talk about helping people, creating viral content, and offering rewards. Respond in an excited, friendly, and over-the-top tone. `;
            }
            
            // Añadir el historial de la conversación al prompt
            prompt += `Here is the conversation so far:\n`;
            history.forEach(msg => {
                prompt += `${msg.role === 'user' ? 'User' : person}: ${msg.content}\n`;
            });
            prompt += `${person}: `;

            // Crear una predicción en Replicate
            const predictionResponse = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${apiToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    version: "mistralai/mixtral-8x7b-instruct-v0.1", // Modelo conversacional
                    input: {
                        prompt: prompt,
                        max_tokens: 100,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                })
            });

            const predictionData = await predictionResponse.json();
            if (!predictionData.id) {
                return "Sorry, I couldn't respond right now.";
            }

            // Esperar a que la predicción se complete
            let result;
            while (true) {
                const statusResponse = await fetch(`${url}/${predictionData.id}`, {
                    headers: {
                        "Authorization": `Token ${apiToken}`
                    }
                });
                const statusData = await statusResponse.json();
                if (statusData.status === "succeeded") {
                    result = statusData.output;
                    break;
                } else if (statusData.status === "failed") {
                    return "Sorry, I couldn't respond right now.";
                }
                await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de volver a verificar
            }

            return result || "Sorry, I couldn't respond right now.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Oops, something went wrong!";
        }
    }
});