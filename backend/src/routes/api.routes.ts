import express from 'express';
import helloController from '../controllers/helloController';

const apiRouter = express.Router();

apiRouter.get('/', helloController.getHello);

export default apiRouter;
