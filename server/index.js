import dotenv from 'dotenv'
dotenv.config()

import app from './app.js';
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})