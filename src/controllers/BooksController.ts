import { Request, Response } from 'express';
import { DBConnection } from '../config/DBConnection';
import { Book } from '../entities/Book';
import { validateBook } from '../utils/Validations';
import { ValidationException } from '../exceptions/ValidationException';
import { ObjectAlreadyExistsException } from '../exceptions/ObjectAlreadyExistsException';
import { Like } from 'typeorm';

export const getAllBooks = async (req:Request,res:Response) => {
    try{
        const result = await DBConnection.manager.find(Book);
        res.status(200).json({"data":result});
    }
    catch(e){
        res.status(500).json({"error":(e as Error).message});
    }
}

export const addBook = async (req:Request,res:Response) => {
    try{
        validateBook(req.body);
        const book  = new Book();
        book.author = req.body.author;
        book.isbn = req.body.isbn;
        book.quantity = req.body.quantity;
        book.shelf_location = req.body.shelf_location;
        book.title = req.body.title;

        const bookExists = await DBConnection.manager.findBy(Book,{isbn:book.isbn});
        if(bookExists.length > 0) throw new ObjectAlreadyExistsException;

        const result = await DBConnection.manager.save(book);

        res.status(201).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException){
            res.status(400).json({"error":e.message});
        }
        else if(e instanceof ObjectAlreadyExistsException){
            res.status(409).json({"error":e.message});
        }
        else{
            res.status(500).json({"error":(e as Error).message});
        }
    }
}

export const updateBook = async (req:Request,res:Response) => {
    try{
        const isbn = req.params?.isbn;
        if(isbn == null) throw new ValidationException("Please provide ISBN value");
        if(req.body == null) throw new ValidationException("Please provide values to be updated");

        const book:Book = req.body;
        const updatedBook:Book = new Book();
        book.author ? updatedBook.author = book.author : null ;
        book.quantity ? updatedBook.quantity = book.quantity : null ;
        book.shelf_location ? updatedBook.shelf_location = book.shelf_location : null ;
        book.title ? updatedBook.title = book.title : null ;

        const result = await DBConnection.manager.update(Book,{isbn:isbn} ,updatedBook);
        res.status(201).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        else res.status(500).json({"error":(e as Error).message});
    }
}

export const deleteBook = async (req:Request,res:Response) => {
    try{
        const isbn = req.params?.isbn;
        if(isbn == null) throw new ValidationException("Please provide ISBN value");

        const book = await DBConnection.manager.findOne(Book,{where:{isbn:isbn},relations: ['borrowedBy']});
        const isBorrowed = book?.borrowedBy;
        if(isBorrowed != null && isBorrowed.length > 0){
            throw new ValidationException("Book cant be deleted as it is still borrowed by a borrower")
        }

        const result = await DBConnection.manager.delete(Book,{isbn:isbn});
        res.status(200).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        else res.status(500).json({"error":(e as Error).message});
    }
}

export const searchBook = async (req:Request,res:Response) => {
    try{
        const keyWord = req.params?.keyWord;
        if(keyWord == null) throw new ValidationException("Please provide a search keyWord");

        const result = await DBConnection.manager.findBy(Book,[{title: Like(`%${keyWord}%`)}, {author: Like(`%${keyWord}%`)}, {isbn: Like(`%${keyWord}%`)}]);
        res.status(200).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        else res.status(500).json({"error":(e as Error).message});
    }
}