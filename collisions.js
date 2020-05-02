(function (exports) {

    exports.HandleWallPlayerCollisions = function () {
        // Left wall collision
        if ((player.x - player.w / 2) <= 0) {
            // console.log('Collided left')
            player.x = player.w / 2
        }
        // Right Wall Collision
        else if ((player.x + player.w / 2) >= P5.width) {
            // console.log('Collided Right')
            player.x = P5.width - (player.w) / 2
        }

    // Collision check for player2
        // Left wall collision
        if ((player2.x - player2.w / 2) <= 0) {
            // console.log('Collided left')
            player2.x = player2.w / 2
        }
        // Right Wall Collision
        else if ((player2.x + player2.w / 2) >= P5.width) {
            // console.log('Collided Right')
            player2.x = P5.width - (player2.w) / 2
        }
    }


    exports.HandleWallBallCollisions = function () {
        function isCollidedRightWall(ball) {
            return P5.width - ball.x <= ball.radius
        }

        function isCollidedLeftWall(ball) {
            return ball.x <= ball.radius
        }

        function isCollidedFloor(ball) {
            return P5.height - ball.y <= ball.radius
        }

        function isCollidedRoof(ball) {
            return ball.y - ball.radius <= roof.y
        }

        for (let i = balls.length - 1; i >= 0; i--) {
            let ball = balls[i]

            if (isCollidedRightWall(ball)) {
                // console.log('Right Wall')
                ball.x = P5.width - ball.radius
                ball.velocity.x = Math.abs(ball.velocity.x) * -1
            }
            else if (isCollidedLeftWall(ball)) {
                // console.log('Left Wall')
                ball.x = ball.radius
                ball.velocity.x = Math.abs(ball.velocity.x)
            }

            if (isCollidedFloor(ball)) {
                // console.log('Floor')
                ball.y = P5.height - ball.radius
                ball.velocity.y = -1 * ball.getBounceHeightSpeed(ball.bounceHeight)
            }
            else if (isCollidedRoof(ball)) {
                // console.log('Roof')
                // Destroy the ball if it hits the roof
                // TODO: Splicing is costly, use a different way
                balls.splice(i, 1);
                ball.onDestroy()
            }
        }

    }


    exports.HandleWallBulletCollisions = function () {
        function isCollidedRoof(bullet) {
            return bullet.final.y <= roof.y
        }

        for (let i = player.blist.length - 1; i >= 0; i--) {
            let bullet = player.blist[i]
            if (isCollidedRoof(bullet)) {
                // Bullet once reached top of screen gets destroyed
                // TODO: Splicing is costly, use a different way
                player.blist.splice(i, 1)
            }
        }
        // For player2
        for (let i = player2.blist.length - 1; i >= 0; i--) {
            let bullet = player2.blist[i]
            if (isCollidedRoof(bullet)) {
                // Bullet once reached top of screen gets destroyed
                // TODO: Splicing is costly, use a different way
                player2.blist.splice(i, 1)
            }
        }
    }


    exports.HandleBulletBallCollisions = function () {
        for (let i = player.blist.length - 1; i >= 0; i--) {
            // debugger;
            let bullet = player.blist[i]

            for (let j = balls.length - 1; j >= 0; j--) {
                let ball = balls[j]

                // Check collision
                // Consider the circle to be square
                let yIntersect = bullet.final.y <= ball.y + ball.radius
                let xIntersect = bullet.final.x >= ball.x - ball.radius && bullet.final.x <= ball.x + ball.radius
                if (xIntersect && yIntersect) {
                    // console.log('Intersect')

                    // Destroy Ball
                    // TODO: Splicing is costly, use a different way
                    balls.splice(j, 1)
                    ball.onDestroy()

                    // Add more balls
                    if (ball.radius > constants.THRESHOLD_RADIUS) {
                        balls.push(new Ball(ball.x, ball.y, ball.radius / 2, constants.getBallInitialVelocityLeft(),
                            constants.getBallBounceHeight(ball.radius / 2), ball.ballColor))
                        balls.push(new Ball(ball.x, ball.y, ball.radius / 2, constants.getBallInitialVelocityRight(),
                            constants.getBallBounceHeight(ball.radius / 2), ball.ballColor))
                    }

                    // Destroy Bullet
                    // TODO: Splicing is costly, use a different way
                    player.blist.splice(i, 1)

                    break
                }
            }
        }
        //Handling for player2
        for (let i = player2.blist.length - 1; i >= 0; i--) {
            // debugger;
            let bullet = player2.blist[i]

            for (let j = balls.length - 1; j >= 0; j--) {
                let ball = balls[j]

                // Check collision
                // Consider the circle to be square
                let yIntersect = bullet.final.y <= ball.y + ball.radius
                let xIntersect = bullet.final.x >= ball.x - ball.radius && bullet.final.x <= ball.x + ball.radius
                if (xIntersect && yIntersect) {
                    // console.log('Intersect')

                    // Destroy Ball
                    // TODO: Splicing is costly, use a different way
                    balls.splice(j, 1)
                    ball.onDestroy()

                    // Add more balls
                    if (ball.radius > constants.THRESHOLD_RADIUS) {
                        balls.push(new Ball(ball.x, ball.y, ball.radius / 2, constants.getBallInitialVelocityLeft(),
                            constants.getBallBounceHeight(ball.radius / 2), ball.ballColor))
                        balls.push(new Ball(ball.x, ball.y, ball.radius / 2, constants.getBallInitialVelocityRight(),
                            constants.getBallBounceHeight(ball.radius / 2), ball.ballColor))
                    }

                    // Destroy Bullet
                    // TODO: Splicing is costly, use a different way
                    player2.blist.splice(i, 1)

                    break
                }
            }
        }
    }

    exports.HandleBallsPlayerCollsions = function () {
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i]

            // Check collision
            // Consider the circle to be square
            let playerLeftTop = P5.createVector(player.x - player.w / 2, player.y - player.h / 2)
            let playerRightBottom = P5.createVector(player.x + player.w / 2, player.y + player.h / 2)
            let ballLeftTop = P5.createVector(ball.x - ball.radius, ball.y - ball.radius)
            let ballRightBottom = P5.createVector(ball.x + ball.radius, ball.y + ball.radius)

            if (checkRectIntersect(playerLeftTop, playerRightBottom, ballLeftTop, ballRightBottom)) {
                throw new GameEnd('Ball Collided with Player')
            }
        }
        //Handling for player2
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i]

            // Check collision
            // Consider the circle to be square
            let playerLeftTop = P5.createVector(player2.x - player2.w / 2, player2.y - player2.h / 2)
            let playerRightBottom = P5.createVector(player2.x + player2.w / 2, player2.y + player2.h / 2)
            let ballLeftTop = P5.createVector(ball.x - ball.radius, ball.y - ball.radius)
            let ballRightBottom = P5.createVector(ball.x + ball.radius, ball.y + ball.radius)

            if (checkRectIntersect(playerLeftTop, playerRightBottom, ballLeftTop, ballRightBottom)) {
                throw new GameEnd('Ball Collided with Player')
            }
        }

        
    }

    function checkRectIntersect(l1, r1, l2, r2) {
        // If one rectangle is on left side of other
        if (l1.x >= r2.x || l2.x >= r1.x) {
            return false
        }

        // If one rectangle is above other
        if (l1.y > r2.y || l2.y > r1.y) {
            return false
        }

        return true
    }

})(typeof exports === 'undefined' ? this.collisions = {} : exports)