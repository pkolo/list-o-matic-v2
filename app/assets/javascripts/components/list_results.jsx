class ListResults extends React.Component {
  constructor() {
    super()
  }

  render() {
    let results = this.props.results
    return (
      <div className="lit-results-container">
        {results.map( (result) =>
          <ListResult result={result} />
        )}
      </div>
    )
  }
}
