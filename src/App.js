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
import EditWatchlist from './components/EditWatchlist'
import SingleWatchlist from './components/SingleWatchlist'
// import BASE_URL from './services/api'
import Client from './services/api'
const BASE_URL = 'https://stonks-trader2.herokuapp.com/'
// import Client from './api'
const finnhub = require('finnhub')
// import finnhub from 'finnhub'

function App() {
  const [quotes, setQuotes] = useState({})
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

  const [searchQuery, setSearchQuery] = useState('')

  const api_key = finnhub.ApiClient.instance.authentications['api_key']
  api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
  const finnhubClient = new finnhub.DefaultApi()

  ///////////Portfolio add Stocks Form/////////////

  const [initialPortfolio, setInitialPortfolio] = useState({
    portfolioId: 1,
    ticker: '',
    cost_basis: 0
  })

  const [formPortfolio, setFormPortfolio] = useState(initialPortfolio)

  const portfolioChange = (event) => {
    setFormPortfolio({
      ...formPortfolio,
      [event.target.id]: event.target.value
    })
  }

  const portfolioSubmit = async (event) => {
    event.preventDefault()
    console.log(formPortfolio.cost_basis)

    let res = await axios.post(`${BASE_URL}api/stock/addstock`, formPortfolio)
    setFormPortfolio(initialPortfolio)
    getStocksByPortfolio()
  }

  ///////////MAIN SEARCH RESULTS FUNCTION////////////

  const getSearchResults = async (e) => {
    e.preventDefault()
    let stockQuote = finnhubClient.quote(
      `${searchQuery}`,
      (error, data, response) => {
        console.log(data)
        let something = data
        setQuotes(something)
        setInitialPortfolio({
          ...initialPortfolio,
          ticker: searchQuery,
          cost_basis: something.c
        })
        setFormPortfolio({
          ...initialPortfolio,
          ticker: searchQuery,
          cost_basis: something.c
        })
      }
    )

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
    const res = await axios.get(`${BASE_URL}api/watchlist/watchlist`)
    setWatchlists(res.data)
  }
  const deleteWatchlist = async (id) => {
    let res = await axios.delete(`${BASE_URL}api/watchlist/${id}`)
    getWatchlists()
  }
  const updateWatchlist = async (id) => {
    let res = await axios.put(`${BASE_URL}api/watchlist/${watchlists.id}`)
    getWatchlists()
  }

  /////////STOCKS/////////////
  const getStocks = async () => {
    const res = await axios.get(`${BASE_URL}api/stock/stock`)
    setStocks(res.data)
  }
  const deleteStock = async (id) => {
    let res = await axios.delete(`${BASE_URL}api/stock/${id}`)
    getStocks()
    getStocksByPortfolio()
  }
  const getStocksByWatchlist = async (id) => {
    const res = await axios.get(`${BASE_URL}api/stock/${id}`)
    setStocklists(res.data)
  }
  const getStocksByPortfolio = async () => {
    const res = await axios.get(`${BASE_URL}api/stock/portfolio/1`)
    setPortfolioStocks(res.data)
  }

  /////////PORTFOLIO/////////////
  const getPortfolioByUser = async () => {
    const res = await axios.get(`${BASE_URL}api/portfolio/1`)
    setPortfolios(res.data)
  }
  //////////USERS/////////////////
  const getUsers = async () => {
    const res = await axios.get(`${BASE_URL}api/user/user`)
    setUsers(res.data)
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
                portfolioChange={portfolioChange}
                portfolioSubmit={portfolioSubmit}
                formPortfolio={formPortfolio}
              />
            }
          />
          <Route
            path="/editwatchlists/:id/:index"
            element={
              <EditWatchlist
                watchlists={watchlists}
                setWatchlists={setWatchlists}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
