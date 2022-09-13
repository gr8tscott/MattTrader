const QuoteBar = ({ quotes }) => {
  console.log('bar check')
  return (
    <div className="quotebar">
      <table>
        <tr>
          <th>Current Price</th>
          <th>Today's Change</th>
          <th>Today's Open</th>
          <th>Previous Close</th>
          <th>High</th>
          <th>Low</th>
        </tr>
        <tr>
          <td>${quotes.c}</td>
          <div className={quotes.d > 0 ? 'mark-positive' : 'mark-negative'}>
            <td>
              ${quotes.d}/ {quotes.dp}%
            </td>
          </div>
          <td>${quotes.o}</td>
          <td>${quotes.pc}</td>
          <td>${quotes.h}</td>
          <td>${quotes.l}</td>
        </tr>
      </table>
    </div>
  )
}

export default QuoteBar
