let s;
let BG = 230;

//generating a seed that updates avery 30 sec
let seed = Math.floor(Date.now() / 5000);
console.log(seed);

let img;

preload = () => {
  img = loadImage("./img.jpeg");
};

setup = () => {
  s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  angleMode(DEGREES);
  rectMode(RADIUS);
  randomSeed(seed);
  noiseSeed(seed);
  noFill();
  noLoop();
};

draw = () => {
  background(BG);
  // image(img, 0, 0, s, s);

  let step = Math.ceil(s / 300);
  // for (let x = 0; x <= img.width; x++) {
  //   for (let y = 0; y <= img.height; y++) {
  //     let c = img.get(x, y);
  //     // console.log(c);
  //     if (c[0] > 20) console.log(c);
  //   }
  // }
  strokeWeight(s / 2000);
  console.log("entering draw hell");
  for (let x = 0; x <= s; x += step) {
    for (let y = 0; y <= s; y += step) {
      let c = img.get(
        Math.floor((x * img.width) / s),
        Math.floor((y * img.height) / s)
      );

      let nbP = (255 * 16) / (c[0] + c[1] + c[2]);
      for (let p = 0; p < nbP; p++) {
        let color = Math.floor(2.99999 * random());
        switch (color) {
          case 0:
            stroke(c[0], 0, 0);
            break;
          case 1:
            stroke(0, c[1], 0);
            break;
          case 2:
            stroke(0, 0, c[2]);
            break;

          default:
            stroke(c[0], c[1], c[2]);
            break;
        }
        line(
          random(x, x + step),
          random(y, y + step),
          random(x, x + step),
          random(y, y + step)
        );
      }
      // if (c[0] > 200) console.log(c);
    }
    console.log("row" + x);
  }
  console.log("printed");
};

windowResized = () => {
  s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
};
