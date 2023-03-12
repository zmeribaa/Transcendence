//give variables starting value inside setup
var paddleX= 160;
var speed=5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
   background(220);
	
//draw a paddle 
	
	rect(paddleX,height-50,100,20);
	
	//move the paddle with the arrow keys 
	if(keyIsPressed){
		if(keyCode== RIGHT_ARROW && paddleX <width-100){
		paddleX = paddleX + speed;
			}
		if(keyCode == LEFT_ARROW && paddleX > 0){
		paddleX = paddleX - speed;
		}
	}
}
	


