const choices = document.querySelectorAll('.choice');
const resultado = document.getElementById('resultado');
const turno = document.getElementById('turno');
const mensagem = document.getElementById('mensagem');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const reset = document.getElementById('reset');

let jogadorAtual = 1;
let escolhaJogador1 = '';
let escolhaJogador2 = '';
let pontos1 = 0;
let pontos2 = 0;

choices.forEach(botao => {
  botao.addEventListener('click', () => {
    const escolha = botao.dataset.choice;

    if (jogadorAtual === 1) {
      escolhaJogador1 = escolha;
      jogadorAtual = 2;

      turno.textContent = 'Vez do Jogador 2';
      mensagem.textContent = 'Jogador 2 faça sua escolha';
      resultado.textContent = 'Jogador 1 já escolheu!';

    } else {
      escolhaJogador2 = escolha;
      verificarVencedor();
      jogadorAtual = 1;

      turno.textContent = 'Vez do Jogador 1';
      mensagem.textContent = 'Escolha sua jogada';
    }
  });
});

function verificarVencedor() {

  if (escolhaJogador1 === escolhaJogador2) {
    resultado.textContent = `Empate! Ambos escolheram ${escolhaJogador1}`;
    return;
  }

  const venceu =
    (escolhaJogador1 === 'pedra' && escolhaJogador2 === 'tesoura') ||
    (escolhaJogador1 === 'papel' && escolhaJogador2 === 'pedra') ||
    (escolhaJogador1 === 'tesoura' && escolhaJogador2 === 'papel');

  if (venceu) {
    pontos1++;
    score1.textContent = pontos1;

    resultado.textContent = `🎉 Jogador 1 venceu! ${escolhaJogador1} ganha de ${escolhaJogador2}`;

  } else {
    pontos2++;
    score2.textContent = pontos2;

    resultado.textContent = `🔥 Jogador 2 venceu! ${escolhaJogador2} ganha de ${escolhaJogador1}`;
  }
}
;