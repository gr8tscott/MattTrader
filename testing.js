const finnhub = require('finnhub')

const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = 'cc8atrqad3iciiq4952g'
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.companyNews(
  'AAPL',
  '2020-01-01',
  '2022-09-01',
  (error, data, response) => {
    if (error) {
      console.error(error)
    } else {
      console.log(data)
    }
  }
)
finnhubClient.quote('AAPL', (error, data, response) => {
  console.log(data)
})

finnhubClient.stockCandles(
  'AAPL',
  'D',
  1590988249,
  1591852249,
  (error, data, response) => {
    console.log(data)
  }
)
