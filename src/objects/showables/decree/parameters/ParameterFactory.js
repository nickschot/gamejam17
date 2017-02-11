/**
 * Created by lennart on 11/02/17.
 */

import PercentageParameter from './Percentage';

export default class ParameterFactory {
    static factory(obj) {
        switch (obj['type']) {
            case "percentage":
                return PercentageParameter.factory(obj['arguments']);
            default:
                return null; // Sad story
        }
    }

}
