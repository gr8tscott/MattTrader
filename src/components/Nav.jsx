import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navSpace">
      <div className="logo">
        <h4>
          <em>STONKS</em>
        </h4>
        <h4>Trader</h4>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/research">Research</Link>
        <Link to="/watchlists">Watchlists</Link>
        <Link to="/portfolio">Portfolio</Link>
      </div>
    </nav>
  )
}

export default Nav
