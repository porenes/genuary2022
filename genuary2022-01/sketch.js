let s;
let BG = 30;
const BORDER = 0.01;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);

/**
 * In order to make it resizable, everythis is drawn base on the current size of the canvas (s)
 */

/**
 * Array of something
 */
let stuffs = new Array();
let isHSB;
setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  isHSB = random() > 0.5;
  colorMode(HSB, 360, 100, 100, 100);

  //filling the array
  let rBase = (1 - 2 * BORDER) / 100;
  let c1 = color(360 * random(), 100, 100);
  let c2 = color(360 * random(), 100, 100);
  let centerX = random();
  let centerY = random();
  isHSB ? colorMode(HSB, 360, 100, 100, 100) : colorMode(RGB, 360);
  for (let y = BORDER + rBase; y <= 1 - BORDER; y += rBase) {
    for (let x = BORDER + rBase; x <= 1 - BORDER; x += rBase) {
      let r = rBase;
      // let c = lerpColor(c1, c2, stuffs.length / 10000);
      let c = lerpColor(c1, c2, dist(x, y, centerX, centerY) * 2);
      stuffs.push(new Something(x, y, r, c));
    }
    console.log(stuffs.length);
  }
};

draw = () => {
  // clear();
  // blendMode(OVERLAY);
  background(BG);
  stuffs.forEach((something) => something.draw(s));
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};

class Something {
  constructor(x, y, size = 1, c = "white") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.c = c;
  }
  draw(s) {
    noFill();
    push();
    stroke(this.c);
    // let sW = (0.5 * s) / 100;
    let sW = (noise(this.x, this.y) * s) / 100;
    strokeWeight(sW);
    // circle(this.x * s, this.y * s, this.size * s);
    translate(
      s * 0.03 * (0.5 - noise(0.5 - this.y, 0.5 - this.x)),
      s * 0.03 * (0.5 - noise(0.5 - this.y, 0.5 - this.x))
    );
    point(this.x * s, this.y * s);
    pop();
  }
}
