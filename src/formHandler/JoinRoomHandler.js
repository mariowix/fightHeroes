const { FormHandler } = require('./FormHandler');
const { Loader } = require('../singletones/Loader');

class JoinRoomHandler extends FormHandler {
    constructor(scene, parent, formName = 'joinRoom', visible = false) {
        super(formName, scene, visible);

        this.parent = parent;

        this.actions = {
            acceptJoinRoom: (event) => {
                const { game: { global: { socket }}} = this.scene;
                const roomId = event.target.parentElement.querySelector('#roomId').value

                // TODO: Instead of using socket directly, use observer patter to respond events

                socket.emit('joinRoom', { roomId, player: socket.id })

                Loader.getInstance().show();

                socket.on('joinedRoom', (data) => {
                    this.scene.scene.start('GameScene', data);
                    Loader.getInstance().hide();
                });

                socket.on('errorJoinedRoom', () => {
                    Loader.getInstance().hide();
                    alert('Hubo un problema al intentar conectarse, asegurese de que el roomId sea el correcto');
                });

                //this.dissapear();
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