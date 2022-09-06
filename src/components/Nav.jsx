import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navbar">
      <h4>STONKS</h4>
      <div>
        <Link to="/">Home</Link>
        <Link to="/research">Research</Link>
        <Link to="/watchlists">Watchlists</Link>
      </div>
    </nav>
  )
}

export default Nav
