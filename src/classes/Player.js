const Phaser = require('phaser');
const { IPlayer } = require('./IPlayer')
const { PlayerIndicator } = require('./PlayerIndicator');
 
class Player extends IPlayer {
    constructor(scene, x, y, worldBounds, socketId) {
        super(scene, x, y, worldBounds, socketId);
     
        this.indicator = new PlayerIndicator(this.scene, this.x, this.y, this)

        scene.input.on('pointermove', (pointer) => {
            let { x:x1, y:y1 } = pointer.position;
            let x = window.innerWidth/2;
            let y = window.innerHeight/2;

            
            let angle = Math.atan2(y1-y, x1-x);
            this.angle = Phaser.Math.RadToDeg(angle)+90;
        });

        this.btnAcel = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.btnBreak = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.eventSentToServer =  this.scene.time.addEvent({ delay: 50, callback: this.emitPosition, callbackScope: this, repeat: -1});
    }

    preUpdate() {
        IPlayer.prototype.preUpdate.call(this);
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

    emitPosition() {
        this.scene.emit('playerPosition', { position: { x: this.x, y: this.y }, health: this.health, player: this.socketId, angle: this.angle });
    }
}

module.exports = {
    Player
}
