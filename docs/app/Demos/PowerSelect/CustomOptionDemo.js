import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

const CustomOptionComponnet = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    <span>{option.name}</span>
    <small className="code">{option.code}</small>
  </div>
);

export default class CustomOptionDemo extends Component {
  state = {
    selectedCountry: countries[4],
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <PowerSelect
        options={countries}
        selected={this.state.selectedCountry}
        optionLabelPath="name"
        optionComponent={<CustomOptionComponnet />}
        onChange={this.handleChange}
        placeholder="Select your country"
      />
    );
  }
}
