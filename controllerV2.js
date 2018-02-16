var canvas = document.createElement('canvas');
//set canvas properties
canvas.id = "pong";
canvas.width = 600;
canvas.height = 600;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
var ctx = canvas.getContext('2d');

//define function constructor for players
function Player(dx, dy, width, height, velocity, playerColor, score, name) {
    this.dx = dx; //x-position
    this.dy = dy; //y-position
    this.width = width;
    this.height = height;
    this.velocity = velocity; //negative is up, positive is down
    this.playerColor = playerColor;
    this.score = score;
    this.name = name;
}
//set the base values for each player in a global context
var player0 = new Player(10, 270, 10, 60, 0, 'purple', 0, 'Player 1');
var player1 = new Player(580, 270, 10, 60, 0, 'purple', 0, 'Player 2');

//define a function constructor for the ball
function Ball(dx, dy, width, height, ballColor, xVelocity, yVelocity) {
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.ballColor = ballColor;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
}
//set the base values for the ball in a global context
var ball = new Ball((canvas.width/2 -5), (canvas.height/2 -5), 10, 10, 'purple', 0, 0);
var direction = Math.round(Math.random()); //initialize the direction of the ball, evaluates to 0 or 1 in order to determine which direction to go at the start
//-------------------------------------------------------------------
//enable multi-key input for two player mode
var keys = []; //an array to hold key events. Allows multiple key presses

//Uses the true/false keyCode array to allow multiple keys to fire commands
// at one time. Results in both players being able to move.
function move() {
    if (keys[38]) {
      //Prevent the paddle from going off the board
      if (player1.dy > 0) {
        player1.dy -= 3; //move the paddle up
        player1.velocity = -3; //impart velocity
      }
    }
    if (keys[40]) {
      if(player1.dy < 540) {
        player1.dy += 3; //move paddle down
        player1.velocity = 3;
      }
    }
    if (keys [87]) {
      if (player0.dy > 0) {
        player0.dy -= 3;
        player0.velocity = -3;
      }
    }
    if (keys [83]) {
      if (player0.dy < 540) {
        player0.dy += 3;
        player0.velocity = 3;
      }
    }
};

  //stores keyCode as true in that keyCode index position
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });

  //stores keyCode as false in that keyCode index position
  window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    //reset velocities on keyup
    player0.velocity = 0;
    player1.velocity = 0;
  });

  //-------------------------------------------------------------------
  //initialize the games components (players, ball, board, etc)
  init();
  function init() {
    //insert the canvas into the html
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    //initialize the paddles for each player
    ctx.fillStyle = player0.playerColor;
    //x-pos, y-pos, x-length, y-length
    ctx.fillRect(player0.dx, player0.dy, player0.width, player0.height);
    ctx.fillStyle = player1.playerColor;
    ctx.fillRect(player1.dx, player1.dy, player1.width, player1.height);

    //initialize the ball
    ctx.fillStyle = ball.ballColor;
    ctx.fillRect(ball.dx, ball.dy, ball.width, ball.height);

    //draw out the center line
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0); //x-pos,y-pos
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();

    //enable movement
    return setInterval(update, 10); //re-draws the frame at an interval of 10 milliseconds
  };

//-------------------------------------------------------------------
//Enable movement (refresh the screen through redrawing the various objects)

function update() {
    clear();
    move(); //Allow player input
    //redraw paddles
    ctx.fillRect(player0.dx, player0.dy, player0.width, player0.height);
    ctx.fillRect(player1.dx, player1.dy, player1.width, player1.height);

    //update Ball position and check to see if it hits anything
    updateBall();

    //redraw the ball
    ctx.fillRect(ball.dx, ball.dy, ball.width, ball.height);

    //redraw the center line
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

//Update the ball
function updateBall() {
    if (direction === 1) {
        ball.dx += 2;

        checkCollision();
        if (ball.yVelocity !== 0) {
          ball.dy += ball.yVelocity;
        }
    } else if (direction === 0) {
        ball.dx -= 2;

        checkCollision();
        if (ball.yVelocity !== 0) {
          ball.dy += ball.yVelocity;
        }
    }
}

//check to see if the ball has collided with anything

function checkCollision() {
  //is the ball at the same x range as the paddle
  if (ball.dx === (player0.dx + player0.width/2)) {
    paddleArray = paddleRange();
    //is the ball at the same y range as the paddle
    if (paddleArray.includes(ball.dy)) {
      direction = 1;
      // if velocity is
      if (player0.velocity !== 0) {
        //ball.dy += player0.velocity;
        ball.yVelocity += player0.velocity;
      }
    }
  } else if (ball.dx === (player1.dx - player1.width/2)) {
    paddleArray = paddleRange();
    if (paddleArray.includes(ball.dy)) {
      direction = 0;
      // if velocity is
      if (player1.velocity !== 0) {
        //ball.dy += player0.velocity;
        ball.yVelocity += player1.velocity;
      }
    }
  }
  //check to see if ball has collided with top or bottom, switch velocity
  if (ball.dy < 0 || ball.dy > 590) {
    ball.yVelocity = -ball.yVelocity;
    //console.log("hi")
  }
}

//Check paddle y range
function paddleRange() {
  //create an array to check the y range of the paddle at any point in time
  paddleArray = []
  if (direction === 0) {
    for (var i = player0.dy; i < (player0.dy+player0.height); i++) {
      paddleArray.push(i);
    }
  } else if (direction === 1) {
    for (var i = player1.dy; i < (player1.dy+player1.height); i++) {
      paddleArray.push(i);
    }
  }
  return paddleArray;
}

//calculate the velocity of the paddle and impart it to the ball
function velcoityCalc () {}
