const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentIndex = 0;

nextButton.addEventListener('click', () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
    updateSlidePosition();
});

prevButton.addEventListener('click', () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    updateSlidePosition();
});

function updateSlidePosition() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-slide functionality
setInterval(() => {
    nextButton.click();
}, 5000);
