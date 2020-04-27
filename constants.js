// Constants
const ISDEBUG = true
const SERVER = ISDEBUG? "http://localhost:3000": "https://bubble-trouble-my.herokuapp.com/"
const FRAMES_PER_SEC = 30
const WIDTH = 1000
const HEIGHT = 600
const UNIT_TIME = 0.5
const KEYS = {
    'LEFT_ARROW': 37,
    'RIGHT_ARROW': 39,
    'SPACE': 32,
}
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