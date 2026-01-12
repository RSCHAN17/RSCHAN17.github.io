import { Router } from 'express';
import clicheController from '../controllers/cliches.js';

const clicheRouter = Router();

clicheRouter.get( "/all", clicheController.index);
clicheRouter.post("/", clicheController.create);

export default clicheRouter;