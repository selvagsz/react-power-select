import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';
import { countries } from '../constants';

const CustomOptionComponnet = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>
);

export default class ArrayOfObjectsDemo extends Component {
  state = {
    selectedCountries: [],
  };

  handleChange = ({ options }) => {
    this.setState({ selectedCountries: options });
  };

  render() {
    return (
      <div className="demo">
        <h3>Array of Objects</h3>
        <PowerSelectMultiple
          options={countries}
          selected={this.state.selectedCountries}
          optionLabelPath="name"
          optionComponent={<CustomOptionComponnet />}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
