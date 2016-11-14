import React, { Component } from 'react'
import OptionContainer from './Option'

const actions = {
  38: 'handleUpArrow',
  40: 'handleDownArrow',
  13: 'handleEnterPress',
  9: 'handleTabPress'
}

export default class DropdownMenu extends Component {
  render() {
    let {
      options,
      onOptionClick,
      handleKeyDown,
      selected,
      optionComponent,
      select,
      minWidth,
      highlightedIndex
    } = this.props

    let BeforeOptionsComponent = this.props.beforeOptionsComponent
    let AfterOptionsComponent = this.props.afterOptionsComponent

    return (
      <div
        tabIndex='1'
        className='power-select-menu'
        onKeyDown={(event) => handleKeyDown(event, highlightedIndex)}
        style={{
          minWidth: `${minWidth}px`
        }}
      >
        {BeforeOptionsComponent && <BeforeOptionsComponent select={select} />}
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
        {AfterOptionsComponent && <AfterOptionsComponent select={select} />}
      </div>
    )
  }
}
