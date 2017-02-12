/**
 * Created by lennart on 11/02/17.
 */

import {choose_in} from './RandomUtils';
import Decree from './showables/decree/Decree';

export default class DecreeManager {

    constructor (game) {
        this.game = game;

        this.decrees = [];

        this.load_decrees();

        console.log(this);
    }


    load_decrees () {
        for (let decree of this.game.cache.getJSON('decrees')) {
            console.log(decree);
            this.decrees.push(Decree.factory(decree));
        }
    }

    spawnDecree(level) {
        let active_decrees = this.decrees.filter(x => x.canSpawn(level));

        let total_weight = active_decrees.map(x => x.weight).reduce((pv, cv) => pv+cv, 0);

        let decree_roll = choose_in(0, total_weight);
        let accum = 0;

        let res_decree = null;


        for (let i = 0; i < active_decrees.length && !res_decree; i++) {
            if (accum + active_decrees[i].weight > decree_roll && accum <= decree_roll) {
                res_decree = active_decrees[i];
            }

            accum += active_decrees[i].weight;
        }

        res_decree.seed();

        console.log(res_decree);

        return res_decree;
    }

}
