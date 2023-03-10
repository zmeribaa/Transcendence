import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

export const PongGame: React.FC = () => {
	const setup: any = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(1000, 1000).parent(canvasParentRef);
	};
	const draw: any = (p5: p5Types) => {
		const c = p5.color(97,72, 217);
		p5.background(c);
		p5.rect(0, 0, 20, 100);
	};
	return (
		<>
			<h1>Pong Game</h1>
			<Sketch setup={setup} draw={draw} />
			<p>Harawkan</p>
		</>
	);
};

export default PongGame;
