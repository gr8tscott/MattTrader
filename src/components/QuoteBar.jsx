const QuoteBar = ({ quotes }) => {
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
          <td>
            ${quotes.d}/{quotes.dp}%
          </td>
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
