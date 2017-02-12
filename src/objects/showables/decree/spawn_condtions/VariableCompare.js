/**
 * Created by lennart on 11/02/17.
 */
import SpawnCondition from './SpawnCondition';

export default class VariableCompareSpawnCondition extends SpawnCondition {
    constructor (operator, variable, value) {
        super();
        this.operator = operator;
        this.variable = variable;
        this.value = value;
    }


    satisfied (level) {
        console.log(level);

        switch (this.operator) {
            case 'above':
                return level[this.variable] > this.value;
            case 'below':
                return level[this.variable] < this.value;
            case 'equal':
                return level[this.variable] == this.value;
            default:
                console.log("This spawncondition is misconfigured, an operator of " + this.operator + " does not exist!");
                return false;
        }


    }

    static factory(args) {
        if (typeof args.operator == "undefined"
            ||
            typeof args.variable == "undefined"
            ||
            typeof args.value == "undefined") {
            throw new Error("This is not a sane building_create!");
        }


        return new VariableCompareSpawnCondition(args.operator, args.variable, args.value);

    }

}
