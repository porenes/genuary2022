let s;
let BG = 10;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);

class Nebula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.a = random(-20, 20);
    this.rX = random(0.1, 0.3);
    this.rY = 0.04 * random(0.1, 0.2);
    this.spots = new Array();
    let nbS = 5000 * random();
    colorMode(HSB);
    let c1 = color(240 * random(), 100, 20, 50);
    let c2 = color(300 * random(), 100, 20, 50);
    while (this.spots.length < nbS) {
      let ng = random(360);
      let x = random() * random(-cos(ng), cos(ng)) * this.rX;
      let y = 0.5 * random() * random(-sin(ng), sin(ng)) * this.rY;
      let c = lerpColor(c1, c2, noise(ng * 1000));
      this.spots.push({ x, y, r: 0.001, c });
    }
  }

  draw(s) {
    push();
    translate(this.x * s, this.y * s);
    rotate(this.a);
    // ellipse(0, 0, this.rX * s, this.rY * s);
    noStroke();
    this.spots.forEach((spt) => {
      fill(spt.c);
      push();
      translate(spt.x * s, spt.y * s);
      // point(0, 0);
      circle(0, 0, spt.r * s);
      pop();
    });
    pop();
  }
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(0.001, 0.02);
  }
  draw(s) {
    stroke(250, 10);
    push();
    translate(this.x * s, this.y * s);
    for (let p = 0; p < this.r; p += (1 * this.r) / 50) {
      line(0, (this.r - p) * s, p * s, 0);
      line(0, -(this.r - p) * s, -p * s, 0);
      line(0, (this.r - p) * s, -p * s, 0);
      line(0, -(this.r - p) * s, p * s, 0);
    }
    rotate(45);
    scale(0.5);
    for (let p = 0; p < this.r; p += this.r / 10) {
      line(0, (this.r - p) * s, p * s, 0);
      line(0, -(this.r - p) * s, -p * s, 0);
      line(0, (this.r - p) * s, -p * s, 0);
      line(0, -(this.r - p) * s, p * s, 0);
    }
    // circle(0, 0, this.r * s);
    pop();
  }
}
let nebs = new Array();
let stars = new Array();
setup = () => {
  s = max(windowWidth, windowHeight);
  createCanvas(s, windowHeight);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  while (nebs.length < 200) {
    nebs.push(new Nebula(random(), random()));
  }
  while (stars.length < 100) {
    stars.push(new Star(random(0.1, 0.9), random(0.1, 0.9)));
  }
  noLoop();
};

draw = () => {
  background(BG);
  blendMode(SCREEN);
  strokeWeight(s / 40000);
  // stars.forEach((st) => st.draw(s));
  // blendMode(SCREEN);
  // neb.draw(s);
  nebs.forEach((n) => n.draw(s));
};

windowResized = () => {
  s = max(windowWidth, windowHeight);
  createCanvas(s, windowHeight);
};
