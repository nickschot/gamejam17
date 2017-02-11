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
import Level from '../objects/Level';


export default class Game extends Phaser.State {

    create() {
        // TODO: Replace this with a really cool game code here :)
        const {centerX: x, centerY: y} = this.world;
        //this.add.existing(new Logo(this.game, x, y));


        let m = this.add.tilemap('level');
        m.addTilesetImage('spritesheet', 'spritesheet');

        let layerGround = m.createLayer('Ground');
        let layerRoads = m.createLayer('Roads');
        let buildingsLayer = m.createLayer('Buildings');

        this.buildingtypes = [];
        this.createBuildingTypes();

        this.event_manager = new EventManager(this);
        this.ui = new UI(this);

        this.shows_popup = false;
        this.current_event = null;

        this.level = new Level(m, buildingsLayer);




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
        this.level.executeDecree(this.current_event);

    }

    current_decree_dismissed () {


    }

    createBuildingTypes() {
        let data = this.game.cache.getJSON('buildingtypes');
        data.forEach(function(x) {
            let bt = new BuildingType(x.name, x.sprite, x.possibleNames);
            //TODO: boundness of this this.buildingtypes.push(bt);
        });
    }

}
