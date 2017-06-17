import { Component } from 'react'
import Select from '../Select'
import TypeAheadSelectTrigger from './SelectTrigger'

export default class TypeAhead extends Component {
  render() {
    return (
      <Select
        selectTriggerComponent={TypeAheadSelectTrigger}
        {...this.props}
      />
    )
  }
}
