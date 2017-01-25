class Ballot extends React.Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
    this.getResults = this.getResults.bind(this)
  }

  getResults(results) {
    this.setState({
      results: results
    })
    debugger
  }

  render() {
    return (
      <div className="ballot-container">
        <Votes />
        <VoteForm updateResults={this.getResults}/>
        {this.state.results.length != 0 && <VoteResults />}
      </div>
    )
  }

}
