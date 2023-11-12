import express from 'express';
import { DBConnection } from './config/DBConnection';
import Middleware from './config/Middleware';
import BooksRouter from './routes/BooksRouter';
import BorrowersRouter from './routes/BorrowersRouter';

DBConnection.initialize().then(() => {
   const app = express();
   const port = 3000;

   app.use(Middleware);
   
   app.use('/api', [BooksRouter,BorrowersRouter]);

  app.get('/', async (req, res) => {
    try {
      res.status(200).send("Alive");
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})