import React, { Component } from 'react';
import { PowerSelect, Option } from 'src';
import { countries } from '../constants';

export default class ArrayOfObjectsDemo extends Component {
  state = {
    selectedCountry: 'BRA',
  };

  handleChange = ({ value }) => {
    this.setState({ selectedCountry: value });
  };

  render() {
    return (
      <div className="demo">
        <h3>Array of Objects</h3>
        <PowerSelect
          options={countries}
          selected={this.state.selectedCountry}
          onChange={this.handleChange}
          placeholder="Select your country"
          searchIndices={['name']}
          selectedOptionComponent={({ value }) => {
            let selectedOption = countries.find(country => country.code === value);
            return selectedOption.name;
          }}
        >
          {({ results }) => {
            return results.map(option => {
              return (
                <Option key={option.code} value={option.code}>
                  {option.name}
                </Option>
              );
            });
          }}
        </PowerSelect>
      </div>
    );
  }
}
