import React, { Component, PropTypes } from 'react'
import Dropdown from './Dropdown'
import SelectTrigger from './SelectTrigger'
import DropdownMenu from './DropdownMenu'
import SelectedOption from './SelectedOption'
import BeforeOptions from './BeforeOptions'
import AfterOptions from './AfterOptions'
import { matcher } from './utils'

export default class PowerSelect extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isOpen: false,
      filteredOptions: null
    }
    this.open = ::this.open
    this.close = ::this.close
    this.toggle = ::this.toggle
    this.onChange = ::this.onChange
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

  onChange(option) {
    this.props.onChange(option)
    this.close()
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

  actions = {
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
            onClick={this.toggle}
          />
        </div>
        {
          isOpen &&
          <DropdownMenu
            minWidth={this.refs['power-select-trigger-container'].offsetWidth}
            options={filteredOptions}
            selected={selected}
            optionComponent={optionComponent}
            onOptionClick={this.onChange}
            actions={this.actions}
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
  selectedOptionComponent: SelectedOption,
  beforeOptionsComponent: BeforeOptions,
  afterOptionsComponent: AfterOptions,
  matcher: matcher
}
