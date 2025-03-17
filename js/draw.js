document.addEventListener('DOMContentLoaded', () => {
    // Actualizar hora
    function updateTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Función para abrir aplicaciones recientes (simulada)
    function openApps() {
        alert('Abrir aplicaciones recientes');
    }

    // Cargar imágenes subidas desde Cloudinary
    async function loadGallery() {
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dwlbxetry/resources/image?tags=drawings', {
                headers: {
                    Authorization: 'Basic ' + btoa('YOUR_API_KEY:YOUR_API_SECRET') // Reemplaza con tus credenciales de Cloudinary
                }
            });
            const data = await response.json();
            const galleryContainer = document.getElementById('galleryContainer');
            galleryContainer.innerHTML = ''; // Limpiar galería existente

            if (data.resources && data.resources.length > 0) {
                data.resources.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image.secure_url;
                    img.alt = 'Uploaded Drawing';
                    galleryContainer.appendChild(img);
                });
            } else {
                galleryContainer.innerHTML = '<p>No drawings found.</p>';
            }
        } catch (error) {
            console.error('Error al cargar la galería:', error);
            document.getElementById('galleryContainer').innerHTML = '<p>Error loading gallery.</p>';
        }
    }

    // Cargar la galería al iniciar
    loadGallery();

    // Script para la funcionalidad de dibujo
    const canvas = document.getElementById("paintCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.id = 'colorPicker';
        colorPicker.value = '#000000';

        const brushSize = document.createElement('input');
        brushSize.type = 'range';
        brushSize.id = 'brushSize';
        brushSize.min = '1';
        brushSize.max = '20';
        brushSize.value = '5';

        const eraserBtn = document.createElement('button');
        eraserBtn.id = 'eraser';
        eraserBtn.textContent = 'Eraser';

        const clearCanvas = document.createElement('button');
        clearCanvas.id = 'clearCanvas';
        clearCanvas.textContent = 'Clean';

        const downloadCanvas = document.createElement('button');
        downloadCanvas.id = 'downloadCanvas';
        downloadCanvas.textContent = 'Download';

        const shareTwitter = document.createElement('button');
        shareTwitter.id = 'shareTwitter';
        shareTwitter.textContent = 'Share on X';

        const uploadButton = document.createElement('button');
        uploadButton.id = 'uploadButton';
        uploadButton.textContent = 'Upload';

        const toolbar = document.querySelector('.toolbar');
        toolbar.appendChild(document.createTextNode('Color: '));
        toolbar.appendChild(colorPicker);
        toolbar.appendChild(document.createTextNode(' Size: '));
        toolbar.appendChild(brushSize);
        toolbar.appendChild(eraserBtn);
        toolbar.appendChild(clearCanvas);
        toolbar.appendChild(downloadCanvas);
        toolbar.appendChild(shareTwitter);
        toolbar.appendChild(uploadButton);

        const modal = document.getElementById("uploadModal");
        const closeModal = document.getElementById("closeModal");
        const confirmUpload = document.getElementById("confirmUpload");
        const userWalletInput = document.getElementById("userWallet");
        const paintContainer = document.querySelector('.paint-container');

        // Obtener dimensiones y posición desde atributos data
        const containerWidth = parseInt(paintContainer.dataset.width) || 700;
        const containerHeight = parseInt(paintContainer.dataset.height) || 300;

        // Aplicar dimensiones al contenedor
        paintContainer.style.setProperty('--paint-width', `${containerWidth}px`);
        paintContainer.style.setProperty('--paint-height', `${containerHeight}px`);

        // Ajustar el tamaño del canvas
        canvas.width = containerWidth * 0.7; // 70% del ancho del contenedor
        canvas.height = containerHeight;

        let painting = false;
        let erasing = false;

        function setCanvasBackground() {
            ctx.fillStyle = "#F9F7EA";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        setCanvasBackground();

        function draw(e) {
            if (!painting) return;
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = "round";
            ctx.strokeStyle = erasing ? "#F9F7EA" : colorPicker.value;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }

        canvas.addEventListener("mousedown", (e) => { painting = true; draw(e); });
        canvas.addEventListener("mouseup", () => { painting = false; ctx.beginPath(); });
        canvas.addEventListener("mousemove", draw);

        clearCanvas.addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setCanvasBackground();
        });

        downloadCanvas.addEventListener("click", () => {
            const link = document.createElement("a");
            link.download = "my_drawing.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });

        eraserBtn.addEventListener("click", () => {
            erasing = !erasing;
            eraserBtn.classList.toggle("active", erasing);
        });

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
                    });
                });
        });

        uploadButton.addEventListener("click", () => {
            modal.classList.add("show");
        });

        closeModal.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("show");
        });

        confirmUpload.addEventListener("click", async () => {
            const wallet = userWalletInput.value.trim();
            if (!wallet) {
                alert("⚠️ NAME OF ART.");
                return;
            }

            canvas.toBlob(async (blob) => {
                try {
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
                        alert("✅ Drawing published successfully!");
                        modal.classList.remove("show");
                        userWalletInput.value = "";
                        // Recargar la galería después de subir una nueva imagen
                        loadGallery();
                    } else {
                        alert("⛔ Error al subir imagen.");
                    }
                } catch (error) {
                    alert("⛔ Error al subir la imagen.");
                }
            }, "image/png");
        });
    }
});