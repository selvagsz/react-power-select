import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';

export default class PlainArrayDemo extends Component {
  state = {
    selectedFrameworks: ['React', 'Ember'],
  };

  frameworks = [
    'React',
    'Ember',
    'Angular',
    'Vue',
    'Preact',
    'Meteor',
    'Backbone',
    'Knockout',
    'SproutCore',
    'Spine',
  ];

  handleChange = ({ options }) => {
    this.setState({ selectedFrameworks: options });
  };

  render() {
    return (
      <div>
        <div className="demo">
          <h3>Plain Array</h3>
          <PowerSelectMultiple
            options={this.frameworks}
            selected={this.state.selectedFrameworks}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
