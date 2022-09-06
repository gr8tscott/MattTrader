import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const SingleWatchlist = (watchlist) => {
  const [stocks, setStocks] = useState([])

  const getStocks = async () => {
    const res = await axios.get(
      `http://localhost:8000/watchlists/${watchlist.id}`
    )
    setStocks(res.data)
    console.log(res.data)
  }
  useEffect(() => getStocks, [])

  return (
    <div className="homePage">
      <h1>Matt Trader</h1>
      <h2>Research the hottest stonks around</h2>
    </div>
  )
}

export default SingleWatchlist
