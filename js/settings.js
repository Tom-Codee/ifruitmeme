
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
        let customBarColor1 = "";
        let customBarColor2 = "";

        switch (theme) {
            case "red":
                bgImage = "url('../images/back/background-red.png')";
                screenColor = "#FFD1D1";
                customBarColor1 = "#FF9999";
                customBarColor2 = "#CC0000";
                break;
            case "blue":
                bgImage = "url('../images/back/background-blue.png')";
                screenColor = "#D1E0FF";
                customBarColor1 = "#99CCFF";
                customBarColor2 = "#0033CC";
                break;
            case "green":
                bgImage = "url('../images/back/background-green.png')";
                screenColor = "#D1FFD1";
                customBarColor1 = "#99FF99";
                customBarColor2 = "#006600";
                break;
            case "purple":
                bgImage = "url('../images/back/back-violeta.jpg')";
                screenColor = "#E0D1FF";
                customBarColor1 = "#CC99FF";
                customBarColor2 = "#6600CC";
                break;
            case "yellow":
                bgImage = "url('../images/back/background-yellow.jpg')";
                screenColor = "#FFF8D1";
                customBarColor1 = "#FFFF99";
                customBarColor2 = "#CCCC00";
                break;
            default:
                bgImage = "url('../images/background.png')";
                screenColor = "#F9F7EB";
                customBarColor1 = "#ababab";
                customBarColor2 = "#3f3f3f";
        }

        // Aplicar estilos directamente (como en tu código)
        document.body.style.backgroundImage = bgImage;
        document.querySelector(".screen").style.backgroundColor = screenColor;

        // Actualizar variables CSS para el custom-bar
        document.documentElement.style.setProperty("--custom-bar-color1", customBarColor1);
        document.documentElement.style.setProperty("--custom-bar-color2", customBarColor2);

        // Guardar en localStorage
        localStorage.setItem("selectedTheme", theme);
    }
});


