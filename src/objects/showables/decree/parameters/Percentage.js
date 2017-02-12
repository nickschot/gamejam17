/**
 * Created by lennart on 11/02/17.
 */

import Parameter from './Parameter';
import {choose_in} from './../../../RandomUtils';

export default class PercentageParameter extends Parameter {
    constructor (name, min, max) {
        super();
        this.name = name;
        this.min = min;
        this.max = max;

        this.instance = 0;

        this.display_instance = 0;
    }

    seed () {
        this.display_instance = choose_in(this.min, this.max);
        this.instance = this.display_instance/100;
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

        return new PercentageParameter(args.name, args.min, args.max);

    }

}
