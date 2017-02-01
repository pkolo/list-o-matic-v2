class VoteResult extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.isBadMatch - this.isBadMatch.bind(this)
  }

  handleClick(e) {
    let album = { album_id: this.props.album.id }
    $.ajax({
      url: '/ballots/'+this.props.ballotID+'/votes',
      method: 'post',
      data: $.param(album)
    })
    .done(function(r) {
      this.props.voteHelper(r)
    }.bind(this))
    .error(function(e) {
    })
  }

  isBadMatch() {
    return _.includes(this.props.badMatch, this.props.album.id)
  }

  render(){

    let resultClass = ""

    if (this.isBadMatch()) {
      resultClass = "result bad-match"
    }
    else if (this.props.match[0] == this.props.album.id) {
      resultClass = "result match"
    } else {
      resultClass = "result"
    }

    return(
      <div className={resultClass}>
        <p>{this.props.album.title} ({this.props.album.year})</p>
        <p>{this.props.album.label[0]} / {this.props.album.country} /
        <button className="add-btn" onClick={this.handleClick}>+ Add album</button></p>
      </div>
    )
  }
}
