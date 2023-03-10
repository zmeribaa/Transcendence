import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const PongGame: React.FC = () => {
	const setup: any = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(1400, 700).parent(canvasParentRef);
		const c = p5.color(97,72, 217);
		p5.background(c);
		p5.rect(0, 0, 20, 100);
	};
	return (
		<>
			<Sketch setup={setup} />
		</>
	);
};

export default PongGame;
