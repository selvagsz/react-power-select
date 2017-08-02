import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { frameworks } from '../constants';

export default class PlainArrayDemo extends Component {
  state = {
    selectedFramework: 'React',
  };

  handleChange = ({ option }) => {
    this.setState({ selectedFramework: option });
  };

  render() {
    return (
      <div>
        <div className="demo">
          <h3>Plain Array</h3>
          <PowerSelect
            options={frameworks}
            selected={this.state.selectedFramework}
            onChange={this.handleChange}
            placeholder="Select your favourite framework"
          />
        </div>
      </div>
    );
  }
}
