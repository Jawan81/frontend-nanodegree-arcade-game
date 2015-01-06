/**
 * The Game class coordinates everything what happens in the game.
 *
 * @param {Board} board The Board instance
 * @param {Player} player The Player instance
 * @constructor
 */
var Game = function(board, player) {
    this.board = board;
    this.player = player;
    this.allEnemies = [];
    this.gems = [];
    this.rightBorder = 500;
    this.gameLengthSec = 60;
    this.highscore = [];
    this.reset();
};

/**
 * Resets a game into its initial state.
 */
Game.prototype.reset = function() {
    this.speedVariance = 400;
    this.speed = 200;
    this.numEnemies = 6;
    this.restart();
};

/**
 * Restarts a game.
 */
Game.prototype.restart = function() {
    this.deaths = 0;
    this.wins = 0;
    this.gemsScore = 0;
    this.score = 0;
    this.renderHighscore = false;
    this.startTime = Date.now();
    this.gameTimeSec = this.gameLengthSec;

    this.createEnemies();
    this.createGems();
    this.player.reset();
};

/**
 * Handles the behavior (displaying the highscore) when the game time expires.
 *
 *
 */
Game.prototype.gameTimeExpired = function() {
    this.highscore.push(this.score);
    this.highscore.sort(function(a, b) { return b - a; });
    this.renderHighscore = true;
    var that = this;
    setTimeout(function() {
        that.restart();
    }, 5000);
};

/**
 * Creates the enemies according to the configured number of enemies.
 */
Game.prototype.createEnemies = function() {
    this.allEnemies = [];

    for (var i = 0; i < this.numEnemies; i++) {
        var row = i % 3 + 2;
        this.addEnemy(row);
    }
};

/**
 * Adds a single enemy to a specific row of the board.
 *
 * @param {number} row The number of the row.
 */
Game.prototype.addEnemy = function(row) {
    var variance = (Math.random() - 0.5) * this.speedVariance;
    var mySpeed = this.speed + variance;

    if (mySpeed < 20.0) {
        mySpeed = 20.0;
    }

    var enemy = new Enemy(mySpeed, this.board[0][row], this.board[6][row], this.rightBorder);
    this.allEnemies.push(enemy);
};

/**
 * Creates the gems.
 */
Game.prototype.createGems = function() {
    this.gems = [];

    var sprites = [
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ];

    var gemScore = Math.floor(this.speed / 5);

    for (var i = 0; i < 3; i++) {
        do {
            var row = this.randomBetween(2, 5);
            var column = this.randomBetween(1, 6);
            var sprite = this.randomBetween(0, 3);
            var tile = new Tile(column, row);
            var gem = new Gem(sprites[sprite], tile, gemScore);

            var collides = this.gems.some(function(other) {
                return gem.collidesWith(other);
            });

            if (! collides) {
                this.gems.push(gem);
                break;
            }
        } while(true);
    }
};

/**
 * Gives a random number within a <= randomNumber < b
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
Game.prototype.randomBetween = function(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};

/**
 * Processes all interactions in the game,
 * i.e. collisions with enemies, gem picking and winning.
 */
Game.prototype.processInteractions = function() {
    if (this.player.dies(this.allEnemies)) {
        this.createGems();
        this.player.respawn();
        this.deaths++;
    }

    if (this.player.wins()) {
        this.createGems();
        this.player.respawn();
        this.wins++;
    }

    var that = this;
    this.gems.forEach(function(gem) {
        if (gem.checkPicked(that.player)) {
            that.gemsScore += gem.getScore();
        }
    });
};

/**
 * Updates the score.
 */
Game.prototype.updateScore = function() {
    var tmpScore = this.numEnemies * (this.wins - this.deaths) * (this.speed + this.speedVariance) / 100 + this.gemsScore;
    this.score = Math.floor(tmpScore);
};

/**
 * Renders all entities of the game.
 */
Game.prototype.render = function() {
    this.gems.forEach(function(gem) {
        gem.render();
    });

    this.allEnemies.forEach(function(enemy) {
        enemy.render();
    });

    this.player.render();
};

/**
 * Updates the position of all entities of the game and checks if the game time is expired.
 *
 * @param {number} dt The time difference to the last call of the function.
 */
Game.prototype.update = function(dt) {
    if (this.renderHighscore) {
        return;
    }

    var timeExpired = (Date.now() - this.startTime) / 1000;
    this.gameTimeSec = Math.round(this.gameLengthSec - timeExpired);

    if (this.gameTimeSec < 0.5) {
        this.gameTimeExpired();
    }

    this.allEnemies.forEach(function(enemy) {
        enemy.update(dt);
    });

    this.player.update(dt);

    this.processInteractions();
    this.updateScore();
};

/**
 * Renders the statistics where they can be either in-game stats or the highscore.
 */
Game.prototype.renderStatistics = function() {
    if (this.renderHighscore) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 505, 606);

        var num = this.highscore.length;

        if (num > 10) {
            num = 10;
        }

        ctx.textAlign = "center";
        ctx.fillStyle = '#A44510';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.font = "15pt Impact";

        ctx.strokeText('Highscore', 250, 40);
        ctx.fillText('Highscore', 250, 40);

        var scoreCount = 0;

        for (var i = 0; i < num; i++) {
            ctx.fillStyle = 'white';
            var high = this.highscore[i];

            if (high === this.score && scoreCount === 0) {
                ctx.fillStyle = '#B00F0F';
                scoreCount++;
            }

            ctx.strokeText(high, 250, 40 * i + 100);
            ctx.fillText(high, 250, 40 * i + 100);
        }
    } else {
        // clear stats
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 505, 50);

        // render stats
        ctx.textAlign = "left";
        ctx.fillStyle = '#A44510';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.font = "15pt Impact";
        ctx.strokeText('Wins: ' + this.wins, 10, 40);
        ctx.fillText('Wins: ' + this.wins, 10, 40);
        ctx.strokeText('Deaths: ' + this.deaths, 100, 40);
        ctx.fillText('Deaths: ' + this.deaths, 100, 40);
        ctx.strokeText('Score: ' + this.score, 200, 40);
        ctx.fillText('Score: ' + this.score, 200, 40);
        ctx.strokeText('Time: ' + this.gameTimeSec, 300, 40);
        ctx.fillText('Time: ' + this.gameTimeSec, 300, 40);
    }
};
