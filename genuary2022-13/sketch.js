let s;
let BG = 130;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 500);
console.log(seed);

function setup() {
  // s = min(windowWidth, windowHeight);
  s = 600;
  createCanvas(800, 80);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  smooth();
  // noLoop();

  // colorMode(HSB);
}

function draw() {
  background(255);
  translate(0, height / 2);
  noFill();
  let c = color("red");
  c.setAlpha(70);
  push();
  stroke(c);
  beginShape();
  for (let y = 20 - height / 2; y <= -20 + height / 2; y += 2) {
    for (let x = 10; x <= width - 10; x += 5) {
      if (noise(x / 90, y / 200, frameCount / 100) < 0.4) curveVertex(x, y);
    }
  }
  endShape();
  c = color("green");
  c.setAlpha(70);
  pop();
  push();
  translate(3, -3);
  stroke(c);
  beginShape();
  for (let y = 20 - height / 2; y <= -20 + height / 2; y += 2) {
    for (let x = 10; x <= width - 10; x += 5) {
      if (noise(x / 90, y / 200, frameCount / 100) < 0.4) curveVertex(x, y);
    }
  }
  endShape();
  pop();
  push();
  c = color("blue");
  c.setAlpha(70);
  stroke(c);
  translate(-3, 3);
  rotate(1 * noise(frameCount / 100));
  beginShape();
  for (let y = 20 - height / 2; y <= -20 + height / 2; y += 2) {
    for (let x = 10; x <= width - 10; x += 5) {
      if (noise(x / 90, y / 200, frameCount / 100) < 0.4) curveVertex(x, y);
    }
  }
  endShape();
  pop();
  // push();
  // rotate(1);
  // stroke("grey");
  // beginShape();
  // for (let y = 20 - height / 2; y <= -20 + height / 2; y += 2) {
  //   for (let x = 10; x <= width - 10; x += 5) {
  //     if (noise(x / 90, y / 200, frameCount / 100) < 0.4) curveVertex(x, y);
  //   }
  // }
  // endShape();
  // pop();
}
