import React, { Component } from 'react';
import { TypeAhead } from 'src';
import { countries } from '../constants';

const CustomOptionComponnet = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>
);

export default class CustomOptionDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = args => {
    this.setState({ selectedCountry: args.option });
  };

  render() {
    return (
      <TypeAhead
        options={countries}
        selected={this.state.selectedCountry}
        optionLabelPath="name"
        optionComponent={<CustomOptionComponnet />}
        onChange={this.handleChange}
      />
    );
  }
}
