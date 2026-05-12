const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const startingPlayerRadios = document.querySelectorAll('input[name="startingPlayer"]');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scorePlayerX = 0;
let scorePlayerO = 0;

const wins = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach((cell,index)=>{
 cell.addEventListener('click',()=>play(index));
});

// Adicionar event listeners para os radio buttons
startingPlayerRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (!gameActive) {
      currentPlayer = e.target.value;
      statusText.textContent = `Vez do ${currentPlayer}`;
    }
  });
});

function play(index){
 if(board[index] !== '' || !gameActive) return;

 board[index] = currentPlayer;
 cells[index].textContent = currentPlayer;

 if(checkWinner()){
   statusText.textContent = `${currentPlayer} venceu!`;
   updateScore(currentPlayer);
   gameActive = false;
   return;
 }

 if(!board.includes('')){
   statusText.textContent = 'Empate!';
   return;
 }

 currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
 statusText.textContent = `Vez do ${currentPlayer}`;
}

function checkWinner(){
 return wins.some(combo=>{
   return combo.every(index=> board[index] === currentPlayer);
 });
}

function updateScore(winner){
 if(winner === 'X'){
   scorePlayerX++;
   scoreX.textContent = scorePlayerX;
 } else {
   scorePlayerO++;
   scoreO.textContent = scorePlayerO;
 }
}

function restartGame(){
 board = ['', '', '', '', '', '', '', '', ''];
 gameActive = true;

 // Verificar qual jogador deve começar baseado na seleção
 const selectedStartingPlayer = document.querySelector('input[name="startingPlayer"]:checked').value;
 currentPlayer = selectedStartingPlayer;

 statusText.textContent = `Vez do ${currentPlayer}`;

 cells.forEach(cell=>{
   cell.textContent = '';
 });
}

function resetScoreboard(){
 scorePlayerX = 0;
 scorePlayerO = 0;
 scoreX.textContent = '0';
 scoreO.textContent = '0';

 // Reiniciar o jogo também
 restartGame();
}