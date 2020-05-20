const Phaser = require('phaser');
const { IPlayer } = require('./base/IPlayer')
const { PlayerIndicator } = require('./ui/PlayerIndicator');
 
class RemotePlayer extends IPlayer {
    constructor(scene, x, y, worldBounds, socketId) {
        super(scene, x, y, worldBounds, socketId);
     
        //this.indicator = new PlayerIndicator(this.scene, this.x, this.y, this)
    }
}

module.exports = {
    RemotePlayer
}
