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
      query: ''
    };
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 50)
      .then((books) => {
        const booksNotOnMyReads = books.filter(book => this.props.books.some(bk => bk.id !== book.id));
        this.setState({ books: [...booksNotOnMyReads], message: '' });
      })
      .catch((err) => {
        this.setState({ books: [], message: 'Unfortunately, we don\'t have the book you are looking for.' });
      });

  }

  handleSubmit = (event) => {
    this.setState({ query: event.target.value.trim() })
    if (!event.target.value) {
      this.setState({ books: [], message: '' })
    } else {
      this.searchBooks(event.target.value.trim())
    }
  }

  render() {
    const { updateBookShelf } = this.props
    const { query } = this.state

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
            <h2 className="no-results">
              {this.state.message}
            </h2>
          }
          <ol className="books-grid">
          {this.state.books.map((book) => (
            <li key={book.id}>
              <div className={book.shelf ? 'added-to-shelf' : ''}>
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
