const express = require('express');
const cors = require('cors');
const gigsRouter = require('./routers/gigs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/gigs', gigsRouter);

module.exports = app