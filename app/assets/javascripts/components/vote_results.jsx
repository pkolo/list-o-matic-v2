class VoteResults extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div className="results-container">
        {this.props.albums.map( (album) =>
          <VoteResult album={album} key={album.id} ballotID={this.props.ballotID} voteHelper={this.props.voteHelper} match={this.props.match}/>
        )}
      </div>
    )
  }
}
