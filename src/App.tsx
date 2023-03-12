import React, { useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const PongGame: React.FC = () => {
	const [paddleY1, setpaddleY1] = useState<number>(20);
	const speed: number = 5;
	const paddleX1: number = 10;
	const paddleX2: number = 1370;
	const [paddleY2, setpaddleY2] = useState<number>(20);
	const [ballX, setballX] = useState<number>(700);
	const [ballY, setballY] = useState<number>(350);
	const [ballSpeedX, setballSpeedX] = useState<number>(5);
	const [ballSpeedY, setballSpeedY] = useState<number>(5);

  const setup:any = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1400, 700).parent(canvasParentRef);
  };

  const draw: any = (p5: p5Types) => {
    p5.background(97, 72, 217);
    p5.noStroke();
    p5.rect(paddleX1, paddleY1, 20, 100);
    if (p5.keyIsPressed) {
      if (p5.keyCode === p5.UP_ARROW && paddleY1 > 20) {
        setpaddleY1((prevpaddleY1) => prevpaddleY1 - speed);
      } else if (p5.keyCode === p5.DOWN_ARROW && paddleY1 < 580) {
        setpaddleY1((prevpaddleY1) => prevpaddleY1 + speed);
      }
    }
	// draw another paddle in the opposite side
	p5.rect(paddleX2, paddleY2, 20, 100);
	if (p5.keyIsPressed) {
		if (p5.keyCode === p5.RIGHT_ARROW && paddleY2 > 20) {
			setpaddleY2((prevpaddleY2) => prevpaddleY2 - speed);
		} else if (p5.keyCode === p5.LEFT_ARROW && paddleY2 < 580) {
			setpaddleY2((prevpaddleY2) => prevpaddleY2 + speed);
		}
	}
	for (let i = 0; i < 700; i += 20) {
		p5.stroke(255);
		p5.strokeWeight(2);
		p5.line(700, i, 700, i + 10);
	}

	// draw the ball
	p5.fill(255);
	p5.ellipse(ballX, ballY, 20, 20);	
	setballX((prevballX) => prevballX + ballSpeedX);
	setballY((prevballY) => prevballY + ballSpeedY);
	if (ballX > 1380 || ballX < 20) {
		setballSpeedX((prevballSpeedX) => -prevballSpeedX);
	}
	if (ballY > 680 || ballY < 20) {
		setballSpeedY((prevballSpeedY) => -prevballSpeedY);
	}
	// check if the ball hits the paddle
	if (ballX < 30 && ballY > paddleY1 && ballY < paddleY1 + 100) {
		setballSpeedX((prevballSpeedX) => -prevballSpeedX);
	}
	if (ballX > 1350 && ballY > paddleY2 && ballY < paddleY2 + 100) {
		setballSpeedX((prevballSpeedX) => -prevballSpeedX);
	}
	

	// draw the score
	p5.fill(255);
	p5.textSize(32);
	p5.text('0', 600, 50);
	p5.text('0', 800, 50);

  };

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  );
};

export default PongGame;
