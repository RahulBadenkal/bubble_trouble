"use strict";

let b = new Ball(40, 40, 30)

function setup() {
  createCanvas(1366, 400);  // Size must be the first statement
  stroke(255);     // Set line drawing color to white
  frameRate(30);
}

function draw() {
  background(0);
  b.Draw();
}


