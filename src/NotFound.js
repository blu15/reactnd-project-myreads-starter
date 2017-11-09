import React from 'react'
import { Link } from 'react-router-dom'
import PageNotFound from '../assets/404NotFound.jpg'

const NotFound = () => (
  <div>
    <img
      src={PageNotFound}
      alt="Page Not Found"
      style={{width: 550, height: 339, display: 'block', margin: 'auto', position: 'relative' }}
    />
    <center><Link to="/">Return to Home Page</Link></center>
  </div>
)
export default NotFound
