import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    value: ''
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <div>
          <Route exact path='/' render={() => (
            <ListBooks
              books={this.state.books}
            />
          )}/>
          <Route path='/search' render={() => (
            <Search
              books={this.state.books}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
