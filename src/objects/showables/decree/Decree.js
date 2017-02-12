/**
 * Created by lennart on 10/02/17.
 */
import Showable from '../Showable';
import SpawnConditionFactory from './spawn_condtions/SpawnConditionFactory';
import ImpactFactory from './impacts/ImpactFactory';
import ParameterFactory from './parameters/ParameterFactory';


export default class Decree extends Showable {

    constructor(text, advisor, weight, spawnconditions, impacts, parameters) {
        super(advisor, text);

        this.weight = weight;
        this.spawnconditions = spawnconditions;
        this.impacts = impacts;

        this.parameters = parameters;

    }

    seed () {
        for (let parameter of this.parameters) {
            parameter.seed();
        }
    }



    execute(level) {
        for (let impact of this.impacts) {
            console.log(impact);
            impact.execute(level, this.parameters);
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
        if (!(jsonobj.text && jsonobj.weight)) {
            throw new Error("This is not a sane decree!");
        }

        let spawnconditions =  jsonobj.spawnconditions || [];
        let impacts =  jsonobj.impacts || [];
        let parameters = jsonobj.parameters || [];

        return new Decree(
            jsonobj.text,
            jsonobj.advisor,
            jsonobj.weight,
            spawnconditions.map(x => SpawnConditionFactory.factory(x)),
            impacts.map(y => ImpactFactory.factory(y)),
            parameters.map(z => ParameterFactory.factory(z))
        );
    }


}
