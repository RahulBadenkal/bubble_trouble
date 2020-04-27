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
  socket = io.connect(constants.SERVER)
  socket.on('sharedData', onDataReceivedFromServer)

  createCanvas(constants.WIDTH, constants.HEIGHT)  // createCanvas must be the first statement
  stroke(255)    // Set line drawing color to white
  frameRate(constants.FRAMES_PER_SEC)

  playerImg = loadImage('assets/player.png');
  bubbleBurstSound = loadSound('assets/bubble_burst.mp3')

  roof = new Roof(0, 0)

  balls.push(new Ball(120, 300, constants.BALL_STD_SIZES.HUGE, constants.getBallInitialVelocityRight(),
      constants.getBallBounceHeight(constants.BALL_STD_SIZES.HUGE), constants.colors.RED))
  balls.push(new Ball(620, 400, constants.BALL_STD_SIZES.MEDIUM, constants.getBallInitialVelocityLeft(),
      constants.getBallBounceHeight(constants.BALL_STD_SIZES.MEDIUM), constants.colors.BLUE))
  player = new Player(500, playerImg)
}

function onDataReceivedFromServer(data){
  // console.log('Data Received From server:', data)
  for (let i=0; i<data.keysPressed.length; i++){
    let keyPressed = data.keysPressed[i]
    if (keyPressed === constants.KEYS.LEFT_ARROW){
      player.moveBackward()
    }
    if (keyPressed === constants.KEYS.RIGHT_ARROW){
      player.moveForward()
    }
    if (keyPressed === constants.KEYS.SPACE){
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
    if (keyIsDown(constants.KEYS.LEFT_ARROW)) {
      sharedData.keysPressed.push(constants.KEYS.LEFT_ARROW)
      player.moveBackward()
    }
    if (keyIsDown(constants.KEYS.RIGHT_ARROW)) {
      sharedData.keysPressed.push(constants.KEYS.RIGHT_ARROW)
      player.moveForward();
    }
    if (keyIsDown(constants.KEYS.SPACE)) {
      sharedData.keysPressed.push(constants.KEYS.SPACE)
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
      throw err
    }
  }

}


