import react from 'react'
import { useState, useEffect } from 'react'
const finnhub = require('finnhub')

const QuotesPortfolio = ({
  ticker,
  id,
  costBasis,
  deleteStock,
  total,
  setTotalGL,
  findGainLoss,
  setCurrentGL,
  currentGL
}) => {
  const [quotes, setQuotes] = useState([])

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  // api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  api_key.apiKey = 'cc8atrqad3iciiq4952g'
  const finnhubClient = new finnhub.DefaultApi()

  const getQuotes = () => {
    finnhubClient.quote(`${ticker}`, (error, data, response) => {
      let something = data
      setQuotes(something)
    })
  }
  let gainLoss = quotes.c - costBasis
  gainLoss = parseFloat(gainLoss).toFixed(2)

  findGainLoss(gainLoss)

  useEffect(() => {
    getQuotes()
  }, [])

  return (
    <div className="quotebar">
      <table>
        <tr>
          <td>
            <button
              className="stockdeletebutton"
              onClick={() => deleteStock(id)}
            >
              Sell
            </button>
          </td>
          <td>{ticker}</td>

          <td>${quotes.c}</td>
          <div className={quotes.d > 0 ? 'mark-positive' : 'mark-negative'}>
            <td>
              ${quotes.d}/ {quotes.dp}%
            </td>
          </div>
          <td>${costBasis}</td>
          <div className={gainLoss > 0 ? 'mark-positive' : 'mark-negative'}>
            <td>${gainLoss}</td>
          </div>
        </tr>
      </table>
    </div>
  )
}

export default QuotesPortfolio
