"use strict";

// Constants
// Per second is equivalent to per 
const FRAMES_PER_SEC = 30
const UNIT_TIME = 0.5
const SPACE = 32
const GRAVITY_CONSTANT = 3
const THRESHOLD_RADIUS = 8


let balls = []
let player

function setup() {
  createCanvas(1000, 400)  // createCanvas must be the first statement
  stroke(255)    // Set line drawing color to white
  frameRate(FRAMES_PER_SEC)
  balls.push(new Ball(120, 120, 64, createVector(10, -30), 300))
  let playerImg = loadImage('assets/player.png');
  player = new Player(playerImg)
}

function draw() {
  background(0)
  for (let i=0; i<balls.length; i++){
    balls[i].draw()
  }
  player.draw()

  if(keyIsDown(LEFT_ARROW)){
    // console.log('LEFT_ARROW_KEY_PRESSED', LEFT_ARROW)
    player.x = player.x-5;
  }

  if(keyIsDown(RIGHT_ARROW)){
    // console.log('RIGHT_ARROW_KEY_PRESSED', RIGHT_ARROW)
    player.x = player.x+5;
  }

  if(keyIsDown(SPACE)){
    // console.log('SPACE_KEY_PRESSED', SPACE)
    player.shootBullet(player.x, player.y);
  }

  HandleBulletBallCollisions()

  HandleBallsPlayerCollsions()

}

function HandleBulletBallCollisions()
{  
  for (let i=player.blist.length - 1; i>=0; i--){
    // debugger;
    let bullet = player.blist[i]

    for (let j=balls.length - 1; j>=0; j--){
      let ball = balls[j]

      // Check collision
      // Consider the circle to be square
      let yIntersect = bullet.final.y <= ball.y + ball.radius
      let xIntersect = bullet.final.x >= ball.x - ball.radius && bullet.final.x <= ball.x + ball.radius      
      if (xIntersect && yIntersect){
        console.log('Intersect')

        // Destroy Ball
        balls.splice(j, 1);

        // Add more balls
        if (ball.radius > THRESHOLD_RADIUS ){
          balls.push(new Ball(ball.x, ball.y, ball.radius/2, createVector(10, -30), 300))
          balls.push(new Ball(ball.x, ball.y, ball.radius/2, createVector(-10, -30), 300))
        }
        
        // Destroy Bullet
        player.blist.splice(i, 1)

        break
      }
    }
  }
}
  
function HandleBallsPlayerCollsions(){  
  for (let i=0; i<balls.length; i++){
    let ball = balls[i]

    // Check collision
    // Consider the circle to be square
    let playerLeftTop = createVector(player.x - player.w/2, player.y + player.h/2)
    let playerRightTop = createVector(player.x + player.w/2, player.y - player.h/2)
    let ballLeftTop = createVector(ball.x - ball.radius, ball.y + ball.radius)
    let ballRightTop = createVector(ball.x + ball.radius, ball.y + ball.radius)
      
    if(checkRectIntersect(playerLeftTop, playerRightTop, ballLeftTop, ballRightTop)){
      console.log('Game Ended')
      noLoop()
    }
  }
}

function checkRectIntersect(l1, r1, l2, r2){
  // If one rectangle is on left side of other 
  if (l1.x > r2.x || l2.x > r1.x) {
      return false 
  }
  
  // If one rectangle is above other 
  if (l1.y < r2.y || l2.y < r1.y){ 
      return false
  }
  
  return true 
}
