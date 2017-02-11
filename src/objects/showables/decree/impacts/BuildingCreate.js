/**
 * Created by lennart on 11/02/17.
 */

import Impact from './Impact';
import Building from '../../../Building'
export default class BuildingCreateImpact extends Impact {

    constructor (x, y, building) {
        super();
        this.x = x;
        this.y = y;
        this.building = building;
    }

    execute (level) {
        level.setBuilding(this.x, this.y, this.building);
    }

    static factory(args) {
        let building = Building.factory(args);

        let x = args.x;
        let y = args.y;

        return new BuildingCreateImpact(x, y, building);
    }
}
