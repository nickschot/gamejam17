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


        let layer = m.createLayer('Ground');

        this.event_manager = new EventManager(this);
        this.ui = new UI(this);

        this.shows_popup = false;
        this.current_event = null;




    }

    update() {
        if (this.ui.paused) return;

        let event = this.event_manager.spawn();

        if (event) {
            this.current_event = event;
            this.ui.show(event);
        }
    }

    current_decree_signed () {

    }

    current_decree_dismissed () {

    }

}
