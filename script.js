// Selecciona todos los íconos y títulos
const icons = document.querySelectorAll('.icon');
const nameImages = document.querySelectorAll('.name-image');

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



//RAIDO BUTTONS///


// Add this to your script.js file
document.addEventListener("DOMContentLoaded", () => {
    const radioButtonsContainer = document.getElementById("radioButtons");
    const stationDisplay = document.getElementById("stationDisplay");
    const buttons = Array.from(document.querySelectorAll(".radio-button"));

    const radioStations = [
        "Los Santos Rock Radio",
        "Non-Stop-Pop FM",
        "Radio Los Santos",
        "West Coast Classics",
        "Rebel Radio"
    ];
    let currentIndex = 2; // Start with "Radio Los Santos" in the center

    // Initialize display
    updateStationDisplay();

    let isDragging = false;
    let startX;
    let dragDistance = 0;

    radioButtonsContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        radioButtonsContainer.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        dragDistance = e.clientX - startX;
        radioButtonsContainer.style.transform = `translateX(${dragDistance}px)`;

        // Check if drag distance exceeds threshold to shift
        const threshold = 60; // Distance to trigger a shift
        if (Math.abs(dragDistance) > threshold) {
            if (dragDistance > 0) {
                shiftLeft(); // Drag right, shift left
            } else {
                shiftRight(); // Drag left, shift right
            }
            startX = e.clientX; // Reset start position
            dragDistance = 0;
            radioButtonsContainer.style.transform = `translateX(0px)`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        radioButtonsContainer.style.cursor = "grab";
        radioButtonsContainer.style.transform = `translateX(0px)`;
        dragDistance = 0;
    });

    function shiftLeft() {
        currentIndex = (currentIndex - 1 + radioStations.length) % radioStations.length;
        const firstButton = buttons.shift(); // Remove first button
        buttons.push(firstButton); // Add it to the end
        updateButtons();
        updateStationDisplay();
    }

    function shiftRight() {
        currentIndex = (currentIndex + 1) % radioStations.length;
        const lastButton = buttons.pop(); // Remove last button
        buttons.unshift(lastButton); // Add it to the start
        updateButtons();
        updateStationDisplay();
    }

    function updateButtons() {
        radioButtonsContainer.innerHTML = "";
        buttons.forEach((button, index) => {
            if (index === 2) button.classList.add("center");
            else button.classList.remove("center");
            radioButtonsContainer.appendChild(button);
        });
    }

    function updateStationDisplay() {
        stationDisplay.textContent = radioStations[currentIndex];
        stationDisplay.style.opacity = "1";
        setTimeout(() => {
            stationDisplay.style.opacity = "0";
        }, 2000); // Fade out after 2 seconds
        console.log(`Playing: ${radioStations[currentIndex]}`);
        // Add audio playback logic here
    }
});