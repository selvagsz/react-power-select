import React, { Component } from 'react';
import { text, array, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

export default class ArrayOfObjectsDemo extends Component {
  state = {
    selectedCountry: countries[2],
  };

  handleChange = args => {
    action('onChange')(args); // For action logging in storybook. Can be safely ignored
    this.setState({ selectedCountry: args.option });
  };

  render() {
    return (
      <PowerSelect
        options={object('options', countries)}
        selected={this.state.selectedCountry}
        onChange={this.handleChange}
        optionLabelPath={text('optionLabelPath', 'name')}
        placeholder={text('placeholder', 'Select your favourite framework')}
        disabled={boolean('disabled', false)}
        showClear={boolean('showClear', true)}
        searchEnabled={boolean('searchEnabled', true)}
        searchPlaceholder={text('searchPlaceholder', 'Search...')}
        searchIndices={array('searchIndices', ['name', 'code'])}
      />
    );
  }
}
