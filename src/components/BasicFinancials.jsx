import React from 'react'

const BasicFinancials = ({ financials }) => {
  console.log(financials)
  //   let basics = financials.metric
  if (financials) {
    return (
      <div className="homePage">
        <h1>Financials</h1>
        <div>
          <p>52 Week Range:</p>
          <p>
            ${financials['52WeekLow']} - ${financials['52WeekHigh']}
          </p>
        </div>
        <div>
          <p>10-Day Avg. Volume:</p>
          <p>{financials['10DayAverageTradingVolume']} million</p>
        </div>
      </div>
    )
  }
}

export default BasicFinancials
