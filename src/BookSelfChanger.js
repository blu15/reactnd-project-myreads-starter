import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BookSelfChanger extends Component {
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.setState({ value: shelf })
  }

  render() {
    const { book } = this.props
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(event) => this.changeShelf(book, event.target.value)} >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookSelfChanger
