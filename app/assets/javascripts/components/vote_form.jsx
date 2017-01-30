class VoteForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let query = {
      album: this.refs.data.album.value,
      artist: this.refs.data.artist.value
    }
    let ballotID = this.props.ballotID
    $.ajax({
      url: '/ballots/'+ballotID+'/discog_search',
      method: 'post',
      data: $.param(query)
    })
    .done(function(r) {
      debugger
      this.props.updateResults(r["results"]["results"])
      this.refs.data.album.value = ""
      this.refs.data.artist.value = ""
    }.bind(this))
  }

  render() {
    return (
      <form id="album_search" action="" method="post" onSubmit={this.handleSubmit} ref="data">
        <input type="text" name="album" placeholder="album title" />
        <input type="text" name="artist" placeholder="artist (optional)" />
        <input id="btn" type="submit" value="submit" />
      </form>
    )
  }
}
