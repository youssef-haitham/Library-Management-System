import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

const port = process.env.PORT as number | undefined;

export const DBConnection = new DataSource({
   type: 'mysql',
   host: process.env.HOST,
   port: port,
   username: process.env.USER,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
   entities: ["src/entities/*.ts"]
});