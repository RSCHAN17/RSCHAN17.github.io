const { Router } = require('express');
const clicheController = require('../controllers/cliches')

const clicheRouter = Router();

clicheRouter.get("/all", clicheController.index);
clicheRouter.post("/", clicheController.create);

module.exports = clicheRouter;