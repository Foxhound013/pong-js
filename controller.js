var canvas = document.createElement('canvas');
//set canvas properties
canvas.id = "pong";
canvas.width = 600;
canvas.height = 600;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

//initialize the board
var xPos0, xPos1, yPos0, yPos1, width, height;
xPos0 = 10; //x-position of player 0
xPos1 = 580; //x-position of player 1
yPos0 = 270; //y-position of player 0
yPos1 = 270; //y-position of player 1
WIDTH = 10;
HEIGHT = 60;
var ctx = canvas.getContext('2d');
init();

//initialize the pong board
function init() {
  //insert the canvas into the html
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);



  //initialize the paddles for each player
  ctx.fillStyle = 'purple';
  ctx.fillRect(xPos0, yPos0, WIDTH, HEIGHT);  //x-pos, y-pos, x-length, y-length
  ctx.fillRect(xPos1, yPos1, WIDTH, HEIGHT);

  //draw out the center line
  ctx.beginPath();
  ctx.moveTo(300,0); //x-pos,y-pos
  ctx.lineTo(300,600);
  //ctx.lineTo(301,600);
  ctx.stroke();
  //enable movement
  return setInterval(draw, 10);
};


function draw() {
  clear();
  ctx.fillRect(xPos0, yPos0, WIDTH, HEIGHT);
  ctx.fillRect(xPos1, yPos1, WIDTH, HEIGHT);
};

//clears a rectangle, for now just player 0
function clear() {
  ctx.clearRect(0,0,20,600); //undraws player0's space
  ctx.clearRect(580,0,600,600);
};

//e stands for event here
function doKeyDown(e) {
  switch(e.keyCode) {
    case 38:
      yPos1 -= 5;
      break;
    case 40:
      yPos1 += 5;
      break;
    case 87:
      yPos0 -= 5;
      break;
    case 83:
      yPos0 += 5;
      break;
  }
}

window.addEventListener('keydown',doKeyDown,true)

//
