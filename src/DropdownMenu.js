import React, { Component } from 'react'
import OptionContainer from './Option'
import SearchInput from './SearchInput'

export default class DropdownMenu extends Component {
  componentWillReceiveProps(nextProps) {
    this.scrollTo(nextProps.highlightedIndex)
  }

  componentDidMount() {
    this.optionsListOffsetHeight = this.optionsList.offsetHeight
    this.optionOffsetHeight = document.querySelector('.powerselect__option').offsetHeight
    this.scrollTo(this.props.highlightedIndex)
  }

  scrollTo(newHighlightedIndex) {
    let optionOffsetHeight = this.optionOffsetHeight
    let delta = (optionOffsetHeight * newHighlightedIndex + optionOffsetHeight) - this.optionsListOffsetHeight

    if (delta > 0) {
      this.optionsList.scrollTop = delta
    } else {
      this.optionsList.scrollTop = 0
    }
  }

  render() {
    let {
      options,
      onOptionClick,
      handleKeyDown,
      selected,
      searchEnabled,
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
        className='powerselect__menu'
        onKeyDown={(event) => handleKeyDown(event, highlightedIndex)}
        style={{
          minWidth: `${minWidth}px`
        }}
      >
        {BeforeOptionsComponent && <BeforeOptionsComponent select={select} />}
        {
          searchEnabled &&
            <div className="powerselect__search-input-container">
              <SearchInput select={select} />
            </div>
        }
        <div className='powerselect__options' ref={(optionsList) => this.optionsList = optionsList}>
          {
            options.map((option, idx) => (
              <OptionContainer
                key={idx}
                option={option}
                select={select}
                optionComponent={optionComponent}
                isHighlighted={highlightedIndex === idx}
                onOptionClick={() => {
                  onOptionClick(idx, option)}
                }
              />
            ))
          }
        </div>
        {AfterOptionsComponent && <AfterOptionsComponent select={select} />}
      </div>
    )
  }
}
