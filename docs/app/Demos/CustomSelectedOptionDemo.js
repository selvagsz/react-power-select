import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from './constants';

const CustomOptionComponnet = ({ option }) =>
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>;

const CustomSelectedOptionComponent = ({ option }) =>
  <b style={{ color: 'orange' }}>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </b>;

export default class CustomSelectedOptionDemo extends Component {
  state = {
    selectedCountry: countries[2],
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>Custom Selected Option Component</h3>
        <PowerSelect
          options={countries}
          selected={this.state.selectedCountry}
          optionComponent={<CustomOptionComponnet />}
          selectedOptionComponent={<CustomSelectedOptionComponent />}
          searchIndices={['name', 'code']}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
