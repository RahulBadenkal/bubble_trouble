class Bullet {
    initial
    final
    w = 3
    constructor(x, y) {
        this.initial = createVector(x, height)
        this.final = createVector(x, height)
    }

    getBoundingBox(){
        return [
            createVector(final.x - this.w, final.y),
            createVector(final.x + this.w, final.y),
            createVector(initial.x - this.w, initial.y),
            createVector(initial.x + this.w, initial.y),
        ]
    }

    getCentre(){
        return createVector(initial.x, (this.initial.y + this.final.y)/2)
    }

    draw() {
        this.final.y = this.final.y - 20

        // Drawing the bullet
        noFill()
        strokeWeight(3);
        beginShape();
        let strum = 1
        let period = 18
        for(var y=height; y>=this.final.y; y--){
            var angle = map(y, 0, period, 0, TWO_PI)
            var x = map(sin(angle), - strum, strum, this.final.x-this.w, this.final.x+this.w)
            vertex(x, y)
        }
        endShape();


        

    }

}
