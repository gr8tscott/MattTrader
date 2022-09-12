import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/Nav'
import Home from './components/Home'
import Research from './pages/Research'
import Watchlist from './pages/Watchlist'
import Portfolio from './pages/Portfolio'
import SingleWatchlist from './components/SingleWatchlist'
// import Client from './api'
const finnhub = require('finnhub')
// import finnhub from 'finnhub'

function App() {
  const [quotes, setQuotes] = useState([])
  const [news, setNews] = useState([])
  const [financials, setFinancials] = useState([])
  const [charts, setCharts] = useState([])
  const [watchlists, setWatchlists] = useState([])
  const [stocklists, setStocklists] = useState([])
  const [portfolios, setPortfolios] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])
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
    // setFormState()
    // setSearchResults(dataStuff)
    // let searchGame = true
    // toggleSearched(searchGame)
    // setSearchQuery('')

    //////////NEWS//////////////

    let companyNews = finnhubClient.companyNews(
      `${searchQuery}`,
      '2020-01-01',
      '2022-09-11',
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

    //////////BASIC FINANCIALS//////////////

    let basicFinancials = finnhubClient.companyBasicFinancials(
      `${searchQuery}`,
      'margin',
      (error, data, response) => {
        let something = data
        setFinancials(something)
      }
    )

    //////////Chart//////////////

    let chart = finnhubClient.stockCandles(
      `${searchQuery}`,
      'D',
      1590988249,
      1591852249,
      (error, data, response) => {
        let something = data
        setCharts(something)
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
    getWatchlists()
  }
  const updateWatchlist = async (id) => {
    let res = await axios.put(
      `http://localhost:3001/api/watchlist/${watchlists.id}`
    )
    getWatchlists()
  }

  /////////STOCKS/////////////
  const getStocks = async () => {
    const res = await axios.get(`http://localhost:3001/api/stock/stock`)
    setStocks(res.data)
    console.log(res.data)
  }
  const deleteStock = async (id) => {
    let res = await axios.delete(`http://localhost:3001/api/stock/${id}`)
    getStocks()
    getStocksByPortfolio()
  }
  const getStocksByWatchlist = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/stock/${id}`)
    setStocklists(res.data)
    console.log(res.data)
  }
  const getStocksByPortfolio = async () => {
    const res = await axios.get(`http://localhost:3001/api/stock/portfolio/1`)
    setPortfolioStocks(res.data)
    console.log(res.data)
  }

  /////////PORTFOLIO/////////////
  const getPortfolioByUser = async () => {
    const res = await axios.get(`http://localhost:3001/api/portfolio/1`)
    setPortfolios(res.data)
    console.log(res.data)
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
    getPortfolioByUser()
    getStocksByPortfolio()
  }, [])

  return (
    <div className="App">
      <header className="nav">
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
                financials={financials}
                charts={charts}
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
                updateWatchlist={updateWatchlist}
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
                getStocksByWatchlist={getStocksByWatchlist}
                updateWatchlist={updateWatchlist}
                getWatchlists={getWatchlists}
              />
            }
          />
          <Route
            path="/portfolio"
            element={
              <Portfolio
                portfolios={portfolios}
                getStocksByPortfolio={getStocksByPortfolio}
                portfolioStocks={portfolioStocks}
                deleteStock={deleteStock}
                quotes={quotes}
                searchQuery={searchQuery}
                onChange={handleChange}
                getSearchResults={getSearchResults}
                changeCase={changeCase}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
