class VoteResult extends React.Component {
  constructor() {
    super()
    
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    debugger
    let album = { album_id: this.props.album.id}
    $.ajax({
      url: '/ballots/1/votes',
      method: 'post',
      data: $.param(album)
    })
  }

  render(){
    return(
      <div className="result">
        {this.props.album.title} - {this.props.album.label[0]} ({this.props.album.year})
        <button className="add-btn" onClick={this.handleClick}>Add</button>
      </div>
    )
  }
}
