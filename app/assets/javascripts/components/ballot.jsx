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

  updateVotes() {
    let newVotes = _.clone(this.state.votes, true)
    let $node = $('.votes-container')
    let ballotID = this.state.ballot.id

    let ids = $node.sortable('toArray', {attribute: 'data-id'})

    ids.forEach((id, index) => {
      let vote = _.find(newVotes, {id: parseInt(id)})
      vote.rank = index + 1
    })

    $node.sortable('cancel')

    this.setState({
      votes: newVotes
    })

    $.ajax({
      url: '/ballots/'+ballotID+'/sort_votes',
      method: 'post',
      data: $node.sortable('serialize')
    })
  }

  addVote(r) {
    this.setState({
      votes: this.state.votes.concat([r]),
      results: []
    })
  }

  deleteVote(vote) {
    console.log("hello from "+vote.album_data.title)
  }

  getResults(results) {
    this.setState({
      results: results
    })
  }

  render() {
    return (
      <div className="ballot-container">
        {this.state.ballot && <Votes votes={this.state.votes} ballotID={this.state.ballot.id} onRankChange={this.updateVotes} handleSortableUpdate={this.updateVotes} handleDelete={this.deleteVote} />}
        <VoteForm updateResults={this.getResults}/>
        {this.state.results.length != 0 && <VoteResults albums={this.state.results} ballotID={this.state.ballot.id} voteHelper={this.addVote} />}
      </div>
    )
  }

}
