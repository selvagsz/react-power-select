import React, { Component } from 'react'

export default class TypeAheadSelectTrigger extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
    this.handleOnChange = ::this.handleOnChange
    this.handleOnFocus = ::this.handleOnFocus
    this.handleOnBlur = ::this.handleOnBlur
  }

  handleOnChange(event) {
    this.setState({
      value: event.target.value
    })
    this.props.select.open()
  }

  handleOnFocus(event) {
    this.props.select.open()
  }

  handleOnBlur(event) {
    setTimeout(function() {
      this.props.select.close()
    }, 0)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps && nextProps.selectedOption) {
  //     this.setState({
  //       value: nextProps.selectedOption[nextProps.selectedLabel]
  //     })
  //   }
  // }

  render() {
    debugger
    let props = this.props
    let {
      selectedOption,
      selectedLabel,
      placeholder,
      onClick,
      handleOnChange
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
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onKeyDown={this.props.handleKeyDown}
        />
      </div>
    )
  }
}
