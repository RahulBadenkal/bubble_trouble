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
            P5.createVector(0, 0),
            P5.createVector(width, 0),
            P5.createVector(width, this.y),
            P5.createVector(0, this.y)
        ]
    }

    getCentre(){
        return P5.createVector(width/2, this.y/2)
    }

    draw() {
        P5.strokeWeight(1);
        P5.fill(P5.color(this.roofColor[0], this.roofColor[1], this.roofColor[2]))
        P5.rect(0, 0, P5.width, this.y);
    }

    updatePosition(){
        this.y = this.y + this.speed * constants.UNIT_TIME
    }

}