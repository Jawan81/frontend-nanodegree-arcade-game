

var board = new Board(7, 8);
var player = new Player(board, board[3][5]);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numEnemies = 6;
var deaths = 0;
var wins = 0;

resetGame();

function resetGame() {
    initEnemies();
    restart();
    //setPlayerImage('char-boy.png');
}

function restart() {
    deaths = 0;
    wins = 0;

    if (allEnemies.length !== numEnemies) {
        initEnemies();
    }

    allEnemies.forEach(function(enemy) {
        enemy.respawn();
    });

    player.respawn();
}

function initEnemies() {
    var speed = 200;
    var speedVariance = 400;
    var rightBorder = 500;

    allEnemies = [];

    for (var i = 0; i < 3; i++) {
        addEnemy(i + 2, speed, speedVariance, rightBorder);
    }

    if (numEnemies < 4) {
        return;
    }

    for (var i = 0; i < numEnemies - 3; i++) {
        var row = Math.floor(Math.random() * 3 + 2);
        addEnemy(row, speed, speedVariance, rightBorder);
    }
}

function addEnemy(row, speed, speedVariance, rightBorder) {
    var variance = (Math.random() - 0.5) * speedVariance;
    var mySpeed = speed + variance > 10 ? speed + variance : 10;
    var enemy = new Enemy(mySpeed, board[0][row], board[6][row], rightBorder);
    allEnemies.push(enemy);
}

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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 505, 50);

    // render stats
    ctx.fillStyle = '#888';
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

function setPlayerImage(image) {
    player.setSprite('images/' + image);
}

document.getElementById('btn-reset').addEventListener('click', function() {
    resetGame();
});

document.getElementById('btn-restart').addEventListener('click', function() {
    restart();
});

document.getElementById('slider-num-enemies').addEventListener('change', function(event) {
    numEnemies = event.target.value;
    document.getElementById('num-enemies').innerHTML = numEnemies;
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
