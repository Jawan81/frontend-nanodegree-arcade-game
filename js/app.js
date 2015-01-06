

var board = new Board(7, 8);
var player = new Player(board, board[3][5]);
var game = new Game(document.ctx, board, player);


function resetGame() {
    game.reset();
    updateVariance(game.speedVariance);
    updateSpeed(game.speed);
    updateNumEnemies(game.numEnemies);
}

function setPlayerImage(image) {
    game.player.setSprite('images/' + image);
}

function updateNumEnemies(changedNumEnemies) {
    game.numEnemies = changedNumEnemies;

    document.getElementById('num-enemies').innerHTML = changedNumEnemies.toString();
    document.getElementById('slider-num-enemies').value = changedNumEnemies.toString();
}

function updateSpeed(changedSpeed) {
    game.speed = changedSpeed;

    document.getElementById('speed').innerHTML = changedSpeed.toString();
    document.getElementById('slider-speed').value = changedSpeed.toString();
}

function updateVariance(changedVariance) {
    game.speedVariance = changedVariance;

    document.getElementById('variance').innerHTML = changedVariance.toString();
    document.getElementById('slider-variance').value = changedVariance.toString();
}

document.getElementById('btn-reset').addEventListener('click', function() {
    resetGame();
});

document.getElementById('btn-restart').addEventListener('click', function() {
    game.restart();
});

document.getElementById('slider-num-enemies').addEventListener('change', function(event) {
    var newNumEnemies = parseInt(event.target.value);

    if (newNumEnemies === game.numEnemies) {
        return;
    }

    updateNumEnemies(newNumEnemies);
});

document.getElementById('slider-speed').addEventListener('change', function(event) {
    var newSpeed = parseInt(event.target.value);

    if (newSpeed === game.speed) {
        return;
    }

    updateSpeed(newSpeed);
});


document.getElementById('slider-variance').addEventListener('change', function(event) {
    var newSpeedVariance = parseInt(event.target.value);

    if (newSpeedVariance === game.speedVariance) {
        return;
    }

    updateVariance(newSpeedVariance);
});

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
        game.player.handleInput(key);
    }
});
