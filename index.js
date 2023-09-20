document.addEventListener("DOMContentLoaded", function() {
    const player = document.querySelector(".player");
    const obstacles = document.querySelectorAll(".obstacle");
    const enemies = document.querySelectorAll(".enemy");
    
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let gameLoop;
    
    function jump() {
        if (!isJumping) {
            isJumping = true;
            let count = 0;
            let timerId = setInterval(function() {
                // Apply gravity
                if (count === 15) {
                    clearInterval(timerId);
                    let downTimerId = setInterval(function() {
                        if (count === 0) {
                            clearInterval(downTimerId);
                            isJumping = false;
                        }
                        position -= 5;
                        count--;
                        position = position * gravity;
                        player.style.bottom = position + "px";
                    }, 20);
                }
                // Jump up
                position += 30;
                count++;
                position = position * gravity;
                player.style.bottom = position + "px";
            }, 20);
        }
    }
    
    function checkCollision() {
        let playerRect = player.getBoundingClientRect();
        obstacles.forEach(function(obstacle) {
            let obstacleRect = obstacle.getBoundingClientRect();
            if (
                playerRect.bottom >= obstacleRect.top &&
                playerRect.top <= obstacleRect.bottom &&
                playerRect.right >= obstacleRect.left &&
                playerRect.left <= obstacleRect.right
            ) {
                gameOver();
            }
        });
        enemies.forEach(function(enemy) {
            let enemyRect = enemy.getBoundingClientRect();
            if (
                playerRect.bottom >= enemyRect.top &&
                playerRect.top <= enemyRect.bottom &&
                playerRect.right >= enemyRect.left &&
                playerRect.left <= enemyRect.right
            ) {
                defeatEnemy(enemy);
            }
        });
    }
    
    function defeatEnemy(enemy) {
        enemy.style.display = "none";
    }
    
    function gameOver() {
        clearInterval(gameLoop);
        alert("Game Over!");
    }
    
    function gameLoop() {
        gameLoop = setInterval(function() {
            checkCollision();
        }, 10);
    }
    
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            jump();
        }
    });
    
    gameLoop();
});
