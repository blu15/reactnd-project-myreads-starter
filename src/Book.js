import React from 'react'
import BookSelfChanger from './BookSelfChanger'

function Book(props) {
  const { book, updateBookShelf } = props
  const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
        <BookSelfChanger
          book={book}
          onUpdateBookShelf={updateBookShelf}
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors.join(', ') : book.author}</div>
    </div>
  )
}

export default Book
