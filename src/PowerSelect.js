import React, { Component } from 'react'
import Dropdown from './Dropdown'
import SelectTrigger from './SelectTrigger'
import DropdownMenu from './DropdownMenu'

export default class PowerSelect extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isOpen: false
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

  render() {
    let { isOpen } = this.state
    let { options, selected } = this.props

    return (
      <Dropdown>
        <div className={`power-select ${isOpen ? 'open' : ''}`}>
          <SelectTrigger value={selected} onClick={this.toggle} />
        </div>
        {
          isOpen &&
          <DropdownMenu
            options={options}
            selected={selected}
            onOptionClick={this.onChange}
          />
        }
      </Dropdown>
    )
  }
}
