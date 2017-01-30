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

  render() {
    let result = this.props.result
    let artists = _.map(result.album_data.artists, 'name')
    let labels = _.map(result.album_data.labels, 'name')
    let voters = this.getVoterLinks()

    return (
      <div className="list-result row">

        <div className="result-rank">
          {this.props.rank}
        </div>

        <div className="result-container">
          <p className="result-title">{_.join(artists, ', ')} - <i>{result.album_data.title}</i></p>
          <p className="result-info">{result.album_data.year} | {_.join(labels, ', ')}</p>
          <p>{result.points} points | {voters}</p>
        </div>
      </div>
    )
  }
}
