const { MenuScene } = require('./scenes/menu');
const { GameScene } = require('./scenes/game');

const socket = io.connect('http://localhost:8000');

new Phaser.Game({
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
