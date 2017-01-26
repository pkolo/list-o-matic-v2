class Votes extends React.Component {

  render() {
    return(
      <div className="votes-container">
        {this.props.votes.map( (vote) =>
          <Vote vote={vote.album_data} key={vote.album_data.id} />
        )}
      </div>
    )
  }

}
