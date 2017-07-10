import React, { Component } from 'react';
import Select from '../Select';
import TypeAheadSelectTrigger from './SelectTrigger';

export default class TypeAhead extends Component {
  render() {
    let { selectedOptionLabelPath, ...rest } = this.props;
    return (
      <Select
        selectTriggerComponent={props => {
          return (
            <TypeAheadSelectTrigger
              {...props}
              selectedOptionLabelPath={selectedOptionLabelPath}
            />
          );
        }}
        {...rest}
      />
    );
  }
}

TypeAhead.displayName = 'TypeAhead';
