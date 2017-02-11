export default class Building {
    constructor(name, type, jobs, profit, pollution) {
        this.name = name;
        this.type = type;
        this.jobs = jobs;
        this.profit = profit;
        this.pollution = pollution;
    }

    static factory (jsonobj) {
        if (!(jsonobj.name && jsonobj.type)) {
            throw new Error("This is not a sane building!");
        }

        let jobs = jsonobj.jobs | 0;
        let profit = jsonobj.profit | 0;
        let pollution = jsonobj.pollution | 0;

        return new Building(jsonobj.name, jsonobj.type, jobs, profit, pollution);
    }
}
