/**
 * Created by lennart on 10/02/17.
 */
export default class UI {

    constructor (gamestate) {
        this.paused = false;

        this.gamestate = gamestate;

        $("#btn-sign").on('click', this.decree_signed.bind(this));
        $("#btn-shred").on('click', this.decree_dismissed.bind(this));


    }


    show (showable) {
        $("#game-overlay-decree").addClass("open");
        $("#game-overlay-decree-text").text(showable.text);

        this.paused = true;

    }

    hide () {
        $("#game-overlay-decree").removeClass("open");

        console.log("hiding?");

        this.paused = false;
    }

    decree_signed () {
        this.hide();
        this.gamestate.current_decree_signed();
    }

    decree_dismissed () {
        this.hide();
        this.gamestate.current_decree_dismissed();
    }
}
