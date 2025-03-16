// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Función para actualizar la hora en la barra de estado
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('current-time').innerText = timeString;
    }

    // Actualiza la hora inmediatamente y luego cada segundo
    updateTime();
    setInterval(updateTime, 1000);

    // Añadir eventos de clic a todos los iconos para rotar el móvil
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación predeterminada del enlace
            const phone = document.querySelector('.phone');
            phone.classList.toggle('rotated'); // Alterna la clase rotated
            console.log("Icono clicado, alternando rotación"); // Mensaje de depuración
        });
    });

    // Funciones de los botones de navegación (placeholders)
    function goBack() {
        window.location.href = "../index.html"; // Redirige a index.html
    }

    function goHome() {
        window.location.href = "index.html"; // Redirige a index.html
    }

    function openApps() {
        console.log("Abrir aplicaciones recientes");
    }
});