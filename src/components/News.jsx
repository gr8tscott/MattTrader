// import { useState, useEffect } from 'react'
// const finnhub = require('finnhub')

const News = ({ news, noNews }) => {
  //   const [news, setNews] = useState([])
  //   let noNews = ''

  //   const getNews = () => {
  //     const api_key = finnhub.ApiClient.instance.authentications['api_key']
  //     api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  //     const finnhubClient = new finnhub.DefaultApi()
  //     finnhubClient.companyNews(
  //       `${searchQuery}`,
  //       '2020-01-01',
  //       '2022-09-01',
  //       (error, data, response) => {
  //         if (error) {
  //           console.error(error)
  //           noNews = 'No news available'
  //         } else {
  //           console.log(data)

  //           setNews(data)
  //         }
  //       }
  //     )
  //   }

  //   useEffect(() => getNews(), [])

  return (
    <div className="homePage">
      <h1>News</h1>
      <h2>{noNews}</h2>
      {/* {news.map((theNews) => {
        return (
          <div>
            <h2>{theNews.summary}</h2>
          </div>
        )
      })} */}
    </div>
  )
}

export default News
