class Votes extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).sortable({
      items: '.vote',
      update: this.props.handleSortableUpdate
    })
  }

  sortedVotes() {
    let votes = _.sortBy(this.props.votes, 'rank')
    return votes
  }

  render() {
    let votes = this.sortedVotes()
    return(
      <div className="votes-container">
        {votes.map((vote) =>
          <Vote vote={vote} ballotID={this.props.ballotID} key={vote.album_data.album_id} handleDelete={this.props.handleDelete} review={this.props.review}/>
        )}
      </div>
    )
  }

}
