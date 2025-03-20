// js/mail.js

document.addEventListener('DOMContentLoaded', () => {
    // State to track if we are viewing an email
    let isViewingMail = false;

    // References to elements
    const mailList = document.querySelector('.mail-list');
    const mailView = document.querySelector('.mail-view');
    const mailSender = mailView.querySelector('.mail-sender');
    const mailSubject = mailView.querySelector('.mail-subject');
    const mailHeaderContent = mailView.querySelector('.mail-header-content');
    const mailContent = mailView.querySelector('.mail-content');

    // Handle clicks on emails
    const mailItems = document.querySelectorAll('.mail-item');
    mailItems.forEach(item => {
        item.addEventListener('click', () => {
            // Mark as read
            item.dataset.read = 'true';

            // Show email in .mail-view
            mailSender.textContent = item.dataset.sender || 'No sender available';
            mailSubject.textContent = item.dataset.subject || 'No subject available';
            mailHeaderContent.textContent = item.dataset.header || '';
            mailContent.innerHTML = item.dataset.content || 'No content available';
            mailList.style.display = 'none';
            mailView.style.display = 'flex';
            isViewingMail = true;
        });
    });

    // Function for navigation button
    window.goBack = function() {
        if (isViewingMail) {
            // Return to email list
            mailList.style.display = 'flex';
            mailView.style.display = 'none';
            isViewingMail = false;
        } else {
            // Original behavior: open recent apps
            console.log("Open recent apps");
        }
    };
});