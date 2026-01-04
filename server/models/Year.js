const db = require('../db/connect');

class Year {
    constructor({year,gigs_that_year}){
        this.year=year;
        this.gigs_that_year=gigs_that_year;
    }
    static async getByYear() {
    const response = await db.query("SELECT substring(cast(date as varchar(20)),1,4) as year, count(*) as gigs_that_year from gigs group by year order by year;");
    if (response.rows.length === 0) {
        throw new Error("No gigs available.")
    }
    return response.rows.map(e => new Year(e));
    }
}

module.exports = Year