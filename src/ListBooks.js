import React from 'react'
import { Link } from 'react-router-dom'
import BookShelfBooks from './BookShelfBooks'

function ListBooks(props) {
  const { books, updateBookShelf } = props
  const currentlyReading = {shelf: 'currentlyReading', title: 'Currently Reading'}
  const wantToRead = {shelf: 'wantToRead', title: 'Want to Read'}
  const read = {shelf: 'read', title: 'Read'}
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
            <BookShelfBooks
              books={books.filter((book => book.shelf === currentlyReading.shelf))}
              shelf={currentlyReading.shelf}
              shelfTitle={currentlyReading.title}
              updateBookShelf={updateBookShelf}
            />
            <BookShelfBooks
              books={books.filter((book => book.shelf === wantToRead.shelf))}
              shelf={wantToRead.shelf}
              shelfTitle={wantToRead.title}
              updateBookShelf={updateBookShelf}
            />
            <BookShelfBooks
              books={books.filter((book => book.shelf === read.shelf))}
              shelf={read.shelf}
              shelfTitle={read.title}
              updateBookShelf={updateBookShelf}
            />
        </div>
      </div>
      <div className="open-search">
        <Link
          to='/search'
          className='add-contact'
        >Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks
