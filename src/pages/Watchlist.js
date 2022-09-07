import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Watchlist = ({ watchlists }) => {
  //   const [watchlists, setWatchlists] = useState([])

  //   const getWatchlists = async () => {
  //     const res = await axios.get(`http://localhost:8000/watchlists`)
  //     setWatchlists(res.data)
  //     // console.log(res.data)
  //   }
  //   useEffect(() => getWatchlists, [])
  console.log(watchlists)

  return (
    <div className="homePage">
      <h1>Watchlists</h1>
      {watchlists.map((watchlist, index) => (
        <h2>
          {watchlist.name}
          <Link to={`/watchlists/${watchlist.id}/${index}`}>HERE</Link>
        </h2>
      ))}
    </div>
  )
}

export default Watchlist
