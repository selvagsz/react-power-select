import React, { Component } from 'react';
import PowerSelect from 'src/PowerSelect';
import { countries } from './constants';

const Loader = ({ loadingText = '' }) =>
  <div className="spinner">
    {loadingText}
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>;

export default class BeforeOptionsDemo extends Component {
  state = {
    selectedCountry: null,
  };

  countries = [];

  handleOpen = () => {
    this.countries = [];
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.countries = countries;
        this.setState({ loading: false });
      }, 5000);
    });
  };

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option });
  };

  render() {
    return (
      <div className="demo">
        <h3>BeforeOptions Component</h3>
        <PowerSelect
          options={this.countries}
          selected={this.state.selectedCountry}
          optionLabelPath="name"
          searchIndices={['name', 'code']}
          onChange={this.handleChange}
          onOpen={this.handleOpen}
          beforeOptionsComponent={({ select }) => {
            if (this.state.loading) {
              return <Loader loadingText="Loading countries" />;
            }
            return (
              <div className="powerselect__search-input-container">
                <input
                  className="powerselect__search-input"
                  value={select.searchTerm || ''}
                  autoFocus={true}
                  onChange={event => {
                    select.search(event.target.value);
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}
