document.addEventListener("DOMContentLoaded", () => {
  const inicio = new Date("2024-07-09T00:00:00");
  const hoje = new Date();
  const dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24)) - 1;
  const contadorSpan = document.getElementById("contadorDias");

  let atual = 0;
  const intervalo = setInterval(() => {
    if (atual < dias) {
      atual++;
      contadorSpan.textContent = atual;
    } else {
      clearInterval(intervalo);
    }
  }, 25);
});

const slide = document.getElementById('carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let counter = 0;

function updateCarousel() {
  const width = slide.clientWidth;
  slide.style.transform = `translateX(-${counter * width}px)`;
}

if (nextBtn && prevBtn && slide && images.length > 0) {
  nextBtn.addEventListener('click', () => {
    counter = (counter + 1) % images.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    counter = (counter - 1 + images.length) % images.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
