class Ball {
    // Private fields
    x
    y
    radius
    #velocity
    #bounceHeight
    #frameCount = 0  // For Testing
    MAX_RADIUS = Math.min(width/2, height/2)

    constructor(x, y, radius, initialVelocity, bounceHeight) {
        // Setting the position of the balls
        if (radius > this.MAX_RADIUS){
            throw "Ball with radius '" + radius + "' exceeds MAX RADIUS '" + this.MAX_RADIUS + "'."
        }
    
        // Setting other properties
        this.x = x
        this.y = y
        this.radius = radius
        this.#velocity = initialVelocity
        this.#bounceHeight = bounceHeight
    }

    getBounceHeightSpeed(bounceHeight){
        return Math.sqrt(2 * GRAVITY_CONSTANT * bounceHeight)
    }

    isCollidedRightWall(){
        return width - this.x <= this.radius
    }

    isCollidedLeftWall(){
        return this.x <= this.radius
    }

    isCollidedFloor(){  
        return height - this.y <= this.radius
    }
    
    isCollidedRoof(){
        return this.y <= this.radius
    }

    // To make sure the part of ball never goes inside the wall boundaries
    // Also change direction on collisions
    onCollision(){ 
        if (this.isCollidedRightWall()){
            // console.log('Right Wall')
            this.x = width - this.radius
            this.#velocity.x = Math.abs(this.#velocity.x) * -1
        }
        else if(this.isCollidedLeftWall()){
            // console.log('Left Wall')
            this.x = this.radius
            this.#velocity.x = Math.abs(this.#velocity.x)
        }

        if(this.isCollidedFloor()){
            // console.log('Floor')
            this.y = height - this.radius
            this.#velocity.y = -1 * this.getBounceHeightSpeed(this.#bounceHeight)
        }
        else if(this.isCollidedRoof()){
            // console.log('Roof')
            this.y = this.radius
            this.#velocity.y = Math.abs(this.#velocity.y)
        }
    }

    draw() {
        
        this.#frameCount = this.#frameCount + 1 

        this.x = this.x + this.#velocity.x * UNIT_TIME
        this.y = this.y + this.#velocity.y * UNIT_TIME  // Not exact, because of this the actual bounceHeight is not the exact same as the supplied bounceHeight
        
        this.#velocity.y = this.#velocity.y + GRAVITY_CONSTANT * UNIT_TIME

        this.onCollision()

        // console.log('count', this.#frameCount)
        // console.log('x', this.x)
        // console.log('vx', this.#velocity.x)
        // console.log('width', width)
        // console.log('y', this.y)
        // console.log('vy', this.#velocity.y)
        // console.log('height', height)
        // console.log('Bounce Height speed', this.#bounceHeight)

        circle(this.x, this.y, 2 * this.radius)
    }

}