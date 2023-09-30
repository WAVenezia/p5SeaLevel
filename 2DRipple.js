
// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

let cols;
let rows;
let current; // = new float[cols][rows];
let previous; // = new float[cols][rows];

let dampening = 0.999;

function setup() {
  pixelDensity(1);
  createCanvas(600, 400);
  cols = width;
  rows = height;
  // The following line initializes a 2D cols-by-rows array with zeroes
  // in every array cell. 
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
}

function mouseDragged() {
  previous[mouseX][mouseY] = 2500;
}

function draw() {
  background(0);

  

  loadPixels();
  // looping through every non edge element
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      current[i][j] =               //current i/j cell is a function of its surrounding cells
        (previous[i - 1][j] +
          previous[i + 1][j] +
          previous[i][j - 1] +
          previous[i][j + 1]) /
          2 -
        current[i][j];
      current[i][j] = current[i][j] * dampening;
      // pixels array in p5.js has 4 entries
      // for each pixel, so we have to multiply the index by 4 and then
      // set the entries for each color component separately.
      let index = (i + j * cols) * 4;
      pixels[index + 0] = current[i][j];
      pixels[index + 1] = current[i][j];
      pixels[index + 2] = current[i][j];
    }
  }
  updatePixels();

  let temp = previous;
  previous = current;
  current = temp;
}
