let origin = null;
let mapSize = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	origin = createVector(0, 0, 0);
	mapSize = mapa.length * 50;
}

function draw() {
	background(175);
	// rectMode(CORNER);
	push();
	rotateX(HALF_PI);
	fill(0, 255, 255);
	translate(origin.x + mapSize / 2, origin.z + mapSize / 2);
	plane(mapSize, mapSize);
	pop();

	for (let i = 0; i < mapa.length; i++) {
		for (let j = 0; j < mapa[i].length; j++) {
			if (mapa[i][j]) {
				push();
				translate(
					origin.x + 25 + i * 50,
					origin.y - 25,
					origin.z + 25 + j * 50
				);
				fill(255);
				box(50);
				pop();
			}
		}
	}

	camera(
		origin.x - 200,
		origin.y - 500,
		origin.z - 200,
		origin.x + mapSize / 2,
		origin.y,
		origin.z + mapSize / 2
	);
}
