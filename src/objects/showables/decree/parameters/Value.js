/**
 * Created by lennart on 11/02/17.
 */

import Parameter from './Parameter';
import {choose_float} from './../../../RandomUtils';

export default class ValueParameter extends Parameter {
    constructor (name, min, max, round) {
        super();
        this.name = name;
        this.min = min;
        this.max = max;

        this.round = round || false;

        this.instance = 0;

        this.display_instance = 0;
    }

    seed () {
        this.display_instance = choose_float(this.min, this.max);
        if (this.round) {
            this.display_instance = Math.round(this.display_instance);
        }
        this.instance = this.display_instance;
    }


    static factory(args) {
        if (typeof args.name == "undefined"
            ||
            typeof args.min == "undefined"
            ||
            typeof args.max == "undefined") {
            console.log(args);
            throw new Error("This is not a sane percentageparameter!");
        }

        return new ValueParameter(args.name, args.min, args.max, args.round);

    }

}
