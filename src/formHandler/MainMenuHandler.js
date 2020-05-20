const { FormHandler } = require('./FormHandler');
const { JoinRoomHandler } = require('./JoinRoomHandler');

class MainMenuHandler extends FormHandler {
    constructor(scene, formName= 'mainMenu', visible = true) {
        super(formName, scene, visible);

        this.joinRoomHandler = new JoinRoomHandler(this.scene, this);

        let { game: { global: { socket } }} = this.scene;

        this.actions = {
            createRoom: () => {
                socket.emit('createRoom');

                socket.on('roomCreated', data => {
                    console.log(data)
                    this.scene.scene.start('GameScene', { ...data, isServer: true });
                });
            },
            joinRoom: () => {                
                this.dissapear();
                this.joinRoomHandler.appear();
            }
        };
    }
}

module.exports = {
    MainMenuHandler
}