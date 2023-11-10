import { Request, Response } from 'express';
import createConnection from '../config/DBConnection';

export const getAllBorrowers = async (req:Request,res:Response) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM Borrowers');
        connection.end();
        res.status(200).json({"data" : rows});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}