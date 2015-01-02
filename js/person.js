/**
 *
 * @param {string} sprite The image sprite of the Person
 * @param {number} speed In pixel/sec
 * @param {Tile} startTile Start tile
 * @param {Tile} targetTile Target tile. Set to startTile if undefined.
 * @constructor
 */
var Person = function(sprite, speed, startTile, targetTile) {
    if (typeof targetTile === 'undefined') {
        targetTile = startTile;
    }

    this.sprite = sprite;
    this.x = startTile.centerX;
    this.y = startTile.centerY;
    this.xtarget = targetTile.centerX;
    this.ytarget = targetTile.centerY;
    this.speed = speed;
    this.targetTile = targetTile;
};

/**
 *
 * @param {Tile} tile
 */
Person.prototype.move = function(tile) {
    this.xtarget = tile.centerX;
    this.ytarget = tile.centerY;
};

Person.prototype.update = function(dt) {
    this.x += (this.xtarget - this.x) * this.speed * dt;
    this.y += (this.ytarget - this.y) * this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Person.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Person.prototype.setSprite = function(sprite) {
    this.sprite = sprite;
};
