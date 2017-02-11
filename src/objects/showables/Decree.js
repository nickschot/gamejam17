/**
 * Created by lennart on 10/02/17.
 */
import Showable from './Showable';

export default class Decree extends Showable {

    constructor(text, weight, spawnconditions, impacts) {
        super(text);

        this.weight = weight;
        this.spawnconditions = spawnconditions;
        this.impacts = impacts;

    }

    canSpawn () {
        if (this.spawnconditions.length == 0) return true;
    }


    static factory(jsonobj) {
        if (!(jsonobj.text && jsonobj.weight && jsonobj.spawnconditions && jsonobj.impacts)) {
            throw new Error("This is not a sane decree!");
        }

        return new Decree(jsonobj.text, jsonobj.weight, jsonobj.spawnconditions.map(x => SpawnCondition.factory(x)), jsonobj.impacts.map(y => Impac.factory(y)));
    }


}
