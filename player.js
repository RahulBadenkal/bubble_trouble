class Player {
    x = width / 2
    y = height - 20
    w = 40
    h = 40
    blist = []  // Array of Bullets. Should Ideally be a Linked List not Array
    #stepDistance = 5
    constructor(playerImg){
        this.playerImg = playerImg
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
        
        let newBlist = []
        for (let i=0; i<this.blist.length; i++) {
            let bullet = this.blist[i]
            if (bullet.active) {
                bullet.draw()
                newBlist.push(bullet)
            }
        }
        this.blist = newBlist
    }

    shootBullet() {
        if (this.blist.length >= 1) {  // Max 1 bullet allowed
            return
        }
        let bullet = new Bullet(this.x, this.y);
        this.blist.push(bullet);
    }

}
