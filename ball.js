class Ball {
    // Private fields
    #x
    #y
    #radius
    #velocity
    #d
    #u
    constructor(x, y, radius) {
        this.#x = x
        this.#y = y
        this.#radius = radius
        this.#velocity = 2
        this.#d = 1
        this.#u = 1
    }

    draw() {

        if (this.#x >= (width - this.#radius) || (this.#x <= this.#radius)) {
            this.#d = this.#d * -1
        }
        this.#x = this.#x + 4 * this.#d
        
        if (this.#y >= (height - this.#radius) || this.#y <= this.#radius || this.#velocity <= 0) {
            this.#u = this.#u * -1
        }

        if (this.#y >= height - this.#radius) {
            this.#velocity = 30
        }

        this.#velocity = this.#velocity + this.#u * 3 * 0.5;
        this.#y = this.#y + this.#u * this.#velocity;
        circle(this.#x, this.#y, this.#radius)
    }

}