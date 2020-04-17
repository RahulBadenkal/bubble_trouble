class Bullet {
    initial
    final
    active

    constructor(x, y) {
        this.initial = createVector(x, height)
        this.final = createVector(x, height)
        this.active = true
    }

    isCollidedRoof(){
        return this.final.y <= 0
    }

    draw() {
        if (this.isCollidedRoof()){ // Bullet once reached top of screen gets destroyed
            this.active = false
        }  

        this.final.y = this.final.y - 20
        line(this.initial.x, this.initial.y, this.final.x, this.final.y)
    }

}
