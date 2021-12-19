let s;
let BG = 30;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 500);
console.log(seed);

let nbSx;
let nbSy;
let space;
let xA = new Array();
let yA = new Array();
setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  nbSx = Math.floor(random(1, 5) * 10);
  nbSy = Math.floor(random(1, 5) * 10);
  console.log(nbSx, nbSy);
  while (xA.length < nbSx) {
    prevX = xA.length > 0 ? xA[xA.length - 1].x : 0;
    let x = prevX + norm(random(5 / nbSx), 1 / nbSx, 1 - prevX);
    xA.push({
      x,
      c: random(200),
    });
  }
  while (yA.length < nbSy) {
    prevY = yA.length > 0 ? yA[yA.length - 1].y : 0;
    let y = prevY + norm(random(5 / nbSy), 1 / nbSy, 1 - prevY);

    yA.push({
      y,
      c: random(200),
    });
  }
  // console.log(xA, yA);
};

draw = () => {
  clear();
  background(BG);
  strokeWeight(s / (0.5 * (nbSx + nbSy)));
  scale(0.9);
  translate(0.05 * s, 0.05 * s);
  xA.forEach((x) => {
    yA.forEach((y) => {
      push();
      blendMode(DODGE);
      // rotate(10 * (0.5 - noise(0.5 - x.x, 0.5 - y.y)));
      noise(x.x * 10) > 0.5 ? stroke(y.c / 2, 10) : stroke(y.c, 0, 0, 10);
      // stroke(0, y.c, 0, 50);
      // point(x.x * s, y.y * s);

      line(x.x, y.y * s, s, y.y * s);
      noise(y.y * 10) > 0.5 ? stroke(x.c / 2, 10) : stroke(x.c, 0, 0, 10);

      line(x.x * s, y.y, x.x * s, s);
      pop();
    });
  });
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
