import React from 'react'

function BookSelfChanger(props) {
  const { book, onUpdateBookShelf } = props
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

export default BookSelfChanger
