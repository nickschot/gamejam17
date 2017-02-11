/**
 * Created by lennart on 11/02/17.
 */

export default class SpawnCondtion {

    static fromJSONObj(obj) {
        switch (obj['type']) {
            case "variable_compare":
                return VariableCompare.factory(obj['arguments'])
            // TODO add more
            default:
                return null; // Sad story
        }
    }

}
