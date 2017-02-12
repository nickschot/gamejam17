/**
 * Created by lennart on 10/02/17.
 */


import Decree from './showables/decree/Decree';
import NewsItem from './showables/NewsItem';


import DecreeManager from './DecreeManager';


export default class EventManager {

    constructor(game) {
        this.decree_manager = new DecreeManager(game);

        this.game = game;
    }

    spawn() {
        let result = null;

        result = this.decree_manager.spawnDecree(this.game.level);

        return result;
    }
}
