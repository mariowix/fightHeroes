const Phaser = require('phaser');
const { PlayerIndicator } = require('./PlayerIndicator');
 
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, worldBounds, socketId) {
        super(scene, x, y, 'entities', 'ship1.png',);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.worldBounds = worldBounds;
        this.setScale(0.3, 0.3);
        this.scene = scene;
        this.body.setMaxSpeed(200);
        this.health = 100;
        this.maxHealth = 100;
        this.indicator = new PlayerIndicator(this.scene, this.x, this.y, this)
        this.socketId = socketId;

        scene.input.on('pointermove', (pointer) => {
            let { x:x1, y:y1 } = pointer.position;
            let x = window.innerWidth/2;
            let y = window.innerHeight/2;

            
            let angle = Math.atan2(y1-y, x1-x);
            this.angle = Phaser.Math.RadToDeg(angle)+90;
        });

        this.btnAcel = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.btnBreak = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.graphics = this.scene.add.graphics({x: 0, y: 0, add: true});
        this.zoom = 10;
    }

    preUpdate() {
        if (this.btnAcel.isDown) {
            this.scene.physics.velocityFromAngle(this.angle - 90, this.body.maxSpeed, this.body.acceleration)
        } else if (this.btnBreak.isDown) {
            this.scene.physics.velocityFromAngle(this.angle + 90, this.body.maxSpeed, this.body.acceleration)
        } else {
            this.setAcceleration(0);
        }

        let outOfBounds = this.indicator.visible = this.outOfBounds();

        if (outOfBounds) {
            this.shake();
        }

        if (this.health <= 0) {
            this.onDead();
        }

        this.drawHealth();
        this.scene.emit('playerPosition', { position: { x: this.x, y: this.y }, health: this.health, player: this.socketId })
    }

    outOfBounds() {
        return    this.x < 0 || this.x > this.worldBounds.width
               || this.y < 0 || this.y > this.worldBounds.height
    }

    shake() {
        if (!this.scene.cameras.main.shakeEffect.isRunning){
            this.scene.cameras.main.shakeEffect.start(500, 0.007, 0.007);
            this.health -= 5;
        }

        if (!this.scene.cameras.main.flashEffect.isRunning){
            this.scene.cameras.main.flashEffect.start(1000, 50, 0.5, 0.5, 0.01)
        }
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
    Player
}
