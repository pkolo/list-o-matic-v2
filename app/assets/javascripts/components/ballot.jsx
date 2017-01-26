class Ballot extends React.Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
    this.getResults = this.getResults.bind(this)
    this.addVote = this.addVote.bind(this)
  }

  componentDidMount() {
    this.setState({
      ballot: this.props.ballot,
      votes: this.props.votes
    })
  }

  addVote(r) {
    this.setState({
      votes: this.state.votes.concat([r])
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
        {this.state.ballot && <Votes votes={this.state.votes} />}
        <VoteForm updateResults={this.getResults}/>
        {this.state.results.length != 0 && <VoteResults albums={this.state.results} voteHelper={this.addVote} />}
      </div>
    )
  }

}
