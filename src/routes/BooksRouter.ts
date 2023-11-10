import express from 'express';
import * as BooksController from '../controllers/BooksController';
import * as Borrowers from '../controllers/BorrowersController';
import * as Borrowed from '../controllers/BorrowedController';

const BooksRouter = express.Router();

BooksRouter.get('/getAllBooks', BooksController.getAllBooks);
BooksRouter.get('/getAllBorrowers', Borrowers.getAllBorrowers);
BooksRouter.get('/getAllBorrowed', Borrowed.getAllBorrowed);

export default BooksRouter;