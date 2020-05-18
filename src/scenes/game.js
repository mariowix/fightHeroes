const Phaser = require('phaser');
const { Player } = require('../classes/Player');
const { Minimap } = require('../classes/Minimap');
const { EnemiesController } = require('../classes/EnemiesController');
const { OnlineInfo } = require('../classes/OnlineInfo');

class GameScene extends Phaser.Scene {
    constructor(data) {
        super('GameScene');
    }

    init(data) {
        this._roomName = data.roomName;
    }

    preload() {
        this.load.atlas('entities', './assets/spritesheets/entities.png', './assets/spritesheets/entities.json');
        this.load.image('background', './assets/back.png');
        this.load.image('arrowIndicator', './assets/arrow_indicator.png');

        this.hashPlayers = {};

        this.worldBounds = {
            width: 2024,
            height: 904
        }

        // Create socket events
        let { global: { socket } } = this.game; 

        socket.on('playerPositionUpdate', (data) => {
            let player = this.hashPlayers[data.player];

            if (player === this.player) {
                player.x = data.position.x;
                player.y = data.position.y;
            }
        })
    }

    create() {
        let { socket: { id: socketId } } = this.game.global;

        // Configure groups
        this.players = this.add.group();
        this.enemies = this.add.group();
        
        this.player = new Player(this, 200, 200, this.worldBounds, socketId);
        this.miniMap = new Minimap(this, 10, 10, '', '', this.worldBounds);
        this.enemyCtrl = new EnemiesController(this, 0, 0, this.worldBounds);
        this.onlineInformation = new OnlineInfo(this, this._roomName, this.worldBounds, 0 , 0);

        this.cameras.main.startFollow(this.player);


        this.back = this.add.tileSprite(0,0,3000,2500, 'background').setDepth(-5);

        this.back.setOrigin(0, 0);
        this.back.alpha = 0.5

        this.players.add(this.player);
        this.hashPlayers[socketId] = this.player;
        
        console.log(this.game.global)
    }

    update() {

        let xPercent = this.player.x / this.worldBounds.width;
        let yPercent = this.player.y / this.worldBounds.height;
        
        this.back.x = this.cameras.main.worldView.x;
        this.back.y = this.cameras.main.worldView.y;

        this.back.tilePositionX = this.back.x + (xPercent*this.back.width);
        this.back.tilePositionY = this.back.y+ (yPercent*this.back.height);
    }

    emit(eventName, data) {
        const { global: { socket } } = this.game;

        socket.emit(eventName, { ...data, roomName: this._roomName })
    }
}

module.exports = {
    GameScene
}

