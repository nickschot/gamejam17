import Building from './Building';

export default class BuildingType {
    constructor(name, sprite, possibleNames) {
        this.name = name;
        this.sprite = sprite;
        this.possibleNames = possibleNames;

        this.maxPollution = 10;
        this.maxJobs = 100;
        this.maxProfit = 1000;
    }

    static createBuildingTypeMap(jsonObj) {
        let result = {};

        jsonObj.forEach(function(x) {
            let bt = new BuildingType(x.name, x.sprite, x.possibleNames);
            result[x.name] = bt;
        });

        return result;
    }


}
