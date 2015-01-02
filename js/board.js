var Board = function(numTilesX, numTilesY) {

    this.numTilesX = numTilesX;
    this.numTilesY = numTilesY;

    for (var xCoord = 0; xCoord < numTilesX; xCoord++) {
        this[xCoord] = [];

        for (var yCoord = 0; yCoord < numTilesY; yCoord++) {
            this[xCoord][yCoord] = new Tile(xCoord, yCoord);
        }
    }
};

/**
 *
 * @param {Tile} tile
 */
Board.prototype.getUpperTile = function(tile) {
    var y = tile.yCoord;

    if (y > 0) {
        return this[tile.xCoord][y - 1];
    }

    return tile;
};

/**
 *
 * @param {Tile} tile
 */
Board.prototype.getLowerTile = function(tile) {
    var y = tile.yCoord;

    if (y < this.numTilesY - 1) {
        return this[tile.xCoord][y + 1];
    }

    return tile;
};

/**
 *
 * @param {Tile} tile
 */
Board.prototype.getLeftTile = function(tile) {
    var x = tile.xCoord;

    if (x > 0) {
        return this[x - 1][tile.yCoord];
    }

    return tile;
};

/**
 *
 * @param {Tile} tile
 */
Board.prototype.getRightTile = function(tile) {
    var x = tile.xCoord;

    if (x < this.numTilesX - 1) {
        return this[x + 1][tile.yCoord];
    }

    return tile;
};
