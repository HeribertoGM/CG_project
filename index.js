let origin = null;
let camera = null;
let mapSize = 0;

function setup() {
	// Space reference
	createCanvas(windowWidth, windowHeight, WEBGL);
	origin = createVector(0, 0, 0);
	// Camera / Player init
	camera = createCamera();
	camera.perspective(
		PI / 3,
		width / height,
		0.01,
		(height / 2 / tan(PI / 6)) * 10
	);
	camera.pan(-HALF_PI);
	camera.setPosition(25, -75, 75);
	// Map/floor scale reference
	mapSize = mapa.length * 50;
	printPos(camera);
}

function draw() {
	// Generals
	background(175);
	angleMode(DEGREES);
	// Floor
	push();
	rotateX(90);
	fill(0, 255, 255);
	translate(origin.x + mapSize / 2, origin.z + mapSize / 2);
	plane(mapSize, mapSize);
	pop();

	// Blocks
	for (let i = 0; i < mapa.length; i++) {
		for (let j = 0; j < mapa[i].length; j++) {
			if (mapa[i][j]) {
				push();
				translate(
					origin.x + 25 + i * 50,
					origin.y - 26,
					origin.z + 25 + j * 50
				);
				fill(255);
				box(50);
				pop();
				push();
				translate(
					origin.x + 25 + i * 50,
					origin.y - 76,
					origin.z + 25 + j * 50
				);
				fill(255);
				box(50);
				pop();
			}
		}
	}
}

// Move Camera
function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		camera.pan(90);
		// camera.move(-50, 0, 0);
	} else if (keyCode === RIGHT_ARROW) {
		camera.pan(-90);
		// camera.move(50, 0, 0);
	} else if (keyCode === UP_ARROW) {
		if (canGo(camera)) {
			camera.move(0, 0, -50);
		}
	}
	printPos(camera);
}

// Aux to verify collision
function canGo(camera) {
	try {
		if (
			camera.centerX > 0 &&
			camera.centerZ > 0 &&
			camera.centerX > camera.centerZ
		) {
			return !mapa[Math.round((camera.eyeX + 25) / 50)][
				Math.round((camera.eyeZ + 25) / 50) - 1
			];
		} else if (camera.centerX > 0 && camera.centerZ < 0) {
			return !mapa[Math.round((camera.eyeX + 25) / 50) - 1][
				Math.round((camera.eyeZ + 25) / 50) - 2
			];
		} else if (camera.centerX < 0 && camera.centerZ > 0) {
			return !mapa[Math.round((camera.eyeX + 25) / 50) - 2][
				Math.round((camera.eyeZ + 25) / 50) - 1
			];
		} else {
			return !mapa[Math.round((camera.eyeX + 25) / 50) - 1][
				Math.round((camera.eyeZ + 25) / 50)
			];
		}
	} catch {
		return false;
	}
}

// Aux to print camera Position and Orientation
function printPos(camera) {
	console.log(
		`${Math.round((camera.eyeX + 25) / 50) - 1},${
			Math.round((camera.eyeZ + 25) / 50) - 1
		}`
	);

	if (
		camera.centerX > 0 &&
		camera.centerZ > 0 &&
		camera.centerX > camera.centerZ
	)
		console.log("N");
	else if (camera.centerX > 0 && camera.centerZ < 0) console.log("O");
	else if (camera.centerX < 0 && camera.centerZ > 0) console.log("S");
	else console.log("E");
}
