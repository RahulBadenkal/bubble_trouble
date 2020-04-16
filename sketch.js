"use strict";

// Constants
const SPACE = 32

let b
let p

function setup() {
  createCanvas(1000, 400)  // createCanvas must be the first statement
  stroke(255)    // Set line drawing color to white
  frameRate(30)
  b = new Ball(40, 40, 30)
  let playerImg = loadImage('assets/ghostmask2.png');
  p = new Player(playerImg)
}

function draw() {
  background(0)
  b.draw()
  p.draw()

  if(keyIsDown(LEFT_ARROW)){
    // console.log('LEFT_ARROW_KEY_PRESSED', LEFT_ARROW)
    p.x = p.x-5;
  }

  if(keyIsDown(RIGHT_ARROW)){
    // console.log('RIGHT_ARROW_KEY_PRESSED', RIGHT_ARROW)
    p.x = p.x+5;
  }

  if(keyIsDown(SPACE)){
    // console.log('SPACE_KEY_PRESSED', SPACE)
    p.shootBullet(p.x, p.y);
  }


}
