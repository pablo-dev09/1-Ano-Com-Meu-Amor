// Scroll suave
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Frases do botão
const frases = [
  "Eu te valorizo", "Eu te encho de carinho", "Eu te abraço com o olhar",
  "Eu te levo no coração", "Eu te escrevo poesias", "Eu te busco na memória",
  "Eu te enfeito com amor", "Eu te sorrio por dentro", "Eu te guardo em mim",
  "Eu te mantenho por perto", "Eu te escolhi pra sempre", "Eu te espero sem pressa",
  "Eu te vejo em tudo", "Eu te coloco nas minhas orações", "Eu te sinto na pele",
  "Eu te encontro nos detalhes", "Eu te abraço na alma", "Eu te conto estrelas"
];

let fraseIndex = 0;
let slideIndex = 0;
let perguntaIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Botão de frases
  const btn = document.getElementById('fraseBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.textContent = frases[fraseIndex];
      fraseIndex = (fraseIndex + 1) % frases.length;
    });
  }

  // Som de clique
  const clickSound = document.getElementById("click-sound");
  document.addEventListener("click", function (e) {
    if (
      clickSound &&
      (e.target.tagName === "BUTTON" ||
        e.target.closest("button") ||
        e.target.classList.contains("footer-link"))
    ) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });

  // Fundo de estrelas
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

  // --- Carrossel corrigido ---
  const slide = document.querySelector('.carousel-slide');
  const images = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const total = images.length;

  function updateCarousel() {
    slide.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  if (slide && images.length > 0 && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      slideIndex = (slideIndex - 1 + total) % total;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      slideIndex = (slideIndex + 1) % total;
      updateCarousel();
    });

    updateCarousel();
  }

  // Contador de dias
  const inicio = new Date("2024-07-09");
  const hoje = new Date();
  const dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
  const contadorSpan = document.getElementById("contadorDias");

  let diaAtual = 0;
  const intervalo = setInterval(() => {
    if (diaAtual < dias) {
      diaAtual++;
      contadorSpan.textContent = diaAtual;
    } else {
      clearInterval(intervalo);
    }
  }, 25);

  // Inicia quiz
  mostrarPergunta();
});

// ---------------- Quiz ----------------

const quizPerguntas = [
  {
    pergunta: "Qual a comida favorita do Pablo?",
    opcoes: ["Pizza", "Hambúrguer", "Ovo Mexido", "Batata Frita"],
    correta: 3
  },
  {
    pergunta: "Onde foi nosso primeiro beijo?",
    opcoes: ["Explicadora", "Praça", "Elevador", "Restaurante"],
    correta: 2
  },
  {
    pergunta: "Qual a minha cor favorita?",
    opcoes: ["Azul", "Preto", "Amarelo", "Vermelho"],
    correta: 0
  },
  {
    pergunta: "Qual a parte do seu corpo que eu mais gosto?",
    opcoes: ["Olhos", "Cabelo", "Coxas", "Boca"],
    correta: 0
  }
];

function mostrarPergunta() {
  const q = quizPerguntas[perguntaIndex];
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
  const correta = quizPerguntas[perguntaIndex].correta;
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
    perguntaIndex = (perguntaIndex + 1) % quizPerguntas.length;
    feedback.textContent = "";
    mostrarPergunta();
  }, 2000);
}
