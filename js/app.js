

var board = new Board(7, 8);

var player = new Player(board, board[3][5]);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];


function initEnemies(numEnemies, speed, speedVariance, rightBorder) {
    for (var i = 0; i < numEnemies; i++) {
        var row = Math.floor(Math.random() * 3 + 2);
        var variance = (Math.random() - 0.5) * speedVariance;
        var mySpeed = speed + variance > 10 ? speed + variance : 10;
        var enemy = new Enemy(mySpeed, board[0][row], board[6][row], rightBorder);
        allEnemies.push(enemy);
    }
}

initEnemies(6, 200, 400, 500);

var deaths = 0;
var wins = 0;

function checkCollisions() {

    if (player.dies(allEnemies)) {
        player.respawn();
        deaths++;
    }

    if (player.wins()) {
        player.respawn();
        wins++;
    }
}

function renderStatistics() {
    // clear stats
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 50);

    // render stats
    ctx.fillStyle = '#AAA';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = "36pt Impact";
    ctx.strokeText('Wins: ' + wins, 10, 40);
    ctx.fillText('Wins: ' + wins, 10, 40);
    ctx.strokeText('Deaths: ' + deaths, 250, 40);
    ctx.fillText('Deaths: ' + deaths, 250, 40);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    var key = allowedKeys[e.keyCode];

    if (key !== undefined) {
        player.handleInput(key);
    }
});
