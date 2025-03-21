// js/tasks.js

document.addEventListener('DOMContentLoaded', () => {
    // References to elements
    const taskItems = document.querySelectorAll('.task-item');
   
    // Handle clicks on tasks
    taskItems.forEach(item => {
    item.addEventListener('click', () => {
    // Toggle completed state
    const isCompleted = item.dataset.completed === 'true';
    item.dataset.completed = !isCompleted;
   
    // Update style visually
    if (!isCompleted) {
    item.classList.add('completed');
    } else {
    item.classList.remove('completed');
    }
    });
    });
   });