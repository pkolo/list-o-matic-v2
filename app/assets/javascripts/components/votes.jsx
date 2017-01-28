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

  sortedVotes() {
    let votes = _.sortBy(this.props.votes, 'rank')
    debugger
  }

  render() {
    let sorted = this.sortedVotes()
    return(
      <div className="votes-container">

      </div>
    )
  }

}
