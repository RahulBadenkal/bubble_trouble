function HandleWallPlayerCollisions(){
    // Left wall collision
    if ( (player.x - player.w/2) <= 0){
        // console.log('Collided left')
        player.x = player.w/2
    }
    // Right Wall Collision
    else if((player.x + player.w/2) >= width){
        // console.log('Collided Right')
        player.x = width - (player.w)/2
    }

    if ( (player2.x - player2.w/2) <= 0){
        // console.log('Collided left')
        player2.x = player2.w/2
    }
    // Right Wall Collision
    else if((player2.x + player2.w/2) >= width){
        // console.log('Collided Right')
        player2.x = width - (player2.w)/2
    }
}


function HandleWallBallCollisions(){
    function isCollidedRightWall(ball){
        return width - ball.x <= ball.radius
    }

    function isCollidedLeftWall(ball){
        return ball.x <= ball.radius
    }

    function isCollidedFloor(ball){
        return height - ball.y <= ball.radius
    }

    function isCollidedRoof(ball){
        return ball.y - ball.radius <= roof.y
    }

    for (let i=balls.length-1; i>=0; i--){
        let ball = balls[i]

        if (isCollidedRightWall(ball)){
            // console.log('Right Wall')
            ball.x = width - ball.radius
            ball.velocity.x = Math.abs(ball.velocity.x) * -1
        }
        else if(isCollidedLeftWall(ball)){
            // console.log('Left Wall')
            ball.x = ball.radius
            ball.velocity.x = Math.abs(ball.velocity.x)
        }

        if(isCollidedFloor(ball)){
            // console.log('Floor')
            ball.y = height - ball.radius
            ball.velocity.y = -1 * ball.getBounceHeightSpeed(ball.bounceHeight)
        }
        else if(isCollidedRoof(ball)){
            // console.log('Roof')
            // Destroy the ball if it hits the roof
            balls.splice(i, 1);
            ball.onDestroy()
        }
    }

}


function HandleWallBulletCollisions(){
    function isCollidedRoof(bullet) {
        return bullet.final.y <= roof.y
    }

    for (let i=player.blist.length - 1; i>=0; i--){
        let bullet = player.blist[i]
        if (isCollidedRoof(bullet)) {
            // Bullet once reached top of screen gets destroyed
            player.blist.splice(i, 1)
        }
    }
    for (let j=player2.blist.length - 1; j>=0; j--){
        let bullet = player2.blist[j]
        if (isCollidedRoof(bullet)) {
            // Bullet once reached top of screen gets destroyed
            player2.blist.splice(j, 1)
        }
    }
}


function HandleBulletBallCollisions()
{
    for (let i=player.blist.length - 1; i>=0; i--){
        // debugger;
        let bullet = player.blist[i]

        for (let j=balls.length - 1; j>=0; j--){
            let ball = balls[j]

            // Check collision
            // Consider the circle to be square
            let yIntersect = bullet.final.y <= ball.y + ball.radius
            let xIntersect = bullet.final.x >= ball.x - ball.radius && bullet.final.x <= ball.x + ball.radius
            if (xIntersect && yIntersect){
                // console.log('Intersect')

                // Destroy Ball
                balls.splice(j, 1)
                ball.onDestroy()

                // Add more balls
                if (ball.radius > THRESHOLD_RADIUS ){
                    balls.push(new Ball(ball.x, ball.y, ball.radius/2, getBallInitialVelocityLeft(), getBallBounceHeight(ball.radius/2), ball.ballColor))
                    balls.push(new Ball(ball.x, ball.y, ball.radius/2, getBallInitialVelocityRight(), getBallBounceHeight(ball.radius/2), ball.ballColor))
                }

                // Destroy Bullet
                player.blist.splice(i, 1)

                break
            }
        }
    }

    for (let i=player2.blist.length - 1; i>=0; i--){
        // debugger;
        let bullet = player2.blist[i]

        for (let j=balls.length - 1; j>=0; j--){
            let ball = balls[j]

            // Check collision
            // Consider the circle to be square
            let yIntersect = bullet.final.y <= ball.y + ball.radius
            let xIntersect = bullet.final.x >= ball.x - ball.radius && bullet.final.x <= ball.x + ball.radius
            if (xIntersect && yIntersect){
                // console.log('Intersect')

                // Destroy Ball
                balls.splice(j, 1)
                ball.onDestroy()

                // Add more balls
                if (ball.radius > THRESHOLD_RADIUS ){
                    balls.push(new Ball(ball.x, ball.y, ball.radius/2, getBallInitialVelocityLeft(), getBallBounceHeight(ball.radius/2), ball.ballColor))
                    balls.push(new Ball(ball.x, ball.y, ball.radius/2, getBallInitialVelocityRight(), getBallBounceHeight(ball.radius/2), ball.ballColor))
                }

                // Destroy Bullet
                player2.blist.splice(i, 1)

                break
            }
        }
    }
}

function HandleBallsPlayerCollsions(){
    for (let i=0; i<balls.length; i++){
        let ball = balls[i]

        // Check collision
        // Consider the circle to be square
        let playerLeftTop = createVector(player.x - player.w/2, player.y - player.h/2)
        let playerRightBottom = createVector(player.x + player.w/2, player.y + player.h/2)
        let ballLeftTop = createVector(ball.x - ball.radius, ball.y - ball.radius)
        let ballRightBottom = createVector(ball.x + ball.radius, ball.y + ball.radius)

        /*if(checkRectIntersect(playerLeftTop, playerRightBottom, ballLeftTop, ballRightBottom)){
            throw new GameEnd('Ball Collided with Player')
        } */
    }
}

function checkRectIntersect(l1, r1, l2, r2){
    // If one rectangle is on left side of other
    if (l1.x >= r2.x || l2.x >= r1.x) {
        return false
    }

    // If one rectangle is above other
    if (l1.y > r2.y || l2.y > r1.y){
        return false
    }

    return true
}
