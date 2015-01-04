/**
 *
 * @param {number} speed
 * @param {Tile} startTile
 * @param {Tile} targetTile
 * @param {number} destroyX
 * @constructor
 */
var Enemy = function(speed, startTile, targetTile, destroyX) {
    this.destroyX = destroyX;
    this.respawnTime = Date.now();

    // Call constructor of parent class
    Person.call(this, 'images/enemy-bug.png', speed, startTile, targetTile, 40);
};

Enemy.prototype = Object.create(Person.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    if (! this.destroyed && this.x > this.destroyX) {
        this.destroy();
        this.respawnTime = Date.now() + Math.random() * 3000;
    }

    if (this.destroyed) {
        if (this.respawnTime < Date.now()) {
            this.respawn();
        }
    }

    Person.prototype.update.call(this, dt);
};


