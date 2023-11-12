import { Request, Response } from 'express';
import { DBConnection } from '../config/DBConnection';
import { Borrower } from '../entities/Borrower';
import { validateBorrower, validateEmail } from '../utils/Validations';
import { ValidationException } from '../exceptions/ValidationException';
import { ObjectAlreadyExistsException } from '../exceptions/ObjectAlreadyExistsException';

export const getAllBorrowers = async (req:Request,res:Response) => {
    try{
        const result = await DBConnection.manager.find(Borrower);
        res.status(200).json({"data":result});
    }
    catch(e){
        res.status(500).json({"error":(e as Error).message});
    }
}

export const addBorrower = async (req:Request,res:Response) => {
    try{
        validateBorrower(req.body);
        validateEmail(req.body.email);
        const borrower  = new Borrower();
        borrower.email = req.body.email;
        borrower.name = req.body.name;

        const borrowerExists = await DBConnection.manager.exists(Borrower,{where:{email:borrower.email}});
        if(borrowerExists) throw new ObjectAlreadyExistsException;

        const result = await DBConnection.manager.save(borrower);

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

export const updateBorrower = async (req:Request,res:Response) => {
    try{
        if(req.body?.email == null){
            throw new ValidationException("Email not provided");
        }
        validateEmail(req.body.email);

        const updatedBorrower:Borrower = new Borrower();
        updatedBorrower.name = req.body.name;
        updatedBorrower.email = req.body.email;
    
        const result = await DBConnection.manager.update(Borrower,{email:updatedBorrower.email} ,updatedBorrower);
        res.status(201).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        else res.status(500).json({"error":(e as Error).message});
    }
}

export const deleteBorrower = async (req:Request,res:Response) => {
    try{
        const email = req.body?.email;
        if(email == null){
            throw new ValidationException("Email not provided");
        }
        validateEmail(req.body.email);

        const result = await DBConnection.manager.delete(Borrower,{email:email});
        res.status(200).json({"data":result});
    }
    catch(e){
        if(e instanceof ValidationException) res.status(400).json({"error":e.message});
        else res.status(500).json({"error":(e as Error).message});
    }
}