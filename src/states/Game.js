/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';
import EventManager from '../objects/EventManager';
import UI from '../objects/UI';

export default class Game extends Phaser.State {

    create() {
        // TODO: Replace this with a really cool game code here :)
        const {centerX: x, centerY: y} = this.world;
        //this.add.existing(new Logo(this.game, x, y));

        let m = this.add.tilemap('level');
        m.addTilesetImage('spritesheet', 'spritesheet');

        let layer = m.createLayer('Tile Layer 1');

        console.log(m.getTile(1, 1, 'Tile Layer 1'));

        this.event_manager = new EventManager();
        this.ui = new UI();

        this.shows_popup = false;


    }

    update() {
        if (this.shows_popup) return;

        let event = this.event_manager.spawn();

        if (event) {
            this.ui.show(event);

        }
    }

}
