class Player {
    x = 1080 / 2
    y = 400 - 40
    #w = 40
    #h = 40
    blist = []  // Array of Bullets

    draw() {
        rect(this.x, this.y, this.#w, this.#h)

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
