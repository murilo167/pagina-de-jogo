const choices = document.querySelectorAll('.choice');
const resultado = document.getElementById('resultado');
const turno = document.getElementById('turno');
const mensagem = document.getElementById('mensagem');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const reset = document.getElementById('reset');
const passTurn = document.getElementById('passTurn');
const btnVoltar = document.querySelector('.btn-voltar');

// Funcionalidade do botão de voltar
if (btnVoltar) {
  btnVoltar.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../';
  });
}

// Reiniciar jogo
reset.addEventListener('click', resetGame);

// Botão de passagem segura
if (passTurn) {
  passTurn.addEventListener('click', () => {
    jogadorAtual = 2;
    disableChoices(false);
    passTurn.classList.add('hidden');
    turno.textContent = 'Vez do Jogador 2';
    mensagem.textContent = 'Jogador 2 faça sua escolha';
  });
}

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
      disableChoices(true);
      passTurn.classList.remove('hidden');
      turno.textContent = 'Escolha registrada';
      mensagem.textContent = 'Passe o dispositivo para o Jogador 2 e clique em PASSAR';
      resultado.textContent = 'Jogador 1 já escolheu!';
      return;
    }

    if (jogadorAtual === 2) {
      escolhaJogador2 = escolha;
      verificarVencedor();
      jogadorAtual = 1;
      disableChoices(false);
      passTurn.classList.add('hidden');

      turno.textContent = 'Vez do Jogador 1';
      mensagem.textContent = 'Escolha sua jogada';
    }
  });
});

function disableChoices(disabled) {
  choices.forEach(botao => {
    botao.disabled = disabled;
    botao.style.cursor = disabled ? 'not-allowed' : 'pointer';
    botao.style.opacity = disabled ? '0.6' : '1';
  });
}

function resetGame() {
  jogadorAtual = 1;
  escolhaJogador1 = '';
  escolhaJogador2 = '';
  pontos1 = 0;
  pontos2 = 0;

  score1.textContent = '0';
  score2.textContent = '0';
  resultado.textContent = 'Aguardando jogadas...';
  turno.textContent = 'Vez do Jogador 1';
  mensagem.textContent = 'Escolha sua jogada';
  passTurn.classList.add('hidden');
  disableChoices(false);
}


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