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

    draw() {
        strokeWeight(1);
        fill(color(this.roofColor[0], this.roofColor[1], this.roofColor[2]))
        rect(0, 0, width, this.y);

        this.y = this.y + this.speed * UNIT_TIME
    }

}