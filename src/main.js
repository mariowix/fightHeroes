const { MenuScene } = require('./scenes/menu');
const { GameScene } = require('./scenes/game');


new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "mainContainner",
    scene: [MenuScene, GameScene],
    physics: {
        default: 'arcade',
        debug: true
    },debug:true
});

const socket = io.connect('http://localhost:8000')