class ListResults extends React.Component {
  constructor() {
    super()
  }

  render() {
    let results = this.props.results
    return (
      <div className="list-results-container">
        {results.map( (result, i) =>
          <ListResult result={result} key={result.album_data.id} rank={i+1}/>
        )}
      </div>
    )
  }
}
