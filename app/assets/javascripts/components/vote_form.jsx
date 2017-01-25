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
    $.ajax({
      url: '/discog_search',
      method: 'post',
      data: $.param(query)
    })
    .done(function(r) {
      this.props.updateResults(r["results"])
    }.bind(this))
  }

  render() {
    return (
      <form id="album_search" action="/discog_search" method="post" onSubmit={this.handleSubmit} ref="data">
        <input type="text" name="artist" placeholder="artist" />
        <input type="text" name="album" placeholder="album" />
        <input id="btn" type="submit" value="submit" />
      </form>
    )
  }
}
