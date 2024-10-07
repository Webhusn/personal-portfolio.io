// Category modal interactions - placeholder for future extensions.
document.querySelectorAll('.category').forEach((item) => {
    item.addEventListener('click', function () {
        console.log('Opening modal for ' + this.querySelector('h5').textContent.trim());
    });
});

// Search bar functionality for filtering categories
document.getElementById('searchBar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const categories = document.querySelectorAll('.category');

    categories.forEach(function (category) {
        const categoryText = category.querySelector('h5').textContent.toLowerCase();
        category.style.display = categoryText.includes(query) ? '' : 'none';
    });
});

// Dark Mode Toggle
const darkModeSwitch = document.getElementById('darkModeSwitch');
darkModeSwitch.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
});

// Reminder Notifications
const reminderFrequency = document.getElementById('reminderFrequency');
reminderFrequency.addEventListener('change', function () {
    const frequency = this.value;
    if (frequency === 'daily') {
        alert('You will receive daily reminders!');
    } else if (frequency === 'weekly') {
        alert('You will receive weekly reminders!');
    }
});

function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'flex';  // Display spinner as flexbox to center it
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';  // Hide the spinner
}

// Show spinner on page load, hide after 2 seconds
window.onload = function() {
    showLoadingSpinner();  // Show the spinner immediately
    setTimeout(hideLoadingSpinner, 2000);  // Hide after 2 seconds
};


// Feedback form interactions
const feedbackForms = document.querySelectorAll('.form-select');
feedbackForms.forEach(form => {
    form.addEventListener('change', (event) => {
        const feedback = event.target.value;
        alert(`Thank you for your feedback! You rated this solution: ${feedback}`);
    });
});
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    });
}
