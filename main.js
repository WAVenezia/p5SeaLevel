let table;
let numRows, numCols;
let date = [],
  gmsl = [];
let diagramX, diagramY;
let size = [];
let buttonX, buttonY, buttonW, buttonH;
let sliderX, sliderY, sliderW, sliderH, cirX, cirY;
let c;
let showGraph1 = true;
function preload() {
  //preload the csv file before anything runs
  table = loadTable("assets/sealevel.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  //explore the table
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  //print("rows: " + numRows + " cols: " + numCols);

  //load data from table
  for (let r = 0; r < table.getRowCount(); r++) {
    date[r] = table.getString(r, 0);
    gmsl[r] = table.getNum(r, 1);
    //print(date[r] + " " + gmsl[r]);
  }
  minMax();

  //variable values
  diagramX = (width / 4) * 3 - 90;
  diagramY = height / 2;
  buttonX = diagramX;
  buttonY = height - 30;
  buttonW = 100;
  buttonH = 30;
  c = color("black");
  sliderX = buttonX;
  sliderY = buttonY - 50;
  sliderW = 400;
  sliderH = 0.5;
  cirX = sliderX;
  cirY = sliderY;
}

function draw() {
  background(255);
  chartTitle();
  chartInfo();
  if (showGraph1) {
    drawCircularGraph();
  } else {
    drawBarGraph();
  }

  newButton(buttonX, buttonY, buttonW, buttonH, "Switch Graph", 10);
  newSlider(sliderX, sliderY, sliderW, sliderH, cirX, cirY);
  if (dist(mouseX, mouseY, cirX, cirY) < 30 && mouseIsPressed) {
    cirX = mouseX;
    cirY = sliderY;
    c = color("red");
  } else {
    c = color("black");
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, buttonX, buttonY) < 15) {
    if (showGraph1 == true) {
      showGraph1 = false;
    } else {
      showGraph1 = true;
    }
  }
}
