var Actor = function(sprite, initialTile, radius) {
    this.sprite = sprite;
    this.x = initialTile.topLeftX;
    this.y = initialTile.topLeftY;
    this.radius = radius;
    this.hidden = false;
};

Actor.prototype.render = function() {
    if (this.hidden) {
        return;
    }

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 20);
};

Actor.prototype.setSprite = function(sprite) {
    // create cache entry
    Resources.load(sprite);
    this.sprite = sprite;
};

Actor.prototype.hide = function() {
    this.hidden = true;
};

/**
 *
 * @param {Actor} other
 */
Actor.prototype.collidesWith = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var collisionDistance = this.radius + other.radius;

    return distance < collisionDistance;
};
