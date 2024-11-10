// Function to update total price based on selected option
function updateTotal(price) {
    document.getElementById("total-price").textContent = `$${price}.00 USD`;
}

// Function to toggle additional options display for each box and apply border highlight
function toggleOptions(contentId) {
    // Hide all additional options and remove highlighted border
    document.querySelectorAll('.additional-options').forEach(option => {
        option.style.display = 'none';
    });
    document.querySelectorAll('.option-box').forEach(box => {
        box.classList.remove('highlight'); // Remove highlight from all boxes
    });

    // Show selected box's options and add highlight
    document.getElementById(contentId).style.display = 'block';
    document.getElementById(contentId).closest('.option-box').classList.add('highlight');
}
