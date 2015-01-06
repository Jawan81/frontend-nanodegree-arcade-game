/**
 * A Person is movable entity on the game board that can be interacted with.
 *
 * @param {string} sprite The initial sprite of the Person
 * @param {number} speed In pixel/sec
 * @param {Tile} startTile Start tile
 * @param {Tile} targetTile Target tile. Set to startTile if undefined.
 * @param {number} radius The radius of the Person for collision detection in pixel.
 * @constructor
 */
var Person = function(sprite, speed, startTile, targetTile, radius) {
    Entity.call(this, sprite, startTile, radius);

    if (typeof targetTile === 'undefined') {
        targetTile = startTile;
    }

    this.xtarget = targetTile.topLeftX;
    this.ytarget = targetTile.topLeftY;
    this.speed = speed;
    this.startTile = startTile;
    this.targetTile = targetTile;
    this.hidden = false;
};

/**
 * Make sure we inherit from Entity.
 *
 * @type {Entity.prototype}
 */
Person.prototype = Object.create(Entity.prototype);

/**
 * Make sure the constructor is set correctly.
 *
 * @type {Person}
 */
Person.constructor = Person;

/**
 * Sets the target tile of a Person so that it will move to that position on updates.
 *
 * @param {Tile} tile The tile to be moved to.
 */
Person.prototype.move = function(tile) {
    this.targetTile = tile;
    this.xtarget = tile.topLeftX;
    this.ytarget = tile.topLeftY;
};

/**
 * Updates the position of a Person.
 *
 * @param {number} dt The time difference to the last update.
 */
Person.prototype.update = function(dt) {
    if (this.hidden) {
        return;
    }

    var dx = this.xtarget - this.x;
    var dy = this.ytarget - this.y;

    var sqrt = Math.sqrt(dx * dx + dy * dy);

    // make sure we don't suffer of floating point jitter
    // so stop movement if we reach the last 4 pixels of the target
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

/**
 * Respawns a person at the start tile.
 *
 * @param {Boolean} resetTarget When set to true the Person will not move after respawn.
 */
Person.prototype.respawn = function(resetTarget) {
    if (resetTarget) {
        this.targetTile = this.startTile;
        this.xtarget = this.startTile.topLeftX;
        this.ytarget = this.startTile.topLeftY;
    }

    this.x = this.startTile.topLeftX;
    this.y = this.startTile.topLeftY;
    this.hidden = false;
};
