document.addEventListener('DOMContentLoaded', () => {
   
    //dibujar
    const canvas = document.getElementById("paintCanvas");
    if (canvas) {
        const ctx = canvas.getContext   ("2d");
        const colorPicker = document.getElementById("colorPicker");
        const brushSize = document.getElementById("brushSize");
        const eraserBtn = document.getElementById("eraser");
        const clearCanvas = document.getElementById("clearCanvas");
        const downloadCanvas = document.getElementById("downloadCanvas");
        const shareTwitter = document.getElementById("shareTwitter");

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 400;

        let painting = false;
        let erasing = false;

        function setCanvasBackground() {
            ctx.fillStyle = "#F9F7EA"; // Color de fondo
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        setCanvasBackground();

        function draw(e) {
            if (!painting) return;
        
            const rect = canvas.getBoundingClientRect(); // Obtiene la posición exacta del canvas
            const scaleX = canvas.width / rect.width;   // Corrige escalado horizontal
            const scaleY = canvas.height / rect.height; // Corrige escalado vertical
        
            const x = (e.clientX - rect.left) * scaleX; // Aplica corrección de escala
            const y = (e.clientY - rect.top) * scaleY;  // Aplica corrección de escala
        
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = "round";
            ctx.strokeStyle = erasing ? "#F9F7EA" : colorPicker.value;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        
        
        // 🎨 EVENTOS DEL DIBUJO
        canvas.addEventListener("mousedown", (e) => { painting = true; draw(e); });
        canvas.addEventListener("mouseup", () => { painting = false; ctx.beginPath(); });
        canvas.addEventListener("mousemove", draw);

        // 🧹 LIMPIAR CANVAS
        clearCanvas.addEventListener("click", () => { ctx.clearRect(0, 0, canvas.width, canvas.height); });

        // ⬇️ DESCARGAR DIBUJO
        downloadCanvas.addEventListener("click", () => {
            const link = document.createElement("a");
            link.download = "my_drawing.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });

        // 🧽 ACTIVAR/DESACTIVAR GOMA
        eraserBtn.addEventListener("click", () => { erasing = !erasing; eraserBtn.classList.toggle("active", erasing); });

        // 📤 COMPARTIR EN TWITTER (X)
        shareTwitter.addEventListener("click", () => {
            const imageData = canvas.toDataURL("image/png");
            
            fetch(imageData)
                .then(res => res.blob())
                .then(blob => {
                    const item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]).then(() => {
                        alert("✅Image copied! You can now paste it into a tweet.");
                        const tweetText = encodeURIComponent("Check out my drawing on $TOM🎨's website \nWeb:https://thisisjusttom.netlify.app/ \nX:@ThisIsJustTom\nTG: https://t.me/Tom_Coin_TG   \n\n🔥#TomCoin #memecoin #solana #drawingpage #crypto");
                        const tweetUrl = "https://x.com/intent/tweet?text=" + tweetText;
                        window.open(tweetUrl, "_blank");
                    }).catch(err => console.error("Error copiando imagen:", err));
                    
                });
                
        });
        
    }

    
  // ==========================
    // 📤 SUBIR IMAGEN A CLOUDINARY
    // ==========================

    const cloudName = "dwlbxetry"; // 🔹 Nombre de la nube corregido


        const uploadButton = document.getElementById("uploadButton");
        const modal = document.getElementById("uploadModal");
        const closeModal = document.getElementById("closeModal");
        const confirmUpload = document.getElementById("confirmUpload");
        const userWalletInput = document.getElementById("userWallet");
        
    if (uploadButton) {
    console.log("🎨 Se detectó la página de dibujo.");
        if (!uploadButton || !modal || !closeModal || !confirmUpload || !userWalletInput) {
            console.error("❌ ERROR: No se encontraron algunos elementos en el DOM.");
            return;
        }
        console.log("✅ DOM completamente cargado");
        uploadButton.addEventListener("click", () => {
            console.log("✅ Botón Upload pulsado");
            modal.classList.add("show");
        });
    
        closeModal.addEventListener("click", () => {
            console.log("❌ Modal cerrado");
            modal.classList.remove("show");
        });
    
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                console.log("❌ Modal cerrado por clic externo");
                modal.classList.remove("show");
            }
        });
        
    
        confirmUpload.addEventListener("click", async function () {
            const wallet = userWalletInput.value.trim();
            if (!wallet) {
                alert("⚠️ NAME OF ART.");
                return;
            }
        
            const canvas = document.getElementById("paintCanvas");
            if (!canvas) {
                alert("⛔ Error: No se encontró el lienzo.");
                return;
            }
        
            canvas.toBlob(async function (blob) {
                try {
                    console.log("🚀 Subiendo imagen a Cloudinary...");
                    const formData = new FormData();
                    formData.append("file", blob);
                    formData.append("upload_preset", "ml_default");
                    formData.append("tags", "drawings");
            
                    const response = await fetch(`https://api.cloudinary.com/v1_1/dwlbxetry/image/upload`, {
                        method: "POST",
                        body: formData
                    });
            
                    const data = await response.json();
                    if (data.secure_url) {
                        console.log("✅ Imagen subida con éxito:", data.secure_url);
            
                        // 🚀 Guardar la URL en el JSON o Base de Datos
                     
            
                        alert("✅ Drawing published successfully!");
                        modal.classList.remove("show");
                        userWalletInput.value = "";
            
                        // 🔄 Actualizar galería
                        fetchImages();
                    } else {
                        console.error("❌ Error al subir imagen:", data);
                        alert("⛔ Error al subir imagen.");
                    }
                } catch (error) {
                    console.error("❌ Error al subir la imagen:", error);
                    alert("⛔ Error al subir la imagen.");
                }
            }, "image/png");
            
        });
        
    }

            // ==========================
// 📥 MOSTRAR PUBLICACIONES
// ==========================
const API_URL = "https://galeria-production-4714.up.railway.app"; // 🔹 Tu API en Railway

window.fetchImages = async function fetchImages(type) {
    console.log(`🚀 Cargando imágenes de ${type} desde el servidor...`);

    try {
        const response = await fetch(`${API_URL}/api/${type}`);
        if (!response.ok) {
            throw new Error(`❌ Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        console.log(`📸 ${type} recibidos (JSON completo):`, data); // 🔍 Ver el JSON recibido

        if (!data.resources || data.resources.length === 0) {
            console.warn(`⚠️ No hay imágenes de ${type} disponibles.`);
            return;
        }

        const gallery = document.getElementById("gallery");
        if (!gallery) {
            console.warn(`⚠️ No se encontró la galería en esta página (${type}).`);
            return;
        }

        gallery.innerHTML = ""; // Limpiar la galería antes de cargar nuevas imágenes

        data.resources.forEach((image) => {
            console.log("🖼 Insertando imagen:", image.secure_url);
        
            const imgElement = document.createElement("img");
            imgElement.src = image.secure_url;
            imgElement.alt = type === "drawings" ? "Dibujo subido" : "Meme subido";
            imgElement.classList.add("gallery-img");
        
            // ✅ NO FORZAR WIDTH/HEIGHT, el CSS manejará el tamaño
        
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("gallery-item");
            imgContainer.appendChild(imgElement);
        
            gallery.appendChild(imgContainer);
        });
        

        console.log(`✅ Imágenes de ${type} cargadas en la galería.`);
    } catch (error) {
        console.error(`❌ Error al obtener imágenes de ${type}:`, error);
    }
}

// 🚀 Detectar en qué página estamos y cargar las imágenes correctas
    console.log("📢 Verificando ejecución de fetchImages...");
    console.log("🛠 Verificando clase del body:", document.body.classList);

    if (document.body.classList.contains("you-draw-page")) {
        console.log("✅ Página detectada: you-draw");
        fetchImages("drawings");
    } else if (document.body.classList.contains("meme-generator-page")) {
        console.log("✅ Página detectada: meme-generator");
        fetchImages("memes");
    } else {
        console.warn("⚠️ No se detectó ninguna página válida.");
    }
    


   
});