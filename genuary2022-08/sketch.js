let s;
let BG = 130;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 500);
console.log(seed);

let points = new Array();
let STEP = 1000;
setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);

  for (let i = 0.1; i < 0.8; i += 0.1) {
    for (let j = 0.1; j < 0.8; j += 0.1) {
      if (random() > 0.4) {
        let k = 0;
        while (k < 100) {
          points.push({
            x: random(i, i + 0.1),
            y: random(j, j + 0.1),
          });
          k++;
        }
      }
    }
  }
  BG = Math.floor(360 * random());
  STEP = Math.floor(random(10, 100)) * 100;
  // noLoop();
  // strokeCap(SQUARE);
};

draw = () => {
  colorMode(HSB);
  background(BG, 100, 60);
  push();
  noFill();
  beginShape();
  vertex(0, s / 2);
  vertex(0, s / 2);

  stroke(200);
  strokeWeight((1.5 * s) / STEP);
  points
    .sort((a, b) => dist(a.x, a.y, b.x, b.y))
    .forEach((p) => {
      curveVertex(p.x * s, p.y * s);
    });
  vertex(s, s / 2);
  vertex(s, s / 2);
  endShape();
  pop();
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
