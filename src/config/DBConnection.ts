import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectionConfig = {
    host: process.env.HOST,
    port: parseInt(process.env.PORT||"0",10),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const createConnection = async (): Promise<Connection> => {
  const connection = await mysql.createConnection(connectionConfig);
  return connection;
};

export default createConnection;