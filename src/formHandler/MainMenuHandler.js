const { FormHandler } = require('./FormHandler');
const { JoinRoomHandler } = require('./JoinRoomHandler');

class MainMenuHandler extends FormHandler {
    constructor(scene, formName= 'mainMenu', visible = true) {
        super(formName, scene, visible);

        this.joinRoomHandler = new JoinRoomHandler(this.scene, this);

        this.actions = {
            createRoom: () => {
                // Logic to create the room
                this.dissapear();
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