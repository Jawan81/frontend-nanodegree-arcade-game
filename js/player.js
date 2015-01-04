/**
 *
 * @param {Board} board
 * @param {Tile} startTile
 * @constructor
 */
var Player = function(board, startTile) {

    this.board = board;
    this.startTile = startTile;
    this.freeze = false;

    // Call constructor of parent class
    Person.call(this, 'images/char-boy.png', 300, startTile, startTile, 30);
};

Player.prototype = Object.create(Person.prototype);
Player.prototype.constructor = Player;

Player.prototype.respawn = function() {
    this.freeze = true;
    var that = this;

    setTimeout(function() {
        Person.prototype.respawn.call(that, true);
        that.freeze = false;
    }, 150);
};

Player.prototype.handleInput = function(input) {
    if (this.freeze) {
        return;
    }

    var tile = this.targetTile;

    if ('up' === input && tile.yCoord > 1) {
        tile = this.board.getUpperTile(tile);
    }

    if ('down' == input && tile.yCoord < board.numTilesY - 2) {
        tile = this.board.getLowerTile(tile);
    }

    if ('left' == input && tile.xCoord > 1) {
        tile = this.board.getLeftTile(tile);
    }

    if ('right' == input && tile.xCoord < board.numTilesX - 2) {
        tile = this.board.getRightTile(tile);
    }

    this.move(tile);
};

Player.prototype.wins = function() {
    return this.y < 5 && ! this.freeze;
};

/**
 *
 * @param {Array} enemies
 */
Player.prototype.dies = function(enemies) {
    var collides = enemies.some(function(enemy) {
        return player.collidesWith(enemy);
    });

    return collides && ! this.freeze;
};
