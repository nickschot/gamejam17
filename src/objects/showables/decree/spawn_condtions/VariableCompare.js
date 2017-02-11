/**
 * Created by lennart on 11/02/17.
 */
export default class VariableCompareSpawnCondition extends VariableCompare {
    constructor (operator, variable, value) {
        this.operator = operator;
        this.variable = variable;
        this.value = value;
    }


    satisfied (level) {
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

    static factory(arguments) {
        if (!(arguments.operator && arguments.variable && arguments.value)) {
            throw new Error("This is not a sane spawn condition!");
        }

        return new VariableCompareSpawnCondition(arguments.operator, arguments.variable, arguments.value);

    }

}
