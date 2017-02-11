/**
 * Created by lennart on 11/02/17.
 */

import Impact from './Impact';

export default class ClampImpact extends Impact {
    constructor (variable, min, max) {
        super();
        this.variable = variable;
        this.min = min;
        this.max = max;
    }

    execute (level, parameters) {
        let val = level[this.variable];
        val = Math.max(this.min, Math.min(this.max, val));

        level[this.variable] = val;
    }

    static factory(args) {
        if (typeof args.variable == "undefined"
            ||
            typeof args.min == "undefined"
            ||
            typeof args.max == "undefined") {
            console.log(args);
            throw new Error("This is not a sane clampimpact!");
        }

        return new ClampImpact(args.variable, args.min, args.max);

    }

}
