class Vote extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="vote">
        {this.props.vote.rank}. {this.props.vote.album_data.artists[0]["name"]} - {this.props.vote.album_data.title}
      </div>
    )
  }
}
