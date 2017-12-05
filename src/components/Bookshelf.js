import React from "react";
import PropTypes from "prop-types";
import BooksList from "./BooksList";

const Bookshelf= (props) => {
  const {bookshelfTitle, books, updateBooks} = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        <span>{bookshelfTitle}</span>
      </h2>
      <div className="bookshelf-books">
        {books.length === 0 ? (
          <div className={"bookshelfLoading"}>
            <span className="loader" /> Loading...
          </div>
        ) : (
          <ol className="books-grid">
            {books.map((book) => (
              <BooksList
                key={book.id}
                {...book}
                updateBooks={updateBooks}
              />
            ))}
          </ol>
        )}
      </div>
    </div>
  )
};

Bookshelf.PropType = {
  bookshelfTitle: PropTypes.string.isRequired,
  title: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired,
};

export default Bookshelf;