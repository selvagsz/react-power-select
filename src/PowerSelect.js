import React, { Component, PropTypes } from 'react'
import Dropdown from './Dropdown'
import SelectTrigger from './SelectTrigger'
import DropdownMenu from './DropdownMenu'
import SelectedOption from './SelectedOption'
import BeforeOptions from './BeforeOptions'
import AfterOptions from './AfterOptions'
import { matcher } from './utils'

const KEYCODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  TAB: 9
}

const actions = {
  38: 'handleUpArrow',
  40: 'handleDownArrow',
  13: 'handleEnterPress',
  9: 'handleTabPress'
}

export default class PowerSelect extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      highlightedIndex: -1,
      isOpen: false,
      filteredOptions: null,
      triggerInputText: null
    }

    this.open = ::this.open
    this.close = ::this.close
    this.toggle = ::this.toggle
    this.selectOption = ::this.selectOption
    this.handleKeyDown = ::this.handleKeyDown
    this.handleTriggerChange = ::this.handleTriggerChange
  }

  handleTriggerChange(event) {
    let value = event.target.value
    this.setState({
      triggerInputText: value
    })
    this.search(value)
    this.open()
  }

  handleDownArrow(index) {
    let options = this.state.filteredOptions || this.props.options
    let highlightedIndex = index < options.length - 1 ? ++index : 0
    this.highlightOption(highlightedIndex)
  }

  handleUpArrow(index) {
    let options = this.state.filteredOptions || this.props.options
    let highlightedIndex = index > 0 ? --index : options.length - 1
    this.highlightOption(highlightedIndex)
  }

  handleEnterPress(highlightedIndex) {
    this.selectOption(highlightedIndex)
  }

  handleTabPress(highlightedIndex) {
    this.selectOption(highlightedIndex)
  }

  handleKeyDown(event, highlightedIndex) {
    let keyCode = event.which
    let action = this[actions[keyCode]]
    if (action) {
      if ((keyCode === KEYCODES.UP_ARROW || keyCode === KEYCODES.DOWN_ARROW) && !this.state.isOpen) {
        this.open()
        return
      }

      action.call(this, highlightedIndex)
    }
  }

  highlightOption(highlightedIndex) {
    this.setState({
      highlightedIndex
    })
  }

  selectOption(highlightedIndex, option) {
    let options = this.state.filteredOptions || this.props.options
    let selectedOption = option || options[highlightedIndex]
    this.highlightOption(highlightedIndex)

    this.setState({
      triggerInputText: null
    })
    this.props.onChange(selectedOption, this.select)
    this.close()
  }

  open() {
    this.setState({
      isOpen: true
    })
  }

  close() {
    this.setState({
      isOpen: false
    })
  }

  toggle() {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  handleEscapePress(event) {
    if (event.which === 27) {
      this.close()
    }
  }

  handleDocumentClick(event) {
    let $target = event.target
    if (!($target.closest('.power-select') || $target.closest('.power-select-menu'))) {
      this.close()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', ::this.handleEscapePress)
    document.addEventListener('click', ::this.handleDocumentClick)
  }

  componentWillUnMount() {
    document.removeEventListener('keydown', this.handleEscapePress)
    document.removeEventListener('click', this.handleDocumentClick)
  }

  search(searchTerm) {
    let { options, searchIndices } = this.props
    let filteredOptions = options.filter((option) => {
      return this.props.matcher({
        option,
        searchTerm,
        searchIndices
      })
    })
    this.setState({
      filteredOptions
    })
  }

  get select() {
    return {
      open: ::this.open,
      close: ::this.close,
      toggle: ::this.toggle,
      search: ::this.search,
      searchTerm: this.state.triggerInputText
    }
  }

  render() {
    let {
      options,
      selected,
      selectedLabel,
      placeholder,
      optionComponent,
      selectedOptionComponent,
      beforeOptionsComponent,
      afterOptionsComponent
    } = this.props

    let { isOpen } = this.state
    let filteredOptions = this.state.filteredOptions || options
    let SelectTrigger = this.props.selectTriggerComponent

    let { highlightedIndex } = this.state
    highlightedIndex = highlightedIndex !== -1 ? highlightedIndex : options.indexOf(selected)

    return (
      <Dropdown>
        <div
          ref='power-select-trigger-container'
          className={`power-select ${isOpen ? 'open' : ''}`}
        >
          <SelectTrigger
            selectedOption={selected}
            selectedLabel={selectedLabel}
            selectedOptionComponent={selectedOptionComponent}
            placeholder={placeholder}
            handleKeyDown={(event) => {
              this.handleKeyDown(event, highlightedIndex)
            }}
            triggerInputText={this.state.triggerInputText}
            handleOnChange={this.handleTriggerChange}
            onClick={this.toggle}
            select={this.select}
          />
        </div>
        {
          isOpen &&
          <DropdownMenu
            minWidth={this.refs['power-select-trigger-container'].offsetWidth}
            options={filteredOptions}
            selected={selected}
            optionComponent={optionComponent}
            onOptionClick={this.selectOption}
            handleKeyDown={this.handleKeyDown}
            highlightedIndex={highlightedIndex}
            select={this.select}
            beforeOptionsComponent={beforeOptionsComponent}
            afterOptionsComponent={afterOptionsComponent}
          />
        }
      </Dropdown>
    )
  }
}

PowerSelect.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChange: PropTypes.func.isRequired
}

PowerSelect.defaultProps = {
  options: [],
  selectTriggerComponent: SelectTrigger,
  selectedOptionComponent: SelectedOption,
  beforeOptionsComponent: BeforeOptions,
  afterOptionsComponent: null,
  matcher: matcher
}
