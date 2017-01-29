class Ballot extends React.Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
    this.getResults = this.getResults.bind(this)
    this.addVote = this.addVote.bind(this)
    this.updateVotes = this.updateVotes.bind(this)
    this.deleteVote = this.deleteVote.bind(this)
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

  updateUponDeletion() {
    let newVotes = _.clone(this.state.votes, true)
    newVotes = _.sortBy(newVotes, 'rank')

    let $node = $('.votes-container')
    let ballotID = this.state.ballot.id
    let ids = _.map(newVotes, 'id')

    ids.forEach((id, index) => {
      let vote = _.find(newVotes, {id: id})
      vote.rank = index + 1
    })

    let serializedVotes = _(ids)
      .map(n => "vote[]="+n)
      .join('&')

    this.setState({
      votes: newVotes
    })

    $.ajax({
      url: '/ballots/'+ballotID+'/sort_votes',
      method: 'post',
      data: serializedVotes
    })
  }

  deleteVote(vote) {
    let ballotID = this.state.ballot.id
    let voteID = vote.id

    $.ajax({
      url: '/ballots/'+ballotID+'/votes/'+voteID,
      method: 'delete'
    })
    .done(function(r) {
    })

    index = this.state.votes.indexOf(vote)
    let newVotes = this.state.votes
    newVotes.splice(index, 1)

    $('.votes-container').remove('#vote_'+voteID)

    this.setState(
      {
        votes: _.sortBy(newVotes, 'rank')
      },
      this.updateUponDeletion
    )
  }

  getResults(results) {
    this.setState({
      results: results
    })
  }

  render() {
    return (
      <div className="ballot-container row">

        <div className="col-md-4">
          <VoteForm updateResults={this.getResults}/>

          {this.state.results.length != 0 && <VoteResults albums={this.state.results} ballotID={this.state.ballot.id} voteHelper={this.addVote} />}
        </div>

        <div className="col-md-8">
          {this.state.ballot && <Votes votes={this.state.votes} ballotID={this.state.ballot.id} onRankChange={this.updateVotes} handleSortableUpdate={this.updateVotes} handleDelete={this.deleteVote} />}
        </div>

      </div>
    )
  }

}
