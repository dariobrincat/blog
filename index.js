const canvas = document.getElementById("pageCanvas");
const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;

ctx.canvas.width = w;
ctx.canvas.height = h;

const md = new Image();
md.src = "MD.jpg";

const movScale = 50;
const paddleWidth = w/5;
const paddleHeight = h/30;
const paddleY = h*0.90;

const y = h*0.90;
var x = w/2-paddleWidth/2;

const blocksN = 5;
const blocksM = 8;
const blockWidth = w*0.99/blocksM;
const blockHeight = h*(2/5)/blocksN;

var ballX = x + paddleWidth / 2;
var ballY = y - paddleHeight*1.1;
var ballVelX = -1;
var ballVelY = -1;
const R = w/100;

var gameRunning = false;

function draw() {

	// clear screen
	ctx.clearRect(0, 0, w, h);

	// draw blocks
	for (var i = 0; i < blocksN; i++) {
		for (var j = 0; j < blocksM; j++) {
			if (blocks[i][j] == true) {
				ctx.drawImage(md, j*blockWidth, i*blockHeight, blockWidth, blockHeight);
			}
		}
	}

	// draw ball
	ctx.beginPath();
	ctx.arc(ballX, ballY, R, 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();

	// draw paddle
	ctx.drawImage(md, x, paddleY, paddleWidth, paddleHeight);
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
		// left key
    	event.preventDefault(); // stop scroll
    	if (gameRunning) x = Math.max(0, x - w/movScale);
    }
    else if(event.keyCode == 39) {
    	event.preventDefault(); // stop scroll
        // right key
        if (gameRunning) x = Math.min(w - paddleWidth, x + w/movScale);
    }
    else if(event.keyCode == 32) {
    	event.preventDefault();
    	// space key
    	if (!gameRunning) {
    		gameRunning = true;
    		ballVelX = w/movScale;
    		ballVelY = -h/movScale;
    	}
    }
});

setInterval(GameLoop, 33); // 33 milliseconds = ~ 30 frames per sec

var blocks = new Array(blocksN);

for (var i = 0; i < blocksM; i++) {
  blocks[i] = new Array(blocksM);
  for (var j = 0; j < blocksM; j++) {
  	blocks[i][j] = true;
  }
}

function updateBall() {
	// collide with walls
	if (ballX + ballVelX <= 0) {
		ballX = 0;
		ballVelX *= -1;
	} else if (ballX + ballVelX >= w) {
		ballX = w;
		ballVelX *= -1;
	} else { ballX += ballVelX; }
	if (ballY + ballVelY <= 0) {
		ballY = 0;
		ballVelY *= -1;
	} else if (ballY + ballVelY >= h) {
		ballY = h;
		gameRunning = false;
	}
	else { ballY += ballVelY; }

	// collide with paddle
	if (ballX >= x && ballX <= x+paddleWidth && ballY+R >= y && ballY+R <= y+paddleHeight) {
		ballVelY *= -1;
	}

	// block collision checked in updateBlocks()
}

function updateBlocks() {
	// draw blocks
	for (var i = 0; i < blocksN; i++) {
		for (var j = 0; j < blocksM; j++) {
			if (blocks[i][j] == true) {
				// check if ball collided with this block
				// j*blockWidth, i*blockHeight, blockWidth, blockHeight
				if (ballX+R >= j*blockWidth && ballX-R <= (j+1)*blockWidth) {
					// in x region of block
					if (ballY-R <= (i+1)*blockHeight && ballY+R >= i*blockHeight) {
						// hit with top of ball
						ballVelY *= -1;
						ballVelX *= -1;
						blocks[i][j] = false;
					}
				}
			}
		}
	}
}

function GameLoop() {
	if (gameRunning) {
		updateBall();
		updateBlocks();
	}
    draw();
}
