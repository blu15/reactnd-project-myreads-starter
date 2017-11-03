import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookSelfChanger from './BookSelfChanger'

class BookShelfBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books, shelf } = this.props

    let currentShelf
    if (shelf) {
      currentShelf = books.filter((booksCurrentlyReading) => booksCurrentlyReading.shelf === shelf)
    } else {
      currentShelf = books.filter((booksCurrentlyReading) => booksCurrentlyReading.shelf === 'currentlyReading')
    }
    console.log(shelf);


    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentShelf.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <BookSelfChanger
                    book={book}
                  />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors[0]}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default BookShelfBooks
