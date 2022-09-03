const QuoteBar = ({quotes}) => {
    return (
      <div className="quotebar">
        <h4>Current Price</h4>
        <h3>${quotes.c}</h3>
        <h4>Today's Change</h4>
        <h3>${quotes.d}/{quotes.dp}%</h3>

        <h4>Today's Open</h4>
        <h3>${quotes.o}</h3>
        <h4>Previous Close</h4>
        <h3>${quotes.pc}</h3>

        <h4>High</h4>
        <h3>${quotes.h}</h3>
        <h4>Low</h4>
        <h3>${quotes.l}</h3>
      </div>
    )
  }
  
  export default QuoteBar
  