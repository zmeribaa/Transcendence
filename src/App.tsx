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
	}
	interface Ball {
		x: number;
		y: number;
		speed: number;
		velocityX: number;
		velocityY: number;
	}
	const [paddle1, setpaddle1] = useState<Paddle>({
		x: 10,
		y: 20,
		width: 20,
		height: 100,
		speed: 5,
	});
	const [paddle2, setpaddle2] = useState<Paddle>({
		x: 1370,
		y: 20,
		width: 20,
		height: 100,
		speed: 5,
	});
	const [ball, setball] = useState<Ball>({
		x: cvsWidth / 2,
		y: cvsHeight / 2,
		speed: 5,
		velocityX: 5,
		velocityY: 5,
	});
	
  const setup:any = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(cvsWidth, cvsHeight).parent(canvasParentRef);
  };

  const draw: any = (p5: p5Types) => {
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
