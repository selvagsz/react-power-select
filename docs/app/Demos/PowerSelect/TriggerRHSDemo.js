import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

export default class TriggerRHSDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  handleNewClick = () => {
    alert('Lalalala');
  };

  render() {
    return (
      <PowerSelect
        options={countries}
        selected={this.state.selectedCountry}
        optionLabelPath="name"
        onChange={this.handleChange}
        placeholder="Select your country"
        triggerRHSComponent={({ select }) => <a>RHS</a>}
      />
    );
  }
}
