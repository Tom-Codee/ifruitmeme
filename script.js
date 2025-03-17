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