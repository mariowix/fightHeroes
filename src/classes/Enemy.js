const Phaser = require('phaser');

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, worldBounds, smartness = 1) {
        super(scene, x, y, 'entities', 'spaceship_enemy_red.png');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.setScale(0.3, 0.3);

        this.actionQueue = [];
        this.maxHealth = 100;
        this.health = 100;
        this.graphics = this.scene.add.graphics({x: 0, y: 0, add: true});
        this.setDepth(-1);
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

    preUpdate() {
        this.drawHealth();
    }

    onAction(){
        let nextAction = this.actionQueue.pop();

        if (!nextAction) {
            // Move randomly
            return;
        }

        switch(nextAction.action) {
            case 0:
                // Move
                break;
            case 1:
                // Attack
                break;
        }
    }

    

}

module.exports = {
    Enemy
}
