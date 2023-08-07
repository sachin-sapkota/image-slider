const slider = document.querySelector('.slider');

const slides = document.querySelectorAll('.slider img');
const indicatorsContainer = document.querySelector('.current-slide-indicators');
const indicators = [];
const background = document.querySelector('.slider__background img');
let currentIndex = 0;
let intervalId;

const slideWidth = slides[0].clientWidth;
function changeBackground() {
  background.src = slides[currentIndex].src;
}

function updateSlide() {
  console.log(currentIndex);
  // slider.style.marginLeft = `-${currentIndex * slideWidth}px`;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index == currentIndex);
  });
  changeBackground();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
}
function initializeCarousel() {
  intervalId = setInterval(nextSlide, 3000);

  slides.forEach((slide, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('current-slide-indicator');
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlide();
      clearInterval(intervalId); // Clear the current interval
      intervalId = setInterval(nextSlide, 3000);
    });
    indicatorsContainer.appendChild(indicator);
    indicators.push(indicator);
  });

  updateSlide();
}

initializeCarousel();
