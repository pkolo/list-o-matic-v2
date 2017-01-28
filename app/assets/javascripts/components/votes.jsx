class Votes extends React.Component {
  constructor() {
    super()
    this.state = ({
      votes: []
    })
    this.handleSortableUpdate = this.handleSortableUpdate.bind(this)
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).sortable({
      items: '.vote',
      update: this.handleSortableUpdate
    })

    this.setState({
      votes: this.props.votes
    })
  }

  handleSortableUpdate() {
    var newVotes = _.clone(this.state.votes, true)
    var $node = $(ReactDOM.findDOMNode(this))

    var ids = $node.sortable('toArray', {attribute: 'data-id'})

    ids.forEach((id, index) => {
      var vote = _.find(newVotes, {id: parseInt(id)})
      vote.rank = index + 1
    })

    $node.sortable('cancel')

    this.setState({
      votes: newVotes
    })
  }

  sortedVotes() {
    let votes = _.sortBy(this.state.votes, 'rank')
    return votes
  }

  render() {
    let votes = this.sortedVotes()
    return(
      <div className="votes-container">
        {votes.map((vote) =>
          <Vote vote={vote} key={vote.id} />
        )}
      </div>
    )
  }

}
