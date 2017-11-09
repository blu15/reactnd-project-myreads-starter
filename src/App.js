import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchResults: [],
    message: ''
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Update via books API, and set the State.
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id).concat([book]),
      }))
    })
  }

  searchBooks = (query) => {
    // Avoid returning a 403 from the API.
    if (!query){
      this.setState({
        searchResults: []
      });
      return;
    }
    BooksAPI.search(query, 20)
      .then((searchResults) => {
        let error = !searchResults || searchResults.error || !searchResults.length
        let books = error ? [] : searchResults
        error ? this.setState({ searchResults: [], message: 'Unfortunately, we don\'t have the book you are looking for.' }) : this.setState({ searchResults: books, message: '' })
      })
  }

  render() {
    return (
      <div className="app">
        <div>
          <Route exact path='/' render={() => (
            <ListBooks
              books={this.state.books}
              updateBookShelf={this.updateBookShelf}
            />
          )}/>
          <Route path='/search' render={() => (
            <Search
              allBooks={this.state.books}
              updateBookShelf={this.updateBookShelf}
              searchResults={this.state.searchResults}
              searchBooks={this.searchBooks}
              message={this.state.message}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
