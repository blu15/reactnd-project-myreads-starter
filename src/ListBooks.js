import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelfBooks from './BookShelfBooks'


class ListBooks extends Component {

  render() {
    const { books } = this.props
    console.log(books)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookShelfBooks
                books={books}
                shelf='currentlyReading'
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookShelfBooks
                books={books}
                shelf='wantToRead'
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelfBooks
                books={books}
                shelf='read'
              />
            </div>
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
}

export default ListBooks
