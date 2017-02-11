
export default class Level {

    constructor(map, layer) {
        this.map = map;
        this.layer = layer;

        this.money = 1000000;
        this.crime = 0.0;
        this.greatness = 0;
        this.corporateTax = 0.15;
        this.wage = 100;
        this.incomeTax = 0.25;
        this.welfare = 70;

        this.setGroundStartState();
        this.setBuildingStartState();
    }

    update() {
        this.population = this.sumTiles(t => t.properties.population, 'Buildings');
        this.jobs = this.sumTiles(t => t.properties.jobs, 'Buildings');
        this.employed = Math.min(this.jobs, this.population);
        this.jobFulfillment = this.employed / this.jobs || 0;
        this.unemployed = this.population - this.employed;

        for(let tile of this.layerToArray('Ground'))
        {
            this.calculateGroundTile(tile);
        }

        for(let tile of this.layerToArray('Buildings'))
        {
            this.calculateBuilding(tile);
        }

        let incomeTax = this.employed * this.wage * this.incomeTax;
        let corporateTax = this.jobFulfillment * this.sumTiles(t => t.properties.profit, 'Buildings') * this.corporateTax;
        let buildingCosts = this.sumTiles(t => t.properties.costs, 'Buildings');
        let welfare = this.unemployed * this.welfare;

        this.money = this.money + incomeTax + corporateTax - buildingCosts - welfare;

        if(this.population) {
            this.crime = 0.95 * this.crime + 0.05 * this.unemployed / this.population;
        } else {
            this.crime = 0;
        }

        if(this.crime > 0.30) {
            this.greatness -= (this.crime - 0.30) * this.population;
        }

        if((this.unemployed/this.population) > 0.30) {
            this.greatness -= ((this.unemployed/this.population) - 0.30) * this.population;
        }

        for(let tile of this.layerToArray('Ground'))
        {
            this.updateGroundTile(tile);
        }

        for(let tile of this.layerToArray('Buildings'))
        {
            this.updateBuilding(tile);
        }

        console.log(this);
    }

    setGroundStartState () {
        for (let tile of this.layerToArray('Ground')) {
            tile.properties["pollution"] = 0;
        }
    }

    setBuildingStartState () {
        for (let tile of this.layerToArray('Buildings')) {
            tile.properties["jobs"] = tile.properties["jobs"] || 0;
            tile.properties["profit"] = tile.properties["profit"] || 0;
            tile.properties["pollution"] = tile.properties["pollution"] || 0;
            tile.properties["costs"] = tile.properties["costs"] || 0;
            tile.properties["population"] = tile.properties["population"] || 0;
        }
    }

    getGroundTile(x, y) {
        return this.game.map.getTile(x, y, this.game.layerMap['ground']);
    }

    getBuilding(x, y) {
        return this.game.map.getTile(x, y, this.game.layerMap['buildings']);
    }

    sumTiles(func, layer) {
        let result = 0;
        for (let tile of this.layerToArray(layer)) {
            let val = func(tile);
            if(val != val) {
                console.error(func);
                console.error(layer);
                console.log(tile);

                throw new Error();
            }
            result += func(tile);


            if (result != result) {
                console.error(func);
                console.error(layer);
                console.log(tile);

                throw new Error();
            }
        }



        return result;
    }

    calculateGroundTile(tile) {
        let neighbours = [
            this.getGroundTile(this.x + 1, this.y),
            this.getGroundTile(this.x - 1, this.y),
            this.getGroundTile(this.x, this.y + 1),
            this.getGroundTile(this.x, this.y - 1),
        ];
        let neighbourPollution = 0;

        for(let groundTile of neighbours) {
            if(groundTile) {
                neighbourPollution += groundTile.properties.pollution;
            }
        }

        tile.properties.newPollution = 0.05 * neighbourPollution + 0.8 * tile.properties.pollution;

        let building = this.getBuilding(tile.x, tile.y);
        if(building) {
            tile.properties.newPollution += building.properties.pollution;
        }

        if(tile.properties.newPollution != tile.properties.newPollution) {
            console.error("newPollution ERROR", this, tile, tile.properties.newPollution);
            throw new Error();
        }
    }

    calculateBuilding(tile) {
        let pollution = 0;
        let groundTile = this.getGroundTile(tile.x, tile.y);
        if(groundTile) {
            pollution = groundTile.properties.pollution;
        }

        if(tile.properties.population) {
            let growFactor = Math.min(0.01, Math.max(-0.01, 0.05 * (this.jobs - this.population) / this.population));
            growFactor += Math.min(0, -0.01 * this.crime + 0.005);
            growFactor += Math.min(0, -0.01 * pollution + 0.005);
            tile.properties.newPopulation = (1 + growFactor) * tile.properties.population;
        } else {
            tile.properties.newPopulation = 0;
        }

        if(tile.properties.newPopulation != tile.properties.newPopulation) {
            console.error("newPopulation ERROR", this, tile, tile.properties.newPopulation);
            throw new Error();
        }
    }

    updateGroundTile(tile) {
        tile.properties.pollution = tile.properties.newPollution;
    }

    updateBuilding(tile) {
        tile.properties.population = tile.properties.newPopulation;
    }

    executeDecree(decree) {
        decree.execute(this);
    }

    setBuilding(x, y, building) {
        // TODO: JELTE HALP IK WEET NIET HOE JE DIT WIL
        this.game.map.putTile( this.game.buildingtypes[building.type].sprite, x, y, 'Buildings');
    }

    layerToArray (layer) {
        let arr = [];

        for (let x = 0; x < this.game.map.width; x++) {
            for (let y = 0; y < this.game.map.height; y++) {
                let tile = this.game.map.getTile(x, y, layer);

                if (tile) {
                    arr.push(tile);
                }
            }
        }

        return arr;
    }
}
