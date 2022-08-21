import express from 'express';
import helloController from '../controllers/helloController';
import { userController } from '../controllers/userController';

const apiRouter = express.Router();

apiRouter.get('/', helloController.getHello);
//user
apiRouter.post('/register', userController.registerUser);

export default apiRouter;
