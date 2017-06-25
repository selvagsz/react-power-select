import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { frameworks } from '../constants';

export default class WithoutSearchDemo extends Component {
  state = {
    selectedFramework: 'React',
  };

  handleChange = ({ option }) => {
    this.setState({ selectedFramework: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>Without Search Field</h3>
        <PowerSelect
          options={frameworks}
          selected={this.state.selectedFramework}
          searchEnabled={false}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
