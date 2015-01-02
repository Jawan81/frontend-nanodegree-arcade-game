/**
 *
 * @param {Board} board
 * @param {Tile} startTile
 * @constructor
 */
var Player = function(board, startTile) {

    this.board = board;
    this.startTile = startTile;

    // Call constructor of parent class
    Person.call(this, 'images/char-boy.png', 300, startTile, startTile);
};

Player.prototype = Object.create(Person.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {

    Person.prototype.update.call(this, dt);
};

Player.prototype.handleInput = function(input) {
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

    console.log(input);

    this.move(tile);
};
