let s;
let BG = 10;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);

class Nebula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.a = random(-10, 10);
    this.rX = random(0.3, 0.4);
    this.rY = 0.5 * random(0.1, 0.2);
    this.spots = new Array();
    let nbS = 2000;
    colorMode(HSB);
    while (this.spots.length < nbS) {
      let ng = random(360);
      let x = random(-cos(ng), cos(ng)) * this.rX;
      let y = random(-sin(ng), sin(ng)) * this.rY;
      let c1 = color(240, 100, 20, 50);
      let c2 = color(300, 100, 20, 50);
      let c = lerpColor(c1, c2, noise(ng * 1000));
      this.spots.push({ x, y, r: 0.03, c });
    }
    console.log(this.spots);
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
let neb;
let stars = new Array();
setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  neb = new Nebula(0.5, 0.5);
  while (stars.length < 100) {
    stars.push(new Star(random(0.1, 0.9), random(0.1, 0.9)));
  }
  noLoop();
};

draw = () => {
  background(BG);
  blendMode(SCREEN);
  strokeWeight(s / 40000);
  stars.forEach((st) => st.draw(s));
  blendMode(SCREEN);
  neb.draw(s);
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
