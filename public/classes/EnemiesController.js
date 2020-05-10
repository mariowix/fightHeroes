const Phaser = require('phaser');
const { Enemy } = require('./Enemy')

class EnemiesController extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, worldBounds) {
        super(scene, x, y, '', '');
        scene.add.existing(this);

        this.worldBounds = worldBounds;
        this.setScale(0.3, 0.3);
        this.scene = scene;
        this.visible = false;
        this.level = 1;
        this.enemiesCounter = this.level * 5;
        this.worldBounds = worldBounds;

        this.createEnemies();
    }

    preUpdate() {

    }

    outOfBounds() {
        return    this.x < 0 || this.x > this.worldBounds.width
               || this.y < 0 || this.y > this.worldBounds.height
    }

    onDead() {
        let newX = Math.floor(Math.random() * (this.worldBounds.width + 1));
        let newY = Math.floor(Math.random() * (this.worldBounds.height + 1));

        this.health = 100;

        this.x = newX;
        this.y = newY;

        this.setAcceleration(0);
        this.setVelocity(0);
    }

    createEnemies() {
        for(let i = 0; i < this.enemiesCounter; i++) {
            let newX = Math.floor(Math.random() * (this.worldBounds.width + 1));
            let newY = Math.floor(Math.random() * (this.worldBounds.height + 1));
            let enemy = new Enemy(this.scene, newX, newY);

            this.scene.enemies.add(enemy);
        }
    }

}

module.exports = {
    EnemiesController
}
