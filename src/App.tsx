import React, { useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const PongGame: React.FC = () => {
	const cvsWidth: number = 1400;
	const cvsHeight: number = 700;
	interface Paddle {
		x: number;
		y: number;
		width: number;
		height: number;
		speed: number;
		top: number;
		bottom: number;
		left: number;
		right: number;
	}

	interface score {
		player1: number;
		player2: number;
	}
	interface Ball {
		x: number;
		y: number;
		speed: number;
		velocityX: number;
		velocityY: number;
		top: number;
		bottom: number;
		left: number;
		right: number;
	}

	const [score, setscore] = useState<score>({
		player1: 0,
		player2: 0,
	});

	const [paddle1, setpaddle1] = useState<Paddle>({
		x: 10,
		y: 20,
		width: 20,
		height: 100,
		speed: 5,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	});
	const [paddle2, setpaddle2] = useState<Paddle>({
		x: 1370,
		y: 20,
		width: 20,
		height: 100,
		speed: 5,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	});
	const [ball, setball] = useState<Ball>({
		x: cvsWidth / 2,
		y: cvsHeight / 2,
		speed: 5,
		velocityX: 5,
		velocityY: 5,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	});
	
  const setup:any = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(cvsWidth, cvsHeight).parent(canvasParentRef);
  };
  function collision(ball: Ball, player: Paddle): boolean {
	let ballRight: number = ball.x + ball.speed;
	let ballBottom: number = ball.y + ball.speed;
	let playerRight: number = player.x + 10;
	let playerTop: number = player.y;
	let playerBottom: number = player.y + player.height;
  
	return (
	  ballRight >= player.x &&
	  ball.x <= playerRight &&
	  ball.y >= playerTop &&
	  ballBottom <= playerBottom
	);
  }
  
  function update(): void {
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
  
	if (ball.y + ball.speed > cvsHeight || ball.y - ball.speed < 0) {
	  ball.velocityY = -ball.velocityY;
	}
  
	let player: Paddle = ball.x < cvsWidth / 2 ? paddle1 : paddle2;
  
	if (collision(ball, player)) {
	  let collidePoint: number = ball.y - (player.y + player.height / 2);
	  collidePoint = collidePoint / (player.height / 2);
  
	  let angleRad: number = (Math.PI / 4) * collidePoint;
	  let direction: number = ball.x < cvsWidth / 2 ? 1 : -1;
  
	  ball.velocityX = direction * ball.speed * Math.cos(angleRad);
	  ball.velocityY = ball.speed * Math.sin(angleRad);
	  ball.speed += 0.1;
	}
	if (ball.x - ball.speed < 0) {
	  setscore(prevScore => ({ ...prevScore, player2: prevScore.player2 + 1 }));
	  resetBall();
	} else if (ball.x + ball.speed > cvsWidth) {
	  setscore(prevScore => ({ ...prevScore, player1: prevScore.player1 + 1 }));
	  resetBall();
  }
}

  function resetBall(): void {
	ball.x = cvsWidth / 2;
	ball.y = cvsHeight / 2;
	ball.speed = 5;
	ball.velocityX = -ball.velocityX;
	ball.velocityY = -ball.velocityY;
	  }
  const draw: any = (p5: p5Types) => {
	  update();
    p5.background(97, 72, 217);
    p5.noStroke();
    p5.rect(paddle1.x, paddle1.y, 20, 100);
    if (p5.keyIsPressed) {
      if (p5.keyCode === p5.UP_ARROW && paddle1.y > 20) {
		setpaddle1(prevPaddle => ({ ...prevPaddle, y: prevPaddle.y - paddle1.speed }));
      } else if (p5.keyCode === p5.DOWN_ARROW && paddle1.y < 580) {
        setpaddle1(prevPaddle => ({ ...prevPaddle, y: prevPaddle.y + paddle1.speed }));
      }
    }
	// draw another paddle in the opposite side
	p5.rect(paddle2.x, paddle2.y, 20, 100);
	if (p5.keyIsPressed) {
		if (p5.keyCode === p5.RIGHT_ARROW && paddle2.y > 20) {
			setpaddle2(prevPaddle => ({ ...prevPaddle, y: prevPaddle.y - paddle2.speed }));
		} else if (p5.keyCode === p5.LEFT_ARROW && paddle2.y < 580) {
			setpaddle2(prevPaddle => ({ ...prevPaddle, y: prevPaddle.y + paddle2.speed }));
		}
	}
	// draw the middle line
	for (let i = 0; i < 700; i += 20) {
		p5.stroke(255);
		p5.strokeWeight(2);
		p5.line(700, i, 700, i + 10);
	}

	// draw the ball
	p5.fill(255);
	p5.ellipse(ball.x, ball.y, 20, 20);
	

	// draw the score
	p5.stroke(255);
	p5.strokeWeight(2);
	p5.textSize(50);
	p5.text(score.player1, 300, 100);
	p5.text(score.player2, 900, 100);

  };

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  );
};

export default PongGame;
