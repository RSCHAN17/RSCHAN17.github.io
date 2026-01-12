import db from '../db/connect.js';

class Gig {
    constructor({gig_id,date,name,type}){
        this.gig_id=gig_id;
        this.date=date;
        this.name=name;
        this.type=type;
    }
    static async getAll() {
    const response = await db.query("SELECT * FROM gigs;");
    if (response.rows.length === 0) {
        throw new Error("No gigs available.")
    }
    return response.rows.map(e => new Gig(e));
    }

    static async getAllFestivals() {
    const response = await db.query("SELECT * FROM gigs WHERE type='festival';");
    if (response.rows.length === 0) {
        throw new Error("No festivals available.")
    }
    return response.rows.map(e => new Gig(e));
    }
}

export default Gig;