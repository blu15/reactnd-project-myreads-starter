import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Update via books API, and set the State.
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;

      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id).concat([book]),
      }));
    });
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
              books={this.state.books}
              updateBookShelf={this.updateBookShelf}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
