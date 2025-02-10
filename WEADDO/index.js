document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navClose = document.querySelector('.nav-close');

    // Open Navigation Menu
    navToggle.addEventListener('click', () => {
        navOverlay.classList.add('active');
    });

    // Close Navigation Menu
    navClose.addEventListener('click', () => {
        navOverlay.classList.remove('active');
    });

    // Close when clicking outside
    navOverlay.addEventListener('click', (event) => {
        if (!event.target.closest(".nav-content")) {
            navOverlay.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.querySelector(".prev-arrow");
    const nextButton = document.querySelector(".next-arrow");
    const slider = document.querySelector(".slider");
    let currentIndex = 0;
    const totalSlides = slider.children.length;

    // Function to move the slider
    function moveSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Next Slide
    nextButton.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        moveSlider();
    });

    // Previous Slide
    prevButton.addEventListener("click", function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        moveSlider();
    });
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showSlide(index) {
    currentIndex = index;
    items.forEach((item, i) => {
        item.style.transform = `translateX(${100 * (i - index)}%)`;
    });
    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.flex.space-x-2 span');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('bg-red-500', i === currentIndex);
        indicator.classList.toggle('bg-gray-300', i !== currentIndex);
    });
}

showSlide(currentIndex);
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

});

  