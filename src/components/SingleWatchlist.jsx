import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import EditWatchlist from './EditWatchlist'
import Quotes from './Quotes'
const finnhub = require('finnhub')

const SingleWatchlist = ({
  stocks,
  getStocks,
  watchlists,
  deleteStock,
  getWatchlists
}) => {
  //   const [stocks, setStocks] = useState([])
  const [quotes, setQuotes] = useState([])

  let { id, index } = useParams()

  //////////////////////////

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  //
  let tickerArr = []
  let quoteArr = []
  for (let i = 0; i < stocks.length; i++) {
    tickerArr.push(stocks[i].ticker)
    // console.log(tickerArr)
  }
  const delay = async (ms = 2000) => {
    new Promise((resolve) => setTimeout(resolve, ms))
  }

  const mergeQuotes = async () => {
    for (let i = 0; i < stocks.length; i++) {
      //   console.log(stocks[i].ticker)
      await delay(2000)
      finnhubClient.quote(`${stocks[i].ticker}`, (error, data, response) => {
        //   console.log(data)
        let something = data
        quotes.push(something)
        //   console.log(stocks)
        // console.log(quotes)

        tickerArr.forEach((element, index) => {
          quoteArr[element] = quotes[index]
          //   console.log(quoteArr)
        })
        //   getQuotes()
      })
    }
  }
  mergeQuotes()

  //////////////////////////////
  const initialState = {
    watchlistId: watchlists[index].id,
    ticker: ''
  }
  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    let res = await axios.post(
      'http://localhost:3001/api/stock/addstock',
      formState
    )
    setFormState(initialState)
    getStocks()
  }
  ///////////////////Edit Watchlist Name/////////////////
  const initial = {
    name: ''
  }

  const [form, setForm] = useState(initial)

  const Change = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }
  console.log(watchlists[index].name)
  const Submit = async (event) => {
    event.preventDefault()
    console.log(form)

    let res = await axios.put(
      `http://localhost:3001/api/watchlist/${watchlists[index].id}`,
      form
    )
    setForm(initial)
    getWatchlists()
  }

  return (
    <div className="singleWatchlist">
      <h1>{watchlists[index].name}</h1>
      {/* <EditWatchlist /> */}
      <div className="create-watchlist">
        <form className="form" onSubmit={Submit}>
          <div className="watchlistInputs">
            <label htmlFor="name">Update Watchlist Name:</label>
            <input type="text" id="name" onChange={Change} value={form.name} />
          </div>

          <button type="submit">Update Watchlist Name!</button>
        </form>
      </div>
      <table>
        <tr>
          <th></th>
          <th>Ticker</th>
          <th>Current Price</th>
          <th>Today's Change</th>
          <th>Today's Open</th>
          <th>Previous Close</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </table>
      {stocks.map((stock) => (
        <div>
          {/* <button
            className="stockdeletebutton"
            onClick={() => deleteStock(stock.id)}
          >
            Remove
          </button> */}
          <Quotes
            ticker={stock.ticker}
            id={stock.id}
            deleteStock={deleteStock}
          />
          {/* <button
            className="stockdeletebutton"
            onClick={() => deleteStock(stock.id)}
          >
            Remove
          </button> */}
        </div>
      ))}

      {/* {quotes.map((quote) => (
        <h2>{quote.c}</h2>
      ))} */}
      <div className="create-stock">
        <form className="form" onSubmit={handleSubmit}>
          <div className="stockInput">
            <label htmlFor="name">Add a stock to watchlist:</label>
            <input
              type="text"
              id="ticker"
              onChange={handleChange}
              value={formState.ticker}
            />
          </div>

          <button type="submit">Add!</button>
        </form>
      </div>
    </div>
  )
}

export default SingleWatchlist
