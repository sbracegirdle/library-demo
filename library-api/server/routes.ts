import {Application} from 'express';
import bookRouter from './api/controllers/book.router';
export default function routes(app: Application): void {
  console.log('Adding route /api/v1/book');
  app.use('/api/v1/book', bookRouter);
}
