import express, {Request, Response} from 'express';
import {createBook, deleteBook, listBooks} from '../services/book.service';

export default express
  .Router()
  .get('/', (req: Request, res: Response): void => {
    listBooks()
      .then(books => res.send(books))
      .catch(e =>
        res.status(400).send({
          details: e.details
        })
      );
  })
  .post('/', (req: Request, res: Response): void => {
    createBook(req.body)
      .then(book => res.send(book))
      .catch(e =>
        res.status(400).send({
          details: e.details
        })
      );
  })
  .delete('/:isbn', (req: Request, res: Response): void => {
    deleteBook(Number(req.params['isbn']))
      .then(result => res.send({success: result}))
      .catch(e =>
        res.status(400).send({
          details: e.details
        })
      );
  });
