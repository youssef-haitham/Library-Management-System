import { Request, Response } from 'express';
import { DBConnection } from '../config/DBConnection';
import { Book } from '../entities/Book';
import { Borrower } from '../entities/Borrower';
import { ValidationException } from '../exceptions/ValidationException';
import { GeneralException } from '../exceptions/GeneralException';
import { Borrowed } from '../entities/Borrowed';
import { validateEmail } from '../utils/Validations';
import { LessThan } from 'typeorm';

export const borrowBook = async (req:Request,res:Response) => {
    try{
        const email = req.body?.email;
        const isbn = req.body?.isbn;
        if(email == null || isbn == null) throw new ValidationException("Email or ISBN not provided");
        validateEmail(email);

        const book = await DBConnection.manager.findOne(Book,{where: {isbn:isbn}});
        if(book == null) throw new ValidationException("No book exists with this ISBN value");
        if(book.quantity < 1) throw new GeneralException("All copies of this book have been borrowed");

        const borrower = await DBConnection.manager.findOne(Borrower,{where: {email:email}});
        if(borrower == null) throw new ValidationException("No borrower exists with this email");
        
        const isBorrowed = await DBConnection.manager.findOne(Borrowed,{where:{book_id:book.id,borrower_id:borrower.id}});
        if(isBorrowed != null) throw new GeneralException("This book is already borrowed by this user");

        const borrowed = new Borrowed();
        borrowed.book_id = book.id;
        borrowed.borrower_id = borrower.id;

        const result = await DBConnection.manager.save(borrowed);
        await DBConnection.manager.update(Book,{isbn:isbn},{quantity: book.quantity-1})
        res.status(200).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        res.status(500).json({"error":(e as Error).message});
    }
}

export const returnBook = async (req:Request,res:Response) => {
    try{
        const email = req.body?.email;
        const isbn = req.body?.isbn;
        if(email == null || isbn == null) throw new ValidationException("Email or ISBN not provided");
        validateEmail(email);

        const book = await DBConnection.manager.findOne(Book,{where: {isbn:isbn}});
        if(book == null) throw new ValidationException("No book exists with this ISBN value");

        const borrower = await DBConnection.manager.findOne(Borrower,{where: {email:email}});
        if(borrower == null) throw new ValidationException("No borrower exists with this email");
        
        const borrowed = await DBConnection.manager.findOne(Borrowed,{where:{book_id:book.id,borrower_id:borrower.id}});
        if(borrowed == null) throw new ValidationException("This book isn't borrowed by this user");

        const result = await DBConnection.manager.delete(Borrowed,borrowed);
        await DBConnection.manager.update(Book,{isbn:isbn},{quantity: book.quantity+1})
        res.status(200).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        res.status(500).json({"error":(e as Error).message});
    }
}

export const checkBorrowedBooks = async (req:Request,res:Response) => {
    try{
        const email = req.body?.email;
        if(email == null) throw new ValidationException("Email not provided");
        validateEmail(email);

        const borrower = await DBConnection.manager.findOne(Borrower,{where: {email:email}});
        if(borrower == null) throw new ValidationException("No borrower exists with this email");
        
        const result = await DBConnection.manager.find(Borrowed,{where:{borrower_id:borrower.id},relations: ['book']});
        res.status(200).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        res.status(500).json({"error":(e as Error).message});
    }
}

export const listOverdueBooks = async (req:Request,res:Response) => {
    try{
        const currentDate = new Date();
        const oneMinuteAgo = new Date(currentDate);
        oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

        const result = await DBConnection.manager.find(Borrowed,{where:{
              booked_date: LessThan(oneMinuteAgo),
        },relations: ['book','borrower']});
        res.status(200).json({"data":result});
    }
    catch(e){
        res.status(500).json({"error":(e as Error).message});
    }
}