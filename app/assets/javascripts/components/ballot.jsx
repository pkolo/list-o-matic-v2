class Ballot extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
      match: []
    }
    this.getResults = this.getResults.bind(this)
    this.addVote = this.addVote.bind(this)
    this.updateVotes = this.updateVotes.bind(this)
    this.deleteVote = this.deleteVote.bind(this)
    this.updateMatch = this.updateMatch.bind(this)
  }

  componentDidMount() {
    this.setState({
      ballot: this.props.ballot,
      votes: this.props.votes
    })
  }

  updateMatch(id) {
    this.setState({
      match: id
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

  getBadMatch() {
    let badMatch = _.map(this.state.votes, 'album_data["id"]')
    return badMatch
  }

  render() {
    return (
      <div className="ballot-container row">

        <div className="col-md-4 vote-form">
          <h4 className="ballot-title">Add an album:</h4>
          <VoteForm updateResults={this.getResults} ballotID={this.props.ballot.id} handleMatch={this.updateMatch} />

          {this.state.results.length != 0 && <VoteResults albums={this.state.results} ballotID={this.state.ballot.id} voteHelper={this.addVote} match={this.state.match} badMatch={this.getBadMatch()}/>}

          {this.state.votes && this.state.votes.length < this.props.list.minimum && <p>You need to add at least {this.props.list.minimum} albums</p>}
        </div>
        <h4>Your ballot for <a href={"/lists/" + this.props.list.id}>{this.props.list.title}</a></h4>
        <div className="col-md-8">
          {this.state.ballot && <Votes votes={this.state.votes} ballotID={this.state.ballot.id} onRankChange={this.updateVotes} handleSortableUpdate={this.updateVotes} handleDelete={this.deleteVote} />}
        </div>

      </div>
    )
  }

}
