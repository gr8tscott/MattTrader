import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/Nav'
import Home from './components/Home'
import Research from './pages/Research'
const finnhub = require('finnhub')
// import finnhub from 'finnhub'

function App() {
  const [quotes, setQuotes] = useState([])
  const [news, setNews] = useState()

  const [searchResults, setSearchResults] = useState([])
  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const api_key = finnhub.ApiClient.instance.authentications['api_key']

  const finnhubClient = new finnhub.DefaultApi()

  // finnhubClient.quote(`${searchQuery}`, (error, data, response) => {
  //   console.log(data)
  // })

  const getSearchResults = async (e) => {
    e.preventDefault()
    // let waffles = await axios.get(
    //   `https://api.rawg.io/api/games?search=${searchQuery}&key=${process.env.REACT_APP_RAWG_KEY}`
    // )
    let stockQuote = finnhubClient.quote(
      `${searchQuery}`,
      (error, data, response) => {
        console.log(data)
        let something = data
        setQuotes(something)
      }
    )
    let dataStuff = stockQuote
    console.log(quotes)
    setSearchResults(dataStuff)
    let searchGame = true
    toggleSearched(searchGame)
    // setSearchQuery('')
  }

  const handleChange = (event) => {
    let input = event.target.value
    setSearchQuery(input)
  }

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
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
