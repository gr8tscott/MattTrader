import axios from 'axios'
import { useState, useEffect } from 'react'

const EditWatchlist = ({ getUsers, users, watchlists }) => {
  const initialState = {
    ticker: '',
    watchlist: watchlists[index]
  }
  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    let res = await axios.put('http://localhost:8000/watchlists/', formState)
    setFormState(initialState)
  }
  return (
    <div className="create-watchlist">
      <form className="form" onSubmit={handleSubmit}>
        <div className="watchlistInputs">
          <label htmlFor="watchlist">User Name:</label>
          <select id="user" onChange={handleChange} value={formState.user}>
            <option value="blank">---------</option>

            {users.map((user, index) => (
              <option value={user.name} key={index}>
                {user.name}
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

          <label htmlFor="stock">Insert Ticker Symbol:</label>
          <input
            type="text"
            id="ticker"
            onChange={handleChange}
            value={formState.stocks}
          />
        </div>
        {/* <div className="reviewText">
          <label htmlFor="text">Leave your review here:</label>
          <textarea
            id="text"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={formState.text}
          ></textarea>
        </div> */}
        <button type="submit">Create Watchlist!</button>
      </form>
    </div>
  )
}

export default EditWatchlist
