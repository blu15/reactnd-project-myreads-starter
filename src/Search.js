import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends Component {

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    searchResults: PropTypes.array,
    searchBooks: PropTypes.func.isRequired,
    message: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  // Function that sets the query state value, and the book state value.
  // If the query value is empty, the books state array will also be empty, otherwise
  // the query is passed into the searchBooks() function wich updates the searchResults state array
  // from values returned by the searchBooks function on App.js.
  handleSubmit = (event) => {
    this.setState({ query: event.target.value })
    this.props.searchBooks(event.target.value.trim())
  }

  render() {
    const { updateBookShelf, searchResults, allBooks, message } = this.props
    const { query } = this.state

    // Make a new array with book ID as key
    let findBook = allBooks.reduce( (library, book) => {
        library[book.id] = book
        return library
    }, {})
    // Create an array based on the searchResults and add the shelf by finding
    // the right book (by ID) from the allBooks array (which has the missing shelf)
    let b = searchResults.map((book)=> {
        var bookWithShelf = findBook[book.id]
        if (bookWithShelf) {
            book.shelf = bookWithShelf.shelf
        }
        return book
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={this.handleSubmit}
          />

          </div>
        </div>
        <div className="search-books-results">
          {message &&
            <h2 className="no-results">
              {message}
            </h2>
          }
          <ol className="books-grid">
          {b && b.map((book) => (
            <li key={book.id}>
              <div className="book-wrapper">
              {book.shelf &&
                <div className="ribbon"><span className={book.shelf}>{book.shelf}</span></div>
              }
                <Book
                  book={book}
                  updateBookShelf={updateBookShelf}
                />
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
