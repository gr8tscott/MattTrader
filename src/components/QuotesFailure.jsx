import react from 'react'
import { useState, useEffect } from 'react'
const finnhub = require('finnhub')

const Quotes = ({ ticker }) => {
  const [quotes, setQuotes] = useState([])

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  const getQuotes = async () => {
    await finnhubClient.quote(`${ticker}`, (error, data, response) => {
      console.log(data)
      let something = data
      setQuotes(something)
    })
  }

  useEffect(() => {
    getQuotes()
  }, [])

  // let quoteMap
  // if (quotes) {
  //   ;<table>
  //     <tr>
  //       <th>Ticker</th>
  //       <th>Current Price</th>
  //       <th>Today's Change</th>
  //       <th>Today's Open</th>
  //       <th>Previous Close</th>
  //       <th>High</th>
  //       <th>Low</th>
  //     </tr>
  //     {
  //       (quoteMap = quotes.map((quote) => (
  //         <tr>
  //           <td>{ticker}</td>
  //           <td>${quote.c}</td>
  //           <td>
  //             ${quote.d}/{quotes.dp}%
  //           </td>
  //           <td>${quote.o}</td>
  //           <td>${quote.pc}</td>
  //           <td>${quote.h}</td>
  //           <td>${quote.l}</td>
  //         </tr>
  //       )))
  //     }
  //   </table>
  // }
  return (
    <div className="quotebar">
      <h2>{quotes.c}</h2>
      {/* <table>
        <tr>
          <th>Current Price</th>
          <th>Today's Change</th>
          <th>Today's Open</th>
          <th>Previous Close</th>
          <th>High</th>
          <th>Low</th>
        </tr>
        <tr>
          <td>${quotes.c}</td>
          <td>
            ${quotes.d}/{quotes.dp}%
          </td>
          <td>${quotes.o}</td>
          <td>${quotes.pc}</td>
          <td>${quotes.h}</td>
          <td>${quotes.l}</td>
        </tr>
      </table> */}
    </div>
  )
}

export default Quotes

// {quotes.map((quote) => (
//     <div>
//       <h1>{quote.c}</h1>
//     </div>
//   ))}
//   <tr>
//     <td>{ticker}</td>
//     <td>${quotes.c}</td>
//     <td>
//       ${quotes.d}/{quotes.dp}%
//     </td>
//     <td>${quotes.o}</td>
//     <td>${quotes.pc}</td>
//     <td>${quotes.h}</td>
//     <td>${quotes.l}</td>
//   </tr>
