let s;
let BG = 30;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);

setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
};

draw = () => {
  background(BG);
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
