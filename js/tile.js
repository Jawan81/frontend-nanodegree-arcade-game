/**
 * A Tile is a square on which entities can be placed.
 *
 * @param {number} xCoord X-coordinate on a board.
 * @param {number} yCoord Y-coordinate on a board.
 * @constructor
 */
var Tile = function(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.centerX = 101.0 * xCoord - 50.5;
    this.centerY = 83.0 * yCoord - 41.5;
    this.topLeftX = this.centerX - 50.5;
    this.topLeftY = this.centerY - 41.5;
};

