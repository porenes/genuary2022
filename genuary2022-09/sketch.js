let s;
let BG = 200;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);
let BUILD_HEIGHT = 0.7;
let BUILD_WIDTH = 0.6;
let LINES = 10;
setup = () => {
  s = min(windowWidth / 1.5, windowHeight);
  createCanvas(s * 1.5, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
};

draw = () => {
  background(BG);
  translate(width / 2, height);
  line(
    (-BUILD_WIDTH * width) / 2,
    -BUILD_HEIGHT * height,
    (BUILD_WIDTH * width) / 2,
    -BUILD_HEIGHT * height
  );
  let upstep = (BUILD_WIDTH * width) / LINES;
  let downstep = width / LINES;
  for (let l = 0; l <= LINES; l++) {
    line(
      l * upstep + (-BUILD_WIDTH * width) / 2,
      -BUILD_HEIGHT * height,
      l * downstep - width / 2,
      0
    );
  }
};

windowResized = () => {
  s = min(windowWidth / 1.5, windowHeight);
  resizeCanvas(s * 1.5, s);
};
