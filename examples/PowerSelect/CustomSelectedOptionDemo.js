import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

const CustomOptionComponent = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>
);

const CustomSelectedOptionComponent = ({ option }) => (
  <b style={{ color: 'orange' }}>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </b>
);

export default class CustomSelectedOptionDemo extends Component {
  state = {
    selectedCountry: countries[2],
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
        optionComponent={<CustomOptionComponent />}
        selectedOptionComponent={<CustomSelectedOptionComponent />}
        onChange={this.handleChange}
        placeholder="Select your country"
      />
    );
  }
}
