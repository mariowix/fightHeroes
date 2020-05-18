const Phaser = require('phaser');

class OnlineInfo extends Phaser.GameObjects.Container {
    constructor(scene,  roomName = '', worldBounds, x = 0, y = 0) {
        super(scene, x, y);
        scene.add.existing(this);

        this.textStyle = {
            font: '25px Arial', fill: '#999999', align: 'center'
        }

        this._roomName = roomName;
        this._playerCount = 1;
        this._playerLimit = 4;

        this.roomName = this.scene.add.text(0, 0, 'Room ID: ' + this._roomName, this.textStyle);
        this.playerCount = this.scene.add.text(20, 40, 'Players: (' + this._playerCount + '/'+ this._playerLimit + ')', this.textStyle);

        this.add(this.roomName);
        this.add(this.playerCount);

        this.graphics = this.scene.add.graphics({x: 0, y: 0, add: true});

        this.depth = 100;
    }

    preUpdate() {
        let initx = this.scene.cameras.main.worldView.x + 50;
        let inity = this.scene.cameras.main.worldView.y + this.scene.cameras.main.worldView.height;

        this.graphics.clear();

        this.graphics.fillStyle(0x202020, 0.7)
        this.graphics.fillRectShape({
            x: initx -10,
            y: inity - 100,
            width: 230,
            height: 85
        });

        this.x = initx 
        this.y = inity - (90)
    }

    addNewPlayer() {
        this._playerCount++;
        this.playerCount.setText('Players: (' + this._playerCount + '/'+ this._playerLimit + ')');
    }



}

module.exports = {
    OnlineInfo
}
