import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from '../constants';

const Loader = ({ loadingText = '' }) => (
  <div className="spinner">
    {loadingText}
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);

export default class BeforeOptionsDemo extends Component {
  state = {
    selectedCountry: null,
  };

  countries = [];

  handleOpen = () => {
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.countries = countries;
        this.setState({ loading: false });
      }, 300);
    });
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <PowerSelect
        options={this.countries}
        selected={this.state.selectedCountry}
        optionLabelPath="name"
        onChange={this.handleChange}
        onOpen={this.handleOpen}
        placeholder="Select your country"
        beforeOptionsComponent={({ select }) => {
          if (this.state.loading) {
            return <Loader loadingText="Loading countries" />;
          }
          return null;
        }}
      />
    );
  }
}
