/**
 *
 * @param {string} sprite The initial sprite of the Person
 * @param {number} speed In pixel/sec
 * @param {Tile} startTile Start tile
 * @param {Tile} targetTile Target tile. Set to startTile if undefined.
 * @param {number} radius The radius of the Person for collision detection in pixel.
 * @constructor
 */
var Person = function(sprite, speed, startTile, targetTile, radius) {
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
    this.radius = radius;
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
        dx = this.speed * dx * dt / sqrt;
        dy = this.speed * dy * dt / sqrt;
    }

    this.x += dx;
    this.y += dy;
};

Person.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 20);
};

Person.prototype.setSprite = function(sprite) {
    // create cache entry
    Resources.load(sprite);
    this.sprite = sprite;
};

Person.prototype.destroy = function() {
    this.destroyed = true;
};

/**
 * @param {Boolean} resetTarget
 */
Person.prototype.respawn = function(resetTarget) {
    if (resetTarget) {
        this.targetTile = this.startTile;
        this.xtarget = this.startTile.topLeftX;
        this.ytarget = this.startTile.topLeftY;
    }

    this.x = this.startTile.topLeftX;
    this.y = this.startTile.topLeftY;
    this.destroyed = false;
};

/**
 *
 * @param {Person} other
 */
Person.prototype.collidesWith = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var collisionDistance = this.radius + other.radius;

    return distance < collisionDistance;
};
