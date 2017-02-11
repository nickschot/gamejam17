import Building from 'Building';

export default class BuildingType {

    maxPollution = 10;
    maxJobs = 100;
    maxProfit = 1000;

    constructor(name, sprite, possibleNames) {
        this.name = name; this.sprite = sprite; this.possibleNames = possibleNames;
    }

    createBuilding(game, x, y){
        let name = possibleNames[Math.floor(Math.random() * possibleNames.length)];
        let jobs = Math.floor(Math.random() * this.maxJobs);
        let profit = Math.floor(Math.random() * this.maxProfit);
        let pollution = Math.floor(Math.random() * this.maxPollution);
        return new Building(game, x, y, name, this, jobs, profit, pollution);
    }
}
