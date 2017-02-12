/**
 * Created by lennart on 11/02/17.
 */

import Impact from './Impact';
import Building from '../../../Building'
export default class BuildingCreateImpact extends Impact {

    constructor(type, jobs_parameter, profit_parameter, pollution_parameter, costs_parameter, population_parameter, can_replace) {
        super();
        this.type = type;
        this.jobs_parameter = jobs_parameter;
        this.profit_parameter = profit_parameter;
        this.pollution_parameter = pollution_parameter;
        this.costs_parameter = costs_parameter;
        this.population_parameter = population_parameter;
        this.can_replace = can_replace;

        this.parameters = {};
    }

    execute(level, parameters) {
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

        let parameter_instances = {
            "maxJobs": parameters.find(x => x.name == this.jobs_parameter).instance,
            "profit": parameters.find(x => x.name == this.profit_parameter).instance,
            "pollution": parameters.find(x => x.name == this.pollution_parameter).instance,
            "costs": parameters.find(x => x.name == this.costs_parameter).instance,
            "maxPopulation": parameters.find(x => x.name == this.population_parameter).instance
        };


        level.setBuilding(random_spot.x, random_spot.y, this.type, parameter_instances);
    }

    static factory(args) {

        if (typeof args.type == "undefined"
            ||
            typeof args.jobs_parameter == "undefined"
            ||
            typeof args.profit_parameter == "undefined"
            ||
            typeof args.pollution_parameter == "undefined"
            ||
            typeof args.costs_parameter == "undefined"
            ||
            typeof args.population_parameter == "undefined") {
            throw new Error("This is not a sane building_create!");
        }

        return new BuildingCreateImpact(args.type, args.jobs_parameter, args.profit_parameter, args.pollution_parameter, args.costs_parameter, args.population_parameter, args.can_replace);
    }
}
