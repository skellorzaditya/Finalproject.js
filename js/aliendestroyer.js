let canvas = document.getElementById("canvas-top");
let ctx = canvas.getContext("2d");

let gamePlay = {
    rectPosX: 10,
    rectPosY: canvas.height / 2 - 10,
    rectVelocity: { x: 0, y: 0 },
    playerSpeed: 0.5,
    enemyTimeout: 60,
    enemyTimeoutInit: 60,
    enemySpeed: 1,
    enemies: [],
    friends: [],
    friendAdded: false,
    score: 0
}


function random(n) {
    return Math.floor(Math.random() * n);
}



function Bot() {
    ctx.fillStyle = "Red"
    ctx.fillRect(0, 0, 50, 50);
}



function player1() {
    ctx.fillStyle = "Blue"
    ctx.fillRect(0, 0, 25, 25);
}


document.getElementById("score").innerHTML = "score: " + gamePlay.score;


function refreshPlayer() {
    Bot();
    player1();
}
setInterval(refreshPlayer, 30);


document.addEventListener("keydown", function(event) {
    if (event.keyCode == 39) {
        //right arrow
        gameState.rectVelocity.x = gameState.playerSpeed;
    }
    if (event.keyCode == 37) {
        //left arrow
        gameState.rectVelocity.x = -gameState.playerSpeed;
    }
    if (event.keyCode == 40) {
        //up arrow
        gameState.rectVelocity.y = gameState.playerSpeed;
    }
    if (event.keyCode == 38) {
        //down arrow
        gameState.rectVelocity.y = -gameState.playerSpeed;
    }
});