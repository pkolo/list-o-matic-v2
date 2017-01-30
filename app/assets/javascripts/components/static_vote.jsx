class StaticVote extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="vote row" >
        <div className="rank col-md-1">
          {this.props.vote.rank}
        </div>

        <div className="col-md-10 vote-info">
          <p className="title">{this.props.vote.album_data.artists[0]["name"]} - <i>{this.props.vote.album_data.title}</i></p>
          <p className="other-album-info">{this.props.vote.album_data.year} | {this.props.vote.album_data.labels[0]["name"]}</p>
        </div>
      </div>
    )
  }
}
