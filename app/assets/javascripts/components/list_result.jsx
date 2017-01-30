class ListResult extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="list-result">
        {this.props.result.album_data["title"]}
      </div>
    )
  }
}
