export default class UI {
    paused;
    gamestate;

    constructor (gamestate) {
        this.paused = false;

        this.gamestate = gamestate;

        $("#btn-sign").on('click', this.decree_signed.bind(this));
        $("#btn-shred").on('click', this.decree_dismissed.bind(this));
    }

    update(){
        this.updateMeters();
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

    updateMeters () {
        const {
            greatness,
            money,
            balance,
            crime,
            incomeTax,
            corporateTax,
            population,
            jobs,
            welfare,
            unemployed,

            week
        } = this.gamestate.level;

        $('#game-overlay-week-number-span').html(week);
        $('#sidebar-greatness svg.meter').css('transform', `rotate(${this._mapFromRangeToRange(greatness, 0, 1, -149, 149).toFixed(2)}deg)`);
        $('#state-capital').html(`\$${this._toDecimalNumber(money)}`);
        $('#state-population').html(`${this._toDecimalNumber(population)}`);
        $('#state-jobs').html(`${this._toDecimalNumber(jobs)}`);

        let balancePercentage = (balance/money*100).toFixed(2);
        if(balance >= 0){
            $('#state-balance-left').css({
                width: 0,
                marginLeft: '50%'
            });
            $('#state-balance-right').css({
                width: `${balancePercentage*5}%`
            });
        } else {
            $('#state-balance-left').css({
                width: `${balancePercentage*5}%`,
                marginLeft: `${50-balancePercentage*5}%`
            });
            $('#state-balance-right').css({
                width: 0
            });
        }
        $('#state-employment').html(`${(100 - unemployed/population*100).toFixed(2)}%`);
        $('#state-welfare').html(`\$${this._toDecimalNumber(welfare)}`);

        $('#state-crime').css('width', `${(crime*100).toFixed(2)}%`);

        $('#state-income-tax').css('width', `${(incomeTax*100).toFixed(2)}%`);
        $('#state-corporate-tax').css('width', `${(corporateTax*100).toFixed(2)}%`);
    }

    _toDecimalNumber(number){
        return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0,-3);
    }

    _mapFromRangeToRange(value, from1, to1, from2, to2){
        return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
    }
}
