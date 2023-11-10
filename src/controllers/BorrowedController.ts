import { Request, Response } from 'express';
import createConnection from '../config/DBConnection';

export const getAllBorrowed = async (req:Request,res:Response) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM Borrowed');
        connection.end();
        res.status(200).json({"data" : rows});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}