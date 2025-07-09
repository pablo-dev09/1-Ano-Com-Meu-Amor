const canvas = document.getElementById('sunflowerCanvas');
const ctx = canvas.getContext('2d');
const numSunflowers = 30; // Quantidade de girassóis
const sunflowers = [];
const maxRadius = 80;
const minRadius = 30;

// Função para desenhar um girassol
function drawSunflower(x, y, radius, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;

    // Centro do girassol (marrom)
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#8B4513'; // Marrom
    ctx.fill();
    ctx.closePath();

    // Pétalas (amarelas, mas queremos brancas e azuis para os detalhes)
    const numPetals = 12;
    const petalLength = radius * 0.8;
    const petalWidth = radius * 0.3;

    for (let i = 0; i < numPetals; i++) {
        ctx.rotate(Math.PI * 2 / numPetals);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // Alternar entre branco e azul para as pétalas
        if (i % 2 === 0) {
            ctx.fillStyle = '#FFFFFF'; // Branco
        } else {
            ctx.fillStyle = '#4299e1'; // Azul
        }
        ctx.ellipse(petalLength / 2, 0, petalLength / 2, petalWidth / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    ctx.restore();
}

// Classe para um girassol individual
class Sunflower {
    constructor() {
        this.reset();
    }

    reset() {
        this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = (Math.random() - 0.5) * 0.005; // Pequena rotação aleatória
        this.opacity = Math.random() * 0.5 + 0.3; // Opacidade inicial
        this.opacityChange = (Math.random() - 0.5) * 0.002; // Variação de opacidade
        this.driftX = (Math.random() - 0.5) * 0.5; // Pequeno movimento horizontal
        this.driftY = (Math.random() - 0.5) * 0.5; // Pequeno movimento vertical
    }

    update() {
        this.rotation += this.speed;
        this.opacity += this.opacityChange;
        this.x += this.driftX;
        this.y += this.driftY;

        // Garante que a opacidade fique entre 0.3 e 0.8
        if (this.opacity > 0.8 || this.opacity < 0.3) {
            this.opacityChange *= -1;
        }

        // Reinicia o girassol se sair da tela
        if (this.x < -this.radius || this.x > canvas.width + this.radius ||
            this.y < -this.radius || this.y > canvas.height + this.radius) {
            this.reset();
            // Garante que o girassol reapareça no lado oposto ou aleatoriamente
            if (this.x < -this.radius) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius) this.y = -this.radius;
        }
    }

    draw() {
        drawSunflower(this.x, this.y, this.radius, this.rotation, this.opacity);
    }
}

// Inicializa os girassóis
function initSunflowers() {
    sunflowers.length = 0; // Limpa girassóis existentes
    for (let i = 0; i < numSunflowers; i++) {
        sunflowers.push(new Sunflower());
    }
}

// Função de animação
function animate() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza e desenha cada girassol
    sunflowers.forEach(sunflower => {
        sunflower.update();
        sunflower.draw();
    });

    // Solicita o próximo frame de animação
    requestAnimationFrame(animate);
}

// Lida com o redimensionamento da janela
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Reinicia os girassóis para redistribuí-los na nova área
    initSunflowers();
}

// Event Listeners
window.addEventListener('resize', resizeCanvas);
window.onload = function() {
    resizeCanvas(); // Define o tamanho inicial do canvas
    animate();     // Inicia a animação
}
