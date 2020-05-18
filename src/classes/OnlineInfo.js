const Phaser = require('phaser');

class OnlineInfo extends Phaser.GameObjects.Container {
    constructor(scene,  roomName = '', worldBounds, x = 0, y = 0) {
        super(scene, x, y);
        scene.add.existing(this);

        this.textStyle = {
            font: '30px Arial', fill: '#999999', align: 'center'
        }

        this._roomName = roomName;
        this._playerCount = 0;
        this._playerLimit = 4;

        this.roomName = this.scene.add.text(0, 0, this._roomName, this.textStyle);
        this.playerCount = this.scene.add.text(0, 40, '(' + this._playerCount + '/'+ this._playerLimit + ')', this.textStyle);

        this.add(this.roomName);
        this.add(this.playerCount);
    }

    preUpdate() {
        let initx = this.scene.cameras.main.worldView.x;
        let inity = this.scene.cameras.main.worldView.y;

        this.x = 100 + initx;
        this.y = 100 + inity;
    }



}

module.exports = {
    OnlineInfo
}
