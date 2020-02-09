import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import useBooks from './useBooks';
import {Button, LinkButton, Card, TextInput, TextArea, Message, FormCell, Label, Mandatory} from './styledComponents';

const CreateBookForm = ({createBook}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [isbn, setISBN] = useState('');
  const [year, setYear] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitForm = () => {
    createBook({title, author, synopsis: synopsis, isbn, year: year || undefined});
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? <Redirect to="/" /> : undefined}
      <Card className="flex flex-row flex-wrap">
        <FormCell className="w-9/12">
          <Label>
            Title
            <Mandatory />
          </Label>
          <TextInput mandatory value={title} onChange={e => setTitle(e.target.value)} />
        </FormCell>
        <FormCell className="w-9/12">
          <Label>
            Author
            <Mandatory />
          </Label>
          <TextInput mandatory value={author} onChange={e => setAuthor(e.target.value)} />
        </FormCell>
        <FormCell className="w-full">
          <Label>Synopsis</Label>
          <TextArea onChange={e => setSynopsis(e.target.value)}>{synopsis}</TextArea>
        </FormCell>
        <FormCell className="w-6/12" label="ISBN" mandatory>
          <Label>
            ISBN
            <Mandatory />
          </Label>
          <TextInput mandatory value={isbn} onChange={e => setISBN(e.target.value)} />
        </FormCell>
        <FormCell className="w-6/12" label="Year">
          <Label>Year</Label>
          <TextInput value={year} onChange={e => setYear(e.target.value)} />
        </FormCell>
      </Card>
      <div className="my-2">
        <Button primary className="mr-2" onClick={submitForm} disabled={!title || !author || !isbn}>
          Submit
        </Button>
        <LinkButton to="/">Cancel</LinkButton>
      </div>
    </>
  );
};

const LibraryLink = props => <Link {...props} className="text-blue cursor-pointer hover:underline" />;

const AppShell = ({title, children}) => (
  <div className="AppShell w-screen min-h-screen bg-gunmetal font-body text-cream p-2 sm:p-2 md:p-2 lg:p-4 xl:p-4 ">
    <main className="w-full xl:w-6/12 mx-auto">
      <div className="AppShell-header flex my-2 flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-baseline">
        <h1 className="text-4xl text-green font-light font-display mr-2 cursor-pointer">
          <Link to="/">My Library App</Link>
        </h1>
        <h1 className="text-xl text-gray-200 ">{title}</h1>
      </div>
      {children}
    </main>
  </div>
);

const BookCard = ({title, author, year, isbn, synopsis, deleteBook}) => {
  return (
    <Card className="BookCard my-2">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <div className="flex-1">
          <div className="BookCard-title font-bold">{title}</div>
          <div className="text-sm text-gray-400 mt-1">{synopsis}</div>
        </div>
        <div className="BookCard-meta text-sm flex flex-col my-2 md:my-0 md:mx-3">
          <div>{author}</div>
          <div>{year}</div>
          <div>{isbn}</div>
        </div>
        <div className="my-2 md:my-0 md:mx-3">
          <Button primary inverted sm onClick={() => deleteBook(isbn)}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

function App() {
  const {books, createBook, deleteBook, hasError} = useBooks();

  if (hasError)
    return (
      <Router>
        <AppShell title="Error page">Could not load the list of books.</AppShell>
      </Router>
    );

  return (
    <Router>
      <AppShell
        title={
          <Switch>
            <Route path="/create">Create a book</Route>
            <Route path="/">Available books</Route>
          </Switch>
        }>
        <Switch>
          <Route path="/create">
            <CreateBookForm createBook={createBook} />
          </Route>
          <Route path="/">
            {books && books.length ? (
              books.map(book => <BookCard {...book} deleteBook={deleteBook} />)
            ) : (
              <Message>
                No books available, please <LibraryLink to="/create">add</LibraryLink> one
              </Message>
            )}
            <div className="my-2">
              <LinkButton to="/create" primary className="mr-2">
                Add a book
              </LinkButton>
            </div>
          </Route>
        </Switch>
      </AppShell>
    </Router>
  );
}

export default App;
