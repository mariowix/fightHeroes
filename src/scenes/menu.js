const Phaser = require('phaser');
const { MainMenuHandler } = require('../formHandler/MainMenuHandler');

class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.html('mainMenu', './assets/html/main-menu.html');
        this.load.html('joinRoom', './assets/html/join-room.html');
    }

    create() {
        this.mainMenu = new MainMenuHandler(this);
    }

    update() {

    }
}

module.exports = {
    MenuScene
}