import React from 'react'

const BasicFinancials = ({ financials }) => {
  console.log(financials)
  //   let basics = financials.metric
  if (financials) {
    return (
      <div className="homePage">
        <div className="financialBoxes">
          <h1>Financials</h1>
          <div>
            <p>Beta:</p>
            <p>{financials['beta']}</p>
          </div>
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
          <div>
            <p>90-Day Avg. Volume:</p>
            <p>{financials['3MonthAverageTradingVolume']} million</p>
          </div>
        </div>
        {/* <div>
          <h3>Dividends</h3>
          <div>
            <p>90-Day Avg. Volume:</p>
            <p>{financials['3MonthAverageTradingVolume']} million</p>
          </div>
        </div> */}
      </div>
    )
  }
}

export default BasicFinancials
