let random = Math.floor(Math.random()*100)+1;
let tries = 0;

function checkGuess(){
 const guess = Number(document.getElementById('guess').value);
 const message = document.getElementById('message');

 tries++;
 document.getElementById('tries').textContent = tries;

 if(guess === random){
   message.textContent = 'Você acertou!';
 }
 else if(guess < random){
   message.textContent = 'O número é maior';
 }
 else{
   message.textContent = 'O número é menor';
 }
}

function restartGame(){
 random = Math.floor(Math.random()*100)+1;
 tries = 0;
 document.getElementById('tries').textContent = 0;
 document.getElementById('message').textContent = '';
 document.getElementById('guess').value = '';
}