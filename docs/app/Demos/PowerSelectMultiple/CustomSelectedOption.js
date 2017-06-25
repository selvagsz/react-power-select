import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';
import { countries } from '../constants';

const CustomOptionComponnet = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>
);

const CustomSelectedOptionComponent = ({
  option,
  optionLabelPath,
  onCloseClick,
  select,
}) => (
  <li className="PowerSelectMultiple__SelectedOption">
    <span className="PowerSelectMultiple__SelectedOption__Label">
      <img className="flag" src={option.flag} />
      {option[optionLabelPath]}
    </span>
    <span
      className="PowerSelectMultiple__SelectedOption__Close"
      onClick={event => {
        event.stopPropagation();
        onCloseClick({ option, select });
      }}
    >
      ×
    </span>
  </li>
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
        <h3>Custom Selected Options</h3>
        <PowerSelectMultiple
          options={countries}
          selected={this.state.selectedCountries}
          optionLabelPath="name"
          optionComponent={<CustomOptionComponnet />}
          selectedOptionComponent={<CustomSelectedOptionComponent />}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
