import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';
import { frameworks } from '../constants';

export default class PlainArrayDemo extends Component {
  state = {
    selectedFrameworks: ['React', 'Ember'],
  };

  handleChange = ({ options }) => {
    this.setState({ selectedFrameworks: options });
  };

  render() {
    return (
      <div>
        <div className="demo">
          <h3>Plain Array</h3>
          <PowerSelectMultiple
            options={frameworks}
            selected={this.state.selectedFrameworks}
            onChange={this.handleChange}
            placeholder="Select your favourite frameworks"
          />
        </div>
      </div>
    );
  }
}
