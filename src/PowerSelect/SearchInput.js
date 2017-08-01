import React, { Component } from 'react';

export default class SearchInput extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.input.focus();
    }, 0);
  }

  componentWillMount() {
    let searchTerm = this.props.searchTerm;
    if (searchTerm !== undefined) {
      this.props.select.actions.search(searchTerm);
    }
  }

  render() {
    let props = this.props;
    return (
      <div className="PowerSelect__SearchInputContainer">
        <input
          ref={input => (this.input = input)}
          className="PowerSelect__SearchInput"
          onChange={e => props.select.actions.search(e.target.value)}
        />
      </div>
    );
  }
}
