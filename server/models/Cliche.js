import db from '../db/connect.js';

class Cliche {
    constructor({cliche_id,cliche,status,origin,insta}) {
        this.cliche_id=cliche_id
        this.cliche=cliche
        this.status=status
        this.origin=origin
        this.insta=insta
    }

    static async getAll() {
    const response = await db.query("SELECT cliche FROM cliches WHERE status='accepted';");
    if (response.rows.length === 0) {
        throw new Error("No cliches available.")
    }
    return response.rows.map(e => new Cliche(e));
    }

    static async create(data) {
    const { cliche, origin,insta} = data;
    const existingCliche = await db.query("SELECT cliche FROM cliches WHERE LOWER(cliche) = LOWER($1)", [cliche]);

    if(existingCliche.rows.length === 0) {
        let response = await db.query("INSERT INTO cliches (cliche,status,origin,insta) VALUES ($1, 'pending', $2, $3) RETURNING *;", [cliche,origin,insta]);
        return new Cliche(response.rows[0]);
    } else {
        throw new Error("A cliche like this already exists");
    }
    }

}

export default Cliche;