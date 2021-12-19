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
  while (points.length < 5000) {
    points.push({ x: random(), y: random(0.005, 0.995) });
  }
  // colorMode(HSB);
  STEP = random(5, 15);
};

draw = () => {
  background(BG);
  strokeWeight(s / 100);
  for (let n = 0; n < STEP; n++) {
    push();
    stroke((200 * n) / STEP);
    noFill();
    beginShape();
    points
      .filter((p) => p.y < (n + 1) / STEP && p.y > n / STEP)
      .sort((a, b) => b.x - a.x)
      .forEach((p) => {
        curveVertex(p.x * s, p.y * height);
      });
    endShape();
    pop();
  }
};

windowResized = () => {
  s = min(windowWidth, (windowHeight * 11) / 8);
  resizeCanvas(s, (s * 8) / 11);
};
