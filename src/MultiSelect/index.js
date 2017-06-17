import { Component } from 'react'
import Select from '../Select'
import TypeAheadSelectTrigger from './SelectTrigger'

export default class MultiSelect extends Component {
  state = {}

  componentWillMount() {
    this.filterOptions(this.props.options, this.props.selected)
  }

  componentWillReceiveProps(nextProps) {
    this.filterOptions(nextProps.options, nextProps.selected)
  }

  handleOnChange = ({ option, select }) => {
    let { selected, onChange } = this.props
    let options = selected.slice()
    options.push(option)

    onChange({
      options,
      select
    })

    if (select.searchTerm) {
      this.filterOptions(this.props.options, options, () => {
        select.search('')
      })
    }
  }

  filterOptions(options, selected, callback) {
    let filteredOptions = options.filter((option) => selected.indexOf(option) === -1)

    this.setState({
      filteredOptions
    }, callback)
  }

  render() {
    let { className, options, onChange, searchEnabled, ...rest } = this.props

    return (
      <Select
        className={`${className} powerselect-multiple`}
        selectTriggerComponent={TypeAheadSelectTrigger}
        options={this.state.filteredOptions}
        searchEnabled={false}
        onChange={this.handleOnChange}
        closeOnOptionClick={false}
        {...rest}
      />
    )
  }
}
