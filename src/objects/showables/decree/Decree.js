/**
 * Created by lennart on 10/02/17.
 */
import Showable from '../Showable';
import SpawnConditionFactory from './spawn_condtions/SpawnConditionFactory';
import ImpactFactory from './impacts/ImpactFactory';

export default class Decree extends Showable {

    constructor(text, weight, spawnconditions, impacts) {
        super(text);

        this.weight = weight;
        this.spawnconditions = spawnconditions;
        this.impacts = impacts;

    }

    execute(level) {
        for (let impact of this.impacts) {
            impact.execute(level);
        }
    }

    canSpawn (level) {
        let result = true;

        for (let spawncondition of this.spawnconditions) {
            result &= spawncondition.satisfied(level);
        }

        return result;
    }


    static factory(jsonobj) {
        if (!(jsonobj.text && jsonobj.weight && jsonobj.spawnconditions && jsonobj.impacts)) {
            throw new Error("This is not a sane decree!");
        }

        return new Decree(jsonobj.text, jsonobj.weight, jsonobj.spawnconditions.map(x => SpawnConditionFactory.factory(x)), jsonobj.impacts.map(y => ImpactFactory.factory(y)));
    }


}