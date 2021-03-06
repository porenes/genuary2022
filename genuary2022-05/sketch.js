let s;
let BG = 30;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);

// Recording
const FRAMERECORD = 100;
const FRAMERATE = 12;
let RECORD = true;
let recordButton;

var capturer = new CCapture({
  format: "gif",
  verbose: false,
  framerate: FRAMERATE,
  workersPath: "libraries/",
});

let tiles = new Array();
class Tile {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.a = 0;
  }

  draw(s) {
    push();
    translate(this.x * s, this.y * s);
    rotate(this.a);
    fill(this.c);
    rect(0, 0, s / 120);
    pop();
  }

  move(s, reverse = false) {
    this.y += ((reverse ? -1 : 1) * (s * this.y * noise(this.y))) / 10000;
    this.x += ((reverse ? -1 : 1) * (s * this.x * noise(this.x))) / 10000;
    this.a += (reverse ? -1 : 1) * 10 * noise(this.x, this.y);
  }
}

setup = () => {
  s = min(windowWidth, windowHeight);
  // s = 600;
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  frameRate(FRAMERATE);
  noStroke();
  // noLoop();
  for (let x = -1 / 3; x <= 1 / 3; x += 1 / 60) {
    for (let y = -1 / 3; y <= 1 / 3; y += 1 / 60) {
      tiles.push(new Tile(x, y, 255 * noise(x, y)));
    }
  }
};
let reverse = false;
draw = () => {
  background(BG);
  translate(s / 2, s / 2);
  reverse = (frameCount + 1) % 50 == 0 ? !reverse : reverse;
  tiles.forEach((t) => t.draw(s));
  tiles.forEach((t) => t.move(s, reverse));

  if (RECORD) {
    if (frameCount == 1) {
      capturer.start();
    }
    capturer.capture(document.getElementById("defaultCanvas0"));

    if (frameCount === FRAMERECORD) {
      capturer.stop();
      capturer.save();
      return;
    }
  }
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
