// JavaScript básico
document.addEventListener("DOMContentLoaded", () => {
  const contadorSpan = document.getElementById("contadorDias");
  if (contadorSpan) {
    let atual = 0;
    const inicio = new Date("2024-07-09");
    const hoje = new Date();
    const dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
    const intervalo = setInterval(() => {
      if (atual < dias) {
        atual++;
        contadorSpan.textContent = atual;
      } else {
        clearInterval(intervalo);
      }
    }, 25);
  }
});
