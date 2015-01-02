

var board = new Board(7, 8);

var player = new Player(board, board[3][5]);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//    new Enemy(200, board[0][2], board[6][2], 500),
//    new Enemy(200, board[0][4], board[6][4], 500),
//    new Enemy(200, board[0][3], board[6][3], 500),
//    new Enemy(200, board[0][3], board[6][3], 500)
//];

function initEnemies(numEnemies, speed, rightBorder) {
    for (var i = 0; i < numEnemies; i++) {
        var row = Math.floor(Math.random() * 3 + 2);
        var enemy = new Enemy(speed, board[0][row], board[6][row], rightBorder);
        allEnemies.push(enemy);
    }
}

initEnemies(6, 200, 500);

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

    if (typeof key !== 'undefined') {
        player.handleInput(key);
    }
});
