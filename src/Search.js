import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSelfChanger from './BookSelfChanger'
import PropTypes from 'prop-types'

class Search extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      message: '',
    };
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 50)
      .then((books) => {
        const booksNotOnMyReads = books.filter(book => this.props.books.some(b => b.id !== book.id));
        this.setState({ books: [...booksNotOnMyReads], message: '' });
      })
      .catch((err) => {
        this.setState({ books: [], message: 'No book found.' });
      });

  }

  handleSubmit = (event) => {
    if (!event.target.value) {
      this.setState({ books: [], message: '' });
    } else {
      this.searchBooks(event.target.value.trim());
    }
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { updateBookShelf } = this.props
    const { query } = this.state

    console.log(this.state.books)

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
          {this.state.message &&
            <h2 className="search-no-results-msg">
              {this.state.message}
            </h2>
          }
          <ol className="books-grid">
          {this.state.books.map((book) => (
            <li key={book.id}>
              <div className={book.shelf}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <BookSelfChanger
                      book={book}
                      onUpdateBookShelf={updateBookShelf}
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors[0]}</div>
                  <div className="book-category">{book.shelf ? 'Book added to your shelf!' : ''}</div>
                </div>
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
