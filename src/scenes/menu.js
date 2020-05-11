const Phaser = require('phaser');

class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.add.plugin(PhaserInput.Plugin)
    }

    create() {
        var input = this.add.inputField(10, 90);
    }

    update() {

    }
}

module.exports = {
    MenuScene
}