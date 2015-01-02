var Tile = function(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.id = xCoord.toString() + yCoord.toString();
    this.centerX = 101.0 * xCoord - 50.5;
    this.centerY = 83.0 * yCoord - 41.5;
    this.topLeftX = this.centerX - 50.5;
    this.topLeftY = this.centerY - 41.5;
};

