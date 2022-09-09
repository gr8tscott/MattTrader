import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditWatchlist = ({ getUsers, users, watchlists }) => {
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
    <div className="create-watchlist">
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

        <button type="submit">Create Watchlist!</button>
      </form>
    </div>
  )
}

export default EditWatchlist
