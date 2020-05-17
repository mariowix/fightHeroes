const { FormHandler } = require('./FormHandler');

class JoinRoomHandler extends FormHandler {
    constructor(scene, parent, formName = 'joinRoom', visible = false) {
        super(formName, scene, visible);

        this.parent = parent;

        this.actions = {
            acceptJoinRoom: () => {
                // Logic to join the room
                alert('Join room');
                this.dissapear();
            },
            cancelJoinRoom: () => {
                this.dissapear();
                this.parent.appear();
            }
        };
    }
}

module.exports = {
    JoinRoomHandler
}