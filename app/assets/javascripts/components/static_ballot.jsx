class StaticBallot extends React.Component {
  constructor() {
    super()
  }

  sortedVotes() {
    let votes = _.sortBy(this.props.votes, 'rank')
    return votes
  }

  render() {
    let votes = this.sortedVotes()
    return (
      <div className="static-ballot">
        <h3><a href={"/lists/"+this.props.list.id}>{this.props.list.title}</a> | {this.props.user}</h3>

        <div className="votes-container static">
          {votes.map((vote) =>
            <StaticVote vote={vote} key={vote.id} />
          )}
        </div>
      </div>
    )
  }
}
