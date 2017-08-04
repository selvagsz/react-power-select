import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

// OptGroup expects the options in the following syntax
// [
//   {
//     label: '', //group name
//     options: [] // group options
//   }
// ]

let groupedCountries = countries.reduce(
  (groups, { continent, ...currentOption }) => {
    let group = groups.find(group => group.label === continent);
    if (group) {
      group.options.push(currentOption);
    } else {
      groups.push({
        label: continent,
        options: [],
      });
    }
    return groups;
  },
  []
);

export default class OptGroupDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>OptGroup Demo</h3>
        <PowerSelect
          options={groupedCountries}
          selected={this.state.selectedCountry}
          optionLabelPath="name"
          onChange={this.handleChange}
          placeholder="Select your country"
        />
      </div>
    );
  }
}
