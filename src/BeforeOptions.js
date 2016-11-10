import React, { Component } from 'react'

export default class BeforeOptions extends Component {
  componentDidMount() {
    let input = this.refs['before-options-input']
    setTimeout(function() {
      input.focus()
    }, 0)
  }

  render() {
    return (
      <div className='before-options'>
        <input
          ref='before-options-input'
          className='form-control input-sm'
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}
