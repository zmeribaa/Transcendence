import p5Types from 'p5';

function sketch (p5: p5Types) {
	let x = 100;
	let y = 100;
	p5.setup = () => {
		p5.createCanvas(700, 410);
	};
	p5.draw = () => {
		p5.background(0);
		p5.fill(255);
		p5.rect(x, y, 50, 50);
	};
}


export default sketch;