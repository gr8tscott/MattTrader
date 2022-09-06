import React from 'react'
import Search from '../components/Search'
import QuoteBar from '../components/QuoteBar'
import News from '../components/News'
import { useState, useEffect } from 'react'
const finnhub = require('finnhub')

const Research = ({
  getSearchResults,
  handleChange,
  quotes,
  searchQuery,
  news,
  noNews
}) => {
  //   console.log(news)
  return (
    <div className="homePage">
      <h1>Research</h1>
      <Search onChange={handleChange} onSubmit={getSearchResults} />
      <QuoteBar quotes={quotes} />
      <News searchQuery={searchQuery} news={news} noNews={noNews} />
    </div>
  )
}

export default Research
