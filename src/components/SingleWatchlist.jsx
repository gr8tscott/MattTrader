import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
const finnhub = require('finnhub')

const SingleWatchlist = ({ watchlists }) => {
  const [stocks, setStocks] = useState([])
  const [quotes, setQuotes] = useState([])

  let { id, index } = useParams()
  //   setStocks(watchlists[index].stocks)

  const getStocks = (e) => {
    // e.preventDefault()
    let stonks = watchlists[index].stocks
    setStocks(stonks)
    // console.log(stocks)
  }
  useEffect(() => getStocks(), [])
  //   getStocks()

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  let quoteArr = []
  //
  for (let i = 0; i < stocks.length; i++) {
    finnhubClient.quote(`${stocks[i].ticker}`, (error, data, response) => {
      console.log(data)
      let something = data
      quoteArr.push(something)
      //   setQuotes(quoteArr)
    })
  }
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

  //   console.log(stocks)
  return (
    <div className="homePage">
      <h1>{watchlists[index].name}</h1>
      {stocks.map((stock) => (
        <h4>{stock.ticker}</h4>
      ))}
    </div>
  )
}

export default SingleWatchlist
