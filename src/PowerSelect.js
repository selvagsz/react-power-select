import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
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

const noop = () => {}

export default class PowerSelect extends Component {
  documentEventListeners = {
    handleEscapePress: ::this.handleEscapePress,
    handleDocumentClick: ::this.handleDocumentClick
  }

  select = {
    open: ::this.open,
    close: ::this.close,
    toggle: ::this.toggle,
    search: ::this.search,
  }

  constructor() {
    super(...arguments)
    this.state = {
      highlightedIndex: null,
      isOpen: false,
      focused: false,
      filteredOptions: null,
      searchTerm: null
    }

    this.open = ::this.open
    this.close = ::this.close
    this.toggle = ::this.toggle
    this.selectOption = ::this.selectOption
    this.handleOptionClick = ::this.handleOptionClick
    this.handleKeyDown = ::this.handleKeyDown
    this.handleTriggerChange = ::this.handleTriggerChange
    this.handleFocus = ::this.handleFocus
    this.handleBlur = ::this.handleBlur
    this.handleClick = ::this.handleClick
  }

  componentDidMount() {
    document.addEventListener('keydown', this.documentEventListeners.handleEscapePress)
    document.addEventListener('click', this.documentEventListeners.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.documentEventListeners.handleEscapePress)
    document.removeEventListener('click', this.documentEventListeners.handleDocumentClick)
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
    this.props.onChange(selectedOption, this.select)
    this.setState({
      searchTerm: null
    })
  }

  open() {
    if (this.props.disabled) {
      return
    }

    let highlightedIndex = this.state.highlightedIndex
    let { options, selected } = this.props
    highlightedIndex = highlightedIndex !== null ? highlightedIndex : options.indexOf(selected)

    this.highlightOption(highlightedIndex)
    this.setState({
      isOpen: true,
    })
  }

  close() {
    this.highlightOption(null)
    this.setState({
      isOpen: false,
      filteredOptions: null,
    })
  }

  toggle(event) {
    event && event.stopPropagation()
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  setFocusedState(focused) {
    this.setState({ focused })
  }

  focusField() {
    findDOMNode(this.refs['powerselect-trigger-container']).focus()
  }

  search(searchTerm, callback) {
    let { options, searchIndices } = this.props
    let filteredOptions = options.filter((option) => {
      return this.props.matcher({
        option,
        searchTerm,
        searchIndices
      })
    })

    if (!searchTerm || !filteredOptions.length) {
      let highlightedIndex = -1
      this.highlightOption(highlightedIndex)
    }

    this.setState({
      filteredOptions,
      searchTerm,
    }, callback)
  }

  handleTriggerChange(event) {
    let value = event.target.value
    this.search(value, this.open)
  }

  handleDownArrow(index) {
    let options = this.state.filteredOptions || this.props.options
    let highlightedIndex = index < options.length - 1 ? ++index : 0
    this.highlightOption(highlightedIndex)
  }

  handleUpArrow(index) {
    let options = this.state.filteredOptions || this.props.options
    let highlightedIndex = (index > 0 && index <= options.length) ? --index : options.length - 1
    this.highlightOption(highlightedIndex)
  }

  handleEnterPress(highlightedIndex) {
    if (this.state.isOpen) {
      this.selectOption(highlightedIndex)
      this.focusField()
      this.close()
    }
    if (highlightedIndex === -1) {
      this.props.onEnter(this.getPublicApi())
    }
  }

  handleTabPress(highlightedIndex) {
    this.setFocusedState(false)
    if (this.state.isOpen) {
      this.selectOption(highlightedIndex)
      this.close()
    }
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

  handleEscapePress(event) {
    if (event.which === 27) {
      this.close()
    }
  }

  handleDocumentClick(event) {
    let $target = event.target
    if (!($target.closest('.powerselect') || $target.closest('.powerselect__menu'))) {
      let { focused, isOpen } = this.state
      if (focused) {
        this.setFocusedState(false)
      }

      if (isOpen) {
        this.selectOption(this.state.highlightedIndex)
        this.close()
      }
    }
  }

  handleFocus(event) {
    this.setFocusedState(true)
    this.props.onFocus(event)
  }

  handleBlur(event) {
    this.setFocusedState(false)
    this.props.onBlur(event)
  }

  handleClick(event) {
    this.toggle(event)
    this.props.onClick(event)
  }

  handleOptionClick(option) {
    this.selectOption(option)
    this.focusField()
    this.close()
  }

  getPublicApi() {
    let { isOpen, searchTerm } = this.state

    return {
      ...this.select,
      isOpen,
      searchTerm,
    }
  }

  render() {
    let {
      className,
      options,
      selected,
      selectedLabel,
      placeholder,
      disabled,
      optionComponent,
      selectedOptionComponent,
      beforeOptionsComponent,
      afterOptionsComponent
    } = this.props

    let { isOpen, searchTerm } = this.state
    let filteredOptions = this.state.filteredOptions || options
    let SelectTrigger = this.props.selectTriggerComponent
    let selectApi = this.getPublicApi()
    let { highlightedIndex, focused } = this.state

    return (
      <Dropdown>
        <div
          ref='powerselect-trigger-container'
          className={
            `powerselect ${className} ${disabled ? 'powerselect--disabled' : ''} ${isOpen ? 'powerselect--open' : ''} ${focused ? 'powerselect--focused' : '' } ${searchTerm ? 'powerselect__with-search' : ''}`
          }
          tabIndex={0}
          onFocus={() => {
            let triggerContainer = findDOMNode(this.refs['powerselect-trigger-container'])
            let triggerInput = triggerContainer.querySelector('input')
            if (triggerInput) {
              triggerInput.focus()
            }
          }}
        >
          <SelectTrigger
            selectedOption={selected}
            selectedLabel={selectedLabel}
            selectedOptionComponent={selectedOptionComponent}
            placeholder={placeholder}
            disabled={disabled}
            handleKeyDown={(event) => {
              this.handleKeyDown(event, highlightedIndex)
            }}
            searchTerm={searchTerm}
            handleOnChange={this.handleTriggerChange}
            onClick={this.handleClick}
            handleOnFocus={this.handleFocus}
            handleOnBlur={this.handleBlur}
            select={selectApi}
          />
        </div>
        {
          isOpen &&
          <DropdownMenu
            minWidth={this.refs['powerselect-trigger-container'].offsetWidth}
            options={filteredOptions}
            selected={selected}
            optionComponent={optionComponent}
            onOptionClick={this.handleOptionClick}
            handleKeyDown={this.handleKeyDown}
            highlightedIndex={highlightedIndex}
            select={selectApi}
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
  onChange: PropTypes.func.isRequired,
}

PowerSelect.defaultProps = {
  options: [],
  disabled: false,
  selectTriggerComponent: SelectTrigger,
  selectedOptionComponent: SelectedOption,
  beforeOptionsComponent: BeforeOptions,
  afterOptionsComponent: null,
  matcher: matcher,
  onFocus: noop,
  onBlur: noop,
  onClick: noop,
  onEnter: noop,
}
