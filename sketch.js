"use strict";

let P5  // Kept in global scope as it needs to be accessed by game objects scripts
// Game Objects
let balls = []
let player
let player2
let roof
let playerImg
let bubbleBurstSound

// Vue App
let app = new Vue({
  el: '#bubble-trouble',

  data: {
    socket: null,
    selectedGameType: '',  // ['single', 'multi']
    username: '',
    isConnected: false,
    isWaiting: false,
    peerUsername: '',
    room: '',
  },

  mounted: function () {
    this.socket = io.connect(constants.SERVER)
    this.socket.on('startGame', this.startGame)
    this.socket.on('message', this.msgFromPeer)
    this.socket.on('peerLeft', this.peerLeft)
  },

  methods: {
    // Private Methods

    // Public methods
    join: function () {
      if (utils.isEmpty(this.username)) {
        alert('Please Enter a username.')
        return
      }
      // Add this user to the pool
      this.socket.emit('join', {'username': this.username})
      this.isWaiting = true
    },


    exit: function () {
      this.isConnected = false
      if(this.selectedGameType === 'multi'){
        this.socket.emit('exit', {'room': this.room})
        this.peerUsername = ''
        this.room = ''
      }
      alert('You left the match')
      this.stopGame()
    },
    
    peerLeft: function(){
      this.isConnected = false
      this.peerUsername = ''
      this.room = ''
      alert('Peer left the match!')
      this.stopGame()
    },
    
    stopGame: function(){
      P5.remove()
      P5 = null
    },
    
    msgFromPeer: function(data){
      // console.log('Data Received From server:', data)
      for (let i=0; i<data.keysPressed.length; i++){
        let keyPressed = data.keysPressed[i]
        if (keyPressed === constants.KEYS.LEFT_ARROW){
          player2.moveBackward()
        }
        if (keyPressed === constants.KEYS.RIGHT_ARROW){
          player2.moveForward()
        }
        if (keyPressed === constants.KEYS.SPACE){
          player2.shootBullet()
        }
      }
    },
    
    msgToPeer: function(sharedData){
      // Share Data with server
      this.socket.emit('message', sharedData)  // Send Data to Server
    },
    
    startGame: function (data) {
      console.log('Start Game.....')
      console.log('Game Type:', data.gameType)

      // Create a new P5 object
      let sketch = function (p) {

        p.setup = function () {
          p.createCanvas(constants.WIDTH, constants.HEIGHT)  // createCanvas must be the first statement
          p.stroke(255)    // Set line drawing color to white
          p.frameRate(constants.FRAMES_PER_SEC)

          playerImg = p.loadImage('assets/player.png');
          bubbleBurstSound = p.loadSound('assets/bubble_burst.mp3')

          roof = new Roof(0, 0)
          // balls.push(new Ball(120, 300, constants.BALL_STD_SIZES.HUGE, constants.getBallInitialVelocityRight(),
          //   constants.getBallBounceHeight(constants.BALL_STD_SIZES.HUGE), constants.colors.RED))
          balls.push(new Ball(620, 400, constants.BALL_STD_SIZES.MEDIUM, constants.getBallInitialVelocityLeft(),
            constants.getBallBounceHeight(constants.BALL_STD_SIZES.MEDIUM), constants.colors.BLUE))
          player = new Player(500, playerImg)
          if (data.gameType === 'multi'){
            player2 = new Player(500, playerImg)
          }
          
        }

        p.draw = function () {
          try {
            p.background(0)

            // Draw all game objects
            // Roof
            roof.draw()
            // Balls
            for (let i = 0; i < balls.length; i++) {
              balls[i].draw()
            }
            // Player
            player.draw() // Player1 (Self)
            if (data.gameType === 'multi'){
              player2.draw() //Player2
            }
            // Bullets
            for (let i = 0; i < player.blist.length; i++) {
              let bullet = player.blist[i]
              bullet.draw()
            }

            //Handling for player 2
            if (data.gameType === 'multi'){
              for (let i = 0; i < player2.blist.length; i++) {
                let bullet = player2.blist[i]
                bullet.draw()
              }
            }
           

            // Handle Collisions
            collisions.HandleWallPlayerCollisions(player)
            if (data.gameType === 'multi'){
              collisions.HandleWallPlayerCollisions(player2)
            }
            collisions.HandleWallBallCollisions()
            collisions.HandleWallBulletCollisions(player)
            if (data.gameType === 'multi'){
              collisions.HandleWallBulletCollisions(player2)
            }
            collisions.HandleBallsPlayerCollsions(player)
            if (data.gameType === 'multi'){
              collisions.HandleBallsPlayerCollsions(player2)
            }
            collisions.HandleBulletBallCollisions(player)
            if (data.gameType === 'multi'){
              collisions.HandleBulletBallCollisions(player2)
            }
          
            // Handle User inputs
            // Update player positions for next game loop
            let sharedData = {'keysPressed': []}
            if (p.keyIsDown(constants.KEYS.LEFT_ARROW)) {
              sharedData.keysPressed.push(constants.KEYS.LEFT_ARROW)
              player.moveBackward()
            }
            if (p.keyIsDown(constants.KEYS.RIGHT_ARROW)) {
              sharedData.keysPressed.push(constants.KEYS.RIGHT_ARROW)
              player.moveForward()
            }
            if (p.keyIsDown(constants.KEYS.SPACE)) {
              sharedData.keysPressed.push(constants.KEYS.SPACE)
              player.shootBullet(player.x, player.y)
            }
            
            // Send data to server
            if (sharedData.keysPressed.length > 0){
              app.msgToPeer(sharedData)
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
            if (data.gameType === 'multi'){
              for (let i = 0; i < player2.blist.length; i++) {
                let bullet = player2.blist[i]
                bullet.updatePosition()
              }
            }

          } catch (err) {
            if (err instanceof GameEnd) {
              console.log('Game Ended due to: ', err.message)
              p.noLoop()
            } else {
              console.log('Unexpected Error: ', err)
              throw err
            }
          }
        }

      }

      // A new p5.js instance
      P5 = new p5(sketch, 'gameCanvas')
      if (data.gameType === 'multi'){
        this.peerUsername = data.peerName
        this.room = data.room
      }
      this.isConnected = true
      this.isWaiting = false
    },

  }

})


// function setup() {
//
//     socket.on('sharedData', onDataReceivedFromServer)
//
//
// }
//
// function onDataReceivedFromServer(data) {
//     // console.log('Data Received From server:', data)
//     for (let i = 0; i < data.keysPressed.length; i++) {
//         let keyPressed = data.keysPressed[i]
//         if (keyPressed === constants.KEYS.LEFT_ARROW) {
//             player.moveBackward()
//         }
//         if (keyPressed === constants.KEYS.RIGHT_ARROW) {
//             player.moveForward()
//         }
//         if (keyPressed === constants.KEYS.SPACE) {
//             player.shootBullet()
//         }
//     }
// }
//
// function draw() {
//
//
// }


