let WHITE = [255, 255, 255];
let RED = [255, 69, 0];
let origin = null;
let camera = null;
let mapSize = 0;

let lock = null;

let blockTexture = null;
let floorTexture = null;
let pedestalTexture = null;
let gem = null;

function preload() {
	blockTexture = loadImage("./resources/Mossy_Cobblestone.png");
	floorTexture = loadImage("./resources/Grass_block.png");
	pedestalTexture = loadImage("./resources/Stone_block.png");
	gem = loadModel("./resources/gem.obj");
}

function setup() {
	lock = false;
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
	camera.setPosition(25, -75, 75); // (25 + 50 * 3, -75, 25 + 50 * 5); //
	// Map/floor scale reference
	mapSize = mapa.length * 50;
	printPos(camera);
}

function draw() {
	// Generals
	background(175);
	angleMode(DEGREES);
	lightFalloff(0.01, 0, 0.0001);
	pointLight(WHITE, camera.eyeX, camera.eyeY, camera.eyeZ);
	// Floor
	push();
	texture(floorTexture);
	noStroke();
	rotateX(90);
	translate(origin.x + mapSize / 2, origin.z + mapSize / 2);
	plane(mapSize + 5, mapSize + 5);
	pop();

	// Build Maze
	push();
	texture(blockTexture);
	stroke(0);
	translate(origin.x - 25, origin.y - 26, origin.z + 75);
	box(50);
	translate(0, -50, 0);
	box(50);
	pop();

	for (let i = 0; i < mapa.length; i++) {
		for (let j = 0; j < mapa[i].length; j++) {
			if (mapa[i][j]) {
				// Blocks
				push();
				texture(blockTexture);
				stroke(0);
				translate(
					origin.x + 25 + i * 50,
					origin.y - 26,
					origin.z + 25 + j * 50
				);
				box(50);
				translate(0, -50, 0);
				box(50);
				pop();
			}
		}
	}

	// Pedestal
	for (let e of [
		[25, 50, 26],
		[30, 5, 47],
		[33, 5, 50],
	]) {
		push();
		texture(pedestalTexture);
		noStroke();
		translate(origin.x + 275, origin.y - e[2], origin.z + 275);
		box(e[0], e[1], e[0]);
		pop();
	}

	// Gem
	push();
	translate(origin.x + 275, origin.y - 75, origin.z + 275);
	pointLight(WHITE, origin.x + 275, origin.y - 230, origin.z + 275);
	rotateZ(172);
	rotateY(frameCount * 1);
	scale(20);
	noStroke();
	specularMaterial(RED, 255);
	model(gem);
	pop();
}

// Move Camera
function keyPressed() {
	if (!lock) {
		if (keyCode === LEFT_ARROW) {
			camera.pan(90);
		} else if (keyCode === RIGHT_ARROW) {
			camera.pan(-90);
		} else if (keyCode === UP_ARROW) {
			if (canGo(camera)) {
				camera.move(0, 0, -50);
			}
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
			if (
				mapa[Math.round((camera.eyeX + 25) / 50)][
					Math.round((camera.eyeZ + 25) / 50) - 1
				] != null
			) {
				return !mapa[Math.round((camera.eyeX + 25) / 50)][
					Math.round((camera.eyeZ + 25) / 50) - 1
				];
			} else {
				lock = true;
				return false;
			}
		} else if (camera.centerX > 0 && camera.centerZ < 0) {
			if (
				mapa[Math.round((camera.eyeX + 25) / 50) - 1][
					Math.round((camera.eyeZ + 25) / 50) - 2
				] != null
			) {
				return !mapa[Math.round((camera.eyeX + 25) / 50) - 1][
					Math.round((camera.eyeZ + 25) / 50) - 2
				];
			} else {
				lock = true;
				return false;
			}
		} else if (camera.centerX < 0 && camera.centerZ > 0) {
			if (
				mapa[Math.round((camera.eyeX + 25) / 50) - 2][
					Math.round((camera.eyeZ + 25) / 50) - 1
				] != null
			) {
				return !mapa[Math.round((camera.eyeX + 25) / 50) - 2][
					Math.round((camera.eyeZ + 25) / 50) - 1
				];
			} else {
				lock = true;
				return false;
			}
		} else {
			if (
				mapa[Math.round((camera.eyeX + 25) / 50) - 1][
					Math.round((camera.eyeZ + 25) / 50)
				] != null
			) {
				return !mapa[Math.round((camera.eyeX + 25) / 50) - 1][
					Math.round((camera.eyeZ + 25) / 50)
				];
			} else {
				lock = true;
				return false;
			}
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
