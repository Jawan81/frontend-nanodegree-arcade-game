/**
 * The Gem class is an entity that provides the functionality of a gem.
 *
 * @param {string} sprite The sprite of the gem.
 * @param {Tile} tile The tile the gem shall be placed to.
 * @param {number} score The value of the score of this gem.
 * @constructor
 */
var Gem = function(sprite, tile, score) {
    Entity.call(this, sprite, tile, 20);
    this.picked = false;
    this.score = score;
};

/**
 * Make sure we inherit from Entity.
 *
 * @type {Entity.prototype}
 */
Gem.prototype = Object.create(Entity.prototype);

/**
 * Make sure the constructor is set correctly.
 *
 * @type {Gem}
 */
Gem.constructor = Gem;

/**
 * Can be called in case this gem was picked up.
 */
Gem.prototype.pick = function() {
    this.picked = true;
};

/**
 * Check if a player can pick up this gem.
 *
 * @param {Player} player The player.
 * @returns {Boolean} true in case the player can pick up the gem, false if not.
 */
Gem.prototype.isPicked = function(player) {
    if (! this.picked) {
        return this.collidesWith(player);
    }

    return false;
};

/**
 * If the player can pick up this gem reaches the "picked" state.
 *
 * @param {Player} player The player.
 * @returns {Boolean} If the gem was picked up.
 */
Gem.prototype.checkPicked = function(player) {
    var picked = this.isPicked(player);

    if (picked) {
        this.hide();
        this.pick();
    }

    return picked;
};

/**
 * Returns the current score of the gem.
 *
 * @returns {number}
 */
Gem.prototype.getScore = function() {
    if (this.picked) {
        return this.score;
    }

    return 0;
};

/**
 * Resets the gem.
 */
Gem.prototype.reset = function() {
    this.picked = false;
};

