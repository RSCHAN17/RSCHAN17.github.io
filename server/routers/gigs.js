const { Router } = require('express');
import gigController from '../controllers/gigs.js';

const gigRouter = Router()

gigRouter.get("/all",gigController.index);
gigRouter.get("/festivals",gigController.festivals);
gigRouter.get("/years",gigController.years);

export default gigRouter;