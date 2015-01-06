

var board = new Board(7, 8);
var player = new Player(board, board[3][5]);

var allEnemies = [];
var numEnemies = 6;
var gems = [];
var deaths = 0;
var wins = 0;
var speed = 200;
var speedVariance = 400;
var gemsScore = 0;
var score = 0;

resetGame();

function resetGame() {
    resetToDefaults();
    restart();
}

function restart() {
    deaths = 0;
    wins = 0;
    gemsScore = 0;
    score = 0;

    initEnemies();
    initGems();
    player.reset();
}

function initEnemies() {
    var rightBorder = 500;

    allEnemies = [];

    for (var i = 0; i < numEnemies; i++) {
        var row = i % 3 + 2;
        addEnemy(row, rightBorder);
    }
}

function addEnemy(row, rightBorder) {
    var variance = (Math.random() - 0.5) * speedVariance;
    var mySpeed = speed + variance;

    if (mySpeed < 20.0) {
        mySpeed = 20.0;
    }

    var enemy = new Enemy(mySpeed, board[0][row], board[6][row], rightBorder);
    allEnemies.push(enemy);
}

function initGems() {
    gems = [];
    var sprites = [
            'images/Gem Blue.png',
            'images/Gem Green.png',
            'images/Gem Orange.png'
        ];

    var gemScore = Math.floor(speed / 5);

    for (var i = 0; i < 3; i++) {
        do {
            var row = randomBetween(2, 5);// Math.floor(Math.random() * 3 + 2);
            var column = randomBetween(1, 6);// Math.floor(Math.random() * 5 + 1);
            var sprite = randomBetween(0, 3);// Math.floor(Math.random() * 3);
            var tile = new Tile(column, row);
            var gem = new Gem(sprites[sprite], tile, gemScore);

            var collides = gems.some(function(other) {
                return gem.collidesWith(other);
            });

            if (! collides) {
                gems.push(gem);
                break;
            }
        } while(true);
    }
}

function randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

function checkCollisions() {
    if (player.dies(allEnemies)) {
        initGems();
        player.respawn();
        deaths++;
    }

    if (player.wins()) {
        initGems();
        player.respawn();
        wins++;
    }

    gems.forEach(function(gem) {
        if (gem.checkPicked(player)) {
            gemsScore += gem.getScore();
        }
    });
}

function getScore() {
    return Math.floor(numEnemies * (wins - deaths) * (speed + speedVariance) / 100 + gemsScore);
}

function renderStatistics() {
    // clear stats
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 505, 50);

    score = getScore();
    // render stats
    ctx.fillStyle = '#888';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = "15pt Impact";
    ctx.strokeText('Wins: ' + wins, 10, 40);
    ctx.fillText('Wins: ' + wins, 10, 40);
    ctx.strokeText('Deaths: ' + deaths, 100, 40);
    ctx.fillText('Deaths: ' + deaths, 100, 40);
    ctx.strokeText('Score: ' + score, 200, 40);
    ctx.fillText('Score: ' + score, 200, 40);
}

function setPlayerImage(image) {
    player.setSprite('images/' + image);
}

function resetToDefaults() {
    updateVariance(400);
    updateSpeed(200);
    updateNumEnemies(6);
}

function updateNumEnemies(changedNumEnemies) {
    numEnemies = changedNumEnemies;

    document.getElementById('num-enemies').innerHTML = numEnemies.toString();
    document.getElementById('slider-num-enemies').value = numEnemies.toString();
}

function updateSpeed(changedSpeed) {
    speed = changedSpeed;
    document.getElementById('speed').innerHTML = speed.toString();
    document.getElementById('slider-speed').value = speed.toString();
}

function updateVariance(changedVariance) {
    speedVariance = changedVariance;
    document.getElementById('variance').innerHTML = speedVariance.toString();
    document.getElementById('slider-variance').value = speedVariance.toString();
}

document.getElementById('btn-reset').addEventListener('click', function() {
    resetGame();
});

document.getElementById('btn-restart').addEventListener('click', function() {
    restart();
});

document.getElementById('slider-num-enemies').addEventListener('change', function(event) {
    var newNumEnemies = parseInt(event.target.value);

    if (newNumEnemies === numEnemies) {
        return;
    }

    updateNumEnemies(newNumEnemies);
});

document.getElementById('slider-speed').addEventListener('change', function(event) {
    var newSpeed = parseInt(event.target.value);

    if (newSpeed === speed) {
        return;
    }

    updateSpeed(newSpeed);
});


document.getElementById('slider-variance').addEventListener('change', function(event) {
    var newSpeedVariance = parseInt(event.target.value);

    if (newSpeedVariance === speedVariance) {
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
        player.handleInput(key);
    }
});
