class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      formValue: ""
    }

    this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      formValue: this.props.review
    })
  }

  handleReviewSubmit(e) {
    e.preventDefault()
    let review = this.state.formValue
    this.props.updateReview(review)
  }

  handleChange(e) {
    this.setState({
      formValue: e.target.value
    })
  }

  render() {
    let formValue = this.state.formValue
    return (
      <div className="review-form">
        <form action="#" onSubmit={this.handleReviewSubmit} >
          <textarea value={formValue} onChange={this.handleChange} name="review" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
