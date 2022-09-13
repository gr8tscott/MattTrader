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
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  const getQuotes = () => {
    finnhubClient.quote(`${ticker}`, (error, data, response) => {
      //   console.log(data)
      let something = data
      setQuotes(something)
    })
  }
  //   console.log(ticker)
  let gainLoss = quotes.c - costBasis
  gainLoss = parseFloat(gainLoss).toFixed(2)
  //   const calculateGainLoss = () => {
  //   if (isNaN(gainLoss) === false) {
  //     let arr = currentGL
  //     arr.push(gainLoss)
  //     setCurrentGL(arr)
  //   }
  findGainLoss(gainLoss)
  //   }
  //   const pleaseDearGod = () => {
  //     setTimeout(() => findGainLoss(gainLoss), 500)
  //   }

  useEffect(() => {
    getQuotes()
    // pleaseDearGod()
    // findGainLoss(gainLoss)
    // calculateGainLoss()
  }, [])
  //   pleaseDearGod()
  //   let total = []

  //   console.log(gainLoss)
  //   total.push(gainLoss)
  //   console.log(total)
  //   let currentGLTotal = parseFloat(totalGL)
  //   let GLtotal = gainLoss + currentGLTotal
  //   console.log(GLtotal)
  //   setTotalGL(GLtotal)

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
