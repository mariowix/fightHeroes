const Phaser = require('phaser');

class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, key='', frame='', worldBounds) {
        super(scene, x, y, key, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

}

module.exports = {
    Explosion
}
