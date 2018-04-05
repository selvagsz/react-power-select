import React, { Component } from 'react';
import { text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import PowerSelect from 'src/PowerSelect';
import { frameworks } from '../constants';

export default class PlainArrayDemo extends Component {
  state = {
    selectedFramework: 'React',
  };

  handleChange = args => {
    action('onChange')(args); // For action logging in storybook. Can be safely ignored
    this.setState({ selectedFramework: args.option });
  };

  render() {
    return (
      <PowerSelect
        options={frameworks}
        selected={this.state.selectedFramework}
        onChange={this.handleChange}
        placeholder={text('placeholder', 'Select your favourite framework')}
        searchPlaceholder={text('searchPlaceholder', 'Search...')}
        disabled={boolean('disabled', false)}
        showClear={boolean('showClear', true)}
      />
    );
  }
}
