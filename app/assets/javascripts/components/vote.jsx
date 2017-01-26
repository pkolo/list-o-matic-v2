class Vote extends React.Component {
  constructor() {
    super()
    this.state = {
      albumInfo: []
    }

    this.getAlbumData = this.getAlbumData.bind(this)
  }

  getAlbumData() {

  }

  componentDidMount() {
    this.setState({
      albumInfo: this.getAlbumData()
    })
  }

  render() {
    return (
      <div className="vote">
        {this.props.vote.rank}
      </div>
    )
  }
}
