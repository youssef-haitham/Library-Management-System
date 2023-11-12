import express from 'express';
import * as BorrowersController from '../controllers/BorrowersController';

const BorrowersRouter = express.Router();

BorrowersRouter.get('/getAllBorrowers', BorrowersController.getAllBorrowers);
BorrowersRouter.post('/addBorrower', BorrowersController.addBorrower);
BorrowersRouter.put('/updateBorrower', BorrowersController.updateBorrower);
BorrowersRouter.delete('/deleteBorrower', BorrowersController.deleteBorrower);

export default BorrowersRouter;