import express from 'express';
import { bookController } from '../controllers/bookController';
import helloController from '../controllers/helloController';
import { userController } from '../controllers/userController';

const apiRouter = express.Router();

apiRouter.get('/', helloController.getHello);
//user
apiRouter.post('/register', userController.registerUser);
apiRouter.post('/login', userController.loginUser);

//book
apiRouter.get('/books', bookController.getAllBooks);
apiRouter.post('/book', bookController.addNewBook);
apiRouter.get('/book/:id', bookController.getBookById);
apiRouter.delete('/book/:id', bookController.deleteBookById);

export default apiRouter;
