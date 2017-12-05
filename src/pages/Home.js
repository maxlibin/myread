import React from 'react';
import {getAll} from '../BooksAPI';
import {Link} from 'react-router-dom';
import Bookshelf from "../components/Bookshelf";

const bookshelfs = [
  {title: "Currently Reading", key: "currentlyReading"},
  {title: "Want To Read", key: "wantToRead"},
  {title: "Read", key: "read"},
];

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    this.getAllBooks();
  }

  updateBooks = () => {
    this.getAllBooks();
  };

  getAllBooks = () => {
    getAll().then((books) => {
      this.setState({
        books,
      })
    })
  }

  render() {
    const {books} = this.state;
    return (
      <div className="home">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
            <p>Udacity React nanodegree MyReads project</p>
            <Link to="/search" className="btn">
              Add a book
            </Link>
          </div>

          <div className="list-books-content">
            {bookshelfs.map((bookshelf) => (
              <Bookshelf
                key={bookshelf.key}
                bookshelfTitle={bookshelf.title}
                books={books.filter((book) => book.shelf === bookshelf.key)}
                updateBooks={this.updateBooks}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
 }

export default BooksApp
