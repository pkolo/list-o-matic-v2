class Votes extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let ballotID = this.props.ballotID
    $('.votes-container').sortable({
      update: function() {
        $.post('/ballots/'+ballotID+'/sort_votes', $('.votes-container').sortable('serialize'))
      }
    })
  }

  render() {
    return(
      <div className="votes-container">
        {this.props.votes.map( (vote) =>
          <Vote vote={vote} key={vote.album_data.id} />
        )}
      </div>
    )
  }

}
