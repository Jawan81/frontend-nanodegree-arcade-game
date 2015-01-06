/**
 * A base class for all entities on a game board.
 *
 * @param {string} sprite The sprite of the entity.
 * @param {Tile} initialTile The tile on which the entity shall initially be rendered.
 * @param {number} radius The radius of the entity in pixels.
 * @constructor
 */
var Entity = function(sprite, initialTile, radius) {
    this.sprite = sprite;
    this.x = initialTile.topLeftX;
    this.y = initialTile.topLeftY;
    this.radius = radius;
    this.hidden = false;
};

/**
 * Renders an entity.
 */
Entity.prototype.render = function() {
    if (this.hidden) {
        return;
    }

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 20);
};

/**
 * Sets the sprite of an entity.
 *
 * @param sprite
 */
Entity.prototype.setSprite = function(sprite) {
    // create cache entry in case it is not yet cached.
    Resources.load(sprite);
    this.sprite = sprite;
};

/**
 * Hides an entity so it is not rendered.
 */
Entity.prototype.hide = function() {
    this.hidden = true;
};

/**
 * Checks if two entites collide.
 *
 * @param {Entity} other The other entity.
 */
Entity.prototype.collidesWith = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var collisionDistance = this.radius + other.radius;

    return distance < collisionDistance;
};
