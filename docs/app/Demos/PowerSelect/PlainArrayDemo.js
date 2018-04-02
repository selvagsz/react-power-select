import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { frameworks } from '../constants';
import { text, boolean } from '@storybook/addon-knobs/react';

export default class PlainArrayDemo extends Component {
  state = {
    selectedFramework: 'React',
  };

  handleChange = ({ option }) => {
    this.setState({ selectedFramework: option });
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
