let s;
let BG = 30;
//TODO add color palettes

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 500);
console.log(seed);

let nbSx;
let nbSy;
let space;
let xA = new Array();
let yA = new Array();
let hS;
let wS;
setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  // colorMode(HSB),

  // noLoop();
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  hS = Math.floor(random(5, 10)) * 10;
  wS = Math.floor(random(5, 10)) * 10;
  let blendS = random([BLEND, BLEND, DODGE]);
  if (random() < 0.8) {
    drawingContext.shadowOffsetX = -7;
    drawingContext.shadowOffsetY = 7;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = "black";
  } else {
    blendMode(DODGE);
  }
  noLoop();
  // console.log(xA, yA);
};

draw = () => {
  clear();
  background(BG);
  noStroke();
  fill(255, 80);
  let freqS = 0.99 * random();
  let angleS = Math.floor(random(1, 5));
  let scrambleS = Math.floor(random(0, 10));
  let isRotated = random() > 0.6;
  let spacS = random() > 0.5 ? -1 : 1;
  console.log(angleS, hS, wS, freqS);
  translate(random(0.4, 0.6) * s, random(0.4, 0.6) * s);
  for (let a = 0; a < 360; a += angleS) {
    rotate(a);
    for (let x = (spacS * 10 * s) / 100; x < s; x += s / 50) {
      push();
      translate(x, (scrambleS * (noise(x, a) * s)) / 100);
      isRotated ? rotate(noise(x)) : "";
      random() > freqS ? rect(0, 0, s / wS, s / hS) : "";
      pop();
    }
  }
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
