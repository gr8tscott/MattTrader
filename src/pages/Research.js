import React from 'react'
import Search from '../components/Search'
import QuoteBar from '../components/QuoteBar'
import News from '../components/News'

const Research = ({ getSearchResults, handleChange, quotes, searchQuery }) => {
  return (
    <div className="homePage">
      <h1>Research</h1>
      <Search onChange={handleChange} onSubmit={getSearchResults} />
      <QuoteBar quotes={quotes} />
      <News searchQuery={searchQuery} />
    </div>
  )
}

export default Research
