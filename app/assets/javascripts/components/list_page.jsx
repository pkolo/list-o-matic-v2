class ListPage extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <h1>{this.props.list_data.title}</h1>
    )
  }
}
