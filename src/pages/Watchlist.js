import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CreateWatchlist from '../components/CreateWatchlist'
import EditWatchlist from '../components/EditWatchlist'

const Watchlist = ({
  watchlists,
  deleteWatchlist,
  getUsers,
  users,
  getWatchlists
}) => {
  //   const [watchlists, setWatchlists] = useState([])

  //   const getWatchlists = async () => {
  //     const res = await axios.get(`http://localhost:8000/watchlists`)
  //     setWatchlists(res.data)
  //     // console.log(res.data)
  //   }
  //   useEffect(() => getWatchlists, [])
  console.log(watchlists)
  console.log(users)

  //   const deleteWatchlist = async (id) => {
  //     let res = await axios.delete(`http://localhost:8000/watchlists/${id}`)
  //     // getReview()
  //   }

  return (
    <div className="watchlist">
      <h1>Watchlists</h1>
      <CreateWatchlist
        getUsers={getUsers}
        users={users}
        getWatchlists={getWatchlists}
      />
      {watchlists.map((watchlist, index) => (
        <div>
          <h2>
            {watchlist.name}
            <Link to={`/watchlists/${watchlist.id}/${index}`}>HERE</Link>
          </h2>
          <button
            className="deletebutton"
            onClick={() => deleteWatchlist(watchlist.id)}
          >
            Delete List
          </button>
          <EditWatchlist watchlists={watchlists} />
        </div>
      ))}
    </div>
  )
}

export default Watchlist
