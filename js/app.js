// ####################
// Create game objects
// ####################

// The rendered board has 5 columns and 6 rows, but we define one extra column and row
// in each direction so that enemies can easily move behind the borders
var board = new Board(7, 8);

// The player shall start and respawn on tile (3,5)
var player = new Player(board, board[3][5]);

// create the game!
var game = new Game(board, player);

// ####################
// Convenience functions
// ####################

/**
 * Resets the game and updates the variables in the view (the html document)
 */
function resetGame() {
    game.reset();
    updateVariance(game.speedVariance);
    updateSpeed(game.speed);
    updateNumEnemies(game.numEnemies);
}

/**
 * Convenience function to update the player image sprite.
 *
 * @param {string} image The name of the image.
 */
function setPlayerImage(image) {
    game.player.setSprite('images/' + image);
}

/**
 * Updates the number of enemies in case the user changes it.
 *
 * @param {number} changedNumEnemies The changed number of enemies.
 */
function updateNumEnemies(changedNumEnemies) {
    game.numEnemies = changedNumEnemies;

    document.getElementById('num-enemies').innerHTML = changedNumEnemies.toString();
    document.getElementById('slider-num-enemies').value = changedNumEnemies.toString();
}

/**
 * Updates the speed in case the user changes it.
 *
 * @param {number} changedSpeed The changed speed value.
 */
function updateSpeed(changedSpeed) {
    game.speed = changedSpeed;

    document.getElementById('speed').innerHTML = changedSpeed.toString();
    document.getElementById('slider-speed').value = changedSpeed.toString();
}

/**
 * Updates the speed variance in case the user changes it.
 *
 * @param {number} changedVariance The changed speed variance value.
 */
function updateVariance(changedVariance) {
    game.speedVariance = changedVariance;

    document.getElementById('variance').innerHTML = changedVariance.toString();
    document.getElementById('slider-variance').value = changedVariance.toString();
}

// ####################
// Event listeners
// ####################

/**
 * Event listener for the reset game button
 */
document.getElementById('btn-reset').addEventListener('click', function() {
    resetGame();
});

/**
 * Event listener for the restart button
 */
document.getElementById('btn-restart').addEventListener('click', function() {
    game.restart();
});

/**
 * Event listener for the number of enemies slider
 */
document.getElementById('slider-num-enemies').addEventListener('change', function(event) {
    var newNumEnemies = parseInt(event.target.value);

    if (newNumEnemies === game.numEnemies) {
        return;
    }

    updateNumEnemies(newNumEnemies);
});

/**
 * Event listener for the speed slider
 */
document.getElementById('slider-speed').addEventListener('change', function(event) {
    var newSpeed = parseInt(event.target.value);

    if (newSpeed === game.speed) {
        return;
    }

    updateSpeed(newSpeed);
});

/**
 * Event listener for the speed variance slider
 */
document.getElementById('slider-variance').addEventListener('change', function(event) {
    var newSpeedVariance = parseInt(event.target.value);

    if (newSpeedVariance === game.speedVariance) {
        return;
    }

    updateVariance(newSpeedVariance);
});

/**
 * Event listeners player character images.
 */
document.getElementById('img-boy').addEventListener('click', function() {
    setPlayerImage('char-boy.png');
});

document.getElementById('img-cat-girl').addEventListener('click', function() {
    setPlayerImage('char-cat-girl.png');
});

document.getElementById('img-horn-girl').addEventListener('click', function() {
    setPlayerImage('char-horn-girl.png');
});

document.getElementById('img-pink-girl').addEventListener('click', function() {
    setPlayerImage('char-pink-girl.png');
});

document.getElementById('img-princess-girl').addEventListener('click', function() {
    setPlayerImage('char-princess-girl.png');
});

/**
 * Event listener for the user key inputs.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    var key = allowedKeys[e.keyCode];

    if (key !== undefined) {
        game.player.handleInput(key);
    }
});
