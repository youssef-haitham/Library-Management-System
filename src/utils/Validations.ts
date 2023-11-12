import { Book } from "../entities/Book";
import { Borrower } from "../entities/Borrower";
import { ValidationException } from "../exceptions/ValidationException";

export const validateBook = (book:Book) => {
    if(book == null || book.title == null || book.author == null || book.isbn == null || book.quantity == null || book.shelf_location == null)
        throw new ValidationException(`Book should contain the following attributes: Title, Author, ISBN, Quantity and Shelf Location`);
}

export const validateBorrower = (borrower:Borrower) => {
    if(borrower == null || borrower.email == null || borrower.name == null) 
        throw new ValidationException(`Borrower should contain the following attributes: Name and Email`);
}

export const validateEmail = (email:string) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const isValid = emailRegex.test(email);
    if(!isValid){
        throw new ValidationException(`Wrong email format`);
    }
}