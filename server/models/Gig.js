const db = require('../db/connect');

class Gig {
    constructor({gig_id,date,name,type}){
        this.gig_id=gig_id;
        this.date=date;
        this.name=name;
        this.type=type;
    }
    static async getAll() {
    const response = await db.query("SELECT gig_id, substring(cast(date as varchar(10),1,10) as date, name, type FROM gigs;");
    if (response.rows.length === 0) {
        throw new Error("No gigs available.")
    }
    return response.rows.map(e => new Gig(e));
    }

    static async getAllFestivals() {
    const response = await db.query("SELECT gig_id, substring(cast(date as varchar(10),1,10) as date, name, type FROM gigs WHERE type='festival';");
    if (response.rows.length === 0) {
        throw new Error("No festivals available.")
    }
    return response.rows.map(e => new Gig(e));
    }
}

module.exports = Gig