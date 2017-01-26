class Votes extends React.Component {

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
