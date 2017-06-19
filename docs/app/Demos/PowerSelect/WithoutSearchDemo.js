import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';

export default class WithoutSearchDemo extends Component {
  state = {
    selectedFramework: 'React',
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

  handleChange = ({ option }) => {
    this.setState({ selectedFramework: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>Without Search Field</h3>
        <PowerSelect
          options={this.frameworks}
          selected={this.state.selectedFramework}
          searchEnabled={false}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
