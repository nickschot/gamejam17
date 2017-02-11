/**
 * Created by lennart on 11/02/17.
 */

import VariableCompareSpawnCondition from './VariableCompare';

export default class SpawnConditionFactory {
    static factory(obj) {
        switch (obj['type']) {
            case "variable_compare":
                return VariableCompareSpawnCondition.factory(obj['arguments']);
            // TODO add more
            default:
                return null; // Sad story
        }
    }

}
