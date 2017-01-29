class Vote extends React.Component {
  constructor() {
    super()
    this.state = ({
      showDelete: false
    })
    this.handleHover = this.handleHover.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleHover() {
    if (this.state.showDelete) {
      this.setState({
        showDelete: false
      })
    } else {
      this.setState({
        showDelete: true
      })
    }
  }

  handleClick(e) {
    let vote = this.props.vote
    this.props.handleDelete(vote)
  }

  render() {
    let voteID = "vote_" + this.props.vote.id
    return (
      <div className="vote row" data-id={this.props.vote.id} id={voteID} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} >
        <div className="rank col-md-1">
          {this.props.vote.rank}
        </div>

        <div className="col-md-10 vote-info">
          <p className="title">{this.props.vote.album_data.artists[0]["name"]} - {this.props.vote.album_data.title}</p>
          <p className="other-album-info">{this.props.vote.album_data.year} | {this.props.vote.album_data.labels[0]["name"]}</p>
        </div>

        <div className="delete-btn">
          {this.state.showDelete && <button onClick={this.handleClick}>x</button>}
        </div>
      </div>
    )
  }
}
