/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';
import EventManager from '../objects/EventManager';
import UI from '../objects/UI';
import BuildingType from '../objects/BuildingType';

export default class Game extends Phaser.State {

    create() {
        // TODO: Replace this with a really cool game code here :)
        const {centerX: x, centerY: y} = this.world;
        //this.add.existing(new Logo(this.game, x, y));

        let m = this.add.tilemap('level');
        m.addTilesetImage('spritesheet', 'spritesheet');

        let layerGround = m.createLayer('Ground');
        let layerRoads = m.createLayer('Roads');

        this.buildingtypes = [];
        this.createBuildingTypes();

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

    createBuildingTypes() {
        let data = this.game.cache.getJSON('buildingtypes');
        data.forEach(function(x) {
            let bt = new BuildingType(x.name, x.sprite, x.possibleNames);
            this.buildingtypes.push(bt);
        });
    }

}
