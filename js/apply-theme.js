    // apply-theme.js
(function() {
    const savedTheme = localStorage.getItem("selectedTheme");
    let bgImage = "url('images/background.png')";
    let screenColor = "#F9F7EB";
    let customBarColor1 = "#ababab";
    let customBarColor2 = "#3f3f3f";

    // Ajustar las rutas de las imágenes dependiendo de la página
    // Si la página está en una subcarpeta (como settings.html), usa "../images/"
    const isSubdirectory = window.location.pathname.includes("webs/");
    const imagePathPrefix = isSubdirectory ? "../" : "";

    if (savedTheme) {
        switch (savedTheme) {
            case "red":
                bgImage = `url('${imagePathPrefix}images/back/background-red.png')`;
                screenColor = "#FFD1D1";
                customBarColor1 = "#FF9999";
                customBarColor2 = "#CC0000";
                break;
            case "blue":
                bgImage = `url('${imagePathPrefix}images/back/background-blue.png')`;
                screenColor = "#D1E0FF";
                customBarColor1 = "#99CCFF";
                customBarColor2 = "#0033CC";
                break;
            case "green":
                bgImage = `url('${imagePathPrefix}images/back/background-green.png')`;
                screenColor = "#D1FFD1";
                customBarColor1 = "#99FF99";
                customBarColor2 = "#006600";
                break;
            case "purple":
                bgImage = `url('${imagePathPrefix}images/back/background-violeta.png')`;
                screenColor = "#E0D1FF";
                customBarColor1 = "#CC99FF";
                customBarColor2 = "#6600CC";
                break;
            case "yellow":
                bgImage = `url('${imagePathPrefix}images/back/background-yellow.png')`;
                screenColor = "#FFF8D1";
                customBarColor1 = "#FFFF99";
                customBarColor2 = "#CCCC00";
                break;
            default:
                bgImage = `url('${imagePathPrefix}images/background.png')`;
                screenColor = "#F9F7EB";
                customBarColor1 = "#ababab";
                customBarColor2 = "#3f3f3f";
                break;
        }
    }

    // Aplicar los estilos directamente a las variables CSS
    document.documentElement.style.setProperty("--home-bg-image", bgImage);
    document.documentElement.style.setProperty("--screen-bg-color", screenColor);
    document.documentElement.style.setProperty("--custom-bar-color1", customBarColor1);
    document.documentElement.style.setProperty("--custom-bar-color2", customBarColor2);
})();