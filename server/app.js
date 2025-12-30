const express = require('express');
const cors = require('cors');
const clicheRouter = require('./routers/cliches');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cliches', clicheRouter);

module.exports = app