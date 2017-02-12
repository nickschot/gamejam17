
import {choose_float} from './RandomUtils';

export default class Level {

    constructor(game) {
        this.game = game;

        this.money = 1000000;
        this.crime = 0.0;
        this.greatness = 0.25;
        this.corporateTax = 0.15;
        this.wage = 100;
        this.incomeTax = 0.25;
        this.welfare = 70;

        this.setGroundStartState();
        this.setBuildingsStartState();
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

        this.balance =  incomeTax + corporateTax - buildingCosts - welfare;
        this.money = this.money + this.balance;

        if(this.population) {
            let targetCrime = Math.min(1, (1.2- (this.welfare/this.wage)) * (this.unemployed / this.population));
            console.log('targetCrime', targetCrime);
            this.crime = 0.95 * this.crime + 0.05 * targetCrime;
        } else {
            this.crime = 0;
        }

        // Greatness

        if(this.crime > 0.30) {
            this.greatness -= (this.crime - 0.1) * 0.001;
        }

        if((this.unemployed/this.population) > 0.10) {
            this.greatness -= ((this.unemployed/this.population) - 0.10) * 0.001;
        }

        if(this.incomeTax + this.corporateTax > 0.30) {
            this.greatness -= ((this.incomeTax + this.corporateTax) - 0.30) * 0.001;
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
        this.updatePollution();
    }

    setGroundStartState () {
        for (let tile of this.layerToArray('Ground')) {
            tile.properties["pollution"] = 0;
            //tile.properties["pollution_text"] = this.game.add.text(tile.x * 64, tile.y * 64, "Hoi");
        }
    }

    setBuildingsStartState () {
        for (let tile of this.layerToArray('Buildings')) {
            this.setBuildingStartState(tile);
        }
    }

    setBuildingStartState(tile) {
        tile.properties["maxJobs"] = tile.properties["maxJobs"] || 0;
        tile.properties["profit"] = tile.properties["profit"] || 0;
        tile.properties["pollution"] = tile.properties["pollution"] || 0;
        tile.properties["costs"] = tile.properties["costs"] || 0;
        tile.properties["maxPopulation"] = tile.properties["maxPopulation"] || 0;

        // Set initial
        tile.properties["jobs"] = Math.round((1 - this.corporateTax) * tile.properties["maxJobs"]);
        tile.properties["population"] = tile.properties["maxPopulation"];
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
            this.getGroundTile(tile.x + 1, tile.y),
            this.getGroundTile(tile.x - 1, tile.y),
            this.getGroundTile(tile.x, tile.y + 1),
            this.getGroundTile(tile.x, tile.y - 1),
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

        tile.properties.newPollution = Math.max(0, Math.min(1, tile.properties.newPollution));
    }

    calculateBuilding(tile) {
        let pollution = 0;
        let groundTile = this.getGroundTile(tile.x, tile.y);
        if(groundTile) {
            pollution = groundTile.properties.pollution;
        }

        tile.properties["newJobs"] = Math.round((1 - this.corporateTax) * tile.properties["maxJobs"]);

        if(tile.properties.population) {
            let growFactor = 0;
            if(this.jobs >= this.population) {
                growFactor += Math.min(0.01, 0.05 * (this.jobs - this.population) / this.population);
            } else {
                growFactor += Math.max(-0.01, 0.05 * (1- (this.welfare/this.wage)) * (this.jobs - this.population) / this.population);
            }

            growFactor += Math.min(0, -0.01 * this.crime + 0.005);
            growFactor += Math.min(0, -0.01 * pollution + 0.005);
            tile.properties.newPopulation = Math.round((1 + growFactor) * tile.properties.population + Math.random() - 0.5);
        } else {
            tile.properties.newPopulation = 0;
        }

        if(tile.properties.newPopulation != tile.properties.newPopulation) {
            console.error("newPopulation ERROR", this, tile, tile.properties.newPopulation);
            throw new Error();
        }

        tile.properties.newPopulation = Math.max(0, Math.min(tile.properties.maxPopulation, tile.properties.newPopulation));
    }

    updateGroundTile(tile) {
        tile.properties.pollution = tile.properties.newPollution;
        //tile.properties.pollution_text.text = Math.round(tile.properties.pollution);
    }

    updateBuilding(tile) {
        tile.properties.jobs = tile.properties.newJobs;
        tile.properties.population = tile.properties.newPopulation;
    }

    executeDecree(decree) {
        decree.execute(this);
    }

    setBuilding(x, y, type, parameters) {
        let tile = this.game.map.putTile( this.game.buildingtypes[type].sprite, x, y, 'Buildings');

        tile.properties = parameters;
        this.setBuildingStartState(tile);

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


    updatePollution () {
        for (let tile of this.layerToArray('Pollution')) {
            let ground_tile = this.getGroundTile(tile.x, tile.y);

            tile.alpha = ground_tile.properties.pollution * choose_float(0.7, 0.9);
            tile.dirty = true;


        }

        this.game.map.layers[this.game.map.getLayer('Pollution')].dirty = true;

    }
}
