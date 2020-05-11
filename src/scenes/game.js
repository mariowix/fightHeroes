const Phaser = require('phaser');
const { Player } = require('../classes/Player');
const { Minimap } = require('../classes/Minimap');
const { EnemiesController } = require('../classes/EnemiesController');

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.atlas('entities', './assets/spritesheets/entities.png', './assets/spritesheets/entities.json');
        this.load.image('background', './assets/back.png');
        this.load.image('arrowIndicator', './assets/arrow_indicator.png');

        this.worldBounds = {
            width: 2024,
            height: 904
        }
    }

    create() {
        // Configure groups
        this.players = this.add.group();
        this.enemies = this.add.group();
        
        this.player = new Player(this, 200, 200, this.worldBounds);
        this.miniMap = new Minimap(this, 10, 10, '', '', this.worldBounds);
        this.enemyCtrl = new EnemiesController(this, 0, 0, this.worldBounds);
        this.cameras.main.startFollow(this.player);

        this.back = this.add.tileSprite(0,0,3000,2500, 'background').setDepth(-5);

        this.back.setOrigin(0, 0);
        this.back.alpha = 0.5

        this.players.add(this.player);

        
    }

    update() {

        let xPercent = this.player.x / this.worldBounds.width;
        let yPercent = this.player.y / this.worldBounds.height;
        
        this.back.x = this.cameras.main.worldView.x;
        this.back.y = this.cameras.main.worldView.y;

        this.back.tilePositionX = this.back.x + (xPercent*this.back.width);
        this.back.tilePositionY = this.back.y+ (yPercent*this.back.height);
    }
}

module.exports = {
    GameScene
}

