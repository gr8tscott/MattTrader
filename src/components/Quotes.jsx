import react from 'react'
import { useState, useEffect } from 'react'
const finnhub = require('finnhub')

const Quotes = ({ ticker, id, deleteStock }) => {
  const [quotes, setQuotes] = useState([])

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  const getQuotes = () => {
    finnhubClient.quote(`${ticker}`, (error, data, response) => {
      console.log(data)
      let something = data
      setQuotes(something)
    })
  }
  console.log(ticker)
  useEffect(() => {
    getQuotes()
  }, [])

  return (
    <div className="quotebar">
      <table>
        {/* <tr>
          <th>Current Price</th>
          <th>Today's Change</th>
          <th>Today's Open</th>
          <th>Previous Close</th>
          <th>High</th>
          <th>Low</th>
        </tr> */}
        <tr>
          <td>
            <button
              className="stockdeletebutton"
              onClick={() => deleteStock(id)}
            >
              Remove
            </button>
          </td>
          <td>{ticker}</td>
          <td>${quotes.c}</td>
          <td>
            ${quotes.d}/ {quotes.dp}%
          </td>
          <td>${quotes.o}</td>
          <td>${quotes.pc}</td>
          <td>${quotes.h}</td>
          <td>${quotes.l}</td>
        </tr>
      </table>
    </div>
  )
}

export default Quotes
