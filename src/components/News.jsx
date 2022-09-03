import { useState, useEffect } from 'react'
const finnhub = require('finnhub')


const News = ({searchQuery}) => {
    const [news, setNews] = useState([])
    let noNews=''

    const api_key = finnhub.ApiClient.instance.authentications['api_key']
    api_key.apiKey = 'cc8atrqad3iciiq4952g'
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.companyNews(
        `${searchQuery}`,
        '2020-01-01',
        '2022-09-01',
        (error, data, response) => {
          if (error) {
            console.error(error)
            noNews = "No news available"
          } else {
            console.log(data.category)
            
            setNews(data)
          }
        }
      )

    return (
      <div className="homePage">
        <h1>News</h1>
        <h2>{noNews}</h2>
        <h2>{news.summary}</h2>
      </div>
    )
  }
  
  export default News
  