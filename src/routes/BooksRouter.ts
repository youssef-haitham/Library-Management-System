import express from 'express';
import * as BooksController from '../controllers/BooksController';

const BooksRouter = express.Router();

BooksRouter.get('/getAllBooks', BooksController.getAllBooks);
BooksRouter.get('/searchBook/:keyWord', BooksController.searchBook);
BooksRouter.post('/addBook', BooksController.addBook);
BooksRouter.put('/updateBook/:isbn', BooksController.updateBook);
BooksRouter.delete('/deleteBook/:isbn', BooksController.deleteBook);

export default BooksRouter;