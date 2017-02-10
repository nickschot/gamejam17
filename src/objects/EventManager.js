/**
 * Created by lennart on 10/02/17.
 */


import Decree from '../objects/Decree';
import NewsItem from '../objects/NewsItem';

export default class EventManager {

    constructor() {
        this.seconds_in_window = 0;

        this.decree_in_window = 0;
        this.news_in_window = 0;

        this.spawn_decree = false;
        this.spawn_news = false;

        this.plan();
    }

    spawn() {
        let result = null;

        if (this.seconds_in_window >= 30) {
            this.plan();

            this.seconds_in_window = 0;
        } else {

            if (this.spawn_decree && this.seconds_in_window >= this.decree_in_window) {
                console.log("Spawning a decree!");

                result = new Decree("I Ronald Rumph hereby sign into law!");

                this.spawn_decree = false;
            } else if (this.spawn_news && this.seconds_in_window >= this.news_in_window) {
                console.log("Spawning a news item!");

                result = new NewsItem("Ronald Rump is an idiot!");

                this.spawn_news = false;
            }

            this.seconds_in_window += 1 / 60;
        }


        return result;
    }

    plan() {
        this.news_in_window = this.choose_in(3, 12);
        this.decree_in_window = this.choose_in(15, 25);

        this.spawn_decree = true;
        this.spawn_news = true;

        console.log("planned: " + this.decree_in_window + " " + this.news_in_window)
    }

    roll (chance) {
        return (Math.random() <= chance);
    }

    choose_in(start, end) {
       return start + Math.round(Math.random() * (end - start));
    }

}