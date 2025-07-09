// Função para rolar suavemente
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Frases animadas
const frases = [
  "Eu te valorizo", "Eu te encho de carinho", "Eu te abraço com o olhar",
  "Eu te levo no coração", "Eu te escrevo poesias", "Eu te busco na memória",
  "Eu te enfeito com amor", "Eu te sorrio por dentro", "Eu te guardo em mim",
  "Eu te mantenho por perto", "Eu te escolhi pra sempre", "Eu te espero sem pressa",
  "Eu te vejo em tudo", "Eu te coloco nas minhas orações", "Eu te sinto na pele",
  "Eu te encontro nos detalhes", "Eu te abraço na alma", "Eu te conto estrelas"
];

let index = 0;
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('fraseBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.textContent = frases[index];
      index = (index + 1) % frases.length;
    });
  }

  // Som de clique
  const clickSound = document.getElementById("click-sound");
  document.addEventListener("click", function (e) {
    if (clickSound && (e.target.tagName === "BUTTON" || e.target.closest("button") || e.target.classList.contains("footer-link"))) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });

  // Fundo animado de estrelas
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        color: Math.random() > 0.5 ? 'white' : '#00bfff'
      });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(animateStars);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  createStars();
  animateStars();

  // Contador de dias
  const inicio = new Date("2024-07-09");
  const hoje = new Date();
  const dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
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

  // Quiz
  const quizPerguntas = [
    { pergunta: "Qual a comida favorita do Pablo?", opcoes: ["Pizza", "Hambúrguer", "Ovo Mexido", "Batata Frita"], correta: 3 },
    { pergunta: "Onde foi nosso primeiro beijo?", opcoes: ["Explicadora", "Praça", "Elevador", "Restaurante"], correta: 2 },
    { pergunta: "Qual a minha cor favorita?", opcoes: ["Azul", "Preto", "Amarelo", "Vermelho"], correta: 0 },
    { pergunta: "Qual a parte do seu corpo que eu mais gosto?", opcoes: ["Olhos", "Cabelo", "Coxas", "Boca"], correta: 0 }
  ];

  let atualPergunta = 0;

  function mostrarPergunta() {
    const q = quizPerguntas[atualPergunta];
    document.getElementById("pergunta").textContent = q.pergunta;
    const opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = "";
    q.opcoes.forEach((opc, i) => {
      const btn = document.createElement("button");
      btn.textContent = opc;
      btn.onclick = () => verificarResposta(i, btn);
      opcoes.appendChild(btn);
    });
  }

  function verificarResposta(i, botao) {
    const correta = quizPerguntas[atualPergunta].correta;
    const feedback = document.getElementById("feedback");

    if (i === correta) {
      feedback.textContent = "💚 Acertou! Você lembra direitinho!";
      feedback.style.color = "#00cc66";
      botao.style.backgroundColor = "#00cc66";
    } else {
      feedback.textContent = "💔 Ihh, errou! Tenta lembrar melhor.";
      feedback.style.color = "#cc0033";
      botao.style.backgroundColor = "#cc0033";
    }

    setTimeout(() => {
      atualPergunta = (atualPergunta + 1) % quizPerguntas.length;
      feedback.textContent = "";
      mostrarPergunta();
    }, 2000);
  }

  mostrarPergunta();

  // Carrossel
  const slide = document.querySelector('.carousel-slide');
  const images = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let counter = 0;

  if (nextBtn && prevBtn && slide && images.length > 0) {
    nextBtn.addEventListener('click', () => {
      counter = (counter + 1) % images.length;
      updateCarousel();
    });
    prevBtn.addEventListener('click', () => {
      counter = (counter - 1 + images.length) % images.length;
      updateCarousel();
    });
  }

  function updateCarousel() {
    const largura = slide.clientWidth;
    slide.style.transform = `translateX(-${counter * largura}px)`;
  }
});
