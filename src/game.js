class Game extends Phaser.Game {
    constructor(socket, phaserConfig) {
        super(phaserConfig);
        this.global = {
            socket
        }
    }
}

module.exports = {
    Game
};
