import React, { Component } from 'react';
import Select from '../Select';
import SelectTrigger from './SelectTrigger';

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
    const TriggerComponent = this.props.triggerComponent;

    return (
      <Select
        triggerComponent={props => {
          return <TriggerComponent {...props} selectedOptionLabelPath={selectedOptionLabelPath} />;
        }}
        {...rest}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

TypeAhead.displayName = 'TypeAhead';
TypeAhead.defaultProps = {
  triggerComponent: SelectTrigger,
};
