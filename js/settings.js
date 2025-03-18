document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const themeBoxes = document.querySelectorAll(".theme-box");

    // Cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Agregar evento a cada cuadro de tema
    themeBoxes.forEach(box => {
        box.addEventListener("click", function () {
            const selectedTheme = this.getAttribute("data-theme");

            // Guardar en localStorage
            localStorage.setItem("selectedTheme", selectedTheme);

            // Aplicar el tema
            applyTheme(selectedTheme);
        });
    });

    function applyTheme(theme) {
        let bgImage = "";
        let screenColor = "";
    
        switch (theme) {
            case "red":
                bgImage = "url('../images/back/background-red.png')";
                screenColor = "#FFD1D1"; // Color acorde
                break;  
            case "blue":
                bgImage = "url('../images/back/background-blue.png')";
                screenColor = "#D1E0FF";
                break;
            case "green":
                bgImage = "url('../images/back/background-green.png')";
                screenColor = "#D1FFD1";
                break;
            case "purple":  
                bgImage = "url('../images/back/background-purple.png')";
                screenColor = "#E0D1FF";
                break;
            case "yellow":
                bgImage = "url('../images/back/background-yellow.png')";
                screenColor = "#FFF8D1";
                break;
            default:
                bgImage = "url('../images/back/background.png')"; // Fondo por defecto
                screenColor = "#F9F7EB";
        }
    
        // ❌ No usar variables CSS aquí para `background-image`
        document.body.style.backgroundImage = bgImage;
        document.querySelector(".screen").style.backgroundColor = screenColor;
    
        // Guardar en localStorage para aplicar en futuras visitas
        localStorage.setItem("selectedTheme", theme);
    }
    
});
