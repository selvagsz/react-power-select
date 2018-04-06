import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

export default class AfterOptionsDemo extends Component {
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
        afterOptionsComponent={({ select }) => (
          <a
            className="quick-create"
            onClick={() => {
              this.handleNewClick();
              select.actions.close();
            }}
          >
            + Add New
          </a>
        )}
      />
    );
  }
}
