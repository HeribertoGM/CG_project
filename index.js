let angle = 0;

function setup() {
	createCanvas(400, 300, WEBGL);
}

function draw() {
	background(175);

	rectMode(CENTER);
	fill(0, 255, 255);
	rotateX(angle);
	rotateY(angle);
	box(50);

	angle += 0.03;
}
