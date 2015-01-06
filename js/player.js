/**
 * The Player class contains the functionality of the player entity of the game.
 *
 * @param {Board} board The game board.
 * @param {Tile} startTile The tile where the player shall start and respawn.
 * @constructor
 */
var Player = function(board, startTile) {
    this.board = board;
    this.startTile = startTile;
    this.freeze = false;

    // Call constructor of parent class
    Person.call(this, 'images/char-boy.png', 400, startTile, startTile, 30);
};

/**
 * Player inherits from Person
 * @type {Person.prototype}
 */
Player.prototype = Object.create(Person.prototype);

/**
 * Make sure the constructor is set correctly in the inheritance hierarchy
 * @type {Player}
 */
Player.prototype.constructor = Player;

/**
 * Respawns a player at the original position after some timeout.
 */
Player.prototype.respawn = function() {
    this.freeze = true;
    var that = this;

    setTimeout(function() {
        Person.prototype.respawn.call(that, true);
        that.freeze = false;
    }, 150);
};

/**
 * Handles the user input.
 *
 * @param {string} input Can be either "up", "down", "left" or "right"
 */
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

/**
 * Checks the winning condition.
 *
 * @returns {boolean} Returns TRUE in case the road was crossed.
 */
Player.prototype.wins = function() {
    return this.y < 5 && ! this.freeze;
};

/**
 * Checks if the player dies by colliding with an enemy.
 *
 * @param {Array} enemies The array of enemies.
 */
Player.prototype.dies = function(enemies) {
    var that = this;

    var collides = enemies.some(function(enemy) {
        return that.collidesWith(enemy);
    });

    return collides && ! this.freeze;
};

/**
 * Resets a player to its original position.
 */
Player.prototype.reset = function() {
    Person.prototype.respawn.call(this, true);
};
