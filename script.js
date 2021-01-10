let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // desenha o contexto no canvas
let box = 32; // tamanho dos quadrarinhos do jogo
let cont = 0;
let iniciar = false;
let snake = [];
snake[0] = {
  x: 8 * box, //aqui é dado um tamanho para o elemento que vai ser a cobra
  y: 8 * box
}

let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 +1) * box, //math.random criar nrs aleatórios
  y: Math.floor(Math.random() * 15 +1) * box
}

function criarBG(){ //BG é background
  context.fillStyle = "purple"; // cor do BG
  context.fillRect(0,0, 16 * box, 16 * box);
}

function criarCobra(){
  if(iniciar == true){
    for(i = 0; i < snake.length; i++){
      context.fillStyle = "lightgreen";
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }
}

function criarComida(){
  if(iniciar == true){
  context.fillStyle = "orange";
  context.fillRect(food.x, food.y, box, box); //variavel food para definida antes
  }
}

document.addEventListener('keydown', update); //keydown evento de clique dos teclados

function update (event){
  if(event.keyCode == 37 && direction != "right") direction ="left";
  if(event.keyCode == 38 && direction != "down") direction ="up";
  if(event.keyCode == 39 && direction != "left") direction ="right";
  if(event.keyCode == 40 && direction != "up") direction ="down";

}

function iniciarJogo(){
// garante que quando sair do canvas apareça do outro lado, evitando valores negatvos
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > (15 * box) && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;


// se a posição de x for igual à de y (quando a cobra embate nela mesma) o jogo pára
 for(i = 1; i < snake.length; i++){
   if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
     clearInterval(jogo);
     alert('Game Over! Tenta de novo');
   }
 }

  criarBG();
  criarCobra();
  criarComida();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

//coordenadas e direção da cobra
// se a posição for right ou down acrecenta 1 quadrado(box)
// se a posição for left ou up, diminuiu um quadrado
  if(direction == "right") snakeX += box;
  if(direction == "left")  snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box;

  if(snakeX != food.x || snakeY != food.y){
    snake.pop();
  }else{
    food.x = Math.floor(Math.random() * 15 +1) * box;
    food.y = Math.floor(Math.random() * 15 +1) * box;
    cont++;
  }



  let newHead = {
    x:snakeX,
    y:snakeY
  }

  snake.unshift(newHead);
  }

let jogo = setInterval(iniciarJogo, 200); // aqui muda a velocidade da cobra



function botaoIniciar(){
  iniciar = true;

}
