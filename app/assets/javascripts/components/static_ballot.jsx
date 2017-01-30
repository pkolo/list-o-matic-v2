class StaticBallot extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="static-ballot">
        <h3><a href={"/lists/"+this.props.list.id}>{this.props.list.title}</a> | {this.props.user}</h3>

        <StaticVotes votes={this.props.votes} />

      </div>
    )
  }
}
