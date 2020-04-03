class Ball {

    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    Draw() {
        let velocity = 2
        let d = 1
        let u = 1
        console.log(this.y, height)

        if (this.x >= (width - this.radius) || (this.x <= this.radius)) {
            d = d * -1
        }
        this.x = this.x + 4 * d;
        
        if (this.y >= (height - this.radius) || this.y <= this.radius || velocity <= 0) {
            u = u * -1
        }

        if (this.y >= height - this.radius) {
            velocity = 30;
        }

        velocity = velocity + u * 3 * 0.5;
        this.y = this.y + u * velocity;
        circle(this.x, this.y, this.radius);
    }

}