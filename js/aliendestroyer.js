// creating canvas
let canvas = document.getElementById("canvas-top");
let ctx = canvas.getContext("2d");

//get paragraph items
let keydownOutput = document.getElementById("keydown-output");
let keyupOutput = document.getElementById("keyup-output");

// stetting variables to set up game
let gameState = {
    rectPosX: 10,
    rectPosY: canvas.height / 2 - 10,
    rectVelocity: { x: 0, y: 0 },
    playerSpeed: 1.5,
    enemyTimeout: 60,
    enemyTimeoutInit: 60,
    enemySpeed: 2,
    enemies: [],
    friends: [],
    friendAdded: false,
    score: 0
};

//randomize enemies
function random(n) {
    return Math.floor(Math.random() * n);
}
//setting variables for collision detection
class RectCollider {
    constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        //collision detection
    isColliding(rectCollider) {
        if (
            this.x < rectCollider.x + rectCollider.width &&
            this.x + this.width > rectCollider.x &&
            this.y < rectCollider.y + rectCollider.height &&
            this.height + this.y > rectCollider.y
        ) {
            return true;
        }
        return false;
    }
}

//checking collision
function checkCollision(gameState) {
    let playerCollider = new RectCollider(
        gameState.rectPosX,
        gameState.rectPosY,
        20,
        20
    );

    for (let i = 0; i < gameState.enemies.length; ++i) {
        let enemyCollider = new RectCollider(
            gameState.enemies[i].x,
            gameState.enemies[i].y,
            20,
            20
        );
        if (playerCollider.isColliding(enemyCollider)) {
            //say game over when player hits enemy
            alert("Gamer Over");
            return true;
        }
    }
    for (let i = 0; i < gameState.friends.length; ++i) {
        let friendCollider = new RectCollider(
            gameState.friends[i].x,
            gameState.friends[i].y,
            5,
            5
        );
        if (playerCollider.isColliding(friendCollider)) {
            gameState.playerSpeed *= 1;
            gameState.friends.splice(i, 1);
            alert("Gamer Over");
        }
    }
}
//refresh UI
function update() {
    for (let i = 0; i < gameState.enemies.length; ++i) {
        if (gameState.enemies[i].x < -10) {
            gameState.score += 1;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.enemyTimeout -= 1;
    if (gameState.enemyTimeout == 0) {
        gameState.enemyTimeout = Math.floor(gameState.enemyTimeoutInit);
        gameState.enemies.push({
            x: canvas.width,
            y: random(canvas.height),
            velocity: gameState.enemySpeed
        });
        //reload game when blue square hit
        gameState.enemySpeed *= 1;
        gameState.enemyTimeoutInit = gameState.enemyTimeoutInit * 1;
        //console.log('timeout:'+gameState.enemyTimeoutInit);
        //console.log('speed:'+gameState.enemySpeed);
    }
    //Player
    ctx.fillStyle = "#FF0000";
    gameState.rectPosX += gameState.rectVelocity.x;
    gameState.rectPosY += gameState.rectVelocity.y;
    if (gameState.rectPosX > canvas.width - 10) {
        gameState.rectPosX = canvas.width - 10;
        gameState.rectVelocity.x = 0;
    }
    if (gameState.rectPosX < 0) {
        gameState.rectPosX = 0;
        gameState.rectVelocity.x = 0;
    }
    if (gameState.rectPosY < 0) {
        gameState.rectPosY = 0;
        gameState.rectVelocity.y = 0;
    }
    if (gameState.rectPosY > canvas.height - 10) {
        gameState.rectPosY = canvas.height - 10;
        gameState.rectVelocity.y = 0;
    }
    //enemies (blue squares)
    ctx.fillRect(gameState.rectPosX, gameState.rectPosY, 20, 20);
    ctx.fillStyle = "#0000FF";
    for (let i = 0; i < gameState.enemies.length; ++i) {
        gameState.enemies[i].x -= gameState.enemies[i].velocity;
        ctx.fillRect(gameState.enemies[i].x, gameState.enemies[i].y, 10, 10);
    }
    for (let i = 0; i < gameState.enemies.length; ++i) {
        if (gameState.enemies[i].x < -10) {
            gameState.enemies.splice(i, 1);
            gameState.score++;
        }
    }

    //Score
    let scoreUI = document.getElementById("score");
    console.log(gameState.score);
    scoreUI.innerHTML = "score: " + gameState.score;
    if (gameState.score + 1 == 0 && gameState.friendAdded == false) {
        gameState.friends.push({
            x: random(canvas.width - 20),
            y: random(canvas.height - 20),
        });
        gameState.friendAdded = true;
    }
    if (gameState.score + 1 == 1 && gameState.friendAdded == true) {
        gameState.friendAdded = false;
    }
    if (checkCollision(gameState) == true) {
        gameState = {
            rectPosX: 10,
            rectPosY: canvas.height / 2 - 10,
            rectVelocity: { x: 0, y: 0 },
            playerSpeed: 1.5,
            enemyTimeout: 60,
            enemyTimeoutInit: 60,
            enemySpeed: 2,
            enemies: [],
            friends: [],
            friendAdded: false,
            score: 0
        };
    }
}
setInterval(update, 1);

function keyPressed(event) {
    //get the actual key pressed
    let key = event.keyCode;
    keydownOutput.innerHTML = "key down code:" + key;

    if (event.keyCode == 39) {
        //right arrow
        gameState.rectVelocity.x = gameState.playerSpeed;

    } else if (event.keyCode == 37) {
        //left arrow
        gameState.rectVelocity.x = -gameState.playerSpeed;

    }

    function keyReleased(event) {
        //get the actual key pressed
        let key = event.keyCode;
        keyupOutput.innerHTML = "Key up code:" + key;
    }
    if (event.keyCode == 40) {
        //up arrow
        gameState.rectVelocity.y = gameState.playerSpeed;

    } else if (event.keyCode == 38) {
        //down arrow
        gameState.rectVelocity.y = -gameState.playerSpeed;
    }
};