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
      <div className="vote" data-id={this.props.vote.id} id={voteID} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} >
        <p>
          {this.props.vote.rank}. {this.props.vote.album_data.artists[0]["name"]} - {this.props.vote.album_data.title}
        </p>
          {this.state.showDelete && <button className="delete-btn" onClick={this.handleClick}>x</button>}
      </div>
    )
  }
}
