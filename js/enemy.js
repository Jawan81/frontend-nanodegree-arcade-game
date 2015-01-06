/**
 * The Enemy class contains the functionality of an enemy bug.
 *
 * @param {number} speed The speed of the enemy.
 * @param {Tile} startTile The tile where the enemy shall respawn.
 * @param {Tile} targetTile The tile the enemy shall go to.
 * @param {number} hideX The x-border after which the enemy shall be hidden.
 * @constructor
 */
var Enemy = function(speed, startTile, targetTile, hideX) {
    this.hideX = hideX;
    this.respawnTime = Date.now();
    this.startPosition = true;

    // Call constructor of parent class
    Person.call(this, 'images/enemy-bug.png', speed, startTile, targetTile, 40);
};

/**
 * Make sure we inherit from Person.
 *
 * @type {Person.prototype}
 */
Enemy.prototype = Object.create(Person.prototype);

/**
 * Make sure the constructor is set correctly.
 *
 * @type {Enemy}
 */
Enemy.prototype.constructor = Enemy;

/**
 * Updates the position of an enemy.
 *
 * @param dt
 */
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

/**
 * Resets an enemy to its starting position.
 */
Enemy.prototype.reset = function() {
    this.startPosition = true;
};


