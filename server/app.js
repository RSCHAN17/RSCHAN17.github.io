const express = require('express');
const cors = require('cors');
const logger = require('./logger')
const clicheRouter = require('./routers/cliches');

const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/cliches', clicheRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Cliches",
    description: "The gigs await..."
  })
})

module.exports = app