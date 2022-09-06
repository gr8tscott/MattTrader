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
        // onKeyUp="this.value = this.value.toUpperCase()"
      ></input>
      <button onClick={props.onSubmit}>Submit</button>
      {/* {console.log(props.genres)} */}
    </form>
  )
}

export default Search
