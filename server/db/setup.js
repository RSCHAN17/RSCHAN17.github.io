import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs';
import db from './connect';

const sql = fs.readFileSync('./db/gigs.sql').toString();

db.query(sql)
  .then(data => {
    db.end();
    console.log("Setup complete");
  })
  .catch(error => console.log(error));
