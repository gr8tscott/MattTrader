const Search = (props) => {
  return (
    <form>
      <input
        type="text"
        name="search"
        value={props.value}
        placeholder="Search by Ticker"
        onChange={props.onChange}
        onMouseEnter={props.changeCase}
      ></input>
      <button onClick={props.onSubmit}>Submit</button>
    </form>
  )
}

export default Search
