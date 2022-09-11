import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Quotes from '../components/Quotes'
import Search from '../components/Search'

const Portfolio = ({
  portfolios,
  portfolioStocks,
  getStocksByPortfolio,
  deleteStock
}) => {
  console.log(portfolios)
  console.log(portfolioStocks)

  const initialState = {
    portfolioId: 2,
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
    getStocksByPortfolio()
  }
  return (
    <div>
      <div className="portfolioPage">
        <h1>Portfolio</h1>
        <h3>Paper trade with stocks and track your progress.</h3>
        <div className="create-stock">
          <form className="form" onSubmit={handleSubmit}>
            <div className="stockInput">
              <label htmlFor="name">Add a stock to your Portfolio:</label>
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
            <h3>{portfolio.profit}</h3>
          </div>
        ))}
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
        {portfolioStocks.map((stock) => (
          <div>
            <Quotes
              ticker={stock.ticker}
              id={stock.id}
              deleteStock={deleteStock}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
