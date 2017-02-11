
export default class Building extends Phaser.Sprite {
    constructor(game, x, y, name, type, jobs, profit, pollution) {
        super(game, x, y, type.sprite);
        this.anchor.set(0.5);

        this.name = name; this.type = type; this.jobs = jobs; this.profit = profit; this.pollution = pollution;
    }
}
