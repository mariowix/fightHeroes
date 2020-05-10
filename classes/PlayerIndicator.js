const Phaser = require('phaser');

class PlayerIndicator extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, player) {
        super(scene, x, y, 'arrowIndicator', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.setScale(0.3, 0.3);
        this.player = player;
    }


    preUpdate() {
        this.x = this.player.x;
        this.y = this.player.y;
    }

    

}

module.exports = {
    PlayerIndicator
}
