const { MenuScene } = require('./scenes/menu');
const { GameScene } = require('./scenes/game');
const { Game } = require('./game');
const { Loader } = require('./singletones/Loader');

const socket = io.connect('http://localhost:8000');



new Game(socket, {
    parent: "mainContainner",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: [MenuScene, GameScene],
    physics: {
        default: 'arcade',
        debug: true
    },
    dom: {
        createContainer: true
    }
});

// Not phaser related javascript
