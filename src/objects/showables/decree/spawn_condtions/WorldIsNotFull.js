import SpawnCondition from './SpawnCondition';

export default class WorldIsNotFullSpawnCondition extends SpawnCondition {


    satisfied (level) {
        let spots = level.layerToArray('BuildingSpots');

        level.layerToArray('Buildings').forEach(building => {
            let index = spots.findIndex(spot => spot.x == building.x && spot.y == building.y);

            if (index != -1) {
                spots.splice(index, 1);
            }
        });

        return spots > 0;
    }

    static factory(arguments) {

    }

}
