import express from 'express';
import cors from 'cors';
import logger from './logger.js';
const clicheRouter = require('./routers/cliches.js');
const gigRouter = require('./routers/gigs.js');

const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/cliches', clicheRouter);
app.use('/gigs', gigRouter)

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Cliches",
    description: "The gigs await..."
  })
})

module.exports = app