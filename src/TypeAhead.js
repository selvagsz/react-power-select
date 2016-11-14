import { Component } from 'react'
import PowerSelect from './PowerSelect'
import TypeAheadSelectTrigger from './TypeAhead/SelectTrigger'

export default class TypeAhead extends Component {
  render() {
    return (
      <PowerSelect
        selectTriggerComponent={TypeAheadSelectTrigger}
        beforeOptionsComponent={null}
        {...this.props}
      />
    )
  }
}
