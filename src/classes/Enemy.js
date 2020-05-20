const Phaser = require('phaser');
const { IEnemy } = require('./base/IEnemy');
 
class Enemy extends IEnemy {
    constructor(scene, x = 0, y = 0, worldBounds, smartness = 1) {
        super(scene, x, y, 'entities', 'spaceship_enemy_red.png');
    }

    preUpdate() {
        IEnemy.prototype.preUpdate.call(this);
    }
}

module.exports = {
    Enemy
}
