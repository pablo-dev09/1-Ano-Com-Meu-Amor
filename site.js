// Scroll suave para seções
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Fundo de estrelas animado
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

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
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animateStars);
  }

  createStars();
  animateStars();
});

// Carrossel de imagens
document.addEventListener("DOMContentLoaded", () => {
  const slide = document.querySelector('.carousel-slide');
  const images = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let counter = 0;

  function updateCarousel() {
    slide.style.transform = `translateX(-${counter * 480}px)`;
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
  }
});

// Contador de dias juntos animado
document.addEventListener("DOMContentLoaded", () => {
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
});

// Frases do botão “Clique para ver uma frase”
const frases = [
  "Eu te valorizo", "Eu te encho de carinho", "Eu te abraço com o olhar",
  "Eu te levo no coração", "Eu te escrevo poesias", "Eu te busco na memória",
  "Eu te enfeito com amor", "Eu te sorrio por dentro", "Eu te guardo em mim",
  "Eu te mantenho por perto", "Eu te escolhi pra sempre", "Eu te espero sem pressa",
  "Eu te vejo em tudo", "Eu te coloco nas minhas orações", "Eu te sinto na pele",
  "Eu te encontro nos detalhes", "Eu te abraço na alma", "Eu te conto estrelas"
];

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('fraseBtn');
  let index = 0;
  if (btn) {
    btn.addEventListener('click', () => {
      btn.textContent = frases[index];
      index = (index + 1) % frases.length;
    });
  }
});

// Som de clique nos botões e links
document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("click-sound");
  document.addEventListener("click", function (e) {
    if (clickSound && (e.target.tagName === "BUTTON" || e.target.closest("button") || e.target.classList.contains("footer-link"))) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
});

// Joguinho do Amor - Quiz
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

let atualQuiz = 0;

function mostrarPergunta() {
  const q = quizPerguntas[atualQuiz];
  const perguntaElem = document.getElementById("pergunta");
  const opcoesElem = document.getElementById("opcoes");
  const feedback = document.getElementById("feedback");

  perguntaElem.textContent = q.pergunta;
  opcoesElem.innerHTML = "";
  feedback.textContent = "";
  feedback.style.opacity = "1";

  q.opcoes.forEach((opc, i) => {
    const btn = document.createElement("button");
    btn.textContent = opc;
    btn.style.backgroundColor = "#0077cc"; // azul base
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.padding = "12px 25px";
    btn.style.margin = "10px 5px";
    btn.style.borderRadius = "20px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.3s ease";
    btn.disabled = false;

    btn.onclick = () => verificarResposta(i, btn);

    opcoesElem.appendChild(btn);
  });
}

function verificarResposta(i, botao) {
  const correta = quizPerguntas[atualQuiz].correta;
  const feedback = document.getElementById("feedback");
  const botoes = document.querySelectorAll("#opcoes button");

  botoes.forEach(btn => btn.disabled = true);

  if (i === correta) {
    feedback.textContent = "💚 Acertou! Você lembra direitinho!";
    feedback.style.color = "#00cc66";
    botao.style.backgroundColor = "#00cc66";
  } else {
    feedback.textContent = "💔 Ihh, errou! Tenta lembrar melhor.";
    feedback.style.color = "#cc0033";
    botao.style.backgroundColor = "#cc0033";

    // Marca o botão correto em verde também
    botoes[correta].style.backgroundColor = "#00cc66";
  }

  setTimeout(() => {
    atualQuiz = (atualQuiz + 1) % quizPerguntas.length;
    mostrarPergunta();
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPergunta();
});
