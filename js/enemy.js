/**
 *
 * @param {number} speed
 * @param {Tile} startTile
 * @param {Tile} targetTile
 * @param {number} hideX
 * @constructor
 */
var Enemy = function(speed, startTile, targetTile, hideX) {
    this.hideX = hideX;
    this.respawnTime = Date.now();
    this.startPosition = true;

    // Call constructor of parent class
    Person.call(this, 'images/enemy-bug.png', speed, startTile, targetTile, 40);
};

Enemy.prototype = Object.create(Person.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    if (! this.hidden && this.x > this.hideX) {
        this.hide();
        this.respawnTime = Date.now() + Math.random() * 3000;
    }

    if (this.startPosition) {
        this.startPosition = false;
        this.hide();
        this.respawnTime = Date.now() + Math.random() * 2000;
    }

    if (this.hidden) {
        if (this.respawnTime < Date.now()) {
            this.respawn();
        }
    }

    Person.prototype.update.call(this, dt);
};

Enemy.prototype.reset = function() {
    this.startPosition = true;
};


