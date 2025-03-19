// js/mail.js

document.addEventListener('DOMContentLoaded', () => {
    // Estado para rastrear si estamos en la vista de un correo
    let isViewingMail = false;

    // Referencias a los elementos
    const mailList = document.querySelector('.mail-list');
    const mailView = document.querySelector('.mail-view');
    const mailViewImg = mailView.querySelector('img');
    const mailContent = mailView.querySelector('.mail-content');

    // Manejar clics en los correos
    const mailItems = document.querySelectorAll('.mail-item');
    mailItems.forEach(item => {
        const mailImg = item.querySelector('img');
        item.addEventListener('click', () => {
            // Marcar como leído
            item.dataset.read = 'true';

            // Mostrar el correo en .mail-view
            mailViewImg.src = mailImg.src;
            mailViewImg.alt = mailImg.alt;
            mailContent.textContent = item.dataset.content || 'No content available'; // Mostrar el texto del correo
            mailList.style.display = 'none';
            mailView.style.display = 'flex';
            isViewingMail = true;
        });
    });

    // Manejar clics en las pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const link = tab.dataset.link;
            if (link) {
                window.open(link, '_blank'); // Abrir enlace en nueva pestaña
            }
        });
    });

    // Función para el botón de navegación
    window.goBack = function() {
        if (isViewingMail) {
            // Volver a la lista de correos
            mailList.style.display = 'flex';
            mailView.style.display = 'none';
            isViewingMail = false;
        } else {
            // Comportamiento original: abrir aplicaciones recientes
            console.log("Abrir aplicaciones recientes");
        }
    };
});