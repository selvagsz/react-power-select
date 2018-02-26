import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

export default class SearchFieldsDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>Search Fields</h3>
        <PowerSelect
          options={countries}
          selected={this.state.selectedCountry}
          optionLabelPath="name"
          searchIndices={['name', 'code']}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
