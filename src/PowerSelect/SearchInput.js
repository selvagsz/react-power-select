import React, { Component } from 'react';

export default class SearchInput extends Component {
  componentDidMount() {
    let input = this.refs['before-options-input'];
    setTimeout(function() {
      input.focus();
    }, 0);
  }

  componentWillMount() {
    let searchTerm = this.props.searchTerm;
    if (searchTerm !== undefined) {
      this.props.select.search(searchTerm);
    }
  }

  render() {
    let props = this.props;
    return (
      <div className="PowerSelect__SearchInputContainer">
        <input
          ref="before-options-input"
          className="PowerSelect__SearchInput"
          onChange={e => props.select.search(e.target.value)}
        />
      </div>
    );
  }
}
