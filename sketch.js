"use strict";

// Constants
// Per second is equivalent to per 
const FRAMES_PER_SEC = 30
const UNIT_TIME = 0.5
const SPACE_BUTTON = 32
const GRAVITY_CONSTANT = 3
const THRESHOLD_RADIUS = 8
const BALL_STD_SIZES = {
  'SMALL': 8,
  'MEDIUM': 16,
  'LARGE': 32,
  'HUGE': 64,
}
const colors = {
  'RED': [255, 0, 0],
  'GREEN': [0, 255, 0],
  'BLUE': [0, 0, 255],
  'YELLOW': [255, 255, 0],
}

function getBallInitialVelocityLeft(){
  return createVector(-10, -30)
}

function getBallInitialVelocityRight(){
  return createVector(10, -30)
}

function getBallBounceHeight(ballSize){
  if (ballSize <= 0){
    return 0
  }
  else if(ballSize <= BALL_STD_SIZES.SMALL){
    return 100
  }
  else if(ballSize <= BALL_STD_SIZES.MEDIUM){
    return 150
  }
  else if(ballSize <= BALL_STD_SIZES.LARGE){
    return 250
  }
  
  return 300
}

let balls = []
let player
let roof

let playerImg
let bubbleBurstSound;

function setup() {
  createCanvas(1000, 600)  // createCanvas must be the first statement
  stroke(255)    // Set line drawing color to white
  frameRate(FRAMES_PER_SEC)

  playerImg = loadImage('assets/player.png');
  bubbleBurstSound = loadSound('assets/bubble_burst.mp3')

  roof = new Roof(100, 0)

  balls.push(new Ball(120, 300, BALL_STD_SIZES.HUGE, getBallInitialVelocityRight(), getBallBounceHeight(BALL_STD_SIZES.HUGE), colors.RED))
  balls.push(new Ball(620, 400, BALL_STD_SIZES.MEDIUM, getBallInitialVelocityLeft(), getBallBounceHeight(BALL_STD_SIZES.MEDIUM), colors.BLUE))
  player = new Player(playerImg)
}

function draw() {
  background(0)

  // Draw all game objects
  // Roof
  roof.draw()
  // Balls
  for (let i=0; i<balls.length; i++){
    balls[i].draw()
  }
  // Player
  player.draw()
  // Bullets
  for (let i=0; i<player.blist.length; i++){
    let bullet = player.blist[i]
    bullet.draw()
  }

  // Handle User inputs
  if(keyIsDown(LEFT_ARROW)){
    // console.log('LEFT_ARROW_KEY_PRESSED', LEFT_ARROW)
    player.moveBackward();
  }
  if(keyIsDown(RIGHT_ARROW)){
    // console.log('RIGHT_ARROW_KEY_PRESSED', RIGHT_ARROW)
    player.moveForward();
  }
  if(keyIsDown(SPACE_BUTTON)){
    // console.log('SPACE_KEY_PRESSED', SPACE)
    player.shootBullet(player.x, player.y);
  }

  // Handle Collisions
  HandleWallBulletCollisions()
  HandleBallsPlayerCollsions()
  HandleBulletBallCollisions()
  HandleWallPlayerCollisions()
  HandleWallBallCollisions()
}


function HandleWallPlayerCollisions(){
    // Left wall collision
    if ( (player.x - player.w/2) <= 0){
    console.log('Collided left')
        player.x = player.w/2
    }
    // Right Wall Collision
    else if((player.x + player.w/2) >= width){
        console.log('Collided Right')
        player.x = width - (player.w)/2
    }
}


function HandleWallBallCollisions(){
  function isCollidedRightWall(ball){
    return width - ball.x <= ball.radius
  }

  function isCollidedLeftWall(ball){
    return ball.x <= ball.radius
  }

  function isCollidedFloor(ball){
    return height - ball.y <= ball.radius
  }

  function isCollidedRoof(ball){
    return ball.y - ball.radius <= roof.y
  }

  for (let i=balls.length-1; i>=0; i--){
    let ball = balls[i]

    if (isCollidedRightWall(ball)){
      // console.log('Right Wall')
      ball.x = width - ball.radius
      ball.velocity.x = Math.abs(ball.velocity.x) * -1
    }
    else if(isCollidedLeftWall(ball)){
      // console.log('Left Wall')
      ball.x = ball.radius
      ball.velocity.x = Math.abs(ball.velocity.x)
    }

    if(isCollidedFloor(ball)){
      // console.log('Floor')
      ball.y = height - ball.radius
      ball.velocity.y = -1 * ball.getBounceHeightSpeed(ball.bounceHeight)
    }
    else if(isCollidedRoof(ball)){
      // console.log('Roof')
      // ball.y = ball.radius
      // ball.velocity.y = Math.abs(ball.velocity.y)
      // Destroy the ball if it hits the roof
      balls.splice(i, 1);
      ball.onDestroy()
    }
  }

}


function HandleWallBulletCollisions(){
  function isCollidedRoof(bullet) {
    return bullet.final.y <= roof.y
  }

  for (let i=player.blist.length - 1; i>=0; i--){
    let bullet = player.blist[i]
    if (isCollidedRoof(bullet)) {
      // Bullet once reached top of screen gets destroyed
      player.blist.splice(i, 1)
    }
  }
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
        // console.log('Intersect')

        // Destroy Ball
        balls.splice(j, 1)
        ball.onDestroy()

        // Add more balls
        if (ball.radius > THRESHOLD_RADIUS ){
          balls.push(new Ball(ball.x, ball.y, ball.radius/2, getBallInitialVelocityLeft(), getBallBounceHeight(ball.radius/2), ball.ballColor))
          balls.push(new Ball(ball.x, ball.y, ball.radius/2, getBallInitialVelocityRight(), getBallBounceHeight(ball.radius/2), ball.ballColor))
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
      noLoop()  // Stop the game
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
