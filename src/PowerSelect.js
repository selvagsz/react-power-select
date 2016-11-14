import React, { Component, PropTypes } from 'react'
import Dropdown from './Dropdown'
import SelectTrigger from './SelectTrigger'
import DropdownMenu from './DropdownMenu'
import SelectedOption from './SelectedOption'
import BeforeOptions from './BeforeOptions'
import AfterOptions from './AfterOptions'
import { matcher } from './utils'

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
    this.onOptionChange = ::this.onOptionChange
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

  handleDownArrow(highlightedIndex) {
    let options = this.state.filteredOptions || this.props.options
    this.setState({
      highlightedIndex: highlightedIndex < options.length - 1 ? ++highlightedIndex : 0
    })
  }

  handleUpArrow(highlightedIndex) {
    let options = this.state.filteredOptions || this.props.options
    this.setState({
      highlightedIndex: highlightedIndex > 0 ? --highlightedIndex : options.length - 1
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
    let options = this.state.filteredOptions || this.props.options
    this.onOptionChange(options[highlightedIndex])
  }

  onOptionChange(selectedOption) {
    this.setState({
      triggerInputText: null
    })

    this.props.onChange(selectedOption)
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

  select = {
    open: ::this.open,
    close: ::this.close,
    toggle: ::this.toggle,
    search: ::this.search
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
            onOptionClick={this.onOptionChange}
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
