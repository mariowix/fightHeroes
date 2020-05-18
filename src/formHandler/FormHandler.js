class FormHandler {
    constructor(formName, scene, visible) {
        this.scene = scene;
        this.formName = formName;

        this.form = scene.add.dom(
                        this.middleX(),
                        this.middleY()
                    ).createFromCache(this.formName);

        this.form.visible = visible;
        this.form.setPerspective(800);
        this.form.addListener('click');
        this.onClick();

    }

    appear() {
        this.form.visible = true;
    }

    dissapear() {
        this.form.visible = false;
    }

    middleX(){ 
        const { x, width } = this.scene.cameras.main;
        return (x + width) / 2;
    }

    middleY() {
        const { y, height } = this.scene.cameras.main;
        return (y + height) / 2;
    }

    onClick() {
        this.form.on('click', (event) => {
            let action = this.actions[event.target.id] || (() => {});
            action(event);
        });
    }
}

module.exports = {
    FormHandler
}