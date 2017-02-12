/**
 * Created by lennart on 10/02/17.
 */


import Decree from './showables/decree/Decree';
import NewsItem from './showables/NewsItem';


import DecreeManager from './DecreeManager';


export default class EventManager {

    constructor(game) {
        this.seconds_in_window = 0;

        this.decree_in_window = 0;
        this.news_in_window = 0;

        this.spawn_decree = false;
        this.spawn_news = false;

        this.plan();

        this.decree_manager = new DecreeManager(game);

        this.game = game;
    }

    spawn() {
        let result = null;

        if (this.seconds_in_window >= 15) {
            this.plan();

            this.seconds_in_window = 0;
        } else {

            if (this.spawn_decree && this.seconds_in_window >= this.decree_in_window) {
                console.log("Spawning a decree!");

                result = this.decree_manager.spawnDecree(this.game.level);

                this.spawn_decree = false;
            } else if (this.spawn_news && this.seconds_in_window >= this.news_in_window) {
                console.log("Spawning a news item!");

                result = new NewsItem("Ronald Rump is an idiot!");

                this.spawn_news = false;
            }

            this.seconds_in_window += 1 / 6;
        }


        return result;
    }

    plan() {
        this.decree_in_window = this.choose_in(1, 6);
        this.news_in_window = this.choose_in(7, 12);

        this.spawn_decree = true;
        //this.spawn_news = true;

        console.log("planned: " + this.decree_in_window + " " + this.news_in_window);
    }

    roll (chance) {
        return (Math.random() <= chance);
    }

    choose_in(start, end) {
       return start + Math.round(Math.random() * (end - start));
    }

}
