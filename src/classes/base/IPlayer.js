const Phaser = require('phaser');
 
class IPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, worldBounds, socketId) {
        super(scene, x, y, 'entities', 'ship1.png');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.worldBounds = worldBounds;
        this.setScale(0.3, 0.3);
        this.scene = scene;
        this.body.setMaxSpeed(200);
        this.health = 100;
        this.maxHealth = 100;
        this.socketId = socketId;


        this.btnAcel = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.btnBreak = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.graphics = this.scene.add.graphics({x: 0, y: 0, add: true});
        this.zoom = 10;
    }

    preUpdate() {
        if (this.health <= 0) {
            this.onDead();
        }

        this.drawHealth();
    }

    outOfBounds() {
        return    this.x < 0 || this.x > this.worldBounds.width
               || this.y < 0 || this.y > this.worldBounds.height
    }

    drawHealth(){
        this.graphics.clear();
        this.graphics.fillStyle(0x990000)
        this.graphics.fillRectShape({
            x: this.x - (this.maxHealth /2),
            y: this.y + 50,
            width: 100,
            height: 10 
        });

        this.graphics.fillStyle(0x009900)
        this.graphics.fillRectShape({
            x: this.x - (this.maxHealth /2),
            y: this.y + 50,
            width: this.health,
            height: 10 
        });
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

}

module.exports = {
    IPlayer
}
