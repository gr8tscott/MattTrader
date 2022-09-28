import React from 'react'

const BasicFinancials = ({ financials }) => {
  console.log(financials)
  if (financials) {
    return (
      <div className="homePage">
        <h1>Financials</h1>
        <div className="financialBoxes">
          <div className="finboxLeft">
            <div>
              <p>Beta: </p>
              <p>{financials['beta']}</p>
            </div>
            <div>
              <p>52 Week Range: </p>
              <p>
                ${financials['52WeekLow']} - ${financials['52WeekHigh']}
              </p>
            </div>
            <div>
              <p>10-Day Avg. Volume: </p>
              <p>{financials['10DayAverageTradingVolume']} million</p>
            </div>
            <div>
              <p>90-Day Avg. Volume: </p>
              <p>{financials['3MonthAverageTradingVolume']} million</p>
            </div>
          </div>
          <div className="finboxRight">
            <div>
              <p>52 Week High: </p>
              <p>${financials['52WeekHigh']}</p>
            </div>
            <div>
              <p>High Date: </p>
              <p>{financials['52WeekHighDate']}</p>
            </div>
            <div>
              <p>52 Week Low: </p>
              <p>${financials['52WeekLow']}</p>
            </div>
            <div>
              <p>Low Date: </p>
              <p>{financials['52WeekLowDate']}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicFinancials
