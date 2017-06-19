import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

const createHighlighedOption = (label, searchTerm) => {
  if (searchTerm) {
    let escapedSearchTerm = searchTerm.replace(
      /([.?*+^$[\]\\(){}|-])/g,
      '\\$1'
    );
    label = label.replace(
      new RegExp(escapedSearchTerm, 'i'),
      '<span class="highlight">$&</span>'
    );
  }

  return {
    __html: label,
  };
};

const HighlightedOption = ({ option, select, optionLabelPath }) => {
  let highlightedLabel = option[optionLabelPath];
  return (
    <span
      dangerouslySetInnerHTML={createHighlighedOption(
        highlightedLabel,
        select.searchTerm
      )}
    />
  );
};

export default class HighlightSearchDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>Highlight Search Term</h3>
        <PowerSelect
          options={countries}
          selected={this.state.selectedCountry}
          optionLabelPath="name"
          optionComponent={<HighlightedOption />}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
