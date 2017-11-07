import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookSelfChanger from './BookSelfChanger'

class BookShelfBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      message: '',
    };
  }

  render() {
    const { books, shelf, updateBookShelf, shelfTitle } = this.props

    let currentShelf
    currentShelf = books.filter((booksOnCurrentShelf) => booksOnCurrentShelf.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {currentShelf.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <BookSelfChanger
                      book={book}
                      onUpdateBookShelf={updateBookShelf}
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors ? book.authors.join(', ') : book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelfBooks
