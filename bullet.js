class Bullet {
    initial
    final
    active
    constructor(x, y) {
        this.initial = createVector(x, height)
        this.final = createVector(x, height)
        this.active = true
    }

    isCollidedRoof() {
        return this.final.y <= 0
    }

    draw() {
        if (this.isCollidedRoof()) { // Bullet once reached top of screen gets destroyed
            this.active = false
        }

        this.final.y = this.final.y - 20    
        
        // Drawing the bullet
        // line(this.initial.x, this.initial.y, this.final.x, this.final.y)
        
        noFill()
        strokeWeight(3);
        beginShape();
        let strum = 1
        let period = 18
        let amplitude = 3
        for(var y=height; y>=this.final.y; y--){
            var angle = map(y, 0, period, 0, TWO_PI)
            var x = map(sin(angle), - strum, strum, this.final.x-amplitude, this.final.x+amplitude)     
            vertex(x, y)
          }
        endShape();
    }

}
