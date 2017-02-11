import Building from './Building';

export default class BuildingType {



    constructor(name, sprite, possibleNames) {
        this.name = name; this.sprite = sprite; this.possibleNames = possibleNames;

        this.maxPollution = 10;
        this.maxJobs = 100;
        this.maxProfit = 1000;
    }

    createBuilding(game, x, y){
        let name = possibleNames[Math.floor(Math.random() * possibleNames.length)];
        let jobs = Math.floor(Math.random() * this.maxJobs);
        let profit = Math.floor(Math.random() * this.maxProfit);
        let pollution = Math.floor(Math.random() * this.maxPollution);
        return new Building(game, x, y, name, this, jobs, profit, pollution);
    }
}
