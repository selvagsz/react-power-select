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
      <div className="demo">
        <h3>AfterOptions Component</h3>
        <PowerSelect
          options={countries}
          selected={this.state.selectedCountry}
          optionLabelPath="name"
          searchIndices={['name', 'code']}
          onChange={this.handleChange}
          afterOptionsComponent={({ select }) =>
            <a
              className="quick-create"
              onClick={() => {
                this.handleNewClick();
                select.close();
              }}
            >
              + Add New
            </a>}
        />
      </div>
    );
  }
}
