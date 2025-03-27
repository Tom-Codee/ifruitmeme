// Selecciona todos los íconos y títulos
const icons = document.querySelectorAll('.icon');
const nameImages = document.querySelectorAll('.name-image');
window.token = "https://x.com/isolfruitcoin"; // Valor inicial del token

// Añade eventos de hover
icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        // Oculta todos los títulos
        nameImages.forEach(img => {
            img.style.opacity = '0';
        });
        // Muestra el título del ícono actual
        const nameImage = icon.querySelector('.name-image');
        nameImage.style.opacity = '1';
    });

    icon.addEventListener('mouseleave', () => {
        // Oculta todos los títulos al salir
        nameImages.forEach(img => {
            img.style.opacity = '0';
        });
    });
});

// Funciones de navegación originales
function goBack() {
    window.location.href = "../index.html";
}

function goHome() {
    window.location.href = "../index.html";
}

function openApps() {
    console.log("Abrir aplicaciones recientes");
}

// Función para actualizar la hora
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) { // Verifica que el elemento exista
        const now = new Date();
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const day = days[now.getDay()]; // Obtiene el día de la semana en formato abreviado
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${day}\u00A0\u00A0\u00A0\u00A0${hours}:${minutes}`; // Formato: día hora:minutos
        timeElement.textContent = timeString;
    }
}

// Actualiza la hora inmediatamente y cada segundo
updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});

function applyTheme(theme) {
    let bgImage = "";
    let screenColor = "";

    switch (theme) {
        case "default":
            bgImage = "url('images/background.png')";
            screenColor = "#F9F7EB";
            break;
        case "red":
            bgImage = "url('images/back/background-red.png')";
            screenColor = "#FFD1D1";
            break;
        case "blue":
            bgImage = "url('images/back/background-blue.png')";
            screenColor = "#D1E0FF";
            break;
        case "green":
            bgImage = "url('images/back/background-green.png')";
            screenColor = "#D1FFD1";
            break;
        case "purple":
            bgImage = "url('images/back/background-purple.png')";
            screenColor = "#E0D1FF";
            break;
        case "yellow":
            bgImage = "url('images/back/background-yellow.png')";
            screenColor = "#FFF8D1";
            break;
        default:
            bgImage = "url('images/background.png')";
            screenColor = "#F9F7EB";
    }

    // Aplica los valores al documento
    document.documentElement.style.setProperty("--home-bg-image", bgImage);
    document.documentElement.style.setProperty("--screen-bg-color", screenColor);
}

