class ReviewForm extends React.Component {
  constructor() {
    super()

    this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
  }

  handleReviewSubmit(e) {
    e.preventDefault()
    let review = this.refs.data.review.value
    this.props.updateReview(review)
  }

  render() {
    return (
      <div className="review-form">
        <form action="#" onSubmit={this.handleReviewSubmit} ref="data">
          <textarea name="review" ></textarea>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
