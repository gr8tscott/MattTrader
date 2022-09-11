const BasicFinancials = ({ financials }) => {
  console.log(financials)
  //   let basics = financials.metric
  return (
    <div className="homePage">
      <h1>Financials</h1>
      {/* {basics.map((basic) => (
        <h3>{basic.freeCashFlowTTM}</h3>
      ))} */}

      {/* <h2>{noNews}</h2>
      {news.slice(0, 5).map((theNews) => {
        return (
          <div>
            <img src={theNews.image} />
            <h3>{theNews.headline}</h3>
            <p>{theNews.summary}</p>
          </div>
        )
      })} */}
    </div>
  )
}

export default BasicFinancials
