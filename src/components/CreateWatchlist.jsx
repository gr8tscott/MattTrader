import axios from 'axios'
import { useState, useEffect } from 'react'
const BASE_URL = 'https://stonks-trader2.herokuapp.com/'

const CreateWatchlist = ({ getUsers, users, getWatchlists }) => {
  const initialState = {
    userId: '',
    name: ''
  }
  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    let res = await axios.post(
      `${BASE_URL}api/watchlist/addwatchlist`,
      formState
    )
    setFormState(initialState)
    getWatchlists()
  }
  return (
    <div className="create-watchlist">
      <form className="form" onSubmit={handleSubmit}>
        <div className="watchlistInputs">
          <label htmlFor="watchlist">User Name:</label>
          <select id="userId" onChange={handleChange} value={formState.userId}>
            <option value="blank">---------</option>

            {users.map((user, index) => (
              <option value={user.id} key={index}>
                {user.username}
              </option>
            ))}
          </select>

          <label htmlFor="name">Watchlist Name:</label>
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

export default CreateWatchlist
