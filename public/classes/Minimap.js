const Phaser = require('phaser');

class Minimap extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 0, y = 0, key='', frame='', worldBounds) {
        super(scene, x, y, key, frame);
        scene.add.existing(this);

        this.scene = scene;
        this.visible = false;
        this.worldBounds = worldBounds;
        this.entities = {
            players: [],
            enemies: []
        };
        this.graphics = this.scene.add.graphics({x: 0, y: 0, add: true});
        this.zoom = 10;

        this.graphics.setDefaultStyles({
            lineStyle: {
                width: 1,
                color: 0xFF00FF,
                alpha: 1
            },
            fillStyle: {
                color: 0xFF00FF,
                alpha: 1
            }
        });

        this.btnZoom = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)

        this.btnZoom.on('down', () => {
            this.zoom -= 0.5;

            if (this.zoom < 3) this.zoom = 10;
        });
    }

    drawMinimapBackground() {
        let initx = this.scene.cameras.main.worldView.x;
        let inity = this.scene.cameras.main.worldView.y;

        this.graphics.clear();

        this.graphics.fillStyle(0x202020, 0.7)
        this.graphics.fillRectShape({
            x: initx + 10,
            y: inity + 10,
            width: this.worldBounds.width / this.zoom,
            height: this.worldBounds.height /this.zoom 
        });

        this.graphics.fillStyle(0x0055FF)
        this.scene.players.getChildren().forEach((player) => {
            this.graphics.fillPoint(initx + 10 + (player.x / this.zoom), inity + 10 + (player.y / this.zoom), 3);
        });

        this.graphics.fillStyle(0x991111)
        this.scene.enemies.getChildren().forEach((enemy) => {
            this.graphics.fillPoint(initx + 10 + (enemy.x / this.zoom), inity + 10 + (enemy.y / this.zoom), 3);
        });
    }

    preUpdate() {
        this.drawMinimapBackground();
    }
}

module.exports = {
    Minimap
}
