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
  getWatchlists,
  updateWatchlists
}) => {
  //   console.log(watchlists)
  //   console.log(users)
  const initialState = {
    name: watchlists.name
  }

  let { id, index } = useParams()

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    let res = await axios.put(
      `http://localhost:3001/api/watchlist/${watchlists.id}`,
      formState
    )
    setFormState(initialState)
  }

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
          <div className="edit-watchlist">
            <form className="form" onSubmit={handleSubmit}>
              <div className="watchlistInputs">
                <label htmlFor="name">Update Watchlist Name:</label>
                <input
                  type="text"
                  id="name"
                  onChange={handleChange}
                  value={formState.name}
                />
              </div>

              <button type="submit">Update Watchlist Name!</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Watchlist
