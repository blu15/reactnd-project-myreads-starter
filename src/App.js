import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchResults: []
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
    BooksAPI.search(query, 20)
      .then((searchResults) => {
        let books = !searchResults.length ? [] : searchResults
        this.setState({ searchResults: books, message: '' })
      })
      .catch((err) => {
        this.setState({ searchResults: [], message: 'Unfortunately, we don\'t have the book you are looking for.' })
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
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
