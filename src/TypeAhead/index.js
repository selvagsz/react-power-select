import { Component } from 'react'
import PowerSelect from '../PowerSelect'
import TypeAheadSelectTrigger from './SelectTrigger'

export default class TypeAhead extends Component {
  render() {
    return (
      <PowerSelect
        selectTriggerComponent={TypeAheadSelectTrigger}
        searchEnabled={false}
        {...this.props}
      />
    )
  }
}
