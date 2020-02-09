import {useState, useCallback, useEffect} from 'react';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [hasError, setHasError] = useState(null);

  useEffect(
    () =>
      fetch('/api/v1/book')
        .then(res => res.json())
        .then(setBooks)
        .catch(setHasError),
    []
  );

  const createBook = useCallback(
    async book => {
      const response = await fetch('/api/v1/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });
      if (response.status < 400) {
        setBooks(books.concat(book));
      } else {
        throw Error('Unexpected error creating book');
      }
    },
    [books, setBooks]
  );

  const deleteBook = useCallback(
    async isbn => {
      if (!isbn) throw Error('Book has no isbn, cannot delete.');

      const response = await fetch(`/api/v1/book/${isbn}`, {
        method: 'DELETE'
      });
      if (response.status < 400) {
        setBooks(books.filter(book => book.isbn !== isbn));
      } else {
        throw Error('Unexpected error creating book');
      }
    },
    [books, setBooks]
  );

  return {books, createBook, deleteBook, hasError, setHasError};
};

export default useBooks;
