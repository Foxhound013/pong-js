var canvas = document.createElement('canvas');
//set canvas properties
canvas.id = "pong";
canvas.width = 600;
canvas.height = 600;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

//initialize the board
var dx0, dx1, dy0, dy1, width, height;
dx0 = 10; //x-position of player 0
dx1 = 580; //x-position of player 1
dy0 = 270; //y-position of player 0
dy1 = 270; //y-position of player 1
WIDTH = 10;
HEIGHT = 60;

var keys = []; //an array to hold key events. Allows multiple key presses

var ctx = canvas.getContext('2d');
init();

//initialize the pong board
function init() {
  //insert the canvas into the html
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);



  //initialize the paddles for each player
  ctx.fillStyle = 'purple';
  ctx.fillRect(dx0, dy0, WIDTH, HEIGHT);  //x-pos, y-pos, x-length, y-length
  ctx.fillRect(dx1, dy1, WIDTH, HEIGHT);

  //initialize the ball




  //draw out the center line
  ctx.beginPath();
  ctx.moveTo(300,0); //x-pos,y-pos
  ctx.lineTo(300,600);
  ctx.stroke();

  //enable movement
  return setInterval(draw, 10); //re-draws the frame at an interval of 10 milliseconds
};

//clear the screen and redraw in case there is movement
function draw() {
  clear();
  move(); //Allow player input

  //redraw paddles
  ctx.fillRect(dx0, dy0, WIDTH, HEIGHT);
  ctx.fillRect(dx1, dy1, WIDTH, HEIGHT);

  //draw out the center line
  ctx.beginPath();
  ctx.moveTo(300,0); //x-pos,y-pos
  ctx.lineTo(300,600);
  //ctx.lineTo(301,600);
  ctx.stroke();
};

//clears the entire screen
function clear() {
  ctx.clearRect(0,0,600,600);
};

//Uses the true/false keyCode array to allow multiple keys to fire commands
// at one time. Results in both players being able to move.
function move() {
  if (keys[38]) {
    //Prevent the paddle from going off the board
    if (dy1 > 0) {
      dy1 -= 3;
    }
  }
  if (keys[40]) {
    if(dy1 < 540) {
      dy1 += 3;
    }
  }
  if (keys [87]) {
    if (dy0 > 0) {
      dy0 -= 3;
    }
  }
  if (keys [83]) {
    if (dy0 < 540) {
      dy0 += 3;
    }
  }
};


//Enable the player to use the keyboard to move the paddles

//stores keyCode as true in that keyCode index position
window.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

//stores keyCode as false in that keyCode index position
window.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});


//
