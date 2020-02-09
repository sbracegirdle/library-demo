import L from '../../common/logger';

import Joi from 'joi';

interface Book {
  title: string;
  synopsis: string;
  author: string;
  isbn: number;
  year: number;
}

const bookSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(128),
  synopsis: Joi.string()
    .min(0)
    .max(1024)
    .allow('')
    .optional(),
  author: Joi.string()
    .min(1)
    .max(1024),
  isbn: Joi.number()
    .min(1)
    .max(9999999999999),
  year: Joi.number()
    .min(0)
    .max(9999)
});

let DATABASE: Book[] = [];

export const createBook = async (book: Book): Promise<Book> => {
  const result = bookSchema.validate(book);

  if (result.error) {
    L.error(result.error.details, 'validation error on book creation');
    throw result.error;
  }

  DATABASE.push(book);

  L.info(book, 'book created');
  return book;
};

export const deleteBook = async (isbn: number): Promise<boolean> => {
  DATABASE = DATABASE.filter(book => book.isbn !== isbn);

  L.info({isbn}, 'book deleted');

  return true;
};

export const listBooks = async (): Promise<Book[]> => {
  return DATABASE;
};
