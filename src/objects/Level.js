
export default class Level {

    constructor() {
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
        this.jobFulfillment = this.employed / this.jobs;
        this.unemployed = this.population - this.employed;

        for(let tile of tiles)
        {
            this.calculateTile(tile);
        }

        let incomeTax = this.employed * this.wage * this.incomeTax;
        let corporateTax = this.jobFulfillment * this.sumTiles(t => t.profitPerTick) * this.corporateTax;
        let buildingCosts = this.sumTiles(t => t.costsPerTick);
        let welfare = this.unemployed * this.welfare;

        this.money = this.money + incomeTax + corporateTax - buildingCosts - welfare;

        this.crime = 0.95 * this.crime + 0.05 * this.unemployed / this.population;


        if(this.crime > 0.30) {
            this.greatness -= (this.crime - 0.30) * this.population;
        }

        if((this.unemployed/this.population) > 0.30) {
            this.greatness -= ((this.unemployed/this.population) - 0.30) * this.population;
        }

        for(let tile of tiles)
        {
            this.updateTile(tile);
        }

    }

    sumTiles(func) {
        // TODO: Loop over all tiles and excecute func, return sum of results
    }

    calculateTile(tile) {
        let neighbourPollution = 0; // TODO!!

        tile.newPollution = 0.05 * neighbourPollution + 0.8 * tile.pollution + tile.building.pollutionPerTick;

        let growFactor = Math.min(0.01, Math.max(-0.01, 0.05*(this.jobs - this.population)/this.population));

        tile.newPopulation = (1+growFactor) * tile.population;
    }

    updateTile(tile) {
        tile.pollution = tile.newPollution;
        tile.population = tile.newPopulation;
    }

    executeDecree(decree) {
        decree.execute(this);
    }
}
