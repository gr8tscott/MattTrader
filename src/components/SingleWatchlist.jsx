import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
const finnhub = require('finnhub')

const SingleWatchlist = ({ watchlists, deleteStock }) => {
  const [stocks, setStocks] = useState([])
  const [quotes, setQuotes] = useState([])

  let { id, index } = useParams()
  //   setStocks(watchlists[index].stocks)

  console.log(watchlists[index].id)
  const getStocks = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/stock/${watchlists[index].id}`
    )
    setStocks(res.data)
    console.log(res.data)
  }

  //   const getStocks = (e) => {
  //     // e.preventDefault()
  //     let stonks = watchlists[index].stocks
  //     setStocks(stonks)
  //     // console.log(stocks)
  //   }

  useEffect(() => {
    getStocks()
  }, [])
  //   getStocks()
  //////////////////////////
  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  let quoteArr = []
  //
  for (let i = 0; i < stocks.length; i++) {
    // if (i < stocks.length === false) {
    //   setQuotes(quoteArr)
    //   console.log(quotes)
    //   break
    // }
    console.log(stocks[i].ticker)
    finnhubClient.quote(`${stocks[i].ticker}`, (error, data, response) => {
      console.log(data)
      let something = data
      quotes.push(something)
      console.log(stocks)
      console.log(quotes)
      //   getQuotes()
    })
  }
  ///////////////////////////
  //   const getQuotes = (e) => {
  //     setQuotes(quoteArr)
  //     console.log(quotes)
  //   }
  //   useEffect(() => getQuotes(), [])

  //   stocks.forEach((stock, i, stocks) => {
  //     // e.preventDefault()
  //     // stocks.forEach()
  //     // console.log(stock)
  //     if (stocks[i] >= stocks.length) {
  //       setQuotes(quoteArr)
  //     } else {
  //       stocks[i] = finnhubClient.quote(
  //         `${stock.ticker}`,
  //         (error, data, response) => {
  //           console.log(data)
  //           let something = data
  //           quoteArr.push(something)
  //         }
  //       )
  //     }
  //   })

  console.log(stocks)
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
  return (
    <div className="singleWatchlist">
      <h1>{watchlists[index].name}</h1>
      {stocks.map((stock) => (
        <div>
          <h4>{stock.ticker}</h4>
          <button
            className="stockdeletebutton"
            onClick={() => deleteStock(stock.id)}
          >
            Remove
          </button>
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
