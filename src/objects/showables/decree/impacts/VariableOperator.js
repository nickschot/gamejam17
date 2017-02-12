/**
 * Created by lennart on 11/02/17.
 */

import Impact from './Impact';

export default class VariableOperatorImpact extends Impact {
    constructor (operator, variable, parameter) {
        super();
        this.operator = operator;
        this.variable = variable;
        this.parameter = parameter;
    }

    execute (level, parameters) {
        let param = parameters.find(x => x.name == this.parameter).instance;

        switch (this.operator) {
            case "multiply":
                level[this.variable] *= param;
                break;
            case "add":
                level[this.variable] += param;
                break;
            case "divide":
                level[this.variable] /= param;
                break;
            case "subtract":
                level[this.variable] -= param;
                break;
            case "assign":
                level[this.variable] = param;
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
                    typeof args.parameter == "undefined") {
            console.log(args);
            throw new Error("This is not a sane variableoperatorimpact!");
        }

        return new VariableOperatorImpact(args.operator, args.variable, args.parameter);

    }

}
