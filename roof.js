class Roof {
    // Private fields
    y
    speed
    roofColor = [128, 128, 128]
    constructor(y, speed) {
        // Setting other properties
        this.y = y
        this.speed = speed
    }

    getBoundingBox(){
        return [
            createVector(0, 0),
            createVector(width, 0),
            createVector(width, this.y),
            createVector(0, this.y)
        ]
    }

    getCentre(){
        return createVector(width/2, this.y/2)
    }

    draw() {
        strokeWeight(1);
        fill(color(this.roofColor[0], this.roofColor[1], this.roofColor[2]))
        rect(0, 0, width, this.y);
    }

    updatePosition(){
        this.y = this.y + this.speed * constants.UNIT_TIME
    }

}