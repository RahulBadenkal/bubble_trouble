class Bullet {
    initial
    final
    constructor(x, y) {
        this.initial = createVector(x, height)
        this.final = createVector(x, height)
    }

    draw() {
        // Drawing the bullet
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

        this.final.y = this.final.y - 20    
        

    }

}
