function drawCircularGraph() {
  let radius = width / 5 - 150;
  let ang = 360 / numRows;
  let mappedValue = map(cirX, sliderX-sliderW/2, sliderX+sliderW/2, 25, 400);
  for (let i = 0; i < numRows; i++) {
    size[i] = map(gmsl[i], -3.5, 79.5, 0, mappedValue);
    let pointx = (size[i] + radius) * cos(radians(ang * i)) + diagramX;
    let pointy = (size[i] + radius) * sin(radians(ang * i)) + diagramY;
    let cirx = radius * cos(radians(ang * i)) + diagramX;
    let ciry = radius * sin(radians(ang * i)) + diagramY;

    //draw line
    if (i % 12 == 0) {
      strokeWeight(0.5);
      stroke("blue");
    } else {
      strokeWeight(0.2);
      stroke("black");
    }
    line(cirx, ciry, pointx, pointy);

    //hover
    //draw data points
    let datasize;
    let dis = dist(mouseX, mouseY, pointx, pointy);
    if (dis < 3) {
      fill("red");
      datasize = 10;
      noStroke();
      circle(pointx, pointy, datasize);
      //draw info
      textAlign(CENTER);
      textSize(12);
      fill("black");
      text(date[i], diagramX, diagramY);
      fill("blue");
      rectMode(CENTER);
      rect(diagramX, diagramY + 15, 30, 5);
      textSize(20);
      text(gmsl[i] + "mm", diagramX, diagramY + 45);
    } else {
      fill("blue");
      datasize = 3;
      noStroke();
      circle(pointx, pointy, datasize);
    }
  }
}

function drawBarGraph() {
  let year = [];
  let w = 0.2;
  let gap = (width - diagramX / 2 - 40) / numRows - w;
  let mappedValue = map(cirX, sliderX-sliderW/2, sliderX+sliderW/2, 0, 400);
  for (let i = 0; i < numRows; i++) {
    let h = map(gmsl[i], -3.5, 79.5, 0, mappedValue);
    let point1x = (w + gap) * i + width / 3;
    let point1y = height - diagramY / 2;
    let point2x = point1x;
    let point2y = point1y - h;
    //draw line
    if (i % 12 == 0) {
      noStroke();
      year[i] = table.getNum(i, 2);
      textSize(10);
      textAlign(CENTER);
      fill('black')
      text(year[i], point1x, point1y + 10);
      strokeWeight(1);
      stroke("blue");
    } else {
      strokeWeight(w);
      stroke("black");
    }
    line(point1x, point1y, point2x, point2y);
    
    //connection line
    let p1x = point2x;
    let p1y = point2y;
    if (i < numRows - 1) {
      let p2x = (w + gap) * (i + 1) + width / 3;
      let p2y = point1y - map(gmsl[i + 1], -3.5, 79.5, 0, mappedValue);
      strokeWeight(0.8);
      stroke('blue');
      line(p1x, p1y, p2x, p2y);
    }
        //hover
    //draw data points
    let datasize;
    let dis = dist(mouseX, mouseY, point2x, point2y);
    if (dis < 5) {
      fill("red");
      datasize = 10;
      noStroke();
      circle(point2x, point2y, datasize);
      //draw info
      textAlign(CENTER);
      textSize(12);
      fill("black");
      text(date[i], diagramX, 90);
      fill("blue");
      rectMode(CENTER);
      rect(diagramX, 120, 30, 5);
      textSize(20);
      text(gmsl[i] + "mm", diagramX, 150);
    } else {
      fill("blue");
      datasize = 3;
      noStroke();
      circle(point2x, point2y, datasize);
    }
  }
}
