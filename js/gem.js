var Gem = function(sprite, tile, score) {
    Entity.call(this, sprite, tile, 20);
    this.picked = false;
    this.score = score;
};

Gem.prototype = Object.create(Entity.prototype);
Gem.constructor = Gem;

Gem.prototype.pick = function() {
    this.picked = true;
};

Gem.prototype.isPicked = function(player) {
    if (! this.picked) {
        return this.collidesWith(player);
    }

    return false;
};

Gem.prototype.checkPicked = function(player) {
    var picked = this.isPicked(player);

    if (picked) {
        this.hide();
        this.pick();
    }

    return picked;
};

Gem.prototype.getScore = function() {
    if (this.picked) {
        return this.score;
    }

    return 0;
};

Gem.prototype.reset = function() {
    this.picked = false;
};

