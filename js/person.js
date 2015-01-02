/**
 *
 * @param {string} sprite The initial sprite of the Person
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
    this.x = startTile.topLeftX;
    this.y = startTile.topLeftY;
    this.xtarget = targetTile.topLeftX;
    this.ytarget = targetTile.topLeftY;
    this.speed = speed;
    this.startTile = startTile;
    this.targetTile = targetTile;
    this.destroyed = false;
};

/**
 *
 * @param {Tile} tile
 */
Person.prototype.move = function(tile) {
    this.targetTile = tile;
    this.xtarget = tile.topLeftX;
    this.ytarget = tile.topLeftY;
};

Person.prototype.update = function(dt) {
    if (this.destroyed) {
        return;
    }

    var dx = this.xtarget - this.x;
    var dy = this.ytarget - this.y;

    var sqrt = Math.sqrt(dx * dx + dy * dy);

    if (sqrt < 4.0) {
        return;
    }

    if (sqrt !== 0.0) {
        dx = this.speed * dt * dx / sqrt;
        dy = this.speed * dt * dy / sqrt;
    }

    this.x += dx;
    this.y += dy;
};

Person.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Person.prototype.setSprite = function(sprite) {
    this.sprite = sprite;
};

Person.prototype.destroy = function() {
    this.destroyed = true;
};

/**
 * @param {Tile} tile
 */
Person.prototype.respawn = function(tile) {
    if (tile instanceof Tile) {
        this.startTile = tile;
    }

    this.x = this.startTile.topLeftX;
    this.y = this.startTile.topLeftY;
    this.destroyed = false;
};
