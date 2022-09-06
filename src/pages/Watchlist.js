import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Watchlist = () => {
  const [watchlists, setWatchlists] = useState([])

  const getWatchlists = async () => {
    const res = await axios.get(`http://localhost:8000/watchlists`)
    setWatchlists(res.data)
    console.log(res.data)
  }
  //   useEffect(getWatchlists, [])
  getWatchlists()

  return (
    <div className="homePage">
      <h1>Watchlists</h1>
      {watchlists.map((watchlist) => (
        <h2>{watchlist.name}</h2>
      ))}
    </div>
  )
}

export default Watchlist
