class Vote extends React.Component {
  constructor() {
    super()
  }

  render() {
    let voteID = "vote_" + this.props.vote.id
    return (
      <div className="vote" data-id={this.props.vote.id} id={voteID} >
        {this.props.vote.rank}. {this.props.vote.album_data.artists[0]["name"]} - {this.props.vote.album_data.title}
      </div>
    )
  }
}
