class StaticVotes extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="votes-container static">
        {this.props.votes.map((vote) =>
          <StaticVote vote={vote} key={vote.id} />
        )}
      </div>
    )
  }
}
