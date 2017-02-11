/**
 * Created by lennart on 11/02/17.
 */

import VariableOperatorImpact from './VariableOperator';
import BuildingCreateImpact from './BuildingCreate';


export default class SpawnConditionFactory {
    static factory(obj) {
        switch (obj['type']) {
            case "variable_operator":
                return VariableOperatorImpact.factory(obj['arguments']);
            case "building_create":
                return BuildingCreateImpact.factory(obj['arguments']);
            default:
                return null; // Sad story
        }
    }

}
