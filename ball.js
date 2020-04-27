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

    getBoundingBox(){
        return [
            createVector(this.x - this.radius, this.y - this.radius),
            createVector(this.x + this.radius, this.y - this.radius),
            createVector(this.x + this.radius, this.y + this.radius),
            createVector(this.x - this.radius, this.y + this.radius),
        ]
    }

    getCentre(){
        return createVector(this.x, this.y)
    }

    getBounceHeightSpeed(bounceHeight){
        return Math.sqrt(2 * constants.GRAVITY_CONSTANT * bounceHeight)
    }

    onDestroy(){
        bubbleBurstSound.play()
    }

    draw() {
        strokeWeight(1);
        fill(color(this.ballColor[0], this.ballColor[1], this.ballColor[2]))
        circle(this.x, this.y, 2 * this.radius)

        // console.log('count', frameCount)
        // console.log('x', this.x)
        // console.log('vx', this.velocity.x)
        // console.log('width', width)
        // console.log('y', this.y)
        // console.log('vy', this.velocity.y)
        // console.log('height', height)
        // console.log('Bounce Height speed', this.#bounceHeight)

    }

    updatePosition(){
        this.x = this.x + this.velocity.x * constants.UNIT_TIME
        this.y = this.y + this.velocity.y * constants.UNIT_TIME  // Not exact, because of this the actual bounceHeight is not the exact same as the supplied bounceHeight

        this.velocity.y = this.velocity.y + constants.GRAVITY_CONSTANT * constants.UNIT_TIME

    }

}