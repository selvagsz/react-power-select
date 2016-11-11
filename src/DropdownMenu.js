import React, { Component } from 'react'
import OptionContainer from './Option'

const actions = {
  38: 'handleUpArrow',
  40: 'handleDownArrow',
  13: 'handleEnterPress',
  9: 'handleTabPress'
}

export default class DropdownMenu extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      highlightedIndex: -1
    }

    this.handleKeyDown = ::this.handleKeyDown
  }

  componentDidMount() {
    this.refs['power-select-menu'].focus()
  }

  handleDownArrow(highlightedIndex) {
    this.setState({
      highlightedIndex: highlightedIndex < this.props.options.length - 1 ? ++highlightedIndex : 0
    })
  }

  handleUpArrow(highlightedIndex) {
    this.setState({
      highlightedIndex: highlightedIndex > 0 ? --highlightedIndex : this.props.options.length - 1
    })
  }

  handleEnterPress(highlightedIndex) {
    this.selectOption(highlightedIndex)
  }

  handleTabPress(highlightedIndex) {
    this.selectOption(highlightedIndex)
  }

  handleKeyDown(event, highlightedIndex) {
    let action = this[actions[event.which]]
    if (action) {
      action.call(this, highlightedIndex)
    }
  }

  selectOption(highlightedIndex) {
    this.props.onOptionClick(this.props.options[highlightedIndex])
  }

  render() {
    let {
      options,
      onOptionClick,
      selected,
      optionComponent,
      actions,
      beforeOptionsComponent,
      afterOptionsComponent,
      minWidth
    } = this.props

    let BeforeOptionsComponent = beforeOptionsComponent
    let AfterOptionsComponent = afterOptionsComponent

    let { highlightedIndex } = this.state
    highlightedIndex = highlightedIndex !== -1 ? highlightedIndex : options.indexOf(selected)

    return (
      <div
        ref='power-select-menu'
        tabIndex='1'
        className='power-select-menu'
        onKeyDown={(event) => this.handleKeyDown(event, highlightedIndex)}
        style={{
          minWidth: `${minWidth}px`
        }}
      >
        <BeforeOptionsComponent actions={actions} />
        {
          options.map((option, idx) => (
            <OptionContainer
              key={idx}
              option={option}
              optionComponent={optionComponent}
              isHighlighted={highlightedIndex === idx}
              onOptionClick={() => onOptionClick(option)}
            />
          ))
        }
        <AfterOptionsComponent label='+ Add New' />
      </div>
    )
  }
}
