import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';
import { countries } from '../constants';

const CustomOptionComponnet = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>
);

const CustomSelectedOptionComponent = ({ option, select }) => (
  <span>
    <img className="flag" src={option.flag} />
    {option.name}
  </span>
);

export default class CustomOptionDemo extends Component {
  state = {
    selectedCountries: [countries[2], countries[4]],
  };

  handleChange = ({ options }) => {
    this.setState({ selectedCountries: options });
  };

  render() {
    return (
      <div className="demo">
        <h3>Custom Selected Options</h3>
        <PowerSelectMultiple
          options={countries}
          selected={this.state.selectedCountries}
          optionLabelPath="name"
          optionComponent={<CustomOptionComponnet />}
          selectedOptionComponent={<CustomSelectedOptionComponent />}
          onChange={this.handleChange}
          placeholder="Select your favourite countries"
        />
      </div>
    );
  }
}
