class ListResult extends React.Component {
  constructor() {
    super()
  }

  getVoterLinks() {
    let voters = this.props.result.voters.map( (voter) =>
      <a href={"/ballots/"+voter.ballot_id} key={voter.ballot_id}>{voter.username} </a>
    )
    return (
      voters
    )
  }

  getReviews() {
    let reviews = this.props.result.reviews.map( (review) =>
      <div className="review" key={review.ballot_id}>
        {review.review} - <a href={"/ballots/"+review.ballot_id} key={review.ballot_id}>{review.username}</a>
      </div>
    )
    return (
      reviews
    )
  }

  render() {
    let result = this.props.result
    let voters = this.getVoterLinks()
    let reviews = this.getReviews()

    return (
      <div className="list-result row">

        <div className="result-rank">
          {this.props.rank}
        </div>

        <div className="result-container">
          <p className="result-title">{result.album_data.artist} - <i>{result.album_data.title}</i></p>
          <p className="result-info">{result.album_data.year} | {result.album_data.label}</p>
          <p>{result.points} points | {voters}</p>
          <div className="reviews">
            {reviews}
          </div>
        </div>
      </div>
    )
  }
}
