class VoteResults extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div className="results-container">
        {this.props.albums.map( (album) =>
          <VoteResult album={album} key={album.id}/>
        )}
      </div>
    )
  }
}
