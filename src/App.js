import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/Nav'
import Home from './components/Home'
import Research from './pages/Research'
import Watchlist from './pages/Watchlist'
import SingleWatchlist from './components/SingleWatchlist'
const finnhub = require('finnhub')
// import finnhub from 'finnhub'

function App() {
  const [quotes, setQuotes] = useState([])
  const [news, setNews] = useState([])
  const [watchlists, setWatchlists] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [users, setUsers] = useState([])
  const [stocks, setStocks] = useState([])

  let noNews = ''

  // const [searchResults, setSearchResults] = useState([])
  // const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  // finnhubClient.quote(`${searchQuery}`, (error, data, response) => {
  //   console.log(data)
  // })

  const getSearchResults = async (e) => {
    e.preventDefault()
    let stockQuote = finnhubClient.quote(
      `${searchQuery}`,
      (error, data, response) => {
        console.log(data)
        let something = data
        setQuotes(something)
      }
    )
    // let dataStuff = stockQuote
    console.log(quotes)
    // setSearchResults(dataStuff)
    // let searchGame = true
    // toggleSearched(searchGame)
    // setSearchQuery('')

    //////////NEWS//////////////

    let companyNews = finnhubClient.companyNews(
      `${searchQuery}`,
      '2020-01-01',
      '2022-09-01',
      (error, data, response) => {
        if (error) {
          console.error(error)
          noNews = 'No news available'
        } else {
          // console.log(data)
          setNews(data)
        }
      }
    )
  }

  const handleChange = (event) => {
    let input = event.target.value
    setSearchQuery(input)
  }
  const changeCase = (event) => {
    event.preventDefault()
    setSearchQuery(event.target.value.toUpperCase())
    console.log(searchQuery)
  }

  /////////WATCHLISTS/////////////

  const getWatchlists = async () => {
    const res = await axios.get(`http://localhost:3001/api/watchlist/watchlist`)
    setWatchlists(res.data)
    console.log(res.data)
  }
  const deleteWatchlist = async (id) => {
    let res = await axios.delete(`http://localhost:3001/api/watchlist/${id}`)
    // getReview()
  }

  /////////STOCKS/////////////
  const getStocks = async () => {
    const res = await axios.get(`http://localhost:3001/api/stock/stock`)
    setStocks(res.data)
    console.log(res.data)
  }
  const deleteStock = async (id) => {
    let res = await axios.delete(`http://localhost:3001/api/stock/${id}`)
    // getReview()
  }
  //////////USERS/////////////////
  const getUsers = async () => {
    const res = await axios.get(`http://localhost:3001/api/user/user`)
    setUsers(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    getWatchlists()
    getStocks()
    getUsers()
  }, [])

  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/research"
            element={
              <Research
                quotes={quotes}
                searchQuery={searchQuery}
                setQuotes={setQuotes}
                handleChange={handleChange}
                getSearchResults={getSearchResults}
                news={news}
                noNews={noNews}
                changeCase={changeCase}
              />
            }
          />
          <Route
            path="/watchlists"
            element={
              <Watchlist
                watchlists={watchlists}
                deleteWatchlist={deleteWatchlist}
                getUsers={getUsers}
                users={users}
                getWatchlists={getWatchlists}
              />
            }
          />
          <Route
            path="/watchlists/:id/:index"
            element={
              <SingleWatchlist
                watchlists={watchlists}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                stocks={stocks}
                deleteStock={deleteStock}
                getStocks={getStocks}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
