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
    map;
    layerMap;
    level;
    buildingtypes;

    tick;
    event_manager;
    current_event;

    ui;
    shows_popup;

    create() {
        // TODO: Replace this with a really cool game code here :)
        const {centerX: x, centerY: y} = this.world;
        //this.add.existing(new Logo(this.game, x, y));

        this.tick = 0;

        let m = this.add.tilemap('level');
        m.addTilesetImage('spritesheet', 'spritesheet');

        this.map = m;

        let layerGround = m.createLayer('Ground');
        let layerRoads = m.createLayer('Roads');
        let buildingsLayer = m.createLayer('Buildings');

        let collisionLayer = m.createLayer('BuildingSpots');
        collisionLayer.visible = false;


        let pollutionLayer = m.createLayer('Pollution');


        this.layerMap = {
            'ground': layerGround,
            'roads': layerRoads,
            'buildings': buildingsLayer
        };


        this.buildingtypes = BuildingType.createBuildingTypeMap(this.cache.getJSON('buildingtypes'));

        this.level = new Level(this);

        this.event_manager = new EventManager(this);
        this.ui = new UI(this);


        this.shows_popup = false;
        this.current_event = null;

        this.current_state = 0;

    }

    update() {
        if (this.ui.paused) return;
        // Only simulate a few times
        if (this.tick % 12 == 0) {

            console.log("hallo!");

            // spawn 15 simulation ticks

            if (true) {
                this.level.update();
            } else if (this.current_state % 5 == 0) {
                let event = this.event_manager.spawn();
                this.current_event = event;
                this.ui.show(event);
            }

            if (this.current_state >= 35) {
                this.current_state = 0;
            }

            this.ui.update();

            this.current_state++;

        }
        this.tick++;
    }

    current_decree_signed () {
        this.level.executeDecree(this.current_event);

    }

    current_decree_dismissed () {


    }
}
