import React, { Component } from 'react';
import { text, array, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { TypeAhead } from 'src';
import { countries } from '../constants';

export default class GeneralConfigDemo extends Component {
  state = {
    selectedCountry: null,
  };

  handleChange = args => {
    action('onChange')(args); // For action logging in storybook. Can be safely ignored
    this.setState({ selectedCountry: args.option });
  };

  render() {
    return (
      <TypeAhead
        options={object('options', countries)}
        selected={this.state.selectedCountry}
        onChange={this.handleChange}
        optionLabelPath={text('optionLabelPath', 'name')}
        placeholder={text('placeholder', 'Select your favourite country')}
        disabled={boolean('disabled', false)}
        showClear={boolean('showClear', true)}
        searchIndices={array('searchIndices', ['name', 'code'])}
      />
    );
  }
}
