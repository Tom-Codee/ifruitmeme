document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("paintCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const colorPicker = document.getElementById("colorPicker");
        const brushSize = document.getElementById("brushSize");
        const eraserBtn = document.getElementById("eraser");
        const clearCanvas = document.getElementById("clearCanvas");
        const downloadCanvas = document.getElementById("downloadCanvas");
        const shareTwitter = document.getElementById("shareTwitter");
        const uploadButton = document.getElementById("uploadButton");
        const modal = document.getElementById("uploadModal");
        const closeModal = document.getElementById("closeModal");
        const confirmUpload = document.getElementById("confirmUpload");
        const userWalletInput = document.getElementById("userWallet");

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight * 0.7;

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

        // Lógica de subida
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