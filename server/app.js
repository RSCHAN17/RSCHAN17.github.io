import express from 'express';
import cors from 'cors';
import logger from './logger';
import clicheRouter from './routers/cliches';
import gigRouter from './routers/gigs';

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