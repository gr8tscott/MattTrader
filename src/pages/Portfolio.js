import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import QuotesPortfolio from '../components/QuotesPortfolio'
import Search from '../components/Search'
import QuoteBar from '../components/QuoteBar'
const finnhub = require('finnhub')

const Portfolio = ({
  portfolios,
  portfolioStocks,
  getStocksByPortfolio,
  deleteStock,
  getSearchResults,
  onChange,
  quotes,
  searchQuery,
  changeCase
}) => {
  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()
  console.log(quotes.c)
  console.log(portfolioStocks)
  const initialState = {
    portfolioId: 1,
    ticker: '',
    cost_basis: quotes.c
  }
  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState.cost_basis)
    // console.log(formState.cost_basis)
    // let stock ={}
    // stock=formState.ticker
    // finnhubClient.quote(`${formState.ticker}`, (error, data, response) => {
    //   console.log(data)
    //   let something = data
    //   cb = something.c
    //   console.log(cb)
    // })

    let res = await axios.post(
      'http://localhost:3001/api/stock/addstock',
      formState
    )
    setFormState(initialState)
    getStocksByPortfolio()
  }
  return (
    <div>
      <div className="portfolioPage">
        <h1>Portfolio</h1>
        <h3>Paper trade with stocks and track your progress.</h3>
        <Search
          onChange={onChange}
          onSubmit={getSearchResults}
          changeCase={changeCase}
          setFormState={setFormState}
        />
        <QuoteBar quotes={quotes} />
        <div className="create-stock">
          <form className="form" onSubmit={handleSubmit}>
            <div className="stockInput">
              <label htmlFor="name">Add {searchQuery} to your Portfolio:</label>
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
        {portfolios.map((portfolio) => (
          <div>
            <h3>Profit: ${portfolio.profit}</h3>
          </div>
        ))}
        <table>
          <tr>
            <th></th>
            <th>Ticker</th>
            <th>Cost Basis</th>
            <th>Current Price</th>
            <th>Today's Change</th>
            <th>Today's Open</th>
            <th>Previous Close</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </table>
        {portfolioStocks.map((stock) => (
          <div>
            <QuotesPortfolio
              ticker={stock.ticker}
              id={stock.id}
              costBasis={stock.cost_basis}
              deleteStock={deleteStock}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
