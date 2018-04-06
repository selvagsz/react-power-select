import React, { Component } from 'react';
import { text, array, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import PowerSelectMultiple from 'src/PowerSelectMultiple';
import { countries } from '../constants';

export default class GeneralConfigDemo extends Component {
  state = {
    selectedCountries: [],
  };

  handleChange = args => {
    action('onChange')(args); // For action logging in storybook. Can be safely ignored
    this.setState({ selectedCountries: args.options });
  };

  render() {
    return (
      <PowerSelectMultiple
        options={object('options', countries)}
        selected={this.state.selectedCountries}
        onChange={this.handleChange}
        optionLabelPath={text('optionLabelPath', 'name')}
        placeholder={text('placeholder', 'Select your favourite countries')}
        disabled={boolean('disabled', false)}
        showClear={boolean('showClear', true)}
        searchIndices={array('searchIndices', ['name', 'code'])}
      />
    );
  }
}
