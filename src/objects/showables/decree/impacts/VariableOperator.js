/**
 * Created by lennart on 11/02/17.
 */

import Impact from './Impact';

export default class VariableOperatorImpact extends Impact {
    constructor (operator, variable, value) {
        super();
        this.operator = operator;
        this.variable = variable;
        this.value = value;
    }

    execute (level) {
        switch (this.operator) {
            case "multiply":
                level[this.variable] *= this.value;
                break;
            case "add":
                level[this.variable] += this.value;
                break;
            case "divide":
                level[this.variable] /= this.value;
                break;
            case "subtract":
                level[this.variable] -= this.value;
                break;
            case "assign":
                level[this.variable] = this.value;
                break;
            default:
                console.log("Impact is misconfigured!");

        }

    }

    static factory(args) {
        if (typeof args.operator == "undefined"
                ||
                typeof args.variable == "undefined"
                    ||
                    typeof args.value == "undefined") {
            console.log(args);
            throw new Error("This is not a sane variableoperatorimpact!");
        }

        return new VariableOperatorImpact(args.operator, args.variable, args.value);

    }

}
