import React, { Component } from 'react';
import { TypeAhead } from 'src';
import { countries } from '../constants';

// Implementation
const TypeAheadTrigger = TypeAhead.Trigger;
class TypeAheadTriggerExt extends Component {
  state = {};

  componentWillMount() {
    this.setState({ searchTerm: this.props.searchTerm });
  }

  componentWillReceiveProps(nextProps) {
    let { searchTerm, highlightedOption } = this.props;
    let { searchTerm: newSearchTerm, highlightedOption: newHighlightedOption } = nextProps;
    if (newSearchTerm === searchTerm && newHighlightedOption !== highlightedOption) {
      newSearchTerm = this.getValueFromOption(nextProps, newHighlightedOption);
    }
    this.setState({ searchTerm: newSearchTerm });
  }

  getValueFromOption(props = this.props, option) {
    let { selectedOptionLabelPath, optionLabelPath } = props;
    let value = '';
    optionLabelPath = selectedOptionLabelPath || optionLabelPath;
    if (option) {
      if (typeof option === 'string') {
        value = option;
      } else if (optionLabelPath) {
        value = option[optionLabelPath];
      }
    }
    return value;
  }

  render() {
    let { searchTerm, ...rest } = this.props;
    return <TypeAheadTrigger searchTerm={this.state.searchTerm} {...rest} />;
  }
}

// Good to have Wrapper Component. Otherwise, you'd need to pass `triggerComponent={TypeAheadTriggerExt}` on the consumption end
const AutoFillTypeAhead = props => {
  return <TypeAhead triggerComponent={TypeAheadTriggerExt} {...props} />;
};
/*** End of Implementation ***/

// Usage
export default class AutoFillTypeAheadDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <div>
        <div className="demo">
          <h3>Auto-fill TypeAhead</h3>
          <AutoFillTypeAhead
            options={countries}
            optionLabelPath="name"
            selected={this.state.selectedCountry}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
