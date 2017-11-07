import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import BookShelfBooks from './BookShelfBooks'


class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, updateBookShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
              <BookShelfBooks
                books={books}
                shelf='currentlyReading'
                shelfTitle='Currently Reading'
                updateBookShelf={updateBookShelf}
              />
              <BookShelfBooks
                books={books}
                shelf='wantToRead'
                shelfTitle='Want to Read'
                updateBookShelf={updateBookShelf}
              />
              <BookShelfBooks
                books={books}
                shelf='read'
                shelfTitle='Read'
                updateBookShelf={updateBookShelf}
              />
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className='add-contact'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
