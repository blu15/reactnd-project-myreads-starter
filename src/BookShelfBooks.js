import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelfBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      message: '',
    }
  }

  render() {
    const { books, updateBookShelf, shelf, shelfTitle } = this.props
    const currentShelf = books.filter((booksOnCurrentShelf) => booksOnCurrentShelf.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {currentShelf.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateBookShelf={updateBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelfBooks
