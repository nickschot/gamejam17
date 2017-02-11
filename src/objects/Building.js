export default class Building {
    constructor(type, jobs, profit, pollution) {
        this.type = type;
        this.jobs = jobs;
        this.profit = profit;
        this.pollution = pollution;
    }

    static factory (jsonobj) {
        if (!(jsonobj.type)) {
            throw new Error("This is not a sane building!", jsonobj);
        }

        let jobs = jsonobj.jobs | 0;
        let profit = jsonobj.profit | 0;
        let pollution = jsonobj.pollution | 0;

        return new Building(jsonobj.type, jobs, profit, pollution);
    }
}
