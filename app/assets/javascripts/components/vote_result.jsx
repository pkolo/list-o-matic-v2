class VoteResult extends React.Component {
  constructor() {
    super()
  }

  render(){
    return(
      <div className="result">
        {this.props.album.title} - {this.props.album.label[0]} ({this.props.album.year})
      </div>
    )
  }
}
