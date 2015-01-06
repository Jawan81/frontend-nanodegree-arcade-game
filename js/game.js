var Game = function(board, player) {
    this.board = board;
    this.player = player;
    this.allEnemies = [];
    this.gems = [];
    this.rightBorder = 500;
    this.restart();
};

Game.prototype.reset = function() {
    this.speedVariance = 400;
    this.speed = 200;
    this.numEnemies = 6;
    this.restart();
};

Game.prototype.restart = function() {
    this.deaths = 0;
    this.wins = 0;
    this.gemsScore = 0;
    this.score = 0;

    this.createEnemies();
    this.createGems();
    this.player.reset();
};

Game.prototype.createEnemies = function() {

    this.allEnemies = [];

    for (var i = 0; i < this.numEnemies; i++) {
        var row = i % 3 + 2;
        this.addEnemy(row);
    }
};

Game.prototype.addEnemy = function(row) {
    var variance = (Math.random() - 0.5) * this.speedVariance;
    var mySpeed = this.speed + variance;

    if (mySpeed < 20.0) {
        mySpeed = 20.0;
    }

    var enemy = new Enemy(mySpeed, this.board[0][row], this.board[6][row], this.rightBorder);
    this.allEnemies.push(enemy);
};

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

Game.prototype.randomBetween = function(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};

Game.prototype.checkInteractions = function() {
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

Game.prototype.updateScore = function() {
    var tmpScore = this.numEnemies * (this.wins - this.deaths) * (this.speed + this.speedVariance) / 100 + this.gemsScore;
    this.score = Math.floor(tmpScore);
};

Game.prototype.render = function() {
    this.gems.forEach(function(gem) {
        gem.render();
    });

    this.allEnemies.forEach(function(enemy) {
        enemy.render();
    });

    this.player.render();
};

Game.prototype.update = function(dt) {
    this.allEnemies.forEach(function(enemy) {
        enemy.update(dt);
    });

    this.player.update(dt);

    this.checkInteractions();
    this.updateScore();
};
