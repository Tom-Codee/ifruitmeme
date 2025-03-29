// js/tasks.js

document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded "server-side" task completion states (developers edit this)
    const taskCompletionStates = {
        "🎯 Reach $10K Market Cap": true,
        "🚀 Reach $50K Market Cap": false,
        "💰 Reach $100K Market Cap": false,
        "🏆 Reach $1M Market Cap": false,
        "🔥 Gain 100 holders": false,
        "🌍 Get 100 X followers": true,
        "🌍 Get 500 X followers": false,
        "🌍 Get 1k X followers": false,
        "📢 Get 50 Telegram members": true,
        "📢 Get 100 Telegram members": false,
        "📢 Get 500 Telegram members": false,
        "❤️ Like & Retweet our pinned post on X": false,
        "🎮 Post a meme about GTA V & iFruit using #IsolFruit": false
    };

    // References to task elements
    const taskItems = document.querySelectorAll('.task-item');

    // Apply initial completion states and handle clicks
    taskItems.forEach(item => {
        const taskText = item.querySelector('.task-text').textContent.trim();
        const isCompleted = taskCompletionStates[taskText] || false;
        item.dataset.completed = isCompleted;

        // Apply completed class if true
        if (isCompleted) {
            item.classList.add('completed');
        }

        // Redirect on click instead of toggling
        item.addEventListener('click', () => {
            const url = item.dataset.url;
            if (url) {
                window.open(url, '_blank'); // Opens in a new tab
            }
        });
    });
});
