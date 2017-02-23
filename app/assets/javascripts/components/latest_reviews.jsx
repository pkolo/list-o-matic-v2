class LatestReviews extends React.Component {
  constructor() {
    super()
  }

  render() {
    let reviews = this.props.reviews
    return (
      <div className="latest-reviews">
        <h3>Recently added reviews:</h3>
        <div className="latest-reviews-container">
          {reviews.map((review, i) =>
            <LatestReview review={review} key={i} />
          )}
        </div>
      </div>
    )
  }
}
