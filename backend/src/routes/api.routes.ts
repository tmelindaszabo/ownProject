import cors from 'cors';
import express from 'express';
import { bookController } from '../controllers/bookController';
import { borrowingController } from '../controllers/borrowingController';
import helloController from '../controllers/helloController';
import { userController } from '../controllers/userController';

const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.get('/', helloController.getHello);
//user
apiRouter.post('/register', userController.registerUser);
apiRouter.post('/login', userController.loginUser);

//book
apiRouter.get('/books', bookController.getAllBooks);
apiRouter.get('/book/:id', bookController.getBookById);
apiRouter.post('/book', bookController.addNewBook);

apiRouter.delete('/book/:id', bookController.deleteBookById);

//borrowing
apiRouter.post('/borrowing', borrowingController.newBorrow);
apiRouter.put('/renewBorrowing', borrowingController.renewBorrowing);
apiRouter.get('/discharge/:bookId', borrowingController.bookDischarging);

export default apiRouter;
