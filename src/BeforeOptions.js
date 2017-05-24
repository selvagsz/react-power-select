import React, { Component } from 'react'

export default class BeforeOptions extends Component {
  componentDidMount() {
    let input = this.refs['before-options-input']
    setTimeout(function() {
      input.focus()
    }, 0)
  }

  componentWillMount() {
    let searchTerm = this.props.searchTerm
    if (searchTerm !== undefined) {
      this.props.select.search(searchTerm)
    }
  }

  render() {
    let props = this.props
    return (
      <div className='powerselect__before-options'>
        <input
          ref='before-options-input'
          className='powerselect__search-input'
          placeholder={this.props.searchPlaceholder}
          onChange={(e) => props.select.search(e.target.value)}
        />
      </div>
    )
  }
}
