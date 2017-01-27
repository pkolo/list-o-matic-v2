class Ballot extends React.Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
    this.getResults = this.getResults.bind(this)
    this.addVote = this.addVote.bind(this)
    this.updateVotes = this.updateVotes.bind(this)
  }

  componentDidMount() {
    this.setState({
      ballot: this.props.ballot,
      votes: this.props.votes
    })
  }

  updateVotes(r) {
    this.setState({
      votes: r
    })
    debugger
  }

  addVote(r) {
    this.setState({
      votes: this.state.votes.concat([r]),
      results: []
    })
  }

  getResults(results) {
    this.setState({
      results: results
    })
  }

  render() {
    return (
      <div className="ballot-container">
        {this.state.ballot && <Votes votes={this.state.votes} ballotID={this.state.ballot.id} onRankChange={this.updateVotes} />}
        <VoteForm updateResults={this.getResults}/>
        {this.state.results.length != 0 && <VoteResults albums={this.state.results} ballotID={this.state.ballot.id} voteHelper={this.addVote} />}
      </div>
    )
  }

}
