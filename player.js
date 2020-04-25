class Player {
    x
    y
    w = 40
    h = 40
    blist = []  // Array of Bullets. Should Ideally be a Linked List not Array
    #stepDistance = 5
    constructor(x, playerImg){
        this.x = x
        this.y = height - this.h/2
        this.playerImg = playerImg
    }

    getBoundingBox(){
        return [
            createVector(this.x - this.w/2, this.y - this.h/2),
            createVector(this.x + this.w/2, this.y - this.h/2),
            createVector(this.x + this.w/2, this.y + this.h/2),
            createVector(this.x - this.w/2, this.y + this.h/2)
        ]
    }

    getCentre(){
        return createVector(this.x, this.y)
    }

    moveForward(){
        this.x += this.#stepDistance
    }

    moveBackward(){
        this.x -= this.#stepDistance
    }

    draw() {
        // rect(this.x, this.y, this.#w, this.#h)
        image(this.playerImg, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }

    shootBullet() {
        if (this.blist.length >= 1) {  // Max 1 bullet allowed
            return
        }
        let bullet = new Bullet(this.x, this.y);
        this.blist.push(bullet);
    }


}
