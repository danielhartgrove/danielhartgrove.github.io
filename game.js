
var canvas;
var ctx;
var score = 0;
var player;
var alive = true;

// Player class -- contains all player related functions
class Player{

  constructor(){
    this.width = 100;
    this.velocity = -10;
    this.height = 100;
    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = canvas.height - this.height;
  }

  draw(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    loop(ctx);
  }

  gameLoop(){
    //gravity code and stuff here
  }
}

// Game functions -- contains all game related functions
function drawBackground(){
  ctx.fillStyle = "#252525";
  ctx.fillRect(0,0,canvas.height,canvas.width);
}

function loop(ctx){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(ctx);
  player.gameLoop();
  player.draw(ctx);
}

window.onload = function(){
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;
  ctx.fillStyle = "#252525";
  ctx.fillRect(0,0,canvas.height,canvas.width);
  player = new Player();
  loop(ctx);
};









