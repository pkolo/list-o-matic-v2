class Vote extends React.Component {
  constructor() {
    super()
    this.state = ({
      showDelete: false,
      showReview: false
    })
    this.handleHover = this.handleHover.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleReviewClick = this.handleReviewClick.bind(this)
    this.addReview = this.addReview.bind(this)
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

  handleReviewClick(e) {
    if (this.state.showReview) {
      this.setState ({
        showReview: false
      })
    } else {
      this.setState ({
        showReview: true
      })
    }
  }

  addReview(review) {
    let ballotID = this.props.ballotID
    let voteID = this.props.vote.id
    let params = { review: review }
    $.ajax({
      url: '/ballots/'+ballotID+'/votes/'+voteID,
      method: 'put',
      data: params
    })
    .done(function(r) {
      console.log("updated!")
    })
  }

  render() {
    let voteID = "vote_" + this.props.vote.id
    return (
      <div className="vote" data-id={this.props.vote.id} id={voteID} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} >
        <div className="row">
          <div className="rank col-md-1">
            {this.props.vote.rank}
          </div>

          <div className="col-md-10 vote-info">
            <p className="title">{this.props.vote.album_data.artist} - {this.props.vote.album_data.title}</p>
            <p className="other-album-info">{this.props.vote.album_data.year} | {this.props.vote.album_data.label}</p>
          </div>

          <div className="delete-btn">
            {this.state.showDelete && <button onClick={this.handleClick}>x</button>}
          </div>

          <div className="review-btn">
            <button onClick={this.handleReviewClick}>+review</button>
          </div>
        </div>

        <div className="row">
          {this.state.showReview && <Review createReview={this.addReview} review={this.props.vote.review}/>}
        </div>
      </div>
    )
  }
}
