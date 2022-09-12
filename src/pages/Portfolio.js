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
  changeCase,
  portfolioChange,
  portfolioSubmit,
  formPortfolio
}) => {
  const [totalGL, setTotalGL] = useState(0)

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()
  console.log(quotes.c)
  console.log(portfolioStocks)

  let totalCost = 0

  for (let i = 0; i < portfolioStocks.length; i++) {
    let cb = parseFloat(portfolioStocks[i].cost_basis)
    console.log(cb)
    totalCost = totalCost + cb
    parseFloat(totalCost)
    console.log(totalCost)
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
          //   setFormState={setFormState}
        />
        <QuoteBar quotes={quotes} />
        <div className="create-stock">
          <form className="form" onSubmit={portfolioSubmit}>
            <div className="stockInput">
              <label htmlFor="name">Add {searchQuery} to your Portfolio:</label>
              <input
                type="text"
                id="ticker"
                onChange={portfolioChange}
                value={formPortfolio.ticker}
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

            <th>Current Price</th>
            <th>Today's Change</th>
            <th>Cost Basis</th>
            <th>Gain/Loss</th>
          </tr>
        </table>
        {portfolioStocks.map((stock) => (
          <div>
            <QuotesPortfolio
              ticker={stock.ticker}
              id={stock.id}
              costBasis={stock.cost_basis}
              deleteStock={deleteStock}
              totalGL={totalGL}
              setTotalGL={setTotalGL}
            />
          </div>
        ))}
        <table>
          <tr>
            <th></th>
            <th>Totals:</th>
            <th></th>
            <th></th>
            <th>${totalCost.toFixed(2)}</th>
            <div className={totalGL > 0 ? 'mark-positive' : 'mark-negative'}>
              <th>${totalGL}</th>
            </div>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Portfolio
