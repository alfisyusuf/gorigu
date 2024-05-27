const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentIndex = 0;
let isTransitioning = false;
let direction = 1; // 1 for forward, -1 for backward

// Add the 'first-load' class to the image of the first slide
slides[currentIndex].querySelector('img').classList.add('first-load');

nextButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    slides[currentIndex].classList.remove('active');
    slides[currentIndex].querySelector('img').classList.remove('first-load');

    currentIndex += direction;

    if (currentIndex === slides.length) {
        direction = -1;
        currentIndex -= 2;
    } else if (currentIndex < 0) {
        direction = 1;
        currentIndex += 2;
    }

    slides[currentIndex].classList.add('active');
    slides[currentIndex].querySelector('img').classList.add('first-load');
    updateSlidePosition();
});

prevButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    slides[currentIndex].classList.remove('active');
    slides[currentIndex].querySelector('img').classList.remove('first-load');

    currentIndex -= direction;

    if (currentIndex < 0) {
        direction = 1;
        currentIndex = 1;
    } else if (currentIndex >= slides.length) {
        direction = -1;
        currentIndex = slides.length - 2;
    }

    slides[currentIndex].classList.add('active');
    slides[currentIndex].querySelector('img').classList.add('first-load');
    updateSlidePosition();
});

function updateSlidePosition() {
    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    slidesContainer.addEventListener('transitionend', () => {
        isTransitioning = false;
    }, { once: true });
}

// Auto-slide functionality
setInterval(() => {
    nextButton.click();
}, 5000);
