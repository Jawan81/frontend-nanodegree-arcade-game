

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var board = new Board(7, 8);

var player = new Player(board, board[3][5]);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(200, board[0][2], board[6][2], 505),
    new Enemy(200, board[0][4], board[6][4], 505),
    new Enemy(200, board[0][0], board[6][6], 505)
];

//Engine.init();

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
