class LatestReview extends React.Component {
  constructor() {
    super()
  }

  render() {
    let review = this.props.review
    return (
      <div className="ListResult">
        <p>"{review.review}" - <a href={"/ballots/"+review.ballot_id}>{review.username}</a> on {review.artist} - {review.title}</p>
      </div>
    )
  }
}
