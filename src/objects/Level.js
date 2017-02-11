
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
    }

    update() {
        this.population = this.sumTiles(t => t.population);
        this.jobs = this.sumTiles(t => t.jobs);
        this.employed = Math.min(this.jobs, this.population);
        this.jobFulfillment = this.employed / this.jobs || 0;
        this.unemployed = this.population - this.employed;

        for(let tile of this.game.map.tiles)
        {
            if(tile) {
                if (tile.layer == this.game.layerMap['ground']) {
                    this.calculateGroundTile(tile);
                }
                if (tile.layer == this.game.layerMap['buildings']) {
                    this.calculateBuilding(tile);
                }
            }
        }

        let incomeTax = this.employed * this.wage * this.incomeTax;
        let corporateTax = this.jobFulfillment * this.sumTiles(t => t.profitPerTick) * this.corporateTax;
        let buildingCosts = this.sumTiles(t => t.costsPerTick);
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

        for(let tile of this.game.map.tiles)
        {
            if(tile) {
                if (tile.layer == this.game.layerMap['ground']) {
                    this.updateGroundTile(tile);
                }
                if (tile.layer == this.game.layerMap['buildings']) {
                    this.updateBuilding(tile);
                }
            }
        }
    }

    getGroundTile(x, y) {
        return this.game.map.getTile(x, y, this.game.layerMap['ground']);
    }

    getBuilding(x, y) {
        return this.game.map.getTile(x, y, this.game.layerMap['buildings']);
    }

    sumTiles(func) {
        let result = 0;
        for(let tile of this.game.map.tiles) {
            if(tile) {
                result += func(tile) || 0;
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
                neighbourPollution += groundTile.pollution;
            }
        }

        tile.newPollution = 0.05 * neighbourPollution + 0.8 * tile.pollution;

        let building = getBuilding(tile.x, tile.y);
        if(building) {
            tile.newPollution += building.pollution;
        }
    }

    calculateBuilding(tile) {
        if(tile.population) {
            let growFactor = Math.min(0.01, Math.max(-0.01, 0.05 * (this.jobs - this.population) / this.population));
            growFactor += Math.min(0, -0.01 * this.crime + 0.005);
            growFactor += Math.min(0, -0.01 * this.pollution + 0.005);
            tile.newPopulation = (1 + growFactor) * tile.population;
        } else {
            tile.newPopulation = 0;
        }
    }

    updateGroundTile(tile) {
        tile.pollution = tile.newPollution;
    }

    updateBuilding(tile) {
        tile.population = tile.newPopulation;
    }

    executeDecree(decree) {
        decree.execute(this);
    }

    setBuilding(x, y, building) {
        // TODO: JELTE HALP IK WEET NIET HOE JE DIT WIL
        this.game.map.putTile( this.game.buildingtypes[building.type].sprite, x, y, 'Buildings');
    }
}
