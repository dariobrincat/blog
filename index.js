const canvas = document.getElementById("pageCanvas");
const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;

ctx.canvas.width = w;
ctx.canvas.height = h;

const md = new Image();
md.src = "MD.jpg";

const y = h*0.90;
var x = 0;

const movScale = 50;
const paddleWidth = w/5;
const paddleHeight = h/30;
const paddleY = h*0.90;

function draw() {

	// clear screen
	ctx.clearRect(0, 0, w, h);

	// draw paddle
	ctx.drawImage(md, x, paddleY, paddleWidth, paddleHeight);
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
		// left key
    	event.preventDefault(); // stop scroll
    	x = Math.max(0, x - w/movScale);
    }
    else if(event.keyCode == 39) {
    	event.preventDefault(); // stop scroll
        // right key
        x = Math.min(w - paddleWidth, x + w/movScale);
    }
});

setInterval(GameLoop, 33); // 33 milliseconds = ~ 30 frames per sec

function GameLoop() {
    draw();
}