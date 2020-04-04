class Bullet {
    #initial
    #final
    active

    constructor(x, y) {
        this.initial = createVector(x, y)
        this.final = createVector(x + 20, y - 20)
        this.active = true
    }

    draw() {
        debugger
        if (this.final.y <= 0) {  // Bullet once reached top of screen gets destroyed
            this.active = false
            return
        }

        this.initial.y = this.initial.y - 20
        this.final.x = this.initial.x + 20
        this.final.y = this.final.y - 20
        line(this.initial.x + 20, this.initial.y, this.final.x, this.final.y)
    }

}
