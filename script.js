
    function updateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString(); // Obtiene la hora local en formato HH:MM:SS
        document.getElementById("current-time").textContent = time; // Actualiza el texto
    }

    // Actualiza la hora al cargar la página
    updateTime();
    // Actualiza la hora cada segundo
    setInterval(updateTime, 1000);