const { Router } = require('express');
const gigController = require('../controllers/gigs')

const gigRouter = Router()

gigRouter.get("/all",gigController.index);
gigRouter.get("/festivals",gigController.festivals);
gigRouter.get("/years",gigController.years);

module.exports = gigRouter;