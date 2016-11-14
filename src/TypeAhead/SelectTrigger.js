import React, { Component } from 'react'

export default class TypeAheadSelectTrigger extends Component {
  constructor() {
    super(...arguments)
    this.handleOnFocus = ::this.handleOnFocus
    this.handleOnBlur = ::this.handleOnBlur
  }

  handleOnFocus(event) {
    this.props.select.open()
  }

  handleOnBlur(event) {
    setTimeout(function() {
      this.props.select.close()
    }, 0)
  }

  render() {
    let props = this.props
    let {
      selectedOption,
      selectedLabel,
      placeholder,
      onClick,
      handleOnChange,
      handleKeyDown
    } = props

    let value = this.props.triggerInputText
    if (value === null) {
      value = selectedOption ? selectedOption[selectedLabel] : ''
    }

    return (
      <div className='trigger'>
        <input
          className='typeahead--trigger'
          autoComplete='off'
          spellCheck='false'
          placeholder={props.placeholder}
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
        />
      </div>
    )
  }
}
