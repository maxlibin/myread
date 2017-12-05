import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {search} from '../BooksAPI';
import BooksList from '../components/BooksList';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      error: false,
      errorMsg: null,
      searchQuery: "",
      isLoading: false,
    }
  }
  handleOnSearchSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    const searchQuery = e.target.searchQuery.value;
    const _this = this;

    if (searchQuery) {
      search(searchQuery, 20).then((res) => {
        if (res.error) {
          _this.setState({
            error: true,
            errorMsg: res.error,
            isLoading: false,
          });
          return false;
        }

        _this.setState({
          books: res,
          error: false,
          isLoading: false,
        });
      });
    }
  };

  handleOnChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchQuery: value,
    })
  };

  updateBooksSelection = (id) => {
    this.setState((state) => ({
      ...state,
      books: state.books.filter((book) => book.id !== id),
    }))
  };

  render() {
    const {books, error, errorMsg, isLoading} = this.state;
    return (
      <div className="search-books">
        <form
          onSubmit={(e) => this.handleOnSearchSubmit(e)}
        >
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
                <input
                  name="searchQuery"
                  onChange={(e) => this.handleOnChange(e)}
                  type="text"
                  value={this.state.searchQuery}
                  placeholder="Search by title or author"
                />
            </div>
          </div>
        </form>
        <div className="search-books-results">
          {isLoading && (
            <div className={"bookshelfLoading"}>
              <span className="loader" /> Loading...
            </div>
          )}

          {!isLoading && !error && books.length === 0 && (
            <p>Enter something in above search box and press enter to search for your favorite books</p>
          )}

          {!isLoading && error && (
            <p>{errorMsg}</p>
          )}

          {!isLoading && !error && books.length > 0 && (
            <ol className="books-grid">
              {books.map((book) => (
                <BooksList
                  key={book.id}
                  {...book}
                  updateBooks={this.updateBooksSelection}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}
