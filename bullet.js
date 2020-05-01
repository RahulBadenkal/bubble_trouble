class Bullet {
    initial
    final
    w = 3
    constructor(x, y) {
        this.initial = P5.createVector(x, P5.height)
        this.final = P5.createVector(x, P5.height)
    }

    getBoundingBox(){
        return [
            P5.createVector(final.x - this.w, final.y),
            P5.createVector(final.x + this.w, final.y),
            P5.createVector(initial.x - this.w, initial.y),
            P5.createVector(initial.x + this.w, initial.y),
        ]
    }

    getCentre(){
        return P5.createVector(initial.x, (this.initial.y + this.final.y)/2)
    }

    draw() {
        // Drawing the bullet
        P5.noFill()
        P5.strokeWeight(3);
        P5.beginShape();
        let strum = 1
        let period = 18
        for(let y=P5.height; y>=this.final.y; y--){
            let angle = P5.map(y, 0, period, 0, P5.TWO_PI)
            let x = P5.map(P5.sin(angle), - strum, strum, this.final.x-this.w, this.final.x+this.w)
            P5.vertex(x, y)
        }
        P5.endShape();

    }

    updatePosition(){
        this.final.y = this.final.y - 20
    }

}
