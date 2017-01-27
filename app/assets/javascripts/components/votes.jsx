class Votes extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let ballotID = this.props.ballotID
    let rankChange = this.props.onRankChange
    $('.votes-container').sortable({
      update: function() {
        $.ajax({
          url: '/ballots/'+ballotID+'/sort_votes',
          method: 'post',
          data: $('.votes-container').sortable('serialize')
        })
        .done(function(r) {
          console.log(r)
        })
      }
    })
  }

  render() {
    return(
      <div className="votes-container">
        {this.props.votes.map( (vote, i) =>
          <Vote vote={vote} key={vote.album_data.id} />
        )}
      </div>
    )
  }

}
