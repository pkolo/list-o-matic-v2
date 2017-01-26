class Vote extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="vote">
        {this.props.vote.artists[0]["name"]} - {this.props.vote.title}
      </div>
    )
  }
}
