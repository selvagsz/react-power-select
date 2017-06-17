import { Component } from 'react'

export default class MultiSelectSearchInput extends Component {
  state = {
    length: 0
  }

  handleOnChange = (event) => {
    let value = event.target.value
    this.setState({
      length: value.length
    })

    this.props.onChange(event)
  }

  render() {
    let { onChange, ...rest } = this.props
    return (
      <input size={this.state.length + 1} onChange={this.handleOnChange} {...rest} />
    )
  }
}

MultiSelectSearchInput.defaultProps = {
  onChange: () => {}
}
