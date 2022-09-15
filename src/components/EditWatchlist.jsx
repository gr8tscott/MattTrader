import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditWatchlist = (props) => {
  // const [review, setReview] = useState([])

  let { id, index } = useParams()

  let navigate = useNavigate()

  const initialState = {
    name: props.watchlist[index].name
  }
  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let res = await axios.put(`/watchlist/${id}`, formState)
    setFormState(initialState)
    navigate(`/watchlists`)
  }

  return (
    <div className="watchlistCard">
      <h1>Edit your watchlist here {props.watchlist[index].name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Watchlist Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formState.name}
        />

        <button type="submit">Update Review!</button>
      </form>
    </div>
  )
}

export default EditWatchlist
