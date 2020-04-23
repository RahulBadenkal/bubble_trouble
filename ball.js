class Ball {
    // Private fields
    x
    y
    radius
    velocity
    bounceHeight
    ballColor
    // MAX_RADIUS = Math.min(width/2, height/2)

    constructor(x, y, radius, initialVelocity, bounceHeight, ballColor) {
        // // Setting the position of the balls
        // if (radius > this.MAX_RADIUS){
        //     throw "Ball with radius '" + radius + "' exceeds MAX RADIUS '" + this.MAX_RADIUS + "'."
        // }

        // Setting other properties
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = initialVelocity
        this.bounceHeight = bounceHeight
        this.ballColor = ballColor
    }

    getBounceHeightSpeed(bounceHeight){
        return Math.sqrt(2 * GRAVITY_CONSTANT * bounceHeight)
    }

    onDestroy(){
        bubbleBurstSound.play()
    }

    draw() {

        strokeWeight(1);
        fill(color(this.ballColor[0], this.ballColor[1], this.ballColor[2]))
        circle(this.x, this.y, 2 * this.radius)

        this.x = this.x + this.velocity.x * UNIT_TIME
        this.y = this.y + this.velocity.y * UNIT_TIME  // Not exact, because of this the actual bounceHeight is not the exact same as the supplied bounceHeight
        
        this.velocity.y = this.velocity.y + GRAVITY_CONSTANT * UNIT_TIME

        // console.log('count', frameCount)
        // console.log('x', this.x)
        // console.log('vx', this.velocity.x)
        // console.log('width', width)
        // console.log('y', this.y)
        // console.log('vy', this.velocity.y)
        // console.log('height', height)
        // console.log('Bounce Height speed', this.#bounceHeight)
        

    }

}