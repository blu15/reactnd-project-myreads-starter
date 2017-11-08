import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookSelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
  }

  render() {
    const { book, onUpdateBookShelf } = this.props
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(event) => onUpdateBookShelf(book, event.target.value)}
          value={book.shelf ? book.shelf : "none"}
        >
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
