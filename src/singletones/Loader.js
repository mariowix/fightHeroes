let loader = null;

class Loader {
    constructor() {
        this.element = document.querySelector('#globalLoader');
    }

    static getInstance(){
        if (!loader) loader = new Loader();

        return loader;
    }

    show() {
        if (!this.element.classList.contains('visible'))
            this.element.classList.add('visible');
        this.element.style.display = 'flex';
    }

    hide() {
        if (this.element.classList.contains('visible'))
            this.element.classList.remove('visible');
        this.element.style.display = 'none';
    }
}

module.exports = {
    Loader
};
