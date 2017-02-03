class Review extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="review-container">
        <div className="col-md-1">

        </div>
        <div className="col-md-10 review">
          <ReviewForm createReview={this.props.createReview}/>
        </div>
      </div>
    )
  }
}
