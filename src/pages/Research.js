import React from 'react'
import Search from '../components/Search'
import QuoteBar from '../components/QuoteBar'
import News from '../components/News'
import BasicFinancials from '../components/BasicFinancials'
import Chart from '../components/Chart'
import { useState, useEffect } from 'react'
const finnhub = require('finnhub')

const Research = ({
  getSearchResults,
  handleChange,
  quotes,
  searchQuery,
  news,
  noNews,
  changeCase,
  financials,
  charts
}) => {
  return (
    <div className="homePage">
      <h1>Research</h1>
      <Search
        onChange={handleChange}
        onSubmit={getSearchResults}
        changeCase={changeCase}
      />
      <h3>{searchQuery}</h3>
      <QuoteBar quotes={quotes} />
      <Chart charts={charts} />
      <BasicFinancials financials={financials.metric} />
      <News searchQuery={searchQuery} news={news} noNews={noNews} />
    </div>
  )
}

export default Research
