class Review extends React.Component {
  constructor() {
    super()
  }

  showReview() {
    if (this.props.review == "") {
      return (
        <ReviewForm createReview={this.props.createReview}/>
      )
    } else {
      return (
        <p>{this.props.review}</p>
      )
    }
  }

  render() {
    return (
      <div className="review-container">
        <div className="col-md-1">

        </div>
        <div className="col-md-10 review">
          {this.showReview()}
        </div>
      </div>
    )
  }
}
