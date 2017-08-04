import React, { Component } from 'react';
import Select from '../Select';
import TypeAheadSelectTrigger from './SelectTrigger';

export default class TypeAhead extends Component {
  handleKeyDown = (event, { select }) => {
    let { onKeyDown, onChange } = this.props;
    if (event.which === 27) {
      if (!select.searchTerm) {
        onChange({
          option: undefined,
          select,
        });
      }
    }
    if (onKeyDown) {
      onKeyDown(event, { select });
    }
  };

  render() {
    let { selectedOptionLabelPath, onKeyDown, ...rest } = this.props;
    return (
      <Select
        triggerComponent={props => {
          return (
            <TypeAheadSelectTrigger
              {...props}
              selectedOptionLabelPath={selectedOptionLabelPath}
            />
          );
        }}
        {...rest}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

TypeAhead.displayName = 'TypeAhead';
