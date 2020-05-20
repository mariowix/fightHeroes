const { Enemy } = require('../Enemy');

class EnemyController {
    constructor(scene, worldBounds) {
        this.wave = 0;
        this.enemyWaveLimit = 3;
        this.scene = scene;
        this.worldBounds = worldBounds;
    }

    enemiesLeft() {
        return this.scene.enemies.children.size > 0;
    }

    startWave() {
        this.wave++;
        const enemies = Math.ceil(this.wave / this.enemyWaveLimit);

        for(let i = 0; i < enemies; i++) {
            const [randX, randY] = this.randomPosition();
            let enemy = new Enemy(this.scene, randX, randY, this.worldBounds, this.wave);
            console.log(enemy);

            this.scene.enemies.add(enemy);
        }
    }

    randomPosition() {
        return [ Math.floor(Math.random() * (this.worldBounds.width + 1)),
                 Math.floor(Math.random() * (this.worldBounds.height + 1)) ]
    }
}

module.exports = {
    EnemyController
}
