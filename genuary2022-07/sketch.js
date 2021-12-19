let s;
let BG = 130;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 500);
console.log(seed);

let points = new Array();
let STEP;
setup = () => {
  s = min(windowWidth, (windowHeight * 11) / 8);
  createCanvas(s, (s * 8) / 11);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  while (points.length < 500) {
    points.push({ x: random(), y: random(0.005, 0.995) });
  }
  // colorMode(HSB);
  STEP = random(5, 25);
  noLoop();
  strokeCap(SQUARE);
};

draw = () => {
  background(BG);
  background(155, 50, 50);
  translate(0.01 * s, 0.01 * s);
  scale(0.98, 0.9);
  for (let n = 0; n < STEP; n++) {
    push();
    noFill();
    // beginShape();
    stroke((200 * n) / STEP);
    translate(0, (height * n) / STEP);
    points
      .filter((p) => p.y < (n + 1) / STEP && p.y > n / STEP)
      .sort((a, b) => b.x - a.x)
      .forEach((p) => {
        push();
        translate(s * p.x, 0);
        scale(1, 0.9);
        strokeWeight((noise(p.x) * s) / 10);
        line(0, 0, 0, (height * 1) / STEP);
        // curveVertex(p.x * s, p.y * height);
        pop();
      });
    // endShape();
    pop();
  }
};

windowResized = () => {
  s = min(windowWidth, (windowHeight * 11) / 8);
  resizeCanvas(s, (s * 8) / 11);
};
