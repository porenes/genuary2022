let s;
let BG = 30;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 500);
console.log(seed);
let squares = new Array();

var circles = [];
var startingR = 64;
var currentR = startingR;
var maxLoops = 1000;

function setup() {
  // s = min(windowWidth, windowHeight);
  s = 800;
  createCanvas(s, s);
  angleMode(DEGREES);
  // rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  smooth();
  noLoop();
  noFill();

  colorMode(HSB);
  // BG = Math.floor(360 * random());

  generateCircles();
}

function draw() {
  background(BG);
  strokeWeight(0.2);
  for (var i = 0; i < circles.length; i++) {
    circles[i].draw();
  }
}

function generateCircles() {
  currentR = startingR;
  var loopCycle = maxLoops;

  while (loopCycle > 0) {
    var circle = new Circle(random(width), random(height), currentR);

    var available = true;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      if (dist(circle.x, circle.y, other.x, other.y) < circle.r + other.r) {
        available = false;
        break;
      }
    }

    if (available) {
      circles.push(circle);
    }

    loopCycle--;
    if (loopCycle === 0) {
      if (currentR > 1) {
        currentR = currentR - 1;
        loopCycle = maxLoops;
      }
    }
  }
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}

Circle.prototype.draw = function () {
  push();
  noStroke();
  stroke(noise(this.x * 100, this.y) * 255, 255, 255);
  translate(this.x, this.y);
  if (noise(this.r > 0.5)) {
    beginShape();
    let i = 0;
    while (i < (400 * this.r) / 40) {
      let a = random(360);
      vertex(cos(a) * this.r, sin(a) * this.r);
      i++;
    }
    endShape();
  } else {
    ellipse(0, 0, this.r);
  }

  pop();
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
  generateCircles();
};
