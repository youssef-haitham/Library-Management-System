import express from 'express';
import * as BorrowedController from "../controllers/BorrowedController";

const BorrowedRouter = express.Router();

BorrowedRouter.post('/borrowBook', BorrowedController.borrowBook);
BorrowedRouter.delete('/returnBook', BorrowedController.returnBook);
BorrowedRouter.get('/checkBorrowedBooks', BorrowedController.checkBorrowedBooks);
BorrowedRouter.get('/listOverdueBooks', BorrowedController.listOverdueBooks);

export default BorrowedRouter;