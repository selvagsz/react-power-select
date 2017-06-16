import React, { Component } from 'react'

export default class SelectTrigger extends Component {
  state = {}

  componentWillMount() {
    let value = this.getValueFromSelectedOption(this.props)
    this.setState({ value })
  }

  componentWillReceiveProps(nextProps) {
    let value = nextProps.searchTerm !== null ? nextProps.searchTerm : this.getValueFromSelectedOption(nextProps)
    this.setState({
      value
    })
  }

  getValueFromSelectedOption(props = this.props) {
    let { selectedOption, optionLabelPath } = props
    let value = ''

    if (selectedOption) {
      if (typeof selectedOption === 'string') {
        value = selectedOption
      } else if(optionLabelPath) {
        value = selectedOption[optionLabelPath]
      }
    }

    return value
  }

  render() {
    let {
      placeholder,
      disabled,
      onClick,
      handleOnChange,
      handleKeyDown,
      handleOnFocus,
      handleOnBlur,
    } = this.props

    return (
      <div
        className='powerselect__trigger'
        onClick={onClick}
      >
        <input
          className='powerselect__trigger-input'
          autoComplete='off'
          spellCheck='false'
          placeholder={placeholder}
          value={this.state.value}
          disabled={disabled}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <span
          className='powerselect__trigger-status'
        ></span>
      </div>
    )
  }
}
