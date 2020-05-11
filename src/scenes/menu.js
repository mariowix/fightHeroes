const Phaser = require('phaser');

class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.add.plugin(PhaserInput.Plugin)
    }

    create() {
    
    }

    update() {

    }
}

module.exports = {
    MenuScene
}