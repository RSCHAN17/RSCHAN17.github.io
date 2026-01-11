import express from 'express';
import cors from 'cors';
const logger = require('./logger')
const clicheRouter = require('./routers/cliches');
const gigRouter = require('./routers/gigs');

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