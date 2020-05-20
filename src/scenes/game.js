const Phaser = require('phaser');
const { Player } = require('../classes/Player');
const { RemotePlayer } = require('../classes/RemotePlayer')
const { Minimap } = require('../classes/ui/Minimap');
const { OnlineInfo } = require('../classes/ui/OnlineInfo');
const { EnemyController } = require('../classes/controllers/EnemyController');

class GameScene extends Phaser.Scene {
    constructor(data) {
        super('GameScene');
    }

    init(data) {
        this._roomName = data.roomName;
        this.isServer = data.isServer;
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

    }

    create() {
        let { global: { socket } } = this.game;

        // Configure groups
        this.players = this.add.group();
        this.enemies = this.add.group();
        
        this.player = new Player(this, 200, 200, this.worldBounds, socket.id);
        this.miniMap = new Minimap(this, 10, 10, '', '', this.worldBounds);
        this.onlineInformation = new OnlineInfo(this, this._roomName, this.worldBounds, 0 , 0);

        this.cameras.main.startFollow(this.player);

        this.back = this.add.tileSprite(0,0,3000,2500, 'background').setDepth(-5);

        this.back.setOrigin(0, 0);
        this.back.alpha = 0.5

        this.players.add(this.player);
        this.hashPlayers[socket.id] = this.player;
        
        this.enemiesCtrl = new EnemyController(this, this.worldBounds);
        this.configureEvents(socket);
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

    configureServer(socket) {
        this.wavesChecker =  this.time.addEvent({ delay: 1000, callback: this.onWaveChecker, callbackScope: this, repeat: -1});
    }

    configureClient(socket) {
        socket.on('waveEnd', () => {
            // Show animation of wave end
        });

        socket.on('waveStart', () => {
            // Show animation of get ready
        });

        socket.on('enemiesChanges', data => {
            // Update enemies statusdwsaas
        });
    }

    configureCommonEvents(socket) {
        socket.on('playerPositionUpdate', (data) => {
            let player = this.hashPlayers[data.player];

            if (!player) return;

            if (player && player !== this.player) {
                player.x = data.position.x;
                player.y = data.position.y;
                player.angle = data.angle;
                player.health = data.health;
            }
        });

        socket.on('otherJoined', (data) => {
            this.hashPlayers[data.player] = new RemotePlayer(this, 0, 0, this.worldBounds, data.player);

            this.players.add(this.hashPlayers[data.player]);
            this.onlineInformation.addNewPlayer();
        });
    }

    configureEvents(socket) {
        this.configureCommonEvents(socket);

        if (this.isServer) {
            this.configureServer(socket);
        } else {
            this.configureClient(socket);
        }

    }

    onWaveChecker() {
        if(!this.enemiesCtrl.enemiesLeft()) {
            this.enemiesCtrl.startWave();
        }
    }
}

module.exports = {
    GameScene
}

