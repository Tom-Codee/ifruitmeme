// js/contacts.js

document.addEventListener('DOMContentLoaded', () => {
    // State to track if we are viewing a contact
    let isViewingContact = false;

    // References to elements
    const contactsList = document.querySelector('.contacts-list');
    const contactView = document.querySelector('.contact-view');
    const contactInitialLarge = contactView.querySelector('.contact-initial-large');
    const contactNameHeader = contactView.querySelector('.contact-name-header');
    const contactPhone = contactView.querySelector('.contact-phone');
    const contactEmail = contactView.querySelector('.contact-email');

    // Handle clicks on contacts
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.dataset.name;
            const phone = item.dataset.phone;
            const email = item.dataset.email;

            contactInitialLarge.textContent = name.charAt(0);
            contactNameHeader.textContent = name;
            contactPhone.textContent = phone;
            contactEmail.textContent = email;
            contactsList.style.display = 'none';
            contactView.style.display = 'flex';
            isViewingContact = true;
        });
    });

    // Function for navigation button
    window.goBack = function() {
        if (isViewingContact) {
            contactsList.style.display = 'block';
            contactView.style.display = 'none';
            isViewingContact = false;
        } else {
            console.log("Open recent apps");
        }
    };
});