/**
 * Created by lennart on 11/02/17.
 */

import Impact from './Impact';
import Building from '../../../Building'
export default class BuildingCreateImpact extends Impact {

    constructor (building) {
        super();
        this.building = building;
    }

    execute (level) {
        let spots = level.layerToArray('BuildingSpots');

        if (!this.canReplace) {
            level.layerToArray('Buildings').forEach(building => {
                let index = spots.findIndex(spot => spot.x == building.x && spot.y == building.y);

                if (index != -1) {
                    spots.splice(index, 1);
                }
            })
        }

        if (!spots) {
            console.log("I dont have any spots anymore!");
        }

        let random_spot = spots[Math.floor(Math.random() * spots.length)];


        level.setBuilding(random_spot.x, random_spot.y, this.building);
    }

    static factory(args) {
        let building = Building.factory(args);

        this.canReplace = args.canreplace || false;

        return new BuildingCreateImpact(building);
    }
}
