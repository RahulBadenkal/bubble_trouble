"use strict";

let socket

let balls = []
let player
let roof

let playerImg
let bubbleBurstSound

let sharedData = {
  'keysPressed': []
}

function setup() {
  socket = io.connect('http://localhost:3000')
  socket.on('sharedData', onDataReceivedFromServer)

  createCanvas(WIDTH, HEIGHT)  // createCanvas must be the first statement
  stroke(255)    // Set line drawing color to white
  frameRate(FRAMES_PER_SEC)

  playerImg = loadImage('assets/player.png');
  bubbleBurstSound = loadSound('assets/bubble_burst.mp3')

  roof = new Roof(0, 0)

  balls.push(new Ball(120, 300, BALL_STD_SIZES.HUGE, getBallInitialVelocityRight(), getBallBounceHeight(BALL_STD_SIZES.HUGE), colors.RED))
  balls.push(new Ball(620, 400, BALL_STD_SIZES.MEDIUM, getBallInitialVelocityLeft(), getBallBounceHeight(BALL_STD_SIZES.MEDIUM), colors.BLUE))
  player = new Player(500, playerImg)
}

function onDataReceivedFromServer(data){
  // console.log('Data Received From server:', data)
  for (let i=0; i<data.keysPressed.length; i++){
    let keyPressed = data.keysPressed[i]
    if (keyPressed === KEYS.LEFT_ARROW){
      player.moveBackward()
    }
    if (keyPressed === KEYS.RIGHT_ARROW){
      player.moveForward()
    }
    if (keyPressed === KEYS.SPACE){
      player.shootBullet()
    }
  }
}

function draw() {
  try {
    background(0)

    // Draw all game objects
    // Roof
    roof.draw()
    // Balls
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw()
    }
    // Player
    player.draw()
    // Bullets
    for (let i = 0; i < player.blist.length; i++) {
      let bullet = player.blist[i]
      bullet.draw()
    }

    // Handle Collisions
    HandleWallPlayerCollisions()
    HandleWallBallCollisions()
    HandleWallBulletCollisions()
    HandleBallsPlayerCollsions()
    HandleBulletBallCollisions()

    // Handle User inputs
    // Update player positions for next game loop
    if (keyIsDown(KEYS.LEFT_ARROW)) {
      sharedData.keysPressed.push(KEYS.LEFT_ARROW)
      player.moveBackward()
    }
    if (keyIsDown(KEYS.RIGHT_ARROW)) {
      sharedData.keysPressed.push(KEYS.RIGHT_ARROW)
      player.moveForward();
    }
    if (keyIsDown(KEYS.SPACE)) {
      sharedData.keysPressed.push(KEYS.SPACE)
      player.shootBullet(player.x, player.y)
    }

    // Update Positions for next Game Loop
    // Roof
    roof.updatePosition()
    // Balls
    for (let i = 0; i < balls.length; i++) {
      balls[i].updatePosition()
    }
    // Bullets
    for (let i = 0; i < player.blist.length; i++) {
      let bullet = player.blist[i]
      bullet.updatePosition()
    }

    // Share Data with server
    if (sharedData.keysPressed.length !== 0){
      socket.emit('sharedData', sharedData)  // Send Data to Server
      sharedData.keysPressed = []
    }



  }
  catch (err) {
    if (err instanceof GameEnd) {
      console.log('Game Ended due to: ', err.message)
      noLoop()
    }
    else{
      console.log('Unexpected Error: ', err)
    }
  }

}


